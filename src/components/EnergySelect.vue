<script setup>
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { energyFaceBackground } from '../utils/energy'
import EnergyFaceIcon from './EnergyFaceIcon.vue'

defineProps({
  options: { type: Array, required: true },
  alignRight: Boolean,
  label: { type: String, required: true },
})

const model = defineModel({ type: String, required: true })
const root = ref(null)
const open = ref(false)
const listId = useId()

function choose(option) {
  model.value = option
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
      class="energy-face-button flex h-11 w-full items-center justify-center rounded-md border border-slate-300 px-0 text-[9px] font-black outline-none transition focus:ring-2 focus:ring-[#2563a6] sm:h-16 sm:rounded-xl sm:px-1 sm:text-sm"
      type="button"
      :style="energyFaceBackground(model)"
      :aria-expanded="open"
      :aria-controls="listId"
      :aria-label="`${label}：${model}エネルギー`"
      aria-haspopup="listbox"
      @click="open = !open"
      @keydown.esc="open = false"
    >
      <span class="flex min-w-0 items-center justify-center" aria-hidden="true">
        <EnergyFaceIcon :face="model" />
      </span>
    </button>

    <Transition name="energy-menu">
      <div
        v-if="open"
        :id="listId"
        class="absolute top-[calc(100%+0.25rem)] z-30 max-h-64 w-28 overflow-y-auto rounded-xl border border-slate-300 bg-white p-1 shadow-xl sm:w-32 sm:p-1.5"
        :class="alignRight ? 'right-0' : 'left-0'"
        role="listbox"
      >
        <button
          v-for="option in options"
          :key="option"
          class="mb-1 flex min-h-8 w-full items-center justify-between rounded-lg border border-white/70 px-1.5 text-left text-xs font-black text-slate-800 last:mb-0 hover:border-[#2563a6] focus:border-[#2563a6] focus:outline-none sm:min-h-9 sm:px-2.5"
          type="button"
          role="option"
          :aria-selected="option === model"
          :style="energyFaceBackground(option)"
          @click="choose(option)"
        >
          <span class="flex min-w-0 items-center" aria-hidden="true">
            <EnergyFaceIcon :face="option" compact />
          </span>
          <span class="sr-only">{{ option }}エネルギー</span>
          <span v-if="option === model" aria-hidden="true">✓</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@media (max-width: 639px) {
  .energy-face-button {
    border-color: transparent !important;
    background-color: transparent !important;
    background-image: none !important;
  }
}

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
