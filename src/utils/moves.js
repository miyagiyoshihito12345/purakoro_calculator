export function nextTurnEnergyCoroIncrease(move) {
  const increases = (move.coroEffects ?? []).map(
    ({ mechanics }) => mechanics?.nextTurnEnergyCoroDelta ?? 0,
  )

  return Math.max(...increases, 0)
}
