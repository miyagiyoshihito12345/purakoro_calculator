import assert from 'node:assert/strict'
import test from 'node:test'
import { calculatorCharacters } from '../data/gameData.js'
import { PROBABILITY_MODES } from '../domain/gameRules.js'
import { useCharacterCalculator } from './useCharacterCalculator.js'

test('creates isolated calculator state from a character', () => {
  const character = calculatorCharacters[0]
  const calculator = useCharacterCalculator(character)

  assert.deepEqual(
    calculator.moveSlots.value,
    character.moves.slice(0, 4).map((move) => move.id),
  )
  assert.notEqual(calculator.energyCoros.value, character.energyCoros)
  assert.equal(calculator.probabilityMode.value, PROBABILITY_MODES.ENERGY_SUCCESS)
  assert.equal(calculator.results.value.length, 4)
})

test('keeps the selected probability mode in calculator state', () => {
  const calculator = useCharacterCalculator(calculatorCharacters[0])

  calculator.probabilityMode.value = PROBABILITY_MODES.CORO_FAILURE

  assert.equal(calculator.probabilityMode.value, PROBABILITY_MODES.CORO_FAILURE)
})

test('updates an energy face without mutating character data', () => {
  const character = calculatorCharacters[0]
  const calculator = useCharacterCalculator(character)
  const originalFace = character.energyCoros[0][1]

  calculator.setEnergyFace(0, 1, '炎')

  assert.equal(calculator.energyCoros.value[0][1], '炎')
  assert.equal(character.energyCoros[0][1], originalFace)
})
