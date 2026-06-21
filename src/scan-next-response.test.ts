import { describe, it, expect } from 'vitest';
import type { ScanNextResponseNext, TestInteractionResponse } from './index';

describe('ScanNextResponseNext.dependencyChain', () => {
  it('carries a root-first chain of full interaction rows including self', () => {
    const self = { id: 7 } as TestInteractionResponse;
    const parent = { id: 5 } as TestInteractionResponse;
    const next: ScanNextResponseNext = {
      interactionRunId: 100,
      surfaceRunId: 10,
      testInteraction: self,
      dependencyChain: [parent, self],
    };
    expect(next.dependencyChain?.[next.dependencyChain.length - 1]).toBe(self);
    expect(next.dependencyChain?.[0]).toBe(parent);
  });

  it('is optional — a next without a chain still type-checks', () => {
    const next: ScanNextResponseNext = {
      interactionRunId: 1,
      surfaceRunId: 2,
      testInteraction: { id: 3 } as TestInteractionResponse,
    };
    expect(next.dependencyChain).toBeUndefined();
  });
});
