export type UnlockOptionModalProps = {
  onClose: () => void
  onConfirm: () => void
  visible?: boolean
  text?: string
  spinCounter: number
  initialPrice: number
}
