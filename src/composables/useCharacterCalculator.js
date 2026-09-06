import { computed, ref, toValue } from 'vue'
import {
  ENERGY_CORO_COUNT,
  MAX_ENERGY_CORO_COUNT,
  MOVE_SLOT_COUNT,
  PROBABILITY_MODES,
} from '../domain/gameRules.js'
import { nextTurnEnergyCoroIncrease } from '../utils/moves.js'
import { successProbabilities } from '../utils/probability.js'

export function useCharacterCalculator(characterSource) {
  const character = computed(() => toValue(characterSource))
  const moveSlots = ref(character.value.moves.slice(0, MOVE_SLOT_COUNT).map((move) => move.id))
  const energyCoros = ref(structuredClone(character.value.energyCoros))
  const probabilityMode = ref(PROBABILITY_MODES.ENERGY_SUCCESS)

  const movesById = computed(() => new Map(character.value.moves.map((move) => [move.id, move])))
  const selectedMoves = computed(() =>
    moveSlots.value.map((id) => movesById.value.get(id)).filter(Boolean),
  )
  const maxDiceCount = computed(() =>
    Math.min(
      ENERGY_CORO_COUNT + Math.max(...selectedMoves.value.map(nextTurnEnergyCoroIncrease), 0),
      MAX_ENERGY_CORO_COUNT,
    ),
  )
  const results = computed(() => {
    if (selectedMoves.value.length !== MOVE_SLOT_COUNT) return null

    return selectedMoves.value.map((move) => ({
      move,
      probabilities: successProbabilities(energyCoros.value, move.required),
    }))
  })

  function setEnergyFace(coroIndex, faceIndex, value) {
    energyCoros.value = energyCoros.value.map((coro, index) => {
      if (index !== coroIndex) return coro

      const nextCoro = [...coro]
      nextCoro[faceIndex] = value
      return nextCoro
    })
  }

  return {
    energyCoros,
    maxDiceCount,
    moveSlots,
    probabilityMode,
    results,
    selectedMoves,
    setEnergyFace,
  }
}
