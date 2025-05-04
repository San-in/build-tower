import { LevelId, SCREENS } from '@types'

type GameStackParamList = {
  [SCREENS.GameScreen]: { level: LevelId }
  [SCREENS.WelcomeScreen]: undefined
}

export { GameStackParamList }
