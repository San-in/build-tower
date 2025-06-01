import { BananasIcon } from '@assets/icons'
import { Button } from '@components/ui'
import BlockIcon from '@components/ui/BlockIcon/BlockIcon'
import { OutlinedText } from '@components/ui/OutlinedText'
import { COLORS } from '@theme'
import { BUTTON_TYPE } from '@types'
import { calculateExpectedLevelConditions } from '@utils'
import { FC, useMemo } from 'react'
import { View } from 'react-native'

import { styles } from './LevelConditionsModalContent.styles'
import { LevelConditionsModalContentProps } from './LevelConditionsModalContent.types'

const LevelConditionsModalContent: FC<LevelConditionsModalContentProps> = ({
  onConfirm,
  confirmButtonText = 'GO',
  prize,
  initialBlocksQuantity,
}) => {
  const prizes = useMemo(() => calculateExpectedLevelConditions(prize), [prize])
  const blocks = useMemo(
    () => calculateExpectedLevelConditions(initialBlocksQuantity),
    [initialBlocksQuantity]
  )

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.title}>
          <OutlinedText fontSize={16}>Your first tower:</OutlinedText>
          <OutlinedText
            color={COLORS.gradientGold_1}
            fontSize={30}
            strokeColor={COLORS.brown}
          >
            {`${initialBlocksQuantity}`}
          </OutlinedText>
          <BlockIcon size={25} />
        </View>
        <OutlinedText fontSize={10}>
          (build the second as close as you can)
        </OutlinedText>
        <OutlinedText fontSize={25} style={styles.rewardsTitle}>
          REWARDS:
        </OutlinedText>
        {prizes.map((prize, index) => (
          <View key={`${index} - ${prize}`} style={styles.rewardsLine}>
            <View style={styles.rewardsBlocksQuantity}>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={25}
                strokeColor={COLORS.brown}
              >
                {`${blocks[index]}`}
              </OutlinedText>
              <BlockIcon size={20} />
            </View>

            <OutlinedText fontSize={20} style={styles.rewardsPrizeContainer}>
              - prize
            </OutlinedText>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={20}
              strokeColor={COLORS.brown}
              style={styles.rewardsPrize}
            >
              {`${prize}`}
            </OutlinedText>
            <BananasIcon height={25} width={25} />
          </View>
        ))}
        <View style={styles.failureCaseDescription}>
          <OutlinedText fontSize={12}>More than</OutlinedText>
          <OutlinedText
            color={COLORS.gradientGold_1}
            fontSize={14}
            strokeColor={COLORS.brown}
          >
            {`${initialBlocksQuantity}`}
          </OutlinedText>
          <OutlinedText fontSize={12}>or less than</OutlinedText>
          <OutlinedText
            color={COLORS.gradientGold_1}
            fontSize={14}
            strokeColor={COLORS.brown}
          >
            {`${blocks.at(-1)}`}
          </OutlinedText>
          <OutlinedText fontSize={12} style={styles.failureCaseQuestionSign}>
            ?
          </OutlinedText>
        </View>
        <OutlinedText fontSize={12}>
          No reward — but you can try again!
        </OutlinedText>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          buttonContainerStyle={styles.buttonContent}
          onPress={onConfirm}
          style={styles.button}
          textSize={15}
          title={confirmButtonText}
          type={BUTTON_TYPE.Warning}
        />
      </View>
    </View>
  )
}

export default LevelConditionsModalContent
