import { CloseIcon } from '@assets/icons'

import { GlobalStyles } from '@theme'
import { FC } from 'react'
import { Modal, Pressable, View } from 'react-native'
import { OptionModalProps } from '@components/ui/OptionModal/OptionModal.types'
import { styles } from '@components/ui/OptionModal/OptionModal.styles'

const OptionModal: FC<OptionModalProps> = ({ modalVisible, handleClose }) => (
  <Modal
    animationType="slide"
    onRequestClose={handleClose}
    transparent={true}
    visible={modalVisible}
  >
    <View style={[GlobalStyles.centeredContainer, styles.background]}>
      <View style={styles.container}>
        <Pressable
          onPress={handleClose}
          style={({ pressed }: { pressed: boolean }) => [
            styles.closeIcon,
            pressed && styles.closeIconPressed,
          ]}
        >
          <CloseIcon />
        </Pressable>
        <View style={styles.contentContainer}></View>
      </View>
    </View>
  </Modal>
)

export default OptionModal
