import {
  ENERGY_CORO_COUNT,
  ENERGY_FACES_PER_CORO,
  ENERGY_TYPES,
  MAX_ENERGY_CORO_COUNT,
  REQUIRED_ENERGY_TYPES,
  PROBABILITY_MODES,
} from '../domain/gameRules.js'

function combinations(items, count) {
  if (count === 0) return [[]]
  if (count > items.length) return []

  return items.flatMap((item, index) =>
    combinations(items.slice(index + 1), count - 1).map((rest) => [item, ...rest]),
  )
}

function combinationsWithReplacement(items, count, startIndex = 0) {
  if (count === 0) return [[]]

  return items
    .slice(startIndex)
    .flatMap((item, offset) =>
      combinationsWithReplacement(items, count - 1, startIndex + offset).map((rest) => [
        item,
        ...rest,
      ]),
    )
}

export function validateEnergyCoros(energyCoros) {
  if (!Array.isArray(energyCoros) || energyCoros.length !== ENERGY_CORO_COUNT) {
    throw new TypeError(`energyCoros must contain exactly ${ENERGY_CORO_COUNT} coros`)
  }

  energyCoros.forEach((energyCoro) => {
    if (!Array.isArray(energyCoro) || energyCoro.length !== ENERGY_FACES_PER_CORO) {
      throw new TypeError(`each energyCoro must contain exactly ${ENERGY_FACES_PER_CORO} faces`)
    }

    energyCoro.forEach((face) => {
      const energies = face.split('/')
      if (energies.length === 0 || energies.some((energy) => !ENERGY_TYPES.includes(energy))) {
        throw new TypeError(`invalid energy face: ${face}`)
      }
    })
  })
}

export function validateRequiredEnergies(requiredEnergies) {
  if (!Array.isArray(requiredEnergies)) {
    throw new TypeError('requiredEnergies must be an Array')
  }

  const invalidEnergies = requiredEnergies.filter(
    (energy) => !REQUIRED_ENERGY_TYPES.includes(energy),
  )
  if (invalidEnergies.length > 0) {
    throw new TypeError(`invalid required energies: ${invalidEnergies.join(', ')}`)
  }
}

export function canSatisfyRequirement(actualEnergies, requiredEnergies) {
  if (actualEnergies.length < requiredEnergies.length) return false

  const specificRequirements = requiredEnergies.filter((energy) => energy !== '無')
  const wildcardCount = requiredEnergies.filter((energy) => energy === '無').length
  const remainingEnergies = [...actualEnergies]

  for (const required of specificRequirements) {
    const index = remainingEnergies.indexOf(required)
    if (index === -1) return false
    remainingEnergies.splice(index, 1)
  }

  return remainingEnergies.length >= wildcardCount
}

export function successProbabilityForCoros(energyCoros, requiredEnergies) {
  const outcomes = energyCoros.reduce(
    (current, energyCoro) =>
      current.flatMap((combination) => energyCoro.map((face) => [...combination, face])),
    [[]],
  )

  const successCount = outcomes.filter((outcome) => {
    const actualEnergies = outcome.flatMap((face) => face.split('/'))
    return canSatisfyRequirement(actualEnergies, requiredEnergies)
  }).length

  return outcomes.length === 0 ? 0 : successCount / outcomes.length
}

export function maxSuccessProbability(energyCoros, requiredEnergies, diceCount) {
  if (!Number.isInteger(diceCount) || diceCount < 1 || diceCount > MAX_ENERGY_CORO_COUNT) {
    throw new RangeError(`diceCount must be between 1 and ${MAX_ENERGY_CORO_COUNT}`)
  }

  const coroCombinations =
    diceCount <= 3
      ? combinations(energyCoros, diceCount)
      : combinationsWithReplacement(energyCoros, diceCount - 3).map((additional) => [
          ...energyCoros,
          ...additional,
        ])

  return Math.max(
    ...coroCombinations.map((selected) => successProbabilityForCoros(selected, requiredEnergies)),
    0,
  )
}

export function successProbabilities(
  energyCoros,
  requiredEnergies,
  maxDiceCount = MAX_ENERGY_CORO_COUNT,
) {
  validateEnergyCoros(energyCoros)
  validateRequiredEnergies(requiredEnergies)
  if (!Number.isInteger(maxDiceCount) || maxDiceCount < 1 || maxDiceCount > MAX_ENERGY_CORO_COUNT) {
    throw new RangeError(`maxDiceCount must be between 1 and ${MAX_ENERGY_CORO_COUNT}`)
  }

  return Array.from({ length: maxDiceCount }, (_, index) =>
    maxSuccessProbability(energyCoros, requiredEnergies, index + 1),
  )
}

export function coroSuccessProbability(move) {
  const successfulDirections = new Set(move.successDirections ?? [])

  return successfulDirections.size / ENERGY_FACES_PER_CORO
}

export function probabilityForMode(energyProbability, move, mode) {
  const coroProbability = coroSuccessProbability(move)

  switch (mode) {
    case PROBABILITY_MODES.ENERGY_SUCCESS:
      return energyProbability
    case PROBABILITY_MODES.BOTH_SUCCESS:
      return energyProbability * coroProbability
    case PROBABILITY_MODES.CORO_FAILURE:
      return energyProbability * (1 - coroProbability)
    default:
      throw new RangeError(`unknown probability mode: ${mode}`)
  }
}
