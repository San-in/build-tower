import { OPERATOR } from '@types'

export const OperatorType = {
  isSimple: (operator: OPERATOR): boolean =>
    operator === OPERATOR.Plus || operator === OPERATOR.Minus,
}
