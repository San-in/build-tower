import { FC, memo, useEffect, useState } from 'react'
import { View } from 'react-native'
import { MotiView, AnimatePresence, Image } from 'moti'
import * as Haptics from 'expo-haptics'
import { BlockTowerCreatorProps } from './BlockTowerCreator.types'
import { Easing } from 'react-native-reanimated'

const ANIMATION_DELAY = 80

const BlockTowerCreator: FC<BlockTowerCreatorProps> = memo(
  ({ quantity, onAnimatedEnd, type, isScaled = true }) => {
    const [blocks, setBlocks] = useState<number[]>([])

    useEffect(() => {
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

    return (
      <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'column-reverse',
            alignItems: 'center',
          }}
        >
          <AnimatePresence>
            {blocks.map((id, index) => (
              <MotiView
                key={id}
                from={{
                  opacity: 0,
                  translateY: -80,
                  height: isScaled ? 70 : 25,
                  width: isScaled ? 70 : 25,
                }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                }}
                exit={{
                  opacity: 0,
                  translateY: 60,
                }}
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
                style={{
                  borderLeftWidth: 0.5,
                  borderRightWidth: 0.5,
                  borderColor: '#959191',
                  backgroundColor: '#ccc',
                }}
                onDidAnimate={() => {
                  if (index + 1 === blocks.length && onAnimatedEnd) {
                    onAnimatedEnd()
                  }
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    borderWidth: isScaled ? 1 : 1,
                    borderColor: 'black',
                    shadowColor: '#000',
                    shadowOffset: { width: 10, height: 5 },
                    shadowOpacity: 0.55,
                    shadowRadius: 3.84,
                    elevation: 5,
                    backgroundColor: 'white',
                  }}
                >
                  <Image
                    source={require('../../../../assets/images/block.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              </MotiView>
            ))}
          </AnimatePresence>
        </View>
      </View>
    )
  }
)

export default BlockTowerCreator
