import { styles } from '@components/molecules/LevelCard/LevelCard.styles'
import { COLORS } from '@theme'
import { LEVEL_DIFFICULTY } from '@types'

export const containerGradientMap = {
  [LEVEL_DIFFICULTY.Easy]: [
    COLORS.gradientGreen_2,
    COLORS.gradientGreen_3,
    COLORS.gradientGreen_1,
    COLORS.gradientGreen_3,
    COLORS.gradientGreen_2,
  ],
  [LEVEL_DIFFICULTY.Medium]: [
    COLORS.gradientTerracotta_1,
    COLORS.gradientTerracotta_4,
    COLORS.gradientTerracotta_2,
    COLORS.gradientTerracotta_4,
    COLORS.gradientTerracotta_1,
  ],
  [LEVEL_DIFFICULTY.Hard]: [
    COLORS.gradientPurple_1,
    COLORS.gradientPurple_4,
    COLORS.gradientPurple_2,
    COLORS.gradientPurple_4,
    COLORS.gradientPurple_1,
  ],
}

export const containerShadowMap = {
  [LEVEL_DIFFICULTY.Easy]: styles.greenShadow,
  [LEVEL_DIFFICULTY.Medium]: styles.orangeShadow,
  [LEVEL_DIFFICULTY.Hard]: styles.purpleShadow,
}

export const containerBorderMap = {
  [LEVEL_DIFFICULTY.Easy]: styles.greenBorder,
  [LEVEL_DIFFICULTY.Medium]: styles.orangeBorder,
  [LEVEL_DIFFICULTY.Hard]: styles.purpleBorder,
}
