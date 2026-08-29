<script setup>
defineProps({
  results: { type: Array, default: null },
  maxDiceCount: { type: Number, default: 3 },
})

const formatPercent = (probability) => (probability * 100).toFixed(2)
</script>

<template>
  <section class="scroll-mt-24">
    <h3 class="text-sm font-black sm:text-2xl">エネコロが成功する確率(%)</h3>
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
              class="min-w-[50px] px-1 py-1 text-[10px] font-black text-sky-950 sm:min-w-24 sm:px-3 sm:py-4 sm:text-sm"
              :style="{
                backgroundColor: `rgba(56, 189, 248, ${0.12 + probability * 0.42})`,
              }"
            >
              {{ formatPercent(probability) }}
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
