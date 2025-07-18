export type UnlockOptionModalProps = {
  onClose: () => void
  onConfirm: () => void
  visible?: boolean
  text?: string
  attempt: number
  initialPrice: number
}
