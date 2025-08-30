import { MonkeyWizardImg } from '@assets/images'
import { OutlinedText } from '@components/atoms'
import { SuccessActionInfoModal } from '@components/organisms'
import { COLORS } from '@theme'
import { Image } from 'expo-image'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './ResetStepsModal.styles'
import { ResetStepsModalProps } from './ResetStepsModal.types'

const ResetStepsModal: FC<ResetStepsModalProps> = ({ isVisible, onPress }) => (
  <SuccessActionInfoModal isVisible={isVisible} onPress={onPress}>
    <OutlinedText color={COLORS.gradientGold_1}>Whoosh!</OutlinedText>

    <Image
      source={MonkeyWizardImg}
      style={styles.imageContainer}
      transition={100}
    />
    <View style={styles.textContainer}>
      <OutlinedText fontSize={22}>Back at</OutlinedText>
      <OutlinedText color={COLORS.gradientGold_1} fontSize={22}>
        Step 1
      </OutlinedText>
    </View>
    <OutlinedText fontSize={14}>(your result is saved)</OutlinedText>
  </SuccessActionInfoModal>
)

export default memo(ResetStepsModal)
