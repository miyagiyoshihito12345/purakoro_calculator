<script setup>
import { computed } from 'vue'

const props = defineProps({
  energy: { type: String, required: true },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  size: { type: Number, default: 100 },
})

const transform = computed(() => `translate(${props.x} ${props.y}) scale(${props.size / 100})`)
</script>

<template>
  <g :transform="transform" fill="currentColor">
    <!-- 草：葉と枝分かれした葉脈 -->
    <g v-if="energy === '草'">
      <path d="M72 8C45 16 23 31 20 54c-2 17 8 29 22 28 17-1 30-14 36-31 5-15 2-31-6-43Z" />
      <path
        d="M38 91c3-22 13-40 31-55"
        fill="none"
        stroke="var(--energy-symbol-cutout)"
        stroke-linecap="round"
        stroke-width="9"
      />
      <path
        d="m47 60-13-10m20 1 17-2"
        fill="none"
        stroke="var(--energy-symbol-cutout)"
        stroke-linecap="round"
        stroke-width="8"
      />
    </g>

    <!-- 炎：中央が抜けた二重炎 -->
    <path
      v-else-if="energy === '炎'"
      d="M50 6c5 18-4 28-10 38-3-9-8-15-14-19 1 13-9 20-9 37 0 19 14 32 33 32s34-14 34-34c0-13-6-23-17-32 1 12-3 20-10 25 2-18-1-32-7-47Zm1 50c8 7 13 13 13 21 0 9-6 15-14 15s-15-6-15-15c0-8 5-14 12-22 0 7 2 11 4 14 4-4 4-9 0-13Z"
      fill-rule="evenodd"
    />

    <!-- 水：しずく -->
    <path
      v-else-if="energy === '水'"
      d="M65 8C44 18 24 38 24 61c0 19 12 32 29 32 18 0 31-14 31-33 0-15-8-28-19-37-4-3-5-8 0-15ZM40 79c8-2 15-8 22-20 1 13-6 23-17 25-4 1-7-1-5-5Z"
      fill-rule="evenodd"
    />

    <!-- 雷：稲妻 -->
    <path v-else-if="energy === '雷'" d="M52 6 21 55h24l-7 39 41-57H55L67 6Z" />

    <!-- 超：楕円の円環と内側の軌道 -->
    <g v-else-if="energy === '超'">
      <path
        d="M50 13c25 0 43 16 43 37S75 87 50 87 7 71 7 50s18-37 43-37Zm0 10c-18 0-31 11-31 27s13 27 31 27 31-11 31-27-13-27-31-27Z"
        fill-rule="evenodd"
      />
      <path d="M23 49c3 21 15 31 31 31 15 0 26-8 30-25-7 11-17 17-30 17-14 0-24-7-31-23Z" />
      <path d="M45 29c-5 17-3 29 7 36-5-15-4-27 1-36Z" />
    </g>

    <!-- 闘：角張った握り拳 -->
    <path
      v-else-if="energy === '闘'"
      d="M12 18h17v29H12Zm20-5h17v34H32Zm20 2h17v32H52Zm20 5h16v31H72ZM12 52h31v12h27V52h18v17c0 15-11 24-27 24H35L12 72Z"
    />

    <!-- 悪：上向きに開いた三日月 -->
    <path
      v-else-if="energy === '悪'"
      d="M14 18c5 3 9 14 18 22 10 9 26 9 36 0 9-8 13-19 18-22 5 13 8 26 5 39-5 22-22 35-41 35S14 79 9 57c-3-13 0-26 5-39Z"
    />

    <!-- 鋼：六角ナット -->
    <path
      v-else-if="energy === '鋼'"
      d="m27 14 46 1 23 36-23 36H27L4 51Zm19 24L33 62h34L54 38Z"
      fill-rule="evenodd"
    />

    <!-- 空：三段に分かれた羽 -->
    <path
      v-else-if="energy === '空'"
      d="M12 70c7-25 25-38 54-43 10-2 17-7 22-14 1 17-8 29-28 36 12 0 21-3 29-9-4 16-15 26-34 30 9 2 17 1 25-2-10 14-24 20-42 17-11-2-20-7-26-15Z"
    />

    <!-- 無：丸みのある八方向の星 -->
    <path
      v-else-if="energy === '無'"
      d="M50 8c6 0 7 20 12 24 5 3 22-8 26-3 4 6-12 18-12 24 0 7 18 13 16 20-3 6-21-4-27 0-5 4-4 23-11 23-7 1-10-19-16-22-6-3-20 11-26 6-6-5 10-20 9-26-1-6-19-12-16-19 3-6 23 2 28-2 5-4 9-24 16-24Z"
    />

    <circle v-else cx="50" cy="50" r="30" />
  </g>
</template>
