export const pickRandomIndex = (length: number, exclude?: number) => {
  if (length <= 1) {
    return 0
  }
  let idx = Math.floor(Math.random() * length)
  if (exclude !== null && idx === exclude) {
    idx = (idx + 1) % length
  }
  return idx
}
