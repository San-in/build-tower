import { BananasIcon, StarIcon } from '@assets/icons'
import { BlockIcon, Button, OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import { BUTTON_TYPE } from '@types'
import {
  calculateConsolationPrize,
  calculateExpectedLevelConditions,
  formatTabletElementsSize,
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
          <OutlinedText fontSize={formatTabletElementsSize(16)}>
            Your first tower:
          </OutlinedText>
          <OutlinedText
            color={COLORS.gradientGold_1}
            fontSize={formatTabletElementsSize(30)}
            strokeColor={COLORS.brown}
          >
            {`${initialBlocksQuantity}`}
          </OutlinedText>
          <BlockIcon size={formatTabletElementsSize(25)} />
        </View>
        <OutlinedText fontSize={formatTabletElementsSize(10)}>
          (build the second as close as you can)
        </OutlinedText>
        <OutlinedText
          fontSize={
            stars ? formatTabletElementsSize(18) : formatTabletElementsSize(25)
          }
          style={styles.rewardsTitle}
        >
          {stars ? 'YOUR BEST RESULT' : 'REWARDS'}
        </OutlinedText>
        <View style={styles.starsContainer}>
          {Array.from({ length: stars }, (_, i) => i).map((item) => (
            <StarIcon
              height={formatTabletElementsSize(35)}
              key={item}
              width={formatTabletElementsSize(35)}
            />
          ))}
        </View>
        {Boolean(stars) && !isLevelCompletedWithThreeStars && (
          <OutlinedText
            fontSize={formatTabletElementsSize(20)}
            style={styles.rewardsTitle}
          >
            You can still get
          </OutlinedText>
        )}

        {Array.from({ length: 3 - stars }, (_, index) => index).map((item) => (
          <View key={`${item} - ${prizes}`} style={styles.rewardsLine}>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={formatTabletElementsSize(25)}
              strokeColor={COLORS.brown}
              style={styles.rewardsPrize}
            >
              {stars
                ? `${-((prizes.at(-1) ?? 0) - (prizes[item] ?? 0))}`
                : `${prizes[item]}`}
            </OutlinedText>
            <BananasIcon
              height={formatTabletElementsSize(30)}
              width={formatTabletElementsSize(30)}
            />

            <OutlinedText
              fontSize={formatTabletElementsSize(20)}
              style={styles.rewardsPrizeContainer}
            >
              for
            </OutlinedText>

            <View style={styles.rewardsBlocksQuantity}>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={formatTabletElementsSize(25)}
                strokeColor={COLORS.brown}
              >
                {`${blocks[item]}`}
              </OutlinedText>
              <BlockIcon size={formatTabletElementsSize(25)} />
            </View>
          </View>
        ))}

        {isLevelCompletedWithThreeStars ? (
          <View style={styles.completedLevelText}>
            <OutlinedText fontSize={formatTabletElementsSize(12)}>
              You’ve already completed this level, but you’ll still get a bonus
              for replaying:
            </OutlinedText>
            <View style={styles.consolationPrizeContainer}>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={formatTabletElementsSize(25)}
                strokeColor={COLORS.brown}
              >
                {`${calculateConsolationPrize(prize)}`}
              </OutlinedText>
              <BananasIcon
                height={formatTabletElementsSize(25)}
                width={formatTabletElementsSize(25)}
              />
            </View>
          </View>
        ) : (
          <View style={styles.failureCaseDescription}>
            <OutlinedText fontSize={formatTabletElementsSize(10)}>
              More than
            </OutlinedText>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={formatTabletElementsSize(12)}
              strokeColor={COLORS.brown}
            >
              {`${initialBlocksQuantity}`}
            </OutlinedText>
            <OutlinedText fontSize={formatTabletElementsSize(10)}>
              or less than
            </OutlinedText>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={formatTabletElementsSize(12)}
              strokeColor={COLORS.brown}
            >
              {`${blocks.reverse()[stars]}`}
            </OutlinedText>
            <OutlinedText
              fontSize={formatTabletElementsSize(10)}
              style={styles.failureCaseQuestionSign}
            >
              ?
            </OutlinedText>
            <OutlinedText
              fontSize={formatTabletElementsSize(10)}
              style={styles.failureCaseQuestionSign}
            >
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
          textSize={formatTabletElementsSize(12)}
          title={confirmButtonText}
          type={BUTTON_TYPE.Warning}
        />
      </View>
    </View>
  )
}

export default memo(LevelConditionsModalContent)
