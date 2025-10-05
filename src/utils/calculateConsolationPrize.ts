export const calculateConsolationPrize = (prize: number): number =>
  prize * 0.2 < 5 ? 5 : Math.round(prize * 0.2)
