import { OutlinedText } from '@components/atoms'
import { SuccessActionInfoModal } from '@components/organisms'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
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
  titleSize = formatTabletElementsSize(25, 1.8),
}) => (
  <SuccessActionInfoModal isVisible={isVisible} onPress={onPress}>
    <OutlinedText color={COLORS.gradientGold_1} fontSize={titleSize}>
      {title}
    </OutlinedText>
    {image && (
      <Image
        contentFit="contain"
        source={image}
        style={[styles.imageContainer, imageStyle]}
        transition={100}
      />
    )}

    {children}
  </SuccessActionInfoModal>
)

export default memo(SuccessActionModal)
