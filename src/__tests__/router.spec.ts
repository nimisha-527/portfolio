import { describe, expect, it } from 'vitest'
import router from '../router'

describe('router scroll behavior', () => {
  it('starts new routes at the top and restores saved history positions', () => {
    const scrollBehavior = router.options.scrollBehavior
    expect(scrollBehavior).toBeDefined()

    if (!scrollBehavior) {
      throw new Error('Router scroll behavior is not configured')
    }

    const route = router.currentRoute.value
    expect(scrollBehavior(route, route, null)).toEqual({ top: 0 })
    expect(scrollBehavior(route, route, { left: 0, top: 240 })).toEqual({
      left: 0,
      top: 240,
    })
  })
})
