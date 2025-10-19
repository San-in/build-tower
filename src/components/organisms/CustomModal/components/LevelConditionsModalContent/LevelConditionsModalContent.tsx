import { BananasIcon, StarIcon } from '@assets/icons'
import { BlockIcon, Button, OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import { BUTTON_TYPE } from '@types'
import {
  calculateConsolationPrize,
  calculateExpectedLevelConditions,
} from '@utils'
import { FC, memo, useMemo } from 'react'
import { View } from 'react-native'

import { styles } from './LevelConditionsModalContent.styles'
import { LevelConditionsModalContentProps } from './LevelConditionsModalContent.types'

const LevelConditionsModalContent: FC<LevelConditionsModalContentProps> = ({
  onConfirm,
  confirmButtonText = 'GO',
  prize,
  initialBlocksQuantity,
  stars,
}) => {
  const prizes = useMemo(() => calculateExpectedLevelConditions(prize), [prize])
  const blocks = useMemo(
    () => calculateExpectedLevelConditions(initialBlocksQuantity),
    [initialBlocksQuantity]
  )
  const isLevelCompletedWithThreeStars = stars === 3

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
        <OutlinedText fontSize={stars ? 18 : 25} style={styles.rewardsTitle}>
          {stars ? 'YOUR BEST RESULT' : 'REWARDS'}
        </OutlinedText>
        <View style={styles.starsContainer}>
          {Array.from({ length: stars }, (_, i) => i).map((item) => (
            <StarIcon height={35} key={item} width={35} />
          ))}
        </View>
        {!!stars && !isLevelCompletedWithThreeStars && (
          <OutlinedText fontSize={20} style={styles.rewardsTitle}>
            You can still get
          </OutlinedText>
        )}

        {Array.from({ length: 3 - stars }, (_, index) => index).map((item) => (
          <View key={`${item} - ${prizes}`} style={styles.rewardsLine}>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={25}
              strokeColor={COLORS.brown}
              style={styles.rewardsPrize}
            >
              {stars
                ? `${-((prizes.at(-1) ?? 0) - (prizes[item] ?? 0))}`
                : `${prizes[item]}`}
            </OutlinedText>
            <BananasIcon height={25} width={25} />

            <OutlinedText fontSize={20} style={styles.rewardsPrizeContainer}>
              for
            </OutlinedText>

            <View style={styles.rewardsBlocksQuantity}>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={25}
                strokeColor={COLORS.brown}
              >
                {`${blocks[item]}`}
              </OutlinedText>
              <BlockIcon size={20} />
            </View>
          </View>
        ))}

        {isLevelCompletedWithThreeStars ? (
          <View style={styles.completedLevelText}>
            <OutlinedText fontSize={12}>
              You’ve already completed this level, but you’ll still get a bonus
              for replaying:
            </OutlinedText>
            <View style={styles.consolationPrizeContainer}>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={25}
                strokeColor={COLORS.brown}
              >
                {`${calculateConsolationPrize(prize)}`}
              </OutlinedText>
              <BananasIcon height={25} width={25} />
            </View>
          </View>
        ) : (
          <View style={styles.failureCaseDescription}>
            <OutlinedText fontSize={10}>More than</OutlinedText>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={12}
              strokeColor={COLORS.brown}
            >
              {`${initialBlocksQuantity}`}
            </OutlinedText>
            <OutlinedText fontSize={10}>or less than</OutlinedText>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={12}
              strokeColor={COLORS.brown}
            >
              {`${blocks.reverse()[stars]}`}
            </OutlinedText>
            <OutlinedText fontSize={10} style={styles.failureCaseQuestionSign}>
              ?
            </OutlinedText>
            <OutlinedText fontSize={10} style={styles.failureCaseQuestionSign}>
              No reward — but you can try again!
            </OutlinedText>
          </View>
        )}
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

export default memo(LevelConditionsModalContent)
