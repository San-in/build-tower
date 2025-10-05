import {
  BananasIcon,
  BuyIcon,
  CardsIcon,
  HomeIcon,
  ReceiveIcon,
  RestartIcon,
} from '@assets/icons'
import { IconButton, OutlinedText } from '@components/atoms'
import {
  BlockWithValue,
  StarsRow,
} from '@components/organisms/CustomModal/components/components'
import {
  headerContentMap,
  levelResultKeyMap,
  secondaryMessageMap,
} from '@components/organisms/CustomModal/components/LevelResultModalContent/constants'
import { COLORS } from '@theme'
import { LEVEL_RESULT, Star } from '@types'
import {
  calculateConsolationPrize,
  calculateExpectedLevelConditions,
  getLevelResult,
} from '@utils'
import { FC, memo, useMemo } from 'react'
import { Text, View } from 'react-native'

import { styles } from './LevelResultModalContent.styles'
import { LevelResultModalContentProps } from './LevelResultModalContent.types'

const LevelResultModalContent: FC<LevelResultModalContentProps> = ({
  onGetDoublePrize,
  onGetPrize,
  onResetSteps,
  onRestartLevel,
  initialBlockValue,
  userBlockValue,
  onGoHome,
  prize,
  stars,
  isResetStepsDisabled,
}) => {
  const [goldResult = 0, silverResult = 0, bronzeResult = 0] = useMemo(
    () => calculateExpectedLevelConditions(initialBlockValue),
    [initialBlockValue]
  )
  const [goldPrize = 0, silverPrize = 0, bronzePrize = 0] = useMemo(
    () => calculateExpectedLevelConditions(prize),
    [prize]
  )
  const levelResult = useMemo(
    () =>
      getLevelResult({
        userBlockValue,
        goldResult,
        silverResult,
        bronzeResult,
      }),
    [bronzeResult, goldResult, silverResult, userBlockValue]
  )

  const isLevelPassed = useMemo(
    () =>
      levelResult === LEVEL_RESULT.GoldResult ||
      levelResult === LEVEL_RESULT.SilverResult ||
      levelResult === LEVEL_RESULT.BronzeResult,
    [levelResult]
  )
  const isTooHigh = levelResult === LEVEL_RESULT.TooHigh
  const isGoldResult = levelResult === LEVEL_RESULT.GoldResult

  const prizeRules: Record<
    number,
    Record<'goldResult' | 'silverResult' | 'bronzeResult' | 'default', number>
  > = useMemo(
    () => ({
      0: {
        goldResult: goldPrize,
        silverResult: silverPrize,
        bronzeResult: bronzePrize,
        default: 0,
      },
      1: {
        goldResult: goldPrize - bronzePrize,
        silverResult: silverPrize - bronzePrize,
        bronzeResult: 0,
        default: 0,
      },
      2: {
        goldResult: goldPrize - silverPrize,
        silverResult: 0,
        bronzeResult: 0,
        default: 0,
      },
      3: {
        goldResult: 0,
        silverResult: 0,
        bronzeResult: 0,
        default: 0,
      },
    }),
    [bronzePrize, goldPrize, silverPrize]
  )

  const displayedPrize = useMemo(() => {
    const rulesForStars = prizeRules[stars] ?? { default: 0 }
    const key = levelResultKeyMap[levelResult]
    return (
      rulesForStars[key as keyof typeof rulesForStars] ??
      rulesForStars.default ??
      0
    )
  }, [levelResult, prizeRules, stars])

  const isShouldShowConsolationPrize = useMemo(
    () => !displayedPrize && isLevelPassed && stars === 3,
    [isLevelPassed, stars, displayedPrize]
  )

  const displayedStars: Star = useMemo(() => {
    const map: Record<LEVEL_RESULT, Star> = {
      [LEVEL_RESULT.GoldResult]: 3,
      [LEVEL_RESULT.SilverResult]: 2,
      [LEVEL_RESULT.BronzeResult]: 1,
      [LEVEL_RESULT.TooHigh]: 0,
      [LEVEL_RESULT.TooLow]: 0,
    }

    return map[levelResult]
  }, [levelResult])

  const buttonsSet = [
    isLevelPassed && displayedPrize && (
      <IconButton
        icon={<CardsIcon height={30} width={30} />}
        isDisabled={true}
        label={'Double'}
        onPress={() =>
          onGetDoublePrize({ prize: displayedPrize, stars: displayedStars })
        }
        style={[styles.iconContainer]}
      />
    ),
    !(isLevelPassed && displayedPrize) && !isShouldShowConsolationPrize && (
      <IconButton
        icon={<HomeIcon height={30} width={30} />}
        label={'Home'}
        labelStyles={styles.buttonLabel}
        onPress={onGoHome}
        style={styles.iconContainer}
      />
    ),

    !isGoldResult && (
      <IconButton
        icon={<BuyIcon height={30} width={30} />}
        isDisabled={isResetStepsDisabled}
        label={'Reset Steps'}
        labelStyles={styles.buttonLabel}
        onPress={onResetSteps}
        style={[
          styles.iconContainer,
          isShouldShowConsolationPrize ? {} : styles.priorityIcon,
        ]}
      />
    ),
    !(isGoldResult && displayedPrize) && (
      <IconButton
        icon={<RestartIcon height={30} width={30} />}
        label={'Restart'}
        labelStyles={styles.buttonLabel}
        onPress={() =>
          onRestartLevel({
            prize: displayedPrize,
            stars: displayedStars,
            consolationPrize: isShouldShowConsolationPrize
              ? calculateConsolationPrize(prize)
              : undefined,
          })
        }
        style={styles.iconContainer}
      />
    ),

    ((isLevelPassed && displayedPrize) || isShouldShowConsolationPrize) && (
      <IconButton
        icon={<ReceiveIcon height={30} width={30} />}
        label={'Get Prize'}
        labelStyles={styles.buttonLabel}
        onPress={() =>
          onGetPrize({
            prize: displayedPrize,
            stars: displayedStars,
            consolationPrize: isShouldShowConsolationPrize
              ? calculateConsolationPrize(prize)
              : undefined,
          })
        }
        style={[
          styles.iconContainer,
          isShouldShowConsolationPrize ? styles.priorityIcon : {},
        ]}
      />
    ),
  ].filter(Boolean)

  const secondaryMessage = useMemo(
    () =>
      displayedPrize || !isLevelPassed
        ? secondaryMessageMap[levelResult]
        : `Restart for fun, reset steps or${isShouldShowConsolationPrize ? ' get a prize' : ' go to Home to try the next level'}!`,
    [displayedPrize, isLevelPassed, isShouldShowConsolationPrize, levelResult]
  )

  const prizeMessage = displayedPrize
    ? "You've received"
    : 'You’ve already claimed your prize for this result!'

  const headerContent = useMemo(
    () => headerContentMap[levelResult],
    [levelResult]
  )

  const unsuccessfulCaseContent = useMemo(
    () => (
      <View style={styles.mainContent}>
        {isTooHigh ? (
          <>
            <OutlinedText fontSize={20}>It must be no</OutlinedText>
            <OutlinedText fontSize={20}> higher</OutlinedText>
            <OutlinedText fontSize={20}> than</OutlinedText>
            <View style={styles.blockCounter}>
              <BlockWithValue
                strokeColor={COLORS.brown}
                textColor={COLORS.gradientGold_1}
                value={goldResult}
              />
            </View>
            <OutlinedText fontSize={20}> but you have</OutlinedText>
            <View style={styles.blockCounter}>
              <OutlinedText fontSize={20}> already</OutlinedText>
              <BlockWithValue
                strokeColor={COLORS.gradientGold_1}
                textColor={COLORS.roofTerracotta70}
                value={userBlockValue}
              />
            </View>
          </>
        ) : (
          <>
            <OutlinedText fontSize={20}>You've got just</OutlinedText>
            <View style={styles.blockCounter}>
              <BlockWithValue
                strokeColor={COLORS.gradientGold_1}
                textColor={COLORS.roofTerracotta70}
                value={userBlockValue}
              />
            </View>
            <OutlinedText fontSize={20}> but it must be</OutlinedText>
            <View style={styles.blockCounter}>
              <OutlinedText fontSize={20}> at</OutlinedText>
              <OutlinedText fontSize={20}>least</OutlinedText>
              <BlockWithValue
                strokeColor={COLORS.brown}
                textColor={COLORS.gradientGold_1}
                value={bronzeResult}
              />
            </View>
          </>
        )}
      </View>
    ),
    [bronzeResult, goldResult, isTooHigh, userBlockValue]
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.textIcon}>{headerContent.icon}</Text>
        <OutlinedText
          color={COLORS.gradientGold_1}
          fontSize={40}
          offset={2}
          strokeColor={COLORS.brown}
        >
          {headerContent.text}
        </OutlinedText>
      </View>
      <View style={styles.subTitle}>
        <OutlinedText fontSize={24}>{headerContent.subTitle}</OutlinedText>
      </View>
      {!!displayedStars && <StarsRow stars={displayedStars} />}
      {isLevelPassed ? (
        <View style={styles.prizeContainer}>
          <OutlinedText fontSize={20}>{prizeMessage}</OutlinedText>
          {isShouldShowConsolationPrize && (
            <View>
              <OutlinedText fontSize={20}>
                But here’s a little bonus for you:
              </OutlinedText>
              <View style={styles.consolationPrizeContainer}>
                <OutlinedText
                  color={COLORS.gradientGold_1}
                  fontSize={40}
                  strokeColor={COLORS.brown}
                  style={styles.prizeLabel}
                >{`${calculateConsolationPrize(prize)}`}</OutlinedText>
                <BananasIcon height={40} width={40} />
              </View>
            </View>
          )}
          {!!displayedPrize && (
            <View style={[styles.block, styles.prizeBlock]}>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={25}
                strokeColor={COLORS.brown}
                style={styles.prizeLabel}
              >{`${displayedPrize}`}</OutlinedText>
              <BananasIcon height={30} width={30} />
            </View>
          )}
        </View>
      ) : (
        unsuccessfulCaseContent
      )}
      <OutlinedText fontSize={16} style={styles.secondaryContent}>
        {secondaryMessage}
      </OutlinedText>
      <View style={styles.buttonsContainer}>
        {buttonsSet.map((button, index) => (
          <View key={index}>{button}</View>
        ))}
      </View>
    </View>
  )
}

export default memo(LevelResultModalContent)
