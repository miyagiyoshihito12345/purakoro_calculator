<script setup>
import { computed, ref } from 'vue'
import { successProbabilities } from '../utils/probability'
import EnergyCustomizer from './EnergyCustomizer.vue'
import MoveCardGrid from './MoveCardGrid.vue'
import MoveTextCard from './MoveTextCard.vue'
import ProbabilityTable from './ProbabilityTable.vue'

const props = defineProps({
  character: { type: Object, required: true },
  expanded: Boolean,
})
const emit = defineEmits(['toggle'])

const moveSlots = ref(props.character.moves.slice(0, 4).map((move) => move.id))
const openMoveSlot = ref(null)
const energyCoros = ref(structuredClone(props.character.energyCoros))
const results = ref(null)

const selectedMoves = computed(() =>
  moveSlots.value.map((id) => props.character.moves.find((move) => move.id === id)).filter(Boolean),
)

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

function moveForSlot(index) {
  return props.character.moves.find((move) => move.id === moveSlots.value[index])
}

function toggleMoveSlot(index) {
  openMoveSlot.value = openMoveSlot.value === index ? null : index
}

function selectMove(slotIndex, id) {
  const usedSlotIndex = moveSlots.value.findIndex((moveId) => moveId === id)
  if (usedSlotIndex !== -1 && usedSlotIndex !== slotIndex) return
  moveSlots.value[slotIndex] = id
  openMoveSlot.value = null
  results.value = null
}

function updateFace(coroIndex, faceIndex, value) {
  energyCoros.value[coroIndex][faceIndex] = value
  results.value = null
}

function calculate() {
  if (selectedMoves.value.length !== 4) return
  results.value = selectedMoves.value.map((move) => ({
    move,
    probabilities: successProbabilities(energyCoros.value, move.required, 5),
  }))
  requestAnimationFrame(() =>
    document
      .querySelector(`#results-${props.character.id}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  )
}
</script>

<template>
  <article
    class="overflow-hidden rounded-2xl border bg-white transition-colors shadow-[0_8px_24px_rgba(23,35,60,0.06)]"
    :class="expanded ? 'border-[#2563a6]' : 'border-slate-300'"
  >
    <button
      class="flex min-h-20 w-full items-center justify-between gap-3 px-3 py-2 text-left transition-colors sm:px-5"
      :class="expanded ? 'border-b border-blue-200 bg-blue-50' : 'bg-slate-50 hover:bg-slate-100'"
      type="button"
      :aria-expanded="expanded"
      :aria-controls="`character-${character.id}`"
      @click="emit('toggle')"
    >
      <span class="flex min-w-0 items-center gap-3">
        <span class="min-w-0">
          <span class="block text-lg font-black sm:text-xl">{{ character.name }}</span>
          <span class="mt-1 flex flex-wrap gap-1.5">
            <span
              class="rounded-full border bg-white px-2.5 py-0.5 text-[10px] font-bold sm:text-xs"
              :class="typeBadgeClass"
              >{{ character.type }}タイプ</span
            >
            <span
              class="rounded-full border border-blue-300 bg-white px-2.5 py-0.5 text-[10px] font-bold text-[#2563a6] sm:text-xs"
              >HP {{ character.hp }}</span
            >
            <span
              class="rounded-full border bg-white px-2.5 py-0.5 text-[10px] font-bold sm:text-xs"
              :class="weaknessBadgeClass"
              >弱点 {{ character.weakness }}</span
            >
          </span>
        </span>
      </span>
      <span class="shrink-0 text-xl" aria-hidden="true">{{ expanded ? '⌃' : '⌄' }}</span>
    </button>

    <Transition name="accordion">
      <div v-if="expanded" :id="`character-${character.id}`" class="space-y-8 p-4 sm:p-6 lg:p-8">
        <section>
          <h3 class="mb-4 text-xl font-black sm:text-2xl">ワザカードを4枚選択</h3>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <template v-for="slotIndex in 4" :key="slotIndex">
              <button
                class="flex min-h-20 w-full items-center gap-1.5 rounded-xl border-2 bg-white p-1.5 text-left transition-colors hover:bg-slate-50"
                :class="openMoveSlot === slotIndex - 1 ? 'border-[#2563a6]' : 'border-slate-200'"
                type="button"
                :aria-expanded="openMoveSlot === slotIndex - 1"
                @click="toggleMoveSlot(slotIndex - 1)"
              >
                <MoveTextCard
                  v-if="moveForSlot(slotIndex - 1)"
                  compact
                  :move="moveForSlot(slotIndex - 1)"
                />
                <span class="ml-auto text-lg" aria-hidden="true">{{
                  openMoveSlot === slotIndex - 1 ? '⌃' : '⌄'
                }}</span>
              </button>

              <Transition name="accordion">
                <div
                  v-if="openMoveSlot === slotIndex - 1"
                  class="rounded-xl border-2 border-[#2563a6] bg-blue-50/40 p-3 sm:hidden"
                >
                  <MoveCardGrid
                    :moves="character.moves"
                    :move-slots="moveSlots"
                    :slot-index="slotIndex - 1"
                    @select="selectMove(slotIndex - 1, $event)"
                  />
                </div>
              </Transition>
            </template>
          </div>

          <Transition name="accordion">
            <div
              v-if="openMoveSlot !== null"
              class="mt-3 hidden rounded-xl border-2 border-[#2563a6] bg-blue-50/40 p-3 sm:block"
            >
              <MoveCardGrid
                desktop
                :moves="character.moves"
                :move-slots="moveSlots"
                :slot-index="openMoveSlot"
                @select="selectMove(openMoveSlot, $event)"
              />
            </div>
          </Transition>
        </section>

        <EnergyCustomizer :energy-coros="energyCoros" @update-face="updateFace" />

        <button
          class="mx-auto flex w-full max-w-xl items-center justify-center gap-3 rounded-xl border-2 border-[#d99a24] bg-[#f2b84b] px-6 py-4 text-lg font-black text-[#17233c] shadow-[0_5px_0_#c98716] transition hover:bg-[#f6c766] active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          :disabled="selectedMoves.length !== 4"
          @click="calculate"
        >
          <svg
            class="size-6 shrink-0"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <rect x="7" y="5" width="10" height="4" rx="0.5" />
            <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" />
          </svg>
          成功確率を計算する
        </button>

        <ProbabilityTable :id="`results-${character.id}`" :results="results" />
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  transform-origin: top;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-6px) scaleY(0.98);
}
@media (prefers-reduced-motion: reduce) {
  .accordion-enter-active,
  .accordion-leave-active {
    transition: none;
  }
}
</style>
