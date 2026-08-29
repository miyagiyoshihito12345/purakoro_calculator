<script setup>
import { computed } from 'vue'
import { ENERGY_COLORS } from '../utils/energy'
import EnergySymbol from './EnergySymbol.vue'

const props = defineProps({
  energy: { type: String, required: true },
  size: { type: String, default: 'md' },
})

const label = computed(() => `${props.energy}エネルギー`)
const sizeClass = computed(
  () =>
    ({
      xs: 'size-3 sm:size-5 lg:size-6',
      // mobile / tablet (640px+) / desktop (1024px+)
      sm: 'size-4 sm:size-5 lg:size-6',
      md: 'size-6 sm:size-7 lg:size-8',
      lg: 'size-8 sm:size-9 lg:size-10',
    })[props.size] ?? 'size-6 sm:size-7 lg:size-8',
)
</script>

<template>
  <svg
    :class="sizeClass"
    class="inline-block shrink-0"
    viewBox="0 0 100 100"
    role="img"
    :aria-label="label"
  >
    <rect x="5" y="5" width="90" height="90" rx="9" :fill="ENERGY_COLORS[energy]" />
    <EnergySymbol
      :energy="energy"
      :x="22"
      :y="22"
      :size="56"
      class="text-white"
      :style="{ '--energy-symbol-cutout': ENERGY_COLORS[energy] }"
    />
  </svg>
</template>
