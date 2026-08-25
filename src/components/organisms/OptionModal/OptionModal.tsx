import { OutlinedText } from '@components/atoms'
import { OptionCard } from '@components/molecules'
import { OptionModalProps } from '@components/organisms/OptionModal/OptionModal.types'
import { COLORS, GlobalStyles } from '@theme'
import { SELECTED_OPTION } from '@types'
import { formatTabletElementsSize , Haptics } from '@utils'
import { FC, useCallback } from 'react'
import { Modal, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    handleClose()
    changeOption(SELECTED_OPTION.First)
  }, [changeOption, handleClose])

  const handleSecondOptionPressed = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    handleClose()
    changeOption(SELECTED_OPTION.Second)
  }, [changeOption, handleClose])

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      onRequestClose={handleClose}
      transparent={true}
      visible={modalVisible}
    >
      <GestureHandlerRootView style={styles.gestureHandlerRoot}>
        <View style={[GlobalStyles.centeredContainer, styles.background]}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <OutlinedText
                color={COLORS.brown}
                fontSize={formatTabletElementsSize(25)}
                strokeColor={COLORS.yellow}
              >
                Step
              </OutlinedText>
              <OutlinedText
                color={COLORS.brown}
                fontSize={formatTabletElementsSize(28)}
                strokeColor={COLORS.yellow}
              >
                {`${step}`}
              </OutlinedText>
            </View>
  
            <OutlinedText
              fontSize={formatTabletElementsSize(30)}
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
                fontSize={formatTabletElementsSize(15)}
                numberOfLines={1}
                strokeColor={COLORS.yellow}
              >
                Bananas love brave monkeys!
              </OutlinedText>
              <Text allowFontScaling={false} style={styles.actionTextIcon}>🙊</Text>
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  )
}

export default OptionModal
