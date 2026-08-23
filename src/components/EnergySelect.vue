<script setup>
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'

defineProps({
  modelValue: { type: String, required: true },
  options: { type: Array, required: true },
  alignRight: Boolean,
})

const emit = defineEmits(['update:modelValue'])
const root = ref(null)
const open = ref(false)
const listId = useId()

const colors = {
  草: '#d1fae5',
  炎: '#fee2e2',
  水: '#e0f2fe',
  雷: '#fef3c7',
  悪: '#e2e8f0',
  闘: '#ffedd5',
  鋼: '#e4e4e7',
  空: '#cffafe',
  超: '#fce7f3',
}

function background(face) {
  const [first, second] = face.split('/')
  if (!second || first === second) return { backgroundColor: colors[first] }
  return {
    backgroundImage: `linear-gradient(135deg, ${colors[first]} 0 49.5%, ${colors[second]} 50.5% 100%)`,
  }
}

function choose(option) {
  emit('update:modelValue', option)
  open.value = false
}

function closeFromOutside(event) {
  if (!root.value?.contains(event.target)) open.value = false
}

onMounted(() => document.addEventListener('pointerdown', closeFromOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeFromOutside))
</script>

<template>
  <div ref="root" class="relative">
    <button
      class="flex h-12 w-full items-center justify-center rounded-lg border border-slate-300 px-0 text-[9px] font-black outline-none transition focus:ring-2 focus:ring-[#2563a6] sm:h-16 sm:rounded-xl sm:px-1 sm:text-sm"
      type="button"
      :style="background(modelValue)"
      :aria-expanded="open"
      :aria-controls="listId"
      aria-haspopup="listbox"
      @click="open = !open"
      @keydown.esc="open = false"
    >
      {{ modelValue }}
    </button>

    <Transition name="energy-menu">
      <div
        v-if="open"
        :id="listId"
        class="absolute top-[calc(100%+0.25rem)] z-30 max-h-64 w-32 overflow-y-auto rounded-xl border border-slate-300 bg-white p-1.5 shadow-xl sm:w-36"
        :class="alignRight ? 'right-0' : 'left-0'"
        role="listbox"
      >
        <button
          v-for="option in options"
          :key="option"
          class="mb-1 flex min-h-9 w-full items-center justify-between rounded-lg border border-white/70 px-2.5 text-left text-xs font-black text-slate-800 last:mb-0 hover:border-[#2563a6] focus:border-[#2563a6] focus:outline-none"
          type="button"
          role="option"
          :aria-selected="option === modelValue"
          :style="background(option)"
          @click="choose(option)"
        >
          <span>{{ option }}</span>
          <span v-if="option === modelValue" aria-hidden="true">✓</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.energy-menu-enter-active,
.energy-menu-leave-active {
  transition:
    opacity 120ms ease,
    transform 120ms ease;
  transform-origin: top;
}
.energy-menu-enter-from,
.energy-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
