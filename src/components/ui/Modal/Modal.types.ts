import { MODAL_TYPE } from '@types'
import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type ModalProps = {
  modalVisible: boolean
  handleClose: () => void
  title?: string
  children: ReactNode
  type?: MODAL_TYPE
  containerStyles?: StyleProp<ViewStyle>
  withCrossIcon?: boolean
}
