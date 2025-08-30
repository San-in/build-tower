import { BlockIcon } from '@components/atoms'
import { BLOCK_DIMENSION } from '@constants'
import { BLOCK_CREATOR_OPERATION } from '@types'
import { AnimatePresence, MotiView } from 'moti'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { Easing } from 'react-native-reanimated'

import { styles } from './BlockTowerCreator.styles'
import { BlockTowerCreatorProps } from './BlockTowerCreator.types'

const BlockTowerCreator: FC<BlockTowerCreatorProps> = memo(
  ({ quantity, onAnimatedEnd, isScaled = true }) => {
    const [blocks, setBlocks] = useState<Array<number>>([])
    const [operation, setOperation] = useState<BLOCK_CREATOR_OPERATION>(
      BLOCK_CREATOR_OPERATION.Add
    )
    const ANIMATION_DELAY = quantity > 50 ? 40 : 60

    useEffect(() => {
      if (!onAnimatedEnd) {
        return undefined
      }
      const totalDuration = quantity * (ANIMATION_DELAY * 0.7) + 800
      const timeout = setTimeout(() => {
        onAnimatedEnd()
      }, totalDuration)

      return () => clearTimeout(timeout)
    }, [quantity, blocks.length, onAnimatedEnd, ANIMATION_DELAY])

    useEffect(() => {
      if (quantity > blocks.length) {
        setOperation(BLOCK_CREATOR_OPERATION.Add)
        const toAdd = quantity - blocks.length
        setTimeout(
          () =>
            setBlocks((prev) => [
              ...prev,
              ...Array(toAdd)
                .fill(0)
                .map((_, i) => Date.now() + i),
            ]),
          500
        )
      } else if (quantity < blocks.length) {
        setOperation(BLOCK_CREATOR_OPERATION.Remove)
        const toRemove = blocks.length - quantity
        setTimeout(() => setBlocks((prev) => prev.slice(0, -toRemove)), 500)
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
          <AnimatePresence exitBeforeEnter={false}>
            {blocks.map((id, index) => {
              const delay =
                operation === BLOCK_CREATOR_OPERATION.Add
                  ? index * ANIMATION_DELAY
                  : (blocks.length - index) * ANIMATION_DELAY
              return (
                <MotiView
                  animate={{
                    opacity: 1,
                    translateY: 0,
                    height: BLOCK_DIMENSION,
                    width: BLOCK_DIMENSION,
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
                  style={styles.block}
                  transition={{
                    opacity: {
                      type: 'spring',
                      delay,
                    },
                    translateY: {
                      type: 'spring',
                      delay,
                      damping: 20,
                      stiffness: 180,
                      mass: 0.7,
                    },
                    scale: {
                      type: 'spring',
                      delay,
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
              )
            })}
          </AnimatePresence>
        </View>
      </View>
    )
  }
)

export default BlockTowerCreator
