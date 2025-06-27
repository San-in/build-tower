export type BasicModalContentProps = {
  text: string
  onCancel?: () => void
  onConfirm: () => void
  confirmButtonText?: string
  cancelButtonText?: string
}
