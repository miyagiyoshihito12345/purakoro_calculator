export const ENERGY_COLORS = Object.freeze({
  草: '#1fac48',
  炎: '#e72148',
  水: '#0178c6',
  雷: '#fbc200',
  超: '#ce3a90',
  闘: '#ec7200',
  悪: '#007c96',
  鋼: '#8a8fa7',
  空: '#4bbeeb',
  無: '#bcacad',
})

export const ENERGY_BACKGROUND_COLORS = Object.freeze({
  草: '#d1fae5',
  炎: '#fee2e2',
  水: '#e0f2fe',
  雷: '#fef3c7',
  超: '#fce7f3',
  闘: '#ffedd5',
  悪: '#e2e8f0',
  鋼: '#e4e4e7',
  空: '#cffafe',
  無: '#f5f5f4',
})

export function energiesForFace(face) {
  return face.split('/')
}

export function energyFaceBackground(face) {
  const [first, second] = energiesForFace(face)

  if (!second || first === second) {
    return { backgroundColor: ENERGY_BACKGROUND_COLORS[first] }
  }

  return {
    backgroundImage: `linear-gradient(135deg, ${ENERGY_BACKGROUND_COLORS[first]} 0 49.5%, ${ENERGY_BACKGROUND_COLORS[second]} 50.5% 100%)`,
  }
}
