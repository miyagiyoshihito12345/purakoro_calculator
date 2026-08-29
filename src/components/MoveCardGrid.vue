<script setup>
import MoveTextCard from './MoveTextCard.vue'

defineProps({
  moves: { type: Array, required: true },
  selectedMoveId: { type: String, default: null },
  desktop: Boolean,
})
defineEmits({
  select: (moveId) => typeof moveId === 'string',
})
</script>

<template>
  <p class="mb-3 text-xs font-black text-slate-500">この枠に設定するワザを選択</p>
  <div class="grid gap-2" :class="['grid-cols-1', desktop ? 'sm:grid-cols-2 lg:grid-cols-3' : '']">
    <button
      v-for="move in moves"
      :key="move.id"
      class="relative overflow-hidden rounded-lg border-2 bg-white text-left transition"
      :class="
        selectedMoveId === move.id
          ? 'border-[#2563a6] ring-2 ring-blue-100'
          : 'border-slate-200 hover:border-blue-300'
      "
      type="button"
      @click="$emit('select', move.id)"
    >
      <span
        v-if="selectedMoveId === move.id"
        class="absolute bottom-1 right-1 z-10 grid size-5 place-items-center rounded-full bg-[#2563a6] text-xs font-black text-white"
        >✓</span
      >
      <MoveTextCard :move="move" />
    </button>
  </div>
</template>
