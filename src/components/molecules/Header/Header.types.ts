import { LevelId } from '@types'

export type HeaderProps = {
  onResetPress: () => void
  onHomePress: () => void
  onRandomAddBlockPress: () => void
  onRandomRemoveBlockPress: () => void
  level: LevelId
}
