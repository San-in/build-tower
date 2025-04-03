import { ReactNode } from 'react'
import { GestureResponderEvent } from 'react-native'

export enum MODAL_TYPE {
  success = 'success',
  error = 'error',
}

export type ModalState = {
  type: MODAL_TYPE
  isVisible: boolean
}

type buttonAction = {
  label: string
  handler: (event: GestureResponderEvent) => void
}

export type CustomModalProps = {
  title?: string
  text?: string
  buttons: Array<buttonAction>
  modalVisible: boolean
  handleClose: () => void
  icon?: ReactNode
}
