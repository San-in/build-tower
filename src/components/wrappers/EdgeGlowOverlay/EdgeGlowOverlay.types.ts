import { EDGE_GLOW_OVERLAY_TYPE } from '@types'
import { ReactNode } from 'react'

export type EdgeGlowOverlayProps = {
  sides?: EDGE_GLOW_OVERLAY_TYPE
  color?: string
  onPress?: () => void
}

export type PulsingGlowProps = {
  children: ReactNode
  delay?: number
}
