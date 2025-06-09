export const generateRandomNumber = ({
  min,
  max,
  exceptions = [],
}: {
  min: number
  max: number
  exceptions?: Array<number>
}): number => {
  const possibleNumbers: Array<number> = []

  for (let i = min; i <= max; i++) {
    if (!exceptions.includes(i)) {
      possibleNumbers.push(i)
    }
  }

  if (!possibleNumbers.length) {
    return min
  }

  const randomIndex = Math.floor(Math.random() * possibleNumbers.length)
  return possibleNumbers[randomIndex] || min
}
