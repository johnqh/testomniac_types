import { describe, it, expect } from 'vitest';
import {
  encodeReplaySelector,
  parseReplaySelector,
  isReplaySelector,
} from './replay-selector';

describe('replay selector codec', () => {
  it('round-trips the fields it carries, preserving case', () => {
    const encoded = encodeReplaySelector({
      role: 'button',
      accessibleName: 'Add to cart',
    });
    expect(isReplaySelector(encoded)).toBe(true);
    const parsed = parseReplaySelector(encoded);
    expect(parsed?.role).toBe('button');
    expect(parsed?.accessibleName).toBe('Add to cart');
  });

  // The new key. Without it in the shared type, every writer invents its own.
  it('round-trips withinText', () => {
    const encoded = encodeReplaySelector({
      accessibleName: 'Add to cart',
      withinText: 'Mac mini M2',
    });
    expect(parseReplaySelector(encoded)?.withinText).toBe('Mac mini M2');
  });

  it('omits empty values rather than encoding blanks', () => {
    expect(encodeReplaySelector({ role: 'button', css: '' })).not.toContain(
      'css'
    );
  });

  it('collapses whitespace', () => {
    expect(
      parseReplaySelector(
        encodeReplaySelector({ withinText: '  Mac   mini  M2 ' })
      )?.withinText
    ).toBe('Mac mini M2');
  });

  it('rejects a non-replay selector', () => {
    expect(isReplaySelector('#foo')).toBe(false);
    expect(parseReplaySelector('#foo')).toBeNull();
  });

  // Selectors already stored were produced by URLSearchParams, which encodes a
  // space as "+". Failing to decode that turns "Add to cart" into
  // "Add+to+cart" and matches nothing.
  it('decodes the legacy plus-for-space form', () => {
    expect(
      parseReplaySelector('tmnc-replay:accessibleName=Add+to+cart')
        ?.accessibleName
    ).toBe('Add to cart');
  });

  it('decodes percent-encoded values', () => {
    expect(
      parseReplaySelector('tmnc-replay:accessibleName=Add%20to%20cart')
        ?.accessibleName
    ).toBe('Add to cart');
  });

  // URL parameter encoding must survive text that looks like separators.
  it('survives text containing separators', () => {
    const encoded = encodeReplaySelector({ withinText: 'A & B = C?' });
    expect(parseReplaySelector(encoded)?.withinText).toBe('A & B = C?');
  });
});
