import assert from 'node:assert/strict'
import test from 'node:test'
import { energiesForFace, energyFaceBackground } from './energy.js'

test('splits a double energy face', () => {
  assert.deepEqual(energiesForFace('草/悪'), ['草', '悪'])
})

test('creates a solid background for a single energy face', () => {
  assert.deepEqual(energyFaceBackground('草'), { backgroundColor: '#d1fae5' })
})

test('creates a split background for a mixed energy face', () => {
  assert.match(energyFaceBackground('草/悪').backgroundImage, /linear-gradient/)
})
