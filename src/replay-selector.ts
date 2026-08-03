/**
 * The replay-selector grammar: a structured, semantic way to name an element
 * that survives re-decomposition.
 *
 * `data-tmnc-id` selectors are regenerated on every decompose, so a CSS path
 * captured in one scan does not resolve in the next. A replay selector instead
 * records what the element *is* — its role, accessible name, href — and the
 * runner resolves that against the live page.
 *
 * This lives in the shared types package because three packages touch it:
 * testomniac_runner_service builds them, testomniac_runner resolves them, and
 * testomniac_api writes them when materializing a planned route. A copy per
 * package would drift, and the drift would be silent — an unrecognised key is
 * simply dropped, and the action then targets the wrong element rather than
 * failing.
 */
export const REPLAY_SELECTOR_PREFIX = 'tmnc-replay:';

export type ReplaySelectorMetadata = {
  css?: string;
  tagName?: string;
  role?: string;
  inputType?: string;
  accessibleName?: string;
  textContent?: string;
  href?: string;
  testId?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  /**
   * Text identifying WHICH instance, when the control repeats in a list.
   *
   * A resolver that predates this key drops it and matches unscoped — clicking
   * whichever row comes first. Emit it only to a runner that reports the
   * `withinText` capability.
   */
  withinText?: string;
};

/** Whitespace-collapsed and trimmed. Case is deliberately preserved: an
 * accessible name is matched case-insensitively by the resolver, but the value
 * is also shown to people in step descriptions. */
function normalizeText(value: string | undefined): string {
  return (value ?? '').replace(/\s+/g, ' ').trim();
}

export function isReplaySelector(selector?: string | null): boolean {
  return Boolean(selector && selector.startsWith(REPLAY_SELECTOR_PREFIX));
}

/**
 * Encoded by hand rather than with URLSearchParams so this package keeps its
 * ES2020-only lib and stays free of DOM or Node typings.
 *
 * The output must remain parseable by `new URLSearchParams(...)`, because the
 * runner's in-page resolver reads it that way. encodeURIComponent satisfies
 * that: it escapes `&`, `=` and `%`, and emits `%20` for a space, which
 * URLSearchParams decodes correctly.
 */
export function encodeReplaySelector(metadata: ReplaySelectorMetadata): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(metadata)) {
    const normalizedValue = normalizeText(value);
    if (normalizedValue.length > 0) {
      parts.push(`${key}=${encodeURIComponent(normalizedValue)}`);
    }
  }

  return `${REPLAY_SELECTOR_PREFIX}${parts.join('&')}`;
}

/**
 * Decode one parameter value.
 *
 * `+` becomes a space before decoding: selectors already stored were produced
 * by URLSearchParams, which encodes a space that way. Skipping this would
 * turn "Add to cart" into "Add+to+cart" and match nothing.
 */
function decodeValue(raw: string): string {
  try {
    return decodeURIComponent(raw.replace(/\+/g, '%20'));
  } catch {
    return raw;
  }
}

export function parseReplaySelector(
  selector?: string | null
): ReplaySelectorMetadata | null {
  if (!isReplaySelector(selector)) {
    return null;
  }

  const raw = (selector ?? '').slice(REPLAY_SELECTOR_PREFIX.length);
  const params = new Map<string, string>();
  for (const part of raw.split('&')) {
    if (!part) continue;
    const eq = part.indexOf('=');
    const key = eq === -1 ? part : part.slice(0, eq);
    const value = eq === -1 ? '' : part.slice(eq + 1);
    if (!params.has(key)) params.set(key, decodeValue(value));
  }
  const metadata: ReplaySelectorMetadata = {};

  for (const key of [
    'css',
    'tagName',
    'role',
    'inputType',
    'accessibleName',
    'textContent',
    'href',
    'testId',
    'id',
    'name',
    'placeholder',
    'withinText',
  ] as const) {
    const value = normalizeText(params.get(key) ?? '');
    if (value.length > 0) {
      metadata[key] = value;
    }
  }

  return metadata;
}
