<script setup>
import {
  aFaceEnergyOptions,
  bFaceEnergyOptions,
  doubleEnergyFaceOptions,
  singleEnergyFaceOptions,
} from '../data/gameData'
import EnergySelect from './EnergySelect.vue'

defineProps({ energyCoros: { type: Array, required: true } })
defineEmits(['update-face'])

const faceLabels = ['A面(凸)', '', '', '', '', 'B面(凹)']

function optionsForFace(faceIndex) {
  if (faceIndex === 0) return aFaceEnergyOptions
  if (faceIndex === 3 || faceIndex === 4) return doubleEnergyFaceOptions
  if (faceIndex === 5) return bFaceEnergyOptions
  return singleEnergyFaceOptions
}
</script>

<template>
  <section>
    <h3 class="text-xl font-black sm:text-2xl">エネコロをカスタマイズ</h3>
    <div class="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4">
      <div class="space-y-2">
        <div
          class="grid grid-cols-6 gap-1 px-1 text-center text-[9px] font-black text-slate-500 sm:gap-2 sm:text-xs"
        >
          <span v-for="(label, index) in faceLabels" :key="index">{{ label }}</span>
        </div>
        <div
          v-for="(coro, coroIndex) in energyCoros"
          :key="coroIndex"
          class="rounded-xl border border-slate-200 bg-white p-1.5 sm:p-2"
        >
          <div class="grid grid-cols-6 items-center gap-1 sm:gap-2">
            <div v-for="(face, faceIndex) in coro" :key="faceIndex" class="min-w-0">
              <span class="sr-only"
                >エネコロ{{ String.fromCharCode(65 + coroIndex) }}の{{ faceIndex + 1 }}面目</span
              >
              <EnergySelect
                :model-value="face"
                :options="optionsForFace(faceIndex)"
                :align-right="faceIndex >= 3"
                @update:model-value="$emit('update-face', coroIndex, faceIndex, $event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
