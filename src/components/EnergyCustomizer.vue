<script setup>
import {
  aFaceEnergyOptions,
  bFaceEnergyOptions,
  doubleEnergyFaceOptions,
  singleEnergyFaceOptions,
} from '../data/gameData'
import EnergySelect from './EnergySelect.vue'

defineProps({ energyCoros: { type: Array, required: true } })
defineEmits({
  'update-face': (coroIndex, faceIndex, value) =>
    Number.isInteger(coroIndex) && Number.isInteger(faceIndex) && typeof value === 'string',
})

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
    <h3 class="text-sm font-black sm:text-2xl">エネコロをカスタマイズ</h3>
    <div
      class="mt-1 rounded-xl border border-slate-200 bg-slate-50 p-1 sm:mt-4 sm:rounded-2xl sm:p-4"
    >
      <div class="space-y-1 sm:space-y-2">
        <div
          class="grid grid-cols-6 gap-0.5 px-0.5 text-center text-[10px] font-black leading-tight text-slate-500 sm:gap-2 sm:px-1 sm:text-xs"
        >
          <span v-for="(label, index) in faceLabels" :key="index">{{ label }}</span>
        </div>
        <div
          v-for="(coro, coroIndex) in energyCoros"
          :key="coroIndex"
          class="rounded-lg border border-slate-200 bg-white p-0.5 sm:rounded-xl sm:p-2"
        >
          <div class="grid grid-cols-6 items-center gap-0.5 sm:gap-2">
            <div v-for="(face, faceIndex) in coro" :key="faceIndex" class="min-w-0">
              <EnergySelect
                :model-value="face"
                :options="optionsForFace(faceIndex)"
                :align-right="faceIndex >= 3"
                :label="`エネコロ${String.fromCharCode(65 + coroIndex)}の${faceIndex + 1}面目`"
                @update:model-value="$emit('update-face', coroIndex, faceIndex, $event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
