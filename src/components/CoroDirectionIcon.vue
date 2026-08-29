<script setup>
import { computed } from 'vue'

const props = defineProps({
  direction: { type: String, required: true },
  compact: Boolean,
})

const labels = {
  stand: '立ち',
  upsideDown: '逆立ち',
  faceUp: 'あおむけ',
  faceDown: 'うつぶせ',
  left: '横向き（左）',
  right: '横向き（右）',
}

const label = computed(() => labels[props.direction] ?? props.direction)

const responsiveSizeClass = computed(() => {
  if (props.compact) {
    return ['size-4', 'sm:size-5', 'md:size-5', 'lg:size-6']
  }

  return ['size-5', 'sm:size-5', 'md:size-6', 'lg:size-7']
})

const directionTransform = computed(() => {
  switch (props.direction) {
    case 'stand':
      // 立ちは少し大きく見えるので縮小
      return 'translate(1.35 1.35) scale(0.95)'

    case 'upsideDown':
      // 逆立ちも立ちと同じ補正
      return 'translate(1.35 1.35) scale(0.95)'

    case 'left':
    case 'right':
      // 左右は少し小さく見えるので拡大
      return 'translate(-1.62 -1.62) scale(1.06)'

    default:
      return ''
  }
})
</script>

<template>
  <span
    class="coro-direction-icon"
    :class="[responsiveSizeClass, `coro-direction-icon--${direction}`]"
    role="img"
    :aria-label="label"
    :title="label"
  >
    <svg viewBox="0 0 54 54" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <!-- 白背景 -->
      <rect class="coro-direction-icon__tile" x="3" y="3" width="48" height="48" />

      <!-- 全体の共通拡大 -->
      <g transform="translate(-2.7 -2.7) scale(1.1)">
        <!-- 方向ごとの見た目補正 -->
        <g :transform="directionTransform">
          <!-- 立ち -->
          <g v-if="direction === 'stand'">
            <path
              class="coro-direction-icon__figure"
              d="
                M11 39
                V26
                C11 17.2 18.2 10 27 10
                C35.8 10 43 17.2 43 26
                V39
                Z
              "
            />

            <circle class="coro-direction-icon__eye" cx="20.5" cy="22.5" r="3" />

            <circle class="coro-direction-icon__eye" cx="33.5" cy="22.5" r="3" />

            <path
              class="coro-direction-icon__white-mark"
              d="
                M17 28
                H37
                C36 34 32 37 27 37
                C22 37 18 34 17 28
                Z
              "
            />
          </g>

          <!-- 逆立ち -->
          <g v-else-if="direction === 'upsideDown'">
            <g transform="translate(0 49) scale(1 -1)">
              <path
                class="coro-direction-icon__figure"
                d="
                  M11 39
                  V26
                  C11 17.2 18.2 10 27 10
                  C35.8 10 43 17.2 43 26
                  V39
                  Z
                "
              />

              <circle class="coro-direction-icon__eye" cx="20.5" cy="22.5" r="3" />

              <circle class="coro-direction-icon__eye" cx="33.5" cy="22.5" r="3" />

              <path
                class="coro-direction-icon__white-mark"
                d="
                  M17 28
                  H37
                  C36 34 32 37 27 37
                  C22 37 18 34 17 28
                  Z
                "
              />
            </g>
          </g>

          <!-- あおむけ -->
          <g v-else-if="direction === 'faceUp'">
            <path
              class="coro-direction-icon__figure"
              d="
                M10 10
                H27

                C29 10 30 11 30.8 13
                L32.2 17

                C32.8 19
                 34.5 19.3
                 35.2 17.2

                L36.4 13.8

                C37.2 11.5
                 39.2 10.8
                 41 12

                C43 13.5
                 44 17
                 44 21

                C44 26
                 42 30.5
                 38.5 33

                C36 35
                 33 36
                 30 36

                H27

                L24 39

                H10
                Z
              "
            />

            <circle class="coro-direction-icon__eye" cx="39" cy="16" r="2.8" />
          </g>

          <!-- うつぶせ -->
          <g v-else-if="direction === 'faceDown'">
            <g transform="translate(0 49) scale(1 -1)">
              <path
                class="coro-direction-icon__figure"
                d="
                  M10 10
                  H27

                  C29 10 30 11 30.8 13
                  L32.2 17

                  C32.8 19
                   34.5 19.3
                   35.2 17.2

                  L36.4 13.8

                  C37.2 11.5
                   39.2 10.8
                   41 12

                  C43 13.5
                   44 17
                   44 21

                  C44 26
                   42 30.5
                   38.5 33

                  C36 35
                   33 36
                   30 36

                  H27

                  L24 39

                  H10
                  Z
                "
              />

              <circle class="coro-direction-icon__eye" cx="39" cy="16" r="2.8" />
            </g>
          </g>

          <!-- 横向き（左） -->
          <g v-else-if="direction === 'left'">
            <path
              class="coro-direction-icon__figure"
              d="
                M11 14
                H27
                V39
                H11
                Z
              "
            />

            <circle class="coro-direction-icon__figure" cx="29" cy="26.5" r="12.5" />

            <path
              class="coro-direction-icon__white-mark"
              d="
                M29 17
                V36

                C24 36
                 20 32
                 20 26.5

                C20 21
                 24 17
                 29 17

                Z
              "
            />

            <circle class="coro-direction-icon__eye" cx="35" cy="21" r="2.7" />

            <circle class="coro-direction-icon__eye" cx="35" cy="32" r="2.7" />
          </g>

          <!-- 横向き（右） -->
          <g v-else-if="direction === 'right'">
            <g transform="translate(54 0) scale(-1 1)">
              <path
                class="coro-direction-icon__figure"
                d="
                  M11 14
                  H27
                  V39
                  H11
                  Z
                "
              />

              <circle class="coro-direction-icon__figure" cx="29" cy="26.5" r="12.5" />

              <path
                class="coro-direction-icon__white-mark"
                d="
                  M29 17
                  V36

                  C24 36
                   20 32
                   20 26.5

                  C20 21
                   24 17
                   29 17

                  Z
                "
              />

              <circle class="coro-direction-icon__eye" cx="35" cy="21" r="2.7" />

              <circle class="coro-direction-icon__eye" cx="35" cy="32" r="2.7" />
            </g>
          </g>

          <!-- 不明 -->
          <text v-else x="27" y="34" fill="#050505" text-anchor="middle">?</text>
        </g>

        <!-- 下線は方向補正の影響を受けない -->
        <path class="coro-direction-icon__baseline" d="M8 44H46" />
      </g>
    </svg>
  </span>
</template>

<style scoped>
.coro-direction-icon {
  display: inline-grid;
  flex: none;
  place-items: center;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  color: #ffffff;
  background: #050505;
  box-shadow: none;
}

.coro-direction-icon svg {
  display: block;
  width: 100%;
  height: 100%;
}

.coro-direction-icon__tile {
  fill: #ffffff;
}

.coro-direction-icon__figure {
  fill: #050505;
}

.coro-direction-icon__eye {
  fill: #ffffff;
}

.coro-direction-icon__white-mark {
  fill: #ffffff;
}

.coro-direction-icon__baseline {
  fill: none;
  stroke: #050505;
  stroke-width: 2.4;
  stroke-linecap: square;
}

.coro-direction-icon:hover {
  background: #050505;
}
</style>
