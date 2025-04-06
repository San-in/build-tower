import { FC, SVGProps } from 'react'

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

export type Operator = '+' | '-' | '*' | '/'
