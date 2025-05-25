import { AdIcon, BananasIcon } from '@assets/icons'
import { OutlinedText } from '@components/ui/OutlinedText'
import { COLORS } from '@theme'
import { BONUS_OPTION_TYPE } from '@types'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import { FC } from 'react'
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
            <BananasIcon height={50} transform="scale(-1,1)" width={50} />
            <OutlinedText fontSize={20}>{`${price}`}</OutlinedText>
          </>
        ) : (
          <AdIcon height={70} width={70} />
        )}
      </LinearGradient>
    </MotiView>
  </Pressable>
)
export default ModalCard
