<script setup>
import CoroDirectionIcon from './CoroDirectionIcon.vue'

defineProps({
  move: { type: Object, required: true },
  compact: Boolean,
})

const energyClass = (energy) =>
  ({
    草: 'border-emerald-300 bg-emerald-100 text-emerald-800',
    炎: 'border-red-300 bg-red-100 text-red-800',
    水: 'border-sky-300 bg-sky-100 text-sky-800',
    雷: 'border-amber-300 bg-amber-100 text-amber-800',
    無: 'border-stone-300 bg-stone-100 text-stone-700',
    超: 'border-pink-300 bg-pink-100 text-pink-800',
    闘: 'border-orange-300 bg-orange-100 text-orange-800',
    悪: 'border-slate-400 bg-slate-200 text-slate-800',
    鋼: 'border-zinc-400 bg-zinc-200 text-zinc-800',
    空: 'border-cyan-300 bg-cyan-100 text-cyan-800',
  })[energy] ?? 'border-slate-300 bg-slate-100 text-slate-700'
</script>

<template>
  <span
    class="flex min-w-0 flex-1 flex-col justify-center"
    :class="compact ? 'gap-1' : 'gap-3 p-3'"
  >
    <span class="flex min-w-0 flex-nowrap items-center gap-1.5 whitespace-nowrap">
      <span
        class="min-w-0 truncate font-black text-[#17233c]"
        :class="compact ? 'text-xs' : 'text-base'"
      >
        {{ move.name }}
      </span>
      <span
        class="flex shrink-0 flex-nowrap gap-1"
        :aria-label="`必要エネルギー ${move.required.join('・')}`"
      >
        <span
          v-for="(energy, index) in move.required"
          :key="`${energy}-${index}`"
          class="grid place-items-center rounded-full border font-black"
          :class="[energyClass(energy), compact ? 'size-5 text-[9px]' : 'size-7 text-xs']"
          aria-hidden="true"
        >
          {{ energy }}
        </span>
      </span>
      <span
        class="shrink-0 font-black text-rose-600"
        :class="compact ? 'text-xs' : 'text-sm'"
        :aria-label="move.damage === undefined ? 'ダメージなし' : `${move.damage}ダメージ`"
      >
        {{ move.damage ?? '—' }}
      </span>
    </span>
    <span v-if="move.baseEffect" class="block text-xs font-bold leading-5 text-slate-600">
      {{ move.baseEffect }}
    </span>
    <span
      v-if="move.coroEffects?.length"
      class="space-y-1.5 border-t border-slate-100 pt-2 text-xs font-bold leading-5 text-slate-600"
    >
      <span
        v-for="(coroEffect, effectIndex) in move.coroEffects"
        :key="effectIndex"
        class="flex flex-wrap items-start gap-2"
      >
        <span class="flex shrink-0 flex-nowrap gap-1 whitespace-nowrap">
          <CoroDirectionIcon
            v-for="direction in coroEffect.directions"
            :key="direction"
            :direction="direction"
            :compact="compact"
          />
        </span>
        <span class="min-w-0">{{ coroEffect.effect }}</span>
      </span>
    </span>
  </span>
</template>
