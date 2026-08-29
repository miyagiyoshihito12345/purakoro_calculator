<script setup>
import { computed, useId } from 'vue'
import { ENERGY_COLORS, energiesForFace } from '../utils/energy'
import EnergySymbol from './EnergySymbol.vue'

const props = defineProps({
  face: { type: String, required: true },
  compact: Boolean,
})

const energies = computed(() => energiesForFace(props.face))
const first = computed(() => energies.value[0])
const second = computed(() => energies.value[1] ?? energies.value[0])
const isDouble = computed(() => energies.value.length === 2)
const isMixed = computed(() => first.value !== second.value)
const id = useId().replaceAll(':', '')
const clipId = `energy-face-${id}`
</script>

<template>
  <svg
    class="inline-block max-h-full max-w-full shrink-0"
    :class="compact ? 'size-8 sm:size-9 lg:size-10' : 'size-8 sm:size-12 lg:size-14'"
    viewBox="0 0 60 60"
    role="img"
    :aria-label="`${face}エネルギー`"
  >
    <defs>
      <clipPath :id="clipId">
        <rect x="1" y="1" width="58" height="58" rx="11" />
      </clipPath>
    </defs>

    <g :clip-path="`url(#${clipId})`">
      <rect x="1" y="1" width="58" height="58" :fill="ENERGY_COLORS[first]" />
      <path v-if="isMixed" d="M59 1V59H1Z" :fill="ENERGY_COLORS[second]" />
    </g>
    <EnergySymbol
      :energy="first"
      :x="isDouble ? 6 : 14"
      :y="isDouble ? 6 : 14"
      :size="isDouble ? 27 : 32"
      class="text-white"
      :style="{ '--energy-symbol-cutout': ENERGY_COLORS[first] }"
    />
    <EnergySymbol
      v-if="isDouble"
      :energy="second"
      :x="27"
      :y="27"
      :size="27"
      class="text-white"
      :style="{ '--energy-symbol-cutout': ENERGY_COLORS[second] }"
    />
  </svg>
</template>
