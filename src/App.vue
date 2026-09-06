<script setup>
import { ref } from 'vue'
import BrandMark from './components/BrandMark.vue'
import CharacterAccordion from './components/CharacterAccordion.vue'
import LegalFooter from './components/LegalFooter.vue'
import { calculatorCharacters } from './data/gameData'
import { trackCalculatorInteraction } from './utils/analytics'

const openCharacterId = ref(null)

function toggleCharacter(id) {
  const willOpen = openCharacterId.value !== id
  openCharacterId.value = willOpen ? id : null

  if (willOpen) {
    trackCalculatorInteraction('character_opened', { character_id: id })
  }
}
</script>

<template>
  <div id="top" class="min-h-screen overflow-x-clip bg-[#f6f7f9] text-[#17233c]">
    <a
      class="fixed left-3 top-3 z-50 -translate-y-20 rounded-lg bg-white px-4 py-2 font-bold text-[#2563a6] shadow-lg transition-transform focus:translate-y-0"
      href="#main-content"
    >
      本文へ移動
    </a>

    <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div class="mx-auto flex h-12 max-w-6xl items-center px-3 sm:h-16 sm:px-6">
        <a class="flex items-center gap-2 font-black tracking-tight sm:gap-3" href="#top">
          <BrandMark />
          <span class="text-base sm:text-2xl">プラコロ電卓</span>
        </a>
      </div>
    </header>

    <main id="main-content" tabindex="-1">
      <section class="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p class="mb-2 text-sm font-black tracking-[0.18em] text-[#168467]">PLAKORO CALCULATOR</p>
          <h1 class="text-4xl font-black tracking-tight sm:text-6xl">プラコロ電卓</h1>
          <p class="mt-3 text-lg font-bold sm:text-2xl">非公式のワザ成功確率計算ツール</p>
          <p class="mt-2 text-xs font-bold text-slate-600 sm:text-sm">
            エネコロ、キャラコロ共に各面が出る確率は6分の1として計算しています。
          </p>
        </div>
      </section>

      <section id="calculator" class="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-10">
        <h2 class="sr-only">キャラクター別ワザ成功確率計算</h2>
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
