import assert from 'node:assert/strict'
import test from 'node:test'
import { calculatorCharacters } from '../data/gameData.js'
import { nextTurnEnergyCoroIncrease } from './moves.js'

test('returns the number of additional energy coros granted for the next turn', () => {
  const increasesByMove = Object.fromEntries(
    calculatorCharacters
      .flatMap((character) => character.moves)
      .map((move) => [move.name, nextTurnEnergyCoroIncrease(move)])
      .filter(([, increase]) => increase > 0),
  )

  assert.deepEqual(increasesByMove, {
    やどりぎのタネ: 1,
    ヒートアップ: 2,
    フレイムアップ: 2,
    しゅうちゅう: 2,
    チャージばさみ: 1,
  })
})

test('does not derive mechanics from display text', () => {
  assert.equal(
    nextTurnEnergyCoroIncrease({
      coroEffects: [{ effect: '次の自分ターン：自分のエネコロ +5' }],
    }),
    0,
  )
})
