import { describe, expect, it } from 'vitest'

/**
 * Integration test example for the `post` router
 */
import { createInnerTRPCContext } from '../../trpc';
import { AppRouter, appRouter } from '../../root';
import { inferProcedureInput } from '@trpc/server';

describe('imageRouter', () => {
  it('returns images by album id', async () => {
    const ctx = await createInnerTRPCContext();
    const caller = appRouter.createCaller(ctx);
  
    const input: inferProcedureInput<AppRouter['images']['byId']> = {
      id: 3
    };
  
    const result = await caller.images.byId({ id: input.id });

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toEqual(expect.objectContaining({
      albumId: 3,
    }))
  })
})