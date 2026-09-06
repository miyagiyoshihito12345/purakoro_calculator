<script setup>
import { computed, ref } from 'vue'
import { MOVE_SLOT_COUNT } from '../domain/gameRules'
import { trackCalculatorInteraction } from '../utils/analytics'
import MoveCardGrid from './MoveCardGrid.vue'
import MoveTextCard from './MoveTextCard.vue'

const props = defineProps({
  characterId: { type: String, required: true },
  moves: { type: Array, required: true },
})

const moveSlots = defineModel({ type: Array, required: true })
const openSlotIndex = ref(null)

const movesById = computed(() => new Map(props.moves.map((move) => [move.id, move])))
const duplicateMoveIds = computed(() => {
  const counts = new Map()

  for (const id of moveSlots.value.filter(Boolean)) {
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }

  return new Set([...counts].filter(([, count]) => count > 1).map(([id]) => id))
})

const hasDuplicateMoves = computed(() => duplicateMoveIds.value.size > 0)

function moveForSlot(index) {
  return movesById.value.get(moveSlots.value[index])
}

function toggleSlot(index) {
  openSlotIndex.value = openSlotIndex.value === index ? null : index
}

function selectMove(slotIndex, moveId) {
  if (moveSlots.value[slotIndex] === moveId) {
    openSlotIndex.value = null
    return
  }

  const nextMoveSlots = [...moveSlots.value]
  nextMoveSlots[slotIndex] = moveId
  moveSlots.value = nextMoveSlots
  openSlotIndex.value = null

  trackCalculatorInteraction('move_changed', {
    character_id: props.characterId,
    slot_number: slotIndex + 1,
    move_id: moveId,
  })
}
</script>

<template>
  <section aria-labelledby="move-selector-heading">
    <h3 id="move-selector-heading" class="mb-2 text-sm font-black sm:mb-4 sm:text-2xl">
      ワザカードを{{ MOVE_SLOT_COUNT }}枚選択
    </h3>

    <div class="relative grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
      <template v-for="slotIndex in MOVE_SLOT_COUNT" :key="slotIndex">
        <button
          class="relative flex min-h-20 w-full min-w-0 items-center gap-0.5 rounded-xl border-2 bg-white p-1 text-left transition-colors hover:bg-slate-50 sm:gap-1.5 sm:p-1.5"
          :class="
            duplicateMoveIds.has(moveSlots[slotIndex - 1])
              ? 'border-red-400'
              : openSlotIndex === slotIndex - 1
                ? 'border-[#2563a6]'
                : 'border-slate-200'
          "
          type="button"
          :aria-expanded="openSlotIndex === slotIndex - 1"
          :aria-label="`${slotIndex}枚目のワザカードを変更（${moveForSlot(slotIndex - 1)?.name ?? '未選択'}）`"
          @click="toggleSlot(slotIndex - 1)"
        >
          <MoveTextCard
            v-if="moveForSlot(slotIndex - 1)"
            compact
            dense
            :move="moveForSlot(slotIndex - 1)"
          />
          <span class="ml-auto text-lg" aria-hidden="true">
            {{ openSlotIndex === slotIndex - 1 ? '⌃' : '⌄' }}
          </span>
        </button>

        <Transition name="accordion">
          <div
            v-if="openSlotIndex === slotIndex - 1"
            class="absolute left-0 right-0 z-30 max-h-64 overflow-y-auto overscroll-contain rounded-xl border-2 border-[#2563a6] bg-slate-50 p-3 shadow-xl sm:hidden"
            :class="slotIndex <= 2 ? 'top-[calc(50%+0.25rem)]' : 'top-[calc(100%+0.5rem)]'"
          >
            <MoveCardGrid
              :moves="moves"
              :selected-move-id="moveSlots[slotIndex - 1]"
              @select="selectMove(slotIndex - 1, $event)"
            />
          </div>
        </Transition>
      </template>
    </div>

    <p v-if="hasDuplicateMoves" class="mt-2 text-sm font-bold text-red-500" role="alert">
      同じワザカードが重複しています
    </p>

    <Transition name="accordion">
      <div
        v-if="openSlotIndex !== null"
        class="mt-3 hidden rounded-xl border-2 border-[#2563a6] bg-blue-50/40 p-3 sm:block"
      >
        <MoveCardGrid
          desktop
          :moves="moves"
          :selected-move-id="moveSlots[openSlotIndex]"
          @select="selectMove(openSlotIndex, $event)"
        />
      </div>
    </Transition>
  </section>
</template>
