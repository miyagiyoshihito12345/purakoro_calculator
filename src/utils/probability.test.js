import assert from 'node:assert/strict'
import test from 'node:test'
import {
  canSatisfyRequirement,
  maxSuccessProbability,
  successProbabilities,
  successProbabilityForCoros,
} from './probability.js'

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
