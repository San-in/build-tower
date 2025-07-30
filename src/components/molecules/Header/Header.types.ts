import { LevelId } from '@types'

export type HeaderProps = {
  onResetPress: () => void
  onHomePress: () => void
  onRandomAddBlockPress: () => void
  onRandomRemoveBlockPress: () => void
  onAddExtraStepPress: () => void
  level: LevelId
}
