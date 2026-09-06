<script setup>
import { computed, nextTick, ref } from 'vue'
import { ENERGY_CORO_COUNT, PROBABILITY_MODES } from '../domain/gameRules'
import { probabilityForMode } from '../utils/probability'

defineProps({
  results: { type: Array, default: null },
  maxDiceCount: { type: Number, default: ENERGY_CORO_COUNT },
})

const formatPercent = (probability) => (probability * 100).toFixed(2)

const mode = defineModel({ type: String, required: true })
const modeButtons = ref([])

const modes = [
  {
    id: PROBABILITY_MODES.ENERGY_SUCCESS,
    label: 'エネコロが成功する確率(%)',
    heading: 'エネコロが成功する確率(%)',
    color: '#38bdf8',
    headingColor: '#0284c7',
    rgb: '56, 189, 248',
  },
  {
    id: PROBABILITY_MODES.BOTH_SUCCESS,
    label: 'エネコロ成功かつキャラコロが成功する確率(%)',
    heading: 'エネコロ成功かつキャラコロが成功する確率(%)',
    color: '#fb7185',
    headingColor: '#e11d48',
    rgb: '251, 113, 133',
  },
  {
    id: PROBABILITY_MODES.CORO_FAILURE,
    label: 'エネコロ成功かつキャラコロは失敗する確率(%)',
    heading: 'エネコロ成功かつキャラコロは失敗する確率(%)',
    color: '#34d399',
    headingColor: '#059669',
    rgb: '52, 211, 153',
  },
]

const activeMode = computed(() => modes.find(({ id }) => id === mode.value) ?? modes[0])

function selectAdjacentMode(offset) {
  const currentIndex = modes.findIndex(({ id }) => id === mode.value)
  const nextIndex = (currentIndex + offset + modes.length) % modes.length
  mode.value = modes[nextIndex].id
  nextTick(() => modeButtons.value[nextIndex]?.focus())
}
</script>

<template>
  <section class="scroll-mt-24">
    <h3
      id="probability-heading"
      class="text-sm font-black transition-colors sm:text-2xl"
      :style="{ color: activeMode.headingColor }"
    >
      {{ activeMode.heading }}
    </h3>
    <div
      class="mt-2 grid h-4 grid-cols-3 gap-1 rounded-full bg-slate-100 p-0.5 sm:mt-3 sm:h-5"
      role="tablist"
      aria-labelledby="probability-heading"
      @keydown.left.prevent="selectAdjacentMode(-1)"
      @keydown.right.prevent="selectAdjacentMode(1)"
    >
      <button
        v-for="option in modes"
        ref="modeButtons"
        :key="option.id"
        class="h-full rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2"
        :class="
          option.id === mode
            ? 'opacity-100 ring-2 ring-slate-500/30'
            : 'opacity-45 hover:opacity-70'
        "
        type="button"
        role="tab"
        :aria-label="option.label"
        :title="option.label"
        :aria-selected="option.id === mode"
        :tabindex="option.id === mode ? 0 : -1"
        :style="{ backgroundColor: option.color, outlineColor: option.color }"
        @click="mode = option.id"
      />
    </div>
    <div
      v-if="results"
      class="mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-4"
    >
      <table
        class="w-full min-w-[320px] border-separate border-spacing-0 text-center sm:min-w-[608px]"
      >
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50">
            <th
              class="sticky left-0 z-20 w-[70px] min-w-[70px] bg-slate-50 px-1 py-1 text-left text-[10px] font-black shadow-[5px_0_8px_-7px_rgba(15,23,42,0.8)] sm:static sm:w-36 sm:min-w-36 sm:px-4 sm:py-3 sm:text-sm sm:shadow-none"
            >
              ワザ
            </th>
            <th
              v-for="diceCount in maxDiceCount"
              :key="diceCount"
              class="min-w-[50px] px-1 py-1 text-[8px] font-black sm:min-w-24 sm:px-3 sm:py-3 sm:text-sm"
            >
              {{ diceCount }}個
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in results"
            :key="`${row.move.id}-${rowIndex}`"
            class="border-b border-slate-100 last:border-b-0"
          >
            <th
              class="sticky left-0 z-10 w-[70px] min-w-[70px] max-w-[70px] bg-white px-1 py-1 text-left text-[10px] font-black leading-tight shadow-[5px_0_8px_-7px_rgba(15,23,42,0.8)] sm:static sm:w-36 sm:min-w-36 sm:max-w-36 sm:px-4 sm:py-4 sm:text-sm sm:shadow-none"
            >
              <span class="block truncate" :title="row.move.name">{{ row.move.name }}</span>
            </th>
            <td
              v-for="(probability, index) in row.probabilities.slice(0, maxDiceCount)"
              :key="index"
              class="min-w-[50px] px-1 py-1 text-[10px] font-black text-slate-950 transition-colors sm:min-w-24 sm:px-3 sm:py-4 sm:text-sm"
              :style="{
                backgroundColor: `rgba(${activeMode.rgb}, ${0.1 + probabilityForMode(probability, row.move, mode) * 0.5})`,
              }"
            >
              {{ formatPercent(probabilityForMode(probability, row.move, mode)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-else
      class="mt-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-5 text-center text-xs font-bold text-slate-500 sm:mt-4 sm:px-4 sm:py-8 sm:text-sm"
    >
      ワザカードを4枚選ぶと、確率が自動的に表示されます。
    </div>
  </section>
</template>
