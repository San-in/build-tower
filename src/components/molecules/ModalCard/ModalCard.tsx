import { AdIcon, BananasWithBGIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import { BONUS_OPTION_TYPE } from '@types'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import { FC, memo } from 'react'
import { Pressable } from 'react-native'

import { styles } from './ModalCard.styles'
import { ModalCardProps } from './ModalCard.types'

const ModalCard: FC<ModalCardProps> = ({
  onPress,
  option,
  isSelected,
  price,
  isDisabled = false,
}) => (
  <Pressable onPress={onPress} style={styles.container}>
    {isDisabled && (
      <MotiView
        animate={{
          scale: isSelected ? 1.2 : 1,
        }}
        style={styles.overlay}
        transition={{ type: 'timing', duration: 200 }}
      />
    )}
    <MotiView
      animate={{
        scale: isSelected ? 1.2 : 1,
        backgroundColor: isSelected ? COLORS.gradientGold_1 : COLORS.lightBlue,
        borderColor: isSelected ? COLORS.tango40 : COLORS.white70,
      }}
      style={styles.cardContainer}
      transition={{ type: 'timing', duration: 200 }}
    >
      <LinearGradient
        colors={[
          COLORS.green70,
          COLORS.green,
          COLORS.green,
          COLORS.green,
          COLORS.green70,
        ]}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={styles.cardContent}
      >
        {option === BONUS_OPTION_TYPE.Bananas ? (
          <>
            <BananasWithBGIcon height={60} width={60} />
            <OutlinedText fontSize={20}>{`${price}`}</OutlinedText>
          </>
        ) : (
          <AdIcon height={70} width={70} />
        )}
      </LinearGradient>
    </MotiView>
  </Pressable>
)
export default memo(ModalCard)
