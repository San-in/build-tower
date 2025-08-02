export enum SCREENS {
  GameScreen = 'Game Screen',
  WelcomeScreen = 'Welcome Screen',
}
export enum BUTTON_TYPE {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error',
  Info = 'Info',
}

export enum LEVEL_DIFFICULTY {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum MARKET_PRODUCT {
  AddExtraStep = 'AddExtraStep',
  AddRandomBlocks_Bronze = 'AddRandomBlocks_bronze',
  AddRandomBlocks_Silver = 'AddRandomBlocks_silver',
  AddRandomBlocks_Gold = 'AddRandomBlocks_gold',
  RemoveRandomBlocks_Bronze = 'RemoveRandomBlocks_bronze',
  RemoveRandomBlocks_Silver = 'RemoveRandomBlocks_silver',
  RemoveRandomBlocks_Gold = 'RemoveRandomBlocks_gold',
}

export enum INFO_UNLOCK_OPTION_MODAL_KEY {
  Empty = 'empty',
  DisabledAd = 'disabledAd',
  DisabledBananas = 'disabledBananas',
  EnabledAd = 'enabledAd',
  EnabledBananas = 'enabledBananas',
}

export enum GAME_MODAL_TYPE {
  Home = 'Home',
  Reset = 'Reset ',
  AddBlocks = 'AddBlocks',
  RemoveBlocks = 'RemoveBlocks',
  RemoveBlocksWarning = 'RemoveBlocksWarning',
  PowerUpWarning = 'PowerUpWarning',
  LevelConditions = 'LevelConditions',
  LevelResult = 'LevelResult',
  AddExtraStep = 'AddExtraStep',
}
export enum MODAL_TYPE {
  Orange = 'Orange',
  Green = 'Green ',
  Purple = 'Purple',
  Blue = 'Blue',
}
export enum POWER_UP_GRADE {
  Bronze = 'Bronze',
  Silver = 'Silver',
  Gold = 'Gold',
}

export enum POWER_UP_TYPE {
  AddRandomBlocks = 'AddRandomBlocks',
  RemoveRandomBlocks = 'RemoveRandomBlocks',
}

export enum OPERATOR {
  Minus = '-',
  Plus = '+',
  Division = '÷',
  Multiply = 'x',
}

export enum TOWER {
  FirstTower = 'First',
  SecondTower = 'Second',
}

export type FORTUNE_WHEEL_MODAL_TYPE = TOWER | POWER_UP_TYPE

export enum GAME_SCREEN_SUCCESS_ACTION {
  ResetSteps = 'ResetSteps',
}
export enum BONUS_OPTION_TYPE {
  Ad = 'ad',
  Bananas = 'bananas',
}

export enum BLOCK_TYPE {
  Basic = 'Basic',
}

export enum MONKEY_ANIMATION_TYPE {
  RunAndJump = 'run-and-jump',
  Landing = 'landing',
  Idle = 'idle',
  JumpToTop = 'jump-to-top',
  Celebration = 'celebration',
}
export enum SELECTED_OPTION {
  First = 'first',
  Second = 'second',
  None = 'none',
}
export enum LEVEL_RESULT {
  TooHigh = 'tooHigh',
  TooLow = 'tooLow',
  GoldResult = 'goldResult',
  SilverResult = 'silverResult',
  BronzeResult = 'bronzeResult',
}
export enum BLOCK_CREATOR_OPERATION {
  Add = 'add',
  Remove = 'remove',
}

export enum EDGE_GLOW_OVERLAY_TYPE {
  Sides = 'sides',
  All = 'all',
}
