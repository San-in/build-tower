import { OPERATOR } from '@types'

export const calculateWheelResult = ({
  value,
  operation,
  defaultOperation = false,
}: {
  value: number
  operation: string
  defaultOperation?: OPERATOR | false
}): number => {
  const operator = defaultOperation || (operation.charAt(0) as OPERATOR)
  const operand = parseFloat(defaultOperation ? operation : operation.slice(1))

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
