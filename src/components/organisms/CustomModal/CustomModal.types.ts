import { MODAL_TYPE } from '@types'
import { SfxName } from '@utils'
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
  renderOverlay?: ReactNode
  openSound?: SfxName | null
}
