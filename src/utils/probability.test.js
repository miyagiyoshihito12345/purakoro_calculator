import assert from 'node:assert/strict'
import test from 'node:test'
import { calculatorCharacters } from '../data/gameData.js'
import {
  canSatisfyRequirement,
  coroSuccessProbability,
  maxSuccessProbability,
  probabilityForMode,
  successProbabilities,
  successProbabilityForCoros,
} from './probability.js'
import { PROBABILITY_MODES } from '../domain/gameRules.js'

const sampleCoros = [
  ['闘', '闘', '闘', '水/闘', '水/闘', '草'],
  ['草', '草', '草', '草/草', '草/草', '闘'],
  ['草', '草', '草', '草/草', '草/草', '闘'],
]

test('specific energy is assigned before wildcard energy', () => {
  assert.equal(canSatisfyRequirement(['草', '炎', '雷'], ['草', '無', '無']), true)
  assert.equal(canSatisfyRequirement(['炎', '雷', '水'], ['草', '無', '無']), false)
})

test('two energy face contributes both energies', () => {
  const result = successProbabilityForCoros([['草/草', '炎', '炎', '炎', '炎', '炎']], ['草', '草'])
  assert.equal(result, 1 / 6)
})

test('sample configuration returns results for one through five dice', () => {
  const results = successProbabilities(sampleCoros, ['草', '草'], 5)
  assert.equal(results.length, 5)
  assert.deepEqual(
    results.map((result) => Number(result.toFixed(6))),
    [0.333333, 0.805556, 0.833333, 0.960648, 0.991512],
  )
})

test('maximum calculation returns only the probability', () => {
  const result = maxSuccessProbability(sampleCoros, ['草', '草'], 5)
  assert.equal(typeof result, 'number')
  assert.equal(Number(result.toFixed(6)), 0.991512)
})

test('five dice can add two copies of the same energy coro', () => {
  const coros = [
    ['草', '草', '草', '炎', '炎', '炎'],
    ['炎', '炎', '炎', '炎', '炎', '炎'],
    ['炎', '炎', '炎', '炎', '炎', '炎'],
  ]

  assert.equal(maxSuccessProbability(coros, ['草', '草', '草'], 5), 1 / 8)
})

test('counts each explicitly registered charakoro success direction only once', () => {
  const move = { successDirections: ['stand', 'left', 'stand', 'right'] }

  assert.equal(coroSuccessProbability(move), 3 / 6)
})

test('combines independent enekoro and charakoro probabilities by mode', () => {
  const move = { successDirections: ['stand', 'faceUp'] }

  assert.equal(probabilityForMode(0.75, move, PROBABILITY_MODES.ENERGY_SUCCESS), 0.75)
  assert.equal(probabilityForMode(0.75, move, PROBABILITY_MODES.BOTH_SUCCESS), 0.25)
  assert.equal(probabilityForMode(0.75, move, PROBABILITY_MODES.CORO_FAILURE), 0.5)
})

test('uses only the first charakoro roll and ignores effect text', () => {
  const move = {
    successDirections: ['stand', 'faceUp'],
    coroEffects: [
      {
        directions: ['stand', 'faceUp', 'faceDown', 'left', 'right'],
        effect: '相手もキャラコロを3回振る：成功まで繰り返す',
      },
    ],
  }

  assert.equal(coroSuccessProbability(move), 2 / 6)
})

test('flying and fire wing use only their beneficial directions', () => {
  const moves = calculatorCharacters.flatMap((character) => character.moves)
  const flying = moves.find((move) => move.id === 'eb01-04-10')
  const fireWing = moves.find((move) => move.id === 'eb01-06-01')

  assert.equal(coroSuccessProbability(flying), 3 / 6)
  assert.equal(coroSuccessProbability(fireWing), 2 / 6)
})
