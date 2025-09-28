import { OutlinedText } from '@components/atoms'
import { SuccessActionInfoModal } from '@components/organisms'
import { COLORS } from '@theme'
import { Image } from 'expo-image'
import { FC, memo } from 'react'

import { styles } from './SuccessActionModal.styles'
import { SuccessActionModalProps } from './SuccessActionModal.types'

const SuccessActionModal: FC<SuccessActionModalProps> = ({
  isVisible,
  onPress,
  title,
  image,
  imageStyle,
  children,
}) => (
  <SuccessActionInfoModal isVisible={isVisible} onPress={onPress}>
    <OutlinedText color={COLORS.gradientGold_1}>{title}</OutlinedText>

    <Image
      contentFit="contain"
      source={image}
      style={[styles.imageContainer, imageStyle]}
      transition={100}
    />

    {children}
  </SuccessActionInfoModal>
)

export default memo(SuccessActionModal)
