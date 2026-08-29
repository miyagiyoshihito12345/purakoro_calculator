import assert from 'node:assert/strict'
import test from 'node:test'
import { trackCalculatorInteraction, trackEvent } from './analytics.js'

test('analytics helpers are safe outside a browser', () => {
  assert.doesNotThrow(() => trackEvent('test_event'))
  assert.doesNotThrow(() => trackCalculatorInteraction('test_interaction'))
})

test('tracks calculator use once before interaction events in production', () => {
  const calls = []
  globalThis.window = {
    location: { hostname: 'miyagiyoshihito12345.github.io' },
    gtag: (...args) => calls.push(args),
  }

  try {
    trackCalculatorInteraction('character_opened', { character_id: 'bulbasaur' })
    trackCalculatorInteraction('move_changed', { move_id: 'st01-01-02' })
  } finally {
    delete globalThis.window
  }

  assert.deepEqual(calls, [
    ['event', 'calculator_used', {}],
    ['event', 'character_opened', { character_id: 'bulbasaur' }],
    ['event', 'move_changed', { move_id: 'st01-01-02' }],
  ])
})
