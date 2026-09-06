export const ENERGY_TYPES = Object.freeze(['炎', '鋼', '雷', '草', '悪', '水', '闘', '空', '超'])
export const REQUIRED_ENERGY_TYPES = Object.freeze([...ENERGY_TYPES, '無'])

export const A_FACE_ENERGY_OPTIONS = Object.freeze(['炎', '鋼', '水', '草', '雷'])
export const B_FACE_ENERGY_OPTIONS = Object.freeze(['悪', '闘', '空', '超'])
export const DOUBLE_ENERGY_FACE_OPTIONS = Object.freeze([
  '炎/炎',
  '水/水',
  '草/草',
  '雷/雷',
  '闘/闘',
  '空/空',
  '悪/悪',
  '超/超',
  '鋼/鋼',
  '超/空',
  '悪/空',
  '炎/雷',
  '水/闘',
  '草/悪',
  '雷/鋼',
  '炎/鋼',
  '超/悪',
  '闘/鋼',
  '炎/空',
  '雷/空',
  '水/空',
  '草/闘',
])

export const CORO_DIRECTIONS = Object.freeze([
  'stand',
  'upsideDown',
  'faceUp',
  'faceDown',
  'left',
  'right',
])

export const ENERGY_CORO_COUNT = 3
export const ENERGY_FACES_PER_CORO = 6
export const MOVE_SLOT_COUNT = 4
export const MAX_ENERGY_CORO_COUNT = 5

export const PROBABILITY_MODES = Object.freeze({
  ENERGY_SUCCESS: 'energySuccess',
  BOTH_SUCCESS: 'bothSuccess',
  CORO_FAILURE: 'coroFailure',
})
