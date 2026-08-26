import MaskedView from '@react-native-masked-view/masked-view'
import { COLORS } from '@theme'
import { FADE_EDGES_TYPE } from '@types'
import { formatTabletElementsSize } from '@utils'
import { LinearGradient } from 'expo-linear-gradient'
import React, { FC } from 'react'
import { View } from 'react-native'

import { useStyles } from './FadeEdges.styles'
import { FadeEdgesProps } from './FadeEdges.types'

const DEFAULT_FADE_SIZE = formatTabletElementsSize(30)

// Only the mask's ALPHA is read, so the opaque colour is arbitrary — it just
// has to be fully opaque. `transparent` hides the content, opaque shows it.
const FADE_IN = ['transparent', COLORS.codeGrey] as const
const FADE_OUT = [COLORS.codeGrey, 'transparent'] as const
const GRADIENT_START = { x: 0, y: 0 }
const GRADIENT_END = { x: 0, y: 1 }

/**
 * Fades the top and/or bottom edge of its child to transparent, so scrolling
 * content dissolves under a header instead of being cut off. `fadeSize` is the
 * thickness of the fade in points; it defaults to a tablet-aware 30.
 */
const FadeEdges: FC<FadeEdgesProps> = ({
  children,
  edges = FADE_EDGES_TYPE.Top,
  fadeSize = DEFAULT_FADE_SIZE,
  style,
}) => {
  const styles = useStyles(fadeSize)
  const hasTopFade = edges !== FADE_EDGES_TYPE.Bottom
  const hasBottomFade = edges !== FADE_EDGES_TYPE.Top

  return (
    <MaskedView
      maskElement={
        <View style={styles.mask}>
          {hasTopFade && (
            <LinearGradient
              colors={FADE_IN}
              end={GRADIENT_END}
              start={GRADIENT_START}
              style={styles.maskFade}
            />
          )}
          <View style={styles.maskSolid} />
          {hasBottomFade && (
            <LinearGradient
              colors={FADE_OUT}
              end={GRADIENT_END}
              start={GRADIENT_START}
              style={styles.maskFade}
            />
          )}
        </View>
      }
      style={[styles.container, style]}
    >
      {children}
    </MaskedView>
  )
}

export default FadeEdges
