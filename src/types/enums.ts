export enum SCREENS {
  GameScreen = 'game_screen',
  WelcomeScreen = 'welcome_screen',
  LevelsScreen = 'levels_screen',
}
export enum BUTTON_TYPE {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

export enum LEVEL_DIFFICULTY {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export enum MARKET_PRODUCT {
  AddExtraStep = 'add_extra_step',
  AddRandomBlocks_Bronze = 'add_random_blocks_bronze',
  AddRandomBlocks_Silver = 'add_random_blocks_silver',
  AddRandomBlocks_Gold = 'add_random_blocks_gold',
  RemoveRandomBlocks_Bronze = 'remove_random_blocks_bronze',
  RemoveRandomBlocks_Silver = 'remove_random_blocks_silver',
  RemoveRandomBlocks_Gold = 'remove_random_blocks_gold',
}

export enum INFO_UNLOCK_OPTION_MODAL_KEY {
  Empty = 'empty',
  DisabledAd = 'disabled_ad',
  DisabledBananas = 'disabled_bananas',
  EnabledAd = 'enabled_ad',
  EnabledBananas = 'enabled_bananas',
}

export enum GAME_MODAL_TYPE {
  Home = 'home',
  Reset = 'reset ',
  AddBlocks = 'add_blocks',
  RemoveBlocks = 'remove_blocks',
  RemoveBlocksWarning = 'remove_blocks_warning',
  PowerUpWarning = 'power_up_warning',
  LevelConditions = 'level_conditions',
  LevelResult = 'level_result',
  AddExtraStep = 'add_extra_step',
}
export enum MODAL_TYPE {
  Orange = 'orange',
  Green = 'green ',
  Purple = 'purple',
  Blue = 'blue',
}
export enum POWER_UP_GRADE {
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
}

export enum POWER_UP_TYPE {
  AddRandomBlocks = 'add_random_blocks',
  RemoveRandomBlocks = 'remove_random_blocks',
}

export enum OPERATOR {
  Minus = '-',
  Plus = '+',
  Division = '÷',
  Multiply = 'x',
}

export enum TOWER {
  FirstTower = 'first',
  SecondTower = 'second',
}

export type FORTUNE_WHEEL_MODAL_TYPE = TOWER | POWER_UP_TYPE

export enum GAME_SCREEN_SUCCESS_ACTION {
  ResetSteps = 'reset-steps',
}
export enum BONUS_OPTION_TYPE {
  Ad = 'ad',
  Bananas = 'bananas',
}

export enum BLOCK_TYPE {
  Basic = 'basic',
}

export enum MONKEY_ANIMATION_TYPE {
  RunAndJump = 'run_and_jump',
  Landing = 'landing',
  Idle = 'idle',
  JumpToTop = 'jump_to_top',
  Celebration = 'celebration',
}
export enum SELECTED_OPTION {
  First = 'first',
  Second = 'second',
  None = 'none',
}
export enum LEVEL_RESULT {
  TooHigh = 'too_high',
  TooLow = 'too_low',
  GoldResult = 'gold_result',
  SilverResult = 'silver_result',
  BronzeResult = 'bronze_result',
}
export enum BLOCK_CREATOR_OPERATION {
  Add = 'add',
  Remove = 'remove',
}

export enum EDGE_GLOW_OVERLAY_TYPE {
  Sides = 'sides',
  All = 'all',
}

export enum MONKEY_NOTIFICATION_STATUS {
  TooLittleForWin = 'too_little_for_win',
  TooMuchForWin = 'too_much_for_win',
  CloseToWin = 'close_to_win',
  Neutral = 'neutral',
}

export enum Z_INDEX_PRIORITY {
  Hidden = "hidden",
  Minimal ="minimal",
  Medium = "medium",
  High ="high",
  ExtraHigh ="extra_high",
}
