import { OutlinedText } from '@components/atoms'
import { OptionCard } from '@components/molecules'
import { OptionModalProps } from '@components/organisms/OptionModal/OptionModal.types'
import { COLORS, GlobalStyles } from '@theme'
import { SELECTED_OPTION } from '@types'
import { FC, useCallback } from 'react'
import { Modal, Text, View } from 'react-native'

import { styles } from './OptionModal.styles'

const OptionModal: FC<OptionModalProps> = ({
  modalVisible,
  handleClose,
  firstOption,
  secondOption,
  changeOption,
  step,
}) => {
  const handleFirstOptionPressed = useCallback(() => {
    handleClose()
    changeOption(SELECTED_OPTION.First)
  }, [changeOption, handleClose])

  const handleSecondOptionPressed = useCallback(() => {
    handleClose()
    changeOption(SELECTED_OPTION.Second)
  }, [changeOption, handleClose])

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      transparent={true}
      visible={modalVisible}
    >
      <View style={[GlobalStyles.centeredContainer, styles.background]}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <OutlinedText
              color={COLORS.brown}
              fontSize={25}
              strokeColor={COLORS.yellow}
            >
              Step
            </OutlinedText>
            <OutlinedText
              color={COLORS.brown}
              fontSize={30}
              strokeColor={COLORS.yellow}
            >
              {`${step}`}
            </OutlinedText>
          </View>

          <OutlinedText
            fontSize={40}
            strokeColor={COLORS.brown}
            style={styles.subTitle}
          >
            What’s your pick?
          </OutlinedText>
          <View style={styles.contentContainer}>
            {firstOption.operator && (
              <OptionCard
                onPress={handleFirstOptionPressed}
                operator={firstOption.operator}
                value={firstOption.number}
              />
            )}
            {secondOption.operator && (
              <OptionCard
                onPress={handleSecondOptionPressed}
                operator={secondOption.operator}
                value={secondOption.number}
              />
            )}
          </View>
          <View style={styles.actionTextContainer}>
            <OutlinedText
              color={COLORS.brown}
              fontSize={18}
              strokeColor={COLORS.yellow}
            >
              Bananas love brave monkeys!
            </OutlinedText>
            <Text style={styles.actionTextIcon}>🙊</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default OptionModal
