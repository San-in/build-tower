import { Operator } from '@types'

export const generateRandomOperator = (
  operator: Operator | null = null
): Operator => {
  const operators: Array<Operator> = ['+', '-', '*', '/']

  if (operator === null) {
    return operators[Math.floor(Math.random() * operators.length)] as Operator
  }

  const remainingOperators = operators.filter((op) => op !== operator)

  return remainingOperators[
    Math.floor(Math.random() * remainingOperators.length)
  ] as Operator
}
