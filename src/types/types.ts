import { FC, SVGProps } from 'react'

import { LEVEL_DIFFICULTY, OPERATOR } from './enums'

export const isKeyOfEnum = <T extends Record<string, string>>(
  key: string,
  enumObj: T
): key is T[keyof T] => Object.values(enumObj).includes(key as T[keyof T])

export type Country = {
  id: string
  name: string
  code: string
  flag: FC<SVGProps<SVGSVGElement>>
}

export type OptionValue = {
  number: number
  operator: OPERATOR | null
}
type TowerConfig = {
  start: number
  fortuneWheelData: Array<string>
}

export type OperatorRange = {
  start: number
  end: number
}

export type LevelConfig = {
  fistTower: TowerConfig
  secondTower: TowerConfig
  simpleOperators: OperatorRange
  multiplicativeOperators: OperatorRange
  prize: number
  attempts: number
  difficulty: LEVEL_DIFFICULTY
}

export type ModalState<T> = {
  isVisible: boolean
  type: T
}

export type Star = 0 | 1 | 2 | 3

export type LevelId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
