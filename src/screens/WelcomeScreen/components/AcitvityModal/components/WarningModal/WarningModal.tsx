import { Button, OutlinedText } from '@components/atoms'
import { CustomModal } from '@components/organisms'
import { BUTTON_TYPE } from '@types'
import React, { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './WarningModal.styles'
import { WarningModalProps } from './WarningModal.types'

const WarningModal: FC<WarningModalProps> = ({
  isVisible,
  handleClose,
  handleConfirm,
}) => (
  <CustomModal
    handleClose={handleClose}
    isMonkeyVisible={false}
    modalVisible={isVisible}
    title={'Are you sure?'}
  >
    <OutlinedText fontSize={15}>
      All your progress will be lost — levels, rewards, bananas, and market
      purchases.
    </OutlinedText>
    <View style={styles.buttonContainer}>
      <Button
        onPress={handleClose}
        style={styles.button}
        textSize={15}
        title={'KEEP'}
      />
      <Button
        onPress={handleConfirm}
        style={styles.button}
        textSize={15}
        title={'RESET'}
        type={BUTTON_TYPE.Error}
      />
    </View>
  </CustomModal>
)

export default memo(WarningModal)
