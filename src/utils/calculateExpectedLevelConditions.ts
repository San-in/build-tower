export const calculateExpectedLevelConditions = (
  start: number
): Array<number> => {
  const secondRaw = start * 0.9
  let second = Math.ceil(secondRaw)

  if (second >= start) {
    second = start - 1
  }

  const thirdRaw = start * 0.8
  let third = Math.ceil(thirdRaw)

  if (third >= second) {
    third = second - 1
  }

  return [start, second, third]
}
