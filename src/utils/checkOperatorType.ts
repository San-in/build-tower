import { Operator } from '@types'

export const OperatorType = {
  isSimple: (operator: Operator): boolean =>
    operator === '+' || operator === '-',
}
