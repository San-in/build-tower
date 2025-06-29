import BlockIcon from '@components/ui/BlockIcon/BlockIcon'
import { BLOCK_DIMENSION } from '@constants'
import * as Haptics from 'expo-haptics'
import { AnimatePresence, MotiView } from 'moti'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { Easing } from 'react-native-reanimated'

import { styles } from './BlockTowerCreator.styles'
import { BlockTowerCreatorProps } from './BlockTowerCreator.types'

const ANIMATION_DELAY = 80

const BlockTowerCreator: FC<BlockTowerCreatorProps> = memo(
  ({ quantity, onAnimatedEnd, isScaled = true }) => {
    const [blocks, setBlocks] = useState<Array<number>>([])
    const [isAnimatedEndRun, setIsAnimatedEndRun] = useState(false)

    useEffect(() => {
      setIsAnimatedEndRun(false)
      if (quantity > blocks.length) {
        const toAdd = quantity - blocks.length
        setBlocks((prev) => [
          ...prev,
          ...Array(toAdd)
            .fill(0)
            .map((_, i) => Date.now() + i),
        ])
      } else if (quantity < blocks.length) {
        const toRemove = blocks.length - quantity
        setBlocks((prev) => prev.slice(0, -toRemove))
      }
    }, [quantity, blocks.length])

    const { height } = useWindowDimensions()

    const initialBlockDimensions = useMemo(() => {
      const calculatedDimension = (height * 0.65) / quantity
      return Math.min(BLOCK_DIMENSION, calculatedDimension)
    }, [height, quantity])

    return (
      <View style={styles.container}>
        <View style={styles.blockRow}>
          <AnimatePresence>
            {blocks.map((id, index) => (
              <MotiView
                animate={{
                  opacity: 1,
                  translateY: 0,
                }}
                exit={{
                  opacity: 0,
                  translateY: 60,
                }}
                from={{
                  opacity: 0,
                  translateY: -80,
                  height: isScaled ? BLOCK_DIMENSION : initialBlockDimensions,
                  width: isScaled ? BLOCK_DIMENSION : initialBlockDimensions,
                }}
                key={id}
                onDidAnimate={() => {
                  if (
                    index + 1 === blocks.length &&
                    onAnimatedEnd &&
                    !isAnimatedEndRun
                  ) {
                    setIsAnimatedEndRun(true)
                    onAnimatedEnd()
                  }
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
                style={styles.block}
                transition={{
                  opacity: {
                    type: 'spring',
                    delay: index * ANIMATION_DELAY,
                  },
                  translateY: {
                    type: 'spring',
                    delay: index * ANIMATION_DELAY,
                    damping: 20,
                    stiffness: 180,
                    mass: 0.7,
                  },
                  scale: {
                    type: 'spring',
                    delay: index * ANIMATION_DELAY,
                  },
                  height: {
                    type: 'timing',
                    duration: 500,
                    easing: Easing.bezier(0.68, -0.55, 0.27, 1.55),
                  },
                  width: {
                    type: 'timing',
                    duration: 500,
                    easing: Easing.bezier(0.68, -0.55, 0.27, 1.55),
                  },
                }}
              >
                <BlockIcon size={'100%'} />
              </MotiView>
            ))}
          </AnimatePresence>
        </View>
      </View>
    )
  }
)

export default BlockTowerCreator
