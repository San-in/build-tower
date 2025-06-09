import { OPERATOR } from '@types'

export const calculateWheelResult = (
  value: number,
  operation: string
): number => {
  const operator = operation.charAt(0) as OPERATOR
  const operand = parseFloat(operation.slice(1))

  switch (operator) {
    case OPERATOR.Plus:
      return value + operand
    case OPERATOR.Minus:
      return value - operand < 1 ? 1 : value - operand
    case OPERATOR.Multiply:
      return value * operand
    case OPERATOR.Division:
      return value / operand < 1 ? 1 : value / operand
    default:
      console.warn(`Unsupported operator: ${operator}`)
      return value
  }
}
