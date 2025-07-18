import { LevelId } from '@types'

export type LevelCardProps = {
  onPress: () => void
  isSelectedLevel: boolean
  level: LevelId
}
