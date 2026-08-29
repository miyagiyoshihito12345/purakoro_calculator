<script setup>
import CoroDirectionIcon from './CoroDirectionIcon.vue'
import EnergyIcon from './EnergyIcon.vue'

defineProps({
  move: { type: Object, required: true },
  compact: Boolean,
  dense: Boolean,
})
</script>

<template>
  <span
    class="flex min-w-0 flex-1 flex-col justify-center"
    :class="compact ? 'gap-1' : 'gap-3 p-3'"
  >
    <span class="flex min-w-0 flex-nowrap items-center gap-1.5 whitespace-nowrap">
      <span
        class="min-w-0 truncate font-black text-[#17233c]"
        :class="compact ? 'text-[10px]' : 'text-sm'"
      >
        {{ move.name }}
      </span>
      <span
        class="ml-auto flex shrink-0 items-center"
        :class="dense ? 'gap-0.5 sm:gap-1.5' : 'gap-1.5'"
      >
        <span
          class="flex flex-nowrap"
          :class="dense ? 'gap-0.5 sm:gap-1' : 'gap-1'"
          :aria-label="`必要エネルギー ${move.required.join('・')}`"
        >
          <EnergyIcon
            v-for="(energy, index) in move.required"
            :key="`${energy}-${index}`"
            :energy="energy"
            :size="dense ? 'xs' : compact ? 'sm' : 'md'"
            aria-hidden="true"
          />
        </span>
        <span
          class="shrink-0 font-black text-rose-600"
          :class="compact ? 'text-[10px]' : 'text-xs'"
          :aria-label="move.damage === undefined ? 'ダメージなし' : `${move.damage}ダメージ`"
        >
          {{ move.damage ?? '—' }}
        </span>
      </span>
    </span>
    <span
      v-if="move.baseEffect"
      class="block font-bold text-slate-600"
      :class="compact ? 'text-[10px] leading-4' : 'text-[11px] leading-5'"
    >
      {{ move.baseEffect }}
    </span>
    <span
      v-if="move.coroEffects?.length"
      class="space-y-1.5 border-t border-slate-100 pt-2 font-bold text-slate-600"
      :class="compact ? 'text-[10px] leading-4' : 'text-[11px] leading-5'"
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
        <span
          class="min-w-0"
          :class="compact ? 'text-[7px] leading-[10px]' : 'text-[10px] leading-4'"
          >{{ coroEffect.effect }}</span
        >
      </span>
    </span>
  </span>
</template>
