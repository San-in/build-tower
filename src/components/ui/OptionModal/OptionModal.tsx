import { CloseIcon } from '@assets/icons'
import { styles } from '@components/ui/OptionModal/OptionModal.styles'
import { OptionModalProps } from '@components/ui/OptionModal/OptionModal.types'
import { GlobalStyles } from '@theme'
import { FC } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'

const OptionModal: FC<OptionModalProps> = ({
  modalVisible,
  handleClose,
  firstOption,
  secondOption,
  changeOption,
}) => (
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
        <View style={[styles.contentContainer, { flexDirection: 'row' }]}>
          <Pressable
            onPress={() => {
              handleClose()
              changeOption(1)
            }}
          >
            <Text>
              {firstOption.operator} {firstOption.number}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleClose()
              changeOption(2)
            }}
          >
            <Text>
              {secondOption.operator} {secondOption.number}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
)

export default OptionModal
