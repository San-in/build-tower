import { LevelId, SCREENS } from '@types'

type GameStackParamList = {
  [SCREENS.GameScreen]: { level: LevelId }
  [SCREENS.WelcomeScreen]: undefined
  [SCREENS.LevelsScreen]: undefined
}

export { GameStackParamList }
