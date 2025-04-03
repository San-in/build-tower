import { CloseIcon, InfoIcon } from '@assets/icons'
import { Button } from '@components/Button'
import { CustomModalProps } from '@components/CustomModal/CustomModal.types'
import { styles } from '@components/CustomModal/CutomModal.styles'
import { GlobalStyles, TextStyles } from '@theme'
import { BUTTON_TYPE } from '@types'
import { FC } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'

const CustomModal: FC<CustomModalProps> = ({
  title,
  text,
  buttons,
  modalVisible,
  handleClose,
  icon = <InfoIcon />,
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
        <View style={styles.contentContainer}>
          {icon}
          {title && (
            <Text style={[styles.title, TextStyles.title_m]}>{title}</Text>
          )}
          {text && <Text style={[styles.text, TextStyles.main_m]}>{text}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          {buttons.map(({ label, handler }, index) => (
            <Button
              key={`${label} - ${index}`}
              minWidth={'auto'}
              onPress={handler}
              style={styles.button}
              title={label}
              type={BUTTON_TYPE.Text}
            />
          ))}
        </View>
      </View>
    </View>
  </Modal>
)

export default CustomModal
