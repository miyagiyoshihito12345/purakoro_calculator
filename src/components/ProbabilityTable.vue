<script setup>
defineProps({ results: { type: Array, default: null } })

const formatPercent = (probability) => `${(probability * 100).toFixed(2)}%`
</script>

<template>
  <section class="scroll-mt-24">
    <h3 class="text-xl font-black sm:text-2xl">ワザ成功率</h3>
    <div
      v-if="results"
      class="-mx-3 mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm sm:mx-0"
    >
      <table class="w-full min-w-[608px] border-separate border-spacing-0 text-center">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50">
            <th
              class="sticky left-0 z-20 w-32 min-w-32 bg-slate-50 px-3 py-3 text-left text-sm font-black shadow-[5px_0_8px_-7px_rgba(15,23,42,0.8)] sm:static sm:w-36 sm:min-w-36 sm:px-4 sm:shadow-none"
            >
              ワザ
            </th>
            <th
              v-for="diceCount in 5"
              :key="diceCount"
              class="min-w-24 px-3 py-3 text-xs font-black sm:text-sm"
            >
              {{ diceCount }}個
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in results"
            :key="row.move.id"
            class="border-b border-slate-100 last:border-b-0"
          >
            <th
              class="sticky left-0 z-10 w-32 min-w-32 max-w-32 whitespace-normal break-words bg-white px-3 py-4 text-left text-sm font-black leading-tight shadow-[5px_0_8px_-7px_rgba(15,23,42,0.8)] sm:static sm:w-36 sm:min-w-36 sm:max-w-36 sm:px-4 sm:shadow-none"
            >
              {{ row.move.name }}
            </th>
            <td
              v-for="(probability, index) in row.probabilities"
              :key="index"
              class="min-w-24 px-3 py-4 text-sm font-black text-sky-950"
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
      class="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm font-bold text-slate-500"
    >
      ワザを4枚選び、エネコロを設定してから計算してください。
    </div>
  </section>
</template>
