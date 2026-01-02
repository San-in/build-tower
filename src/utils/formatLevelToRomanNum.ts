export const formatLevelToRomanNum = (num: number): string => {
  if (!Number.isInteger(num) || num <= 0) {
    return ''
  }

  const romanMap: Array<[number, string]> = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]

  let result = ''
  let value = num

  for (const [arabic, roman] of romanMap) {
    while (value >= arabic) {
      result += roman
      value -= arabic
    }
  }

  return result
}
