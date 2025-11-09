export enum ACTIVITY_MODAL_TYPES {
  SETTINGS = 'settings',
  MARKET = 'market',
}

export type ActivityModalProps = {
  isVisible: boolean
  type: ACTIVITY_MODAL_TYPES
  onClose: () => void
  onReopen: () => void
}
