import { MODAL_TYPE } from '@types'
import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type CustomModalProps = {
  modalVisible: boolean
  handleClose: () => void
  title?: string
  children: ReactNode
  type?: MODAL_TYPE
  containerStyles?: StyleProp<ViewStyle>
  withCrossIcon?: boolean
  isMonkeyVisible?: boolean
  closeOnBackdropPress?: boolean
  // Fullscreen node rendered above the card, inside the native modal (e.g. a
  // success overlay that must appear over the modal without closing it).
  renderOverlay?: ReactNode
}
