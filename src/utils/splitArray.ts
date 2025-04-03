export const splitArray = <T>(arr: Array<T>): [Array<T>, Array<T>] => {
  const middleIndex = Math.ceil(arr.length / 2)
  const firstHalf = arr.slice(0, middleIndex)
  const secondHalf = arr.slice(middleIndex)
  return [firstHalf, secondHalf]
}
