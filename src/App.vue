<script setup>
import { ref } from 'vue'
import CharacterAccordion from './components/CharacterAccordion.vue'
import LegalFooter from './components/LegalFooter.vue'
import { calculatorCharacters } from './data/gameData'

const openCharacterId = ref(null)

function toggleCharacter(id) {
  openCharacterId.value = openCharacterId.value === id ? null : id
}
</script>

<template>
  <div class="min-h-screen overflow-x-clip bg-[#f6f7f9] text-[#17233c]">
    <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div class="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <a class="flex items-center gap-3 font-black tracking-tight" href="#top">
          <span
            class="grid size-10 place-items-center rounded-xl border-2 border-[#17233c] bg-white text-xl shadow-[2px_2px_0_#17233c]"
            >🎲</span
          >
          <span class="text-xl sm:text-2xl">プラコロ電卓</span>
        </a>
      </div>
    </header>

    <main id="top">
      <section class="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p class="mb-2 text-sm font-black tracking-[0.18em] text-[#168467]">PLAKORO CALCULATOR</p>
          <h1 class="text-4xl font-black tracking-tight sm:text-6xl">プラコロ電卓</h1>
          <p class="mt-3 text-lg font-bold sm:text-2xl">非公式の確率計算ツール</p>
        </div>
      </section>

      <section id="calculator" class="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-10">
        <div class="space-y-3">
          <CharacterAccordion
            v-for="character in calculatorCharacters"
            :key="character.id"
            :character="character"
            :expanded="openCharacterId === character.id"
            @toggle="toggleCharacter(character.id)"
          />
        </div>
      </section>
    </main>

    <LegalFooter />
  </div>
</template>
