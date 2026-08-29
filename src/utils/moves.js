export function nextTurnEnergyCoroIncrease(move) {
  const increases = (move.coroEffects ?? []).flatMap(({ effect }) =>
    [...effect.matchAll(/次の自分ターン：自分のエネコロ \+(\d+)/g)].map((match) =>
      Number(match[1]),
    ),
  )

  return Math.max(...increases, 0)
}
