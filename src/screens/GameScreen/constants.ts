import {
  FortuneWheelModalState,
  GAME_MODAL_TYPE,
  GAME_SCREEN_SUCCESS_ACTION,
  ModalState,
  MONKEY_ANIMATION_TYPE,
  PowerUpActiveActionModalState,
  TOWER,
} from '@types'

export const INITIAL_OPTION_STATE = { number: 0, operator: null }
export const INITIAL_RESET_STEPS_MODAL_STATE = { isVisible: false, attempt: 3 }
export const INITIAL_MODAL_STATE: ModalState<GAME_MODAL_TYPE> = {
  isVisible: false,
  type: GAME_MODAL_TYPE.Home,
}
export const INITIAL_BUILD_MODAL_STATE: ModalState<TOWER> = {
  isVisible: true,
  type: TOWER.FirstTower,
}
export const INITIAL_FORTUNE_WHEEL_MODAL_STATE: FortuneWheelModalState = {
  isVisible: false,
  type: TOWER.FirstTower,
  sectors: [],
  start: 0,
}
export const INITIAL_MONKEY_ANIMATION_MODAL_STATE: ModalState<MONKEY_ANIMATION_TYPE> =
  {
    isVisible: false,
    type: MONKEY_ANIMATION_TYPE.RunAndJump,
  }
export const INITIAL_SUCCESS_ACTION_MODAL_STATE: ModalState<GAME_SCREEN_SUCCESS_ACTION> =
  {
    isVisible: false,
    type: GAME_SCREEN_SUCCESS_ACTION.ResetSteps,
  }

export const INITIAL_POWER_UP_ACTIVE_ACTION_MODAL_STATE: PowerUpActiveActionModalState =
  { type: null, number: 0 }
