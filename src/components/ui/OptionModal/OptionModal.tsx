import { styles } from '@components/ui/OptionModal/OptionModal.styles'
import { OptionModalProps } from '@components/ui/OptionModal/OptionModal.types'
import { OutlinedText } from '@components/ui/OutlinedText'
import { COLORS, GlobalStyles } from '@theme'
import { SELECTED_OPTION } from '@types'
import { FC } from 'react'
import { Modal, Text, View } from 'react-native'

import OptionCard from '../OptionCard/OptionCard'

const OptionModal: FC<OptionModalProps> = ({
  modalVisible,
  handleClose,
  firstOption,
  secondOption,
  changeOption,
  step,
}) => (
  <Modal
    animationType="fade"
    onRequestClose={handleClose}
    transparent={true}
    visible={modalVisible}
  >
    <View style={[GlobalStyles.centeredContainer, styles.background]}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
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
          style={{ marginBottom: 30 }}
        >
          What’s your pick?
        </OutlinedText>
        <View style={styles.contentContainer}>
          {firstOption.operator && (
            <OptionCard
              onPress={() => {
                handleClose()
                changeOption(SELECTED_OPTION.First)
              }}
              operator={firstOption.operator}
              value={firstOption.number}
            />
          )}
          {secondOption.operator && (
            <OptionCard
              onPress={() => {
                handleClose()
                changeOption(SELECTED_OPTION.Second)
              }}
              operator={secondOption.operator}
              value={secondOption.number}
            />
          )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <OutlinedText
            color={COLORS.brown}
            fontSize={18}
            strokeColor={COLORS.yellow}
          >
            Bananas love brave monkeys!
          </OutlinedText>
          <Text style={{ fontSize: 30 }}>🙊</Text>
        </View>
      </View>
    </View>
  </Modal>
)

export default OptionModal
