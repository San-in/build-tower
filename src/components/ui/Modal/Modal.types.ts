import { MODAL_TYPE } from '@types'
import { ReactNode } from 'react'

export type ModalProps = {
  modalVisible: boolean
  handleClose: () => void
  title?: string
  children: ReactNode
  type?: MODAL_TYPE
}
