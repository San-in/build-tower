import { FC, memo } from 'react'
import { View } from 'react-native'
import { MotiText, MotiView } from 'moti'
import * as Haptics from 'expo-haptics'
import { BlockTowerCreatorProps } from './BlockTowerCreator.types'
import { Block } from './components'

const BlockTowerCreator: FC<BlockTowerCreatorProps> = memo(
  ({ quantity, type }) => {
    const indices = Array.from({ length: quantity }, (_, i) => i)

    return (
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <MotiText
          style={{ marginBottom: 20 }}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'spring',
            delay: (quantity + 3) * 150,
          }}
        >
          {quantity}
        </MotiText>

        {indices.map((i) => (
          <MotiView
            key={i}
            from={{ opacity: 0, translateY: -100 }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            transition={{
              type: 'spring',
              delay: (quantity - i - 1) * 150,
              stiffness: 300,
              damping: 30,
              mass: 0.5,
            }}
            onDidAnimate={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            }}
          >
            <Block type={type} />
          </MotiView>
        ))}
      </View>
    )
  }
)

export default BlockTowerCreator
