import assert from 'node:assert/strict'
import test from 'node:test'
import { CORO_DIRECTIONS } from '../domain/gameRules.js'
import moveEffects from './moveEffects.json' with { type: 'json' }
import {
  aFaceEnergyOptions,
  bFaceEnergyOptions,
  calculatorCharacters,
  doubleEnergyFaceOptions,
  initialEnergyCoros,
  singleEnergyFaceOptions,
} from './gameData.js'

test('single face options contain exactly one energy', () => {
  assert.equal(singleEnergyFaceOptions.length, 9)
  assert.ok(singleEnergyFaceOptions.every((option) => !option.includes('/')))
})

test('A and B faces contain only their permitted energy types', () => {
  assert.deepEqual(aFaceEnergyOptions, ['炎', '鋼', '水', '草', '雷'])
  assert.deepEqual(bFaceEnergyOptions, ['悪', '闘', '空', '超'])
})

test('double face options contain exactly two energies', () => {
  assert.equal(doubleEnergyFaceOptions.length, 22)
  assert.ok(doubleEnergyFaceOptions.every((option) => option.split('/').length === 2))
  assert.deepEqual(
    ['鋼/鋼', '闘/鋼', '炎/空', '雷/空', '水/空', '草/闘'].filter(
      (option) => !doubleEnergyFaceOptions.includes(option),
    ),
    [],
  )
})

test('initial coros use double energies only on fourth and fifth faces', () => {
  initialEnergyCoros.forEach((coro) => {
    coro.forEach((face, index) => {
      assert.equal(face.includes('/'), index === 3 || index === 4)
    })
    assert.ok(aFaceEnergyOptions.includes(coro[0]))
    assert.ok(bFaceEnergyOptions.includes(coro[5]))
    assert.ok(doubleEnergyFaceOptions.includes(coro[3]))
    assert.ok(doubleEnergyFaceOptions.includes(coro[4]))
  })
})

test('all Bulbasaur coros use the default grass configuration', () => {
  const expected = ['草', '草', '草', '草/草', '草/草', '悪']
  assert.deepEqual(initialEnergyCoros, [expected, expected, expected])
})

test('calculator contains all fifteen supported characters', () => {
  assert.equal(calculatorCharacters.length, 15)
  assert.equal(new Set(calculatorCharacters.map((character) => character.id)).size, 15)

  calculatorCharacters.forEach((character) => {
    assert.ok(character.moves.length >= 4, `${character.name} must have at least four moves`)
    character.moves.forEach((move) => {
      assert.ok(
        move.required.every((energy) => [...singleEnergyFaceOptions, '無'].includes(energy)),
      )
      assert.ok(
        Number.isInteger(move.damage) && move.damage >= 0,
        `${character.name} / ${move.name}`,
      )
    })

    character.energyCoros.forEach((coro) => {
      assert.equal(coro.length, 6)
      assert.ok(aFaceEnergyOptions.includes(coro[0]))
      assert.ok(doubleEnergyFaceOptions.includes(coro[3]))
      assert.ok(doubleEnergyFaceOptions.includes(coro[4]))
      assert.ok(bFaceEnergyOptions.includes(coro[5]))
    })
  })
})

test('all moves contain hard-coded effect and direction data', () => {
  const directions = new Set(CORO_DIRECTIONS)

  calculatorCharacters.forEach((character) => {
    character.moves.forEach((move) => {
      assert.ok(move.baseEffect || move.coroEffects.length > 0, `${character.name} / ${move.name}`)
      move.coroEffects.forEach((effect) => {
        assert.ok(effect.effect)
        assert.notEqual(effect.effect, '効果発動')
        assert.ok(effect.directions.length > 0)
        assert.ok(effect.directions.every((direction) => directions.has(direction)))
      })
    })
  })
})

test('move effects are joined by unique move IDs', () => {
  const moves = calculatorCharacters.flatMap((character) => character.moves)
  const moveIds = moves.map((move) => move.id)

  assert.equal(new Set(moveIds).size, moveIds.length)
  moves.forEach((move) => assert.ok(Object.hasOwn(moveEffects, move.id), move.id))
})

test('structured mechanics contain valid numeric values', () => {
  calculatorCharacters
    .flatMap((character) => character.moves)
    .flatMap((move) => move.coroEffects)
    .forEach(({ mechanics }) => {
      if (!mechanics) return
      assert.ok(Number.isInteger(mechanics.nextTurnEnergyCoroDelta))
    })
})

test('all moves explicitly define unique charakoro success directions', () => {
  const validDirections = new Set(CORO_DIRECTIONS)

  calculatorCharacters.forEach((character) => {
    character.moves.forEach((move) => {
      assert.ok(Array.isArray(move.successDirections), `${character.name} / ${move.name}`)
      assert.equal(
        new Set(move.successDirections).size,
        move.successDirections.length,
        `${character.name} / ${move.name}`,
      )
      assert.ok(
        move.successDirections.every((direction) => validDirections.has(direction)),
        `${character.name} / ${move.name}`,
      )
    })
  })
})

test('direction-dependent text is stored as a lower coro effect', () => {
  const bulbasaur = calculatorCharacters.find((character) => character.id === 'bulbasaur')

  for (const name of ['やどりぎのタネ', 'くさむすび']) {
    const move = bulbasaur.moves.find((candidate) => candidate.name === name)
    assert.equal(move.baseEffect, '')
    assert.ok(move.coroEffects.every((effect) => effect.effect.length > 0))
  }
})

test('only text printed above the black card area is stored as an upper effect', () => {
  const upperEffects = calculatorCharacters
    .flatMap((character) =>
      character.moves
        .filter((move) => move.baseEffect)
        .map((move) => `${character.name}/${move.name}`),
    )
    .sort()

  assert.deepEqual(
    upperEffects,
    [
      'イワーク/がんせきタックル',
      'カイロス/じごくぐるま',
      'カイロス/たえる',
      'サンダー/ダブルサンダー',
      'サンダー/ボルトラッシュ',
      'ゼニガメ/からにこもる',
      'ピカチュウ/エレキラッシュ',
      'ピカチュウ/ボルテッカー',
      'フリーザー/はねやすめ',
      'ミュウ/バリアー',
      'ミュウ/リフレクション',
      'メタグロス/だいばくはつ',
    ].sort(),
  )
})

test('10まんボルト contains both black-area direction effects', () => {
  const pikachu = calculatorCharacters.find((character) => character.id === 'pikachu')
  const move = pikachu.moves.find((candidate) => candidate.name === '10まんボルト')

  assert.equal(move.baseEffect, '')
  assert.equal(move.coroEffects.length, 2)
})
