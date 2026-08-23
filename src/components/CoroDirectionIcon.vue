<script setup>
const props = defineProps({
  direction: { type: String, required: true },
  compact: Boolean,
})
const labels = {
  stand: ['立', '立ち'],
  upsideDown: ['逆', '逆立ち'],
  faceUp: ['仰', 'あおむけ'],
  faceDown: ['伏', 'うつぶせ'],
  left: ['左', '横向き（左）'],
  right: ['右', '横向き（右）'],
}
const [symbol, label] = labels[props.direction] ?? ['?', props.direction]
</script>

<template>
  <span
    class="inline-grid shrink-0 place-items-center rounded-lg border-2 border-indigo-300 bg-indigo-50 font-black text-indigo-800"
    :class="compact ? 'size-6 text-[10px]' : 'size-7 text-[11px]'"
    :aria-label="label"
    :title="label"
    >{{ symbol }}</span
  >
</template>
