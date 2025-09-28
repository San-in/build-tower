import { ImageSource } from 'expo-image'
import { SharedRef } from 'expo-modules-core/types'
import { ReactNode } from 'react'
import { ImageStyle, StyleProp } from 'react-native'

export type SuccessActionModalProps = {
  isVisible: boolean
  onPress: () => void
  title: string
  image:
    | string
    | number
    | Array<string>
    | ImageSource
    | Array<ImageSource>
    | SharedRef<'image', Record<never, never>>
    | null
    | undefined
  imageStyle?: StyleProp<ImageStyle>
  children?: ReactNode
}
