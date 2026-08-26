import { FADE_EDGES_TYPE } from '@types'
import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type FadeEdgesProps = {
  children: ReactNode
  edges?: FADE_EDGES_TYPE
  fadeSize?: number
  style?: StyleProp<ViewStyle>
}
