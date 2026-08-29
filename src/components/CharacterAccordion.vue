<script setup>
import { computed, ref } from 'vue'
import { trackCalculatorInteraction } from '../utils/analytics'
import { successProbabilities } from '../utils/probability'
import { nextTurnEnergyCoroIncrease } from '../utils/moves'
import EnergyCustomizer from './EnergyCustomizer.vue'
import MoveSelector from './MoveSelector.vue'
import ProbabilityTable from './ProbabilityTable.vue'

const props = defineProps({
  character: { type: Object, required: true },
  expanded: Boolean,
})
const emit = defineEmits(['toggle'])

const moveSlots = ref(props.character.moves.slice(0, 4).map((move) => move.id))
const energyCoros = ref(structuredClone(props.character.energyCoros))

const movesById = computed(() => new Map(props.character.moves.map((move) => [move.id, move])))
const selectedMoves = computed(() =>
  moveSlots.value.map((id) => movesById.value.get(id)).filter(Boolean),
)
const maxDiceCount = computed(() =>
  Math.min(3 + Math.max(...selectedMoves.value.map(nextTurnEnergyCoroIncrease), 0), 5),
)
const results = computed(() => {
  if (selectedMoves.value.length !== 4) return null
  return selectedMoves.value.map((move) => ({
    move,
    probabilities: successProbabilities(energyCoros.value, move.required, 5),
  }))
})

const badgeClassFor = (type) =>
  ({
    草: 'border-emerald-300 text-emerald-700',
    炎: 'border-red-300 text-red-700',
    水: 'border-sky-300 text-sky-700',
    雷: 'border-amber-300 text-amber-700',
    無: 'border-stone-300 text-stone-700',
    超: 'border-pink-300 text-pink-700',
    闘: 'border-orange-300 text-orange-700',
    悪: 'border-slate-400 text-slate-700',
    鋼: 'border-zinc-400 text-zinc-700',
    空: 'border-cyan-300 text-cyan-700',
  })[type] ?? 'border-slate-300 text-slate-700'

const typeBadgeClass = computed(() => badgeClassFor(props.character.type))
const weaknessBadgeClass = computed(() => badgeClassFor(props.character.weakness))

function updateFace(coroIndex, faceIndex, value) {
  energyCoros.value = energyCoros.value.map((coro, index) => {
    if (index !== coroIndex) return coro

    const nextCoro = [...coro]
    nextCoro[faceIndex] = value
    return nextCoro
  })

  trackCalculatorInteraction('energy_changed', {
    character_id: props.character.id,
    coro_number: coroIndex + 1,
    face_number: faceIndex + 1,
    energy_face: value,
  })
}
</script>

<template>
  <article
    class="rounded-2xl border bg-white transition-colors shadow-[0_8px_24px_rgba(23,35,60,0.06)]"
    :class="expanded ? 'overflow-visible border-[#2563a6]' : 'overflow-hidden border-slate-300'"
  >
    <button
      class="flex min-h-14 w-full items-center justify-between gap-1.5 px-2.5 py-1 text-left transition-colors sm:min-h-20 sm:gap-3 sm:px-5 sm:py-2"
      :class="
        expanded
          ? 'rounded-t-2xl border-b border-blue-200 bg-blue-50'
          : 'rounded-2xl bg-slate-50 hover:bg-slate-100'
      "
      type="button"
      :aria-expanded="expanded"
      :aria-controls="`character-${character.id}`"
      @click="emit('toggle')"
    >
      <span class="flex min-w-0 items-center gap-1.5 sm:gap-3">
        <span class="min-w-0">
          <span class="block text-sm font-black sm:text-xl">{{ character.name }}</span>
          <span class="mt-px flex flex-wrap gap-0.5 sm:mt-1 sm:gap-1.5">
            <span
              class="rounded-full border bg-white px-1.5 py-0 text-[8px] font-bold sm:px-2.5 sm:py-0.5 sm:text-xs"
              :class="typeBadgeClass"
              >{{ character.type }}タイプ</span
            >
            <span
              class="rounded-full border border-blue-300 bg-white px-1.5 py-0 text-[8px] font-bold text-[#2563a6] sm:px-2.5 sm:py-0.5 sm:text-xs"
              >HP {{ character.hp }}</span
            >
            <span
              class="rounded-full border bg-white px-1.5 py-0 text-[8px] font-bold sm:px-2.5 sm:py-0.5 sm:text-xs"
              :class="weaknessBadgeClass"
              >弱点 {{ character.weakness }}</span
            >
          </span>
        </span>
      </span>
      <span class="shrink-0 text-base sm:text-xl" aria-hidden="true">{{
        expanded ? '⌃' : '⌄'
      }}</span>
    </button>

    <Transition name="accordion">
      <div
        v-if="expanded"
        :id="`character-${character.id}`"
        class="space-y-4 p-3 sm:space-y-8 sm:p-6 lg:p-8"
      >
        <MoveSelector v-model="moveSlots" :character-id="character.id" :moves="character.moves" />

        <EnergyCustomizer :energy-coros="energyCoros" @update-face="updateFace" />

        <ProbabilityTable :results="results" :max-dice-count="maxDiceCount" />
      </div>
    </Transition>
  </article>
</template>
