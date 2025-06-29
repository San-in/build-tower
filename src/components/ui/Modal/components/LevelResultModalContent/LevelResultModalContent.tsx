import {
  BananasIcon,
  BuyIcon,
  CardsIcon,
  HomeIcon,
  ReceiveIcon,
  RestartIcon,
  StarIcon,
} from '@assets/icons'
import BlockIcon from '@components/ui/BlockIcon/BlockIcon'
import IconButton from '@components/ui/IconButton/IconButton'
import { OutlinedText } from '@components/ui/OutlinedText'
import { COLORS } from '@theme'
import { LEVEL_RESULT } from '@types'
import { calculateExpectedLevelConditions } from '@utils'
import { FC, useMemo } from 'react'
import { Text, View } from 'react-native'

import { getLevelResult } from '../../../../../utils/getLevelResult'
import { styles } from './LevelResultModalContent.styles'
import { LevelResultModalContentProps } from './LevelResultModalContent.types'

const LevelResultModalContent: FC<LevelResultModalContentProps> = ({
  onConfirm,
  onResetLevel,
  onContinueLevel,
  onMultipleResult,
  initialBlockValue,
  userBlockValue,
  onGoHome,
  prize,
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

  return {
    [LEVEL_RESULT.TooHigh]: (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.textIcon}>🐒</Text>
          <OutlinedText
            color={COLORS.gradientGold_1}
            fontSize={40}
            offset={2}
            strokeColor={COLORS.brown}
          >
            Whoa!
          </OutlinedText>
        </View>
        <OutlinedText fontSize={18} style={styles.subTitle}>
          Your tower is too tall...
        </OutlinedText>
        <View style={styles.mainContent}>
          <OutlinedText fontSize={24}>It must be no</OutlinedText>
          <OutlinedText fontSize={24}> higher</OutlinedText>
          <OutlinedText fontSize={24}> than</OutlinedText>
          <View style={styles.blockCounter}>
            <View style={styles.block}>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={32}
                strokeColor={COLORS.brown}
              >
                {`${goldResult}`}
              </OutlinedText>
              <BlockIcon size={30} />
            </View>
          </View>
          <OutlinedText fontSize={24}> but you have</OutlinedText>
          <View style={styles.blockCounter}>
            <OutlinedText fontSize={24}> already</OutlinedText>
            <View style={styles.block}>
              <OutlinedText
                color={COLORS.roofTerracotta70}
                fontSize={32}
                strokeColor={COLORS.gradientGold_1}
              >{`${userBlockValue}`}</OutlinedText>
              <BlockIcon size={30} />
            </View>
          </View>
        </View>
        <OutlinedText fontSize={18} style={styles.secondaryContent}>
          Reset steps or restart the level to fix it!
        </OutlinedText>
        <View style={styles.buttonsContainer}>
          <IconButton
            icon={<HomeIcon height={36} width={36} />}
            label={'Home'}
            labelStyles={styles.buttonLabel}
            onPress={onGoHome}
            style={styles.iconContainer}
          />
          <IconButton
            icon={<BuyIcon height={36} width={36} />}
            label={'Reset Steps'}
            labelStyles={styles.buttonLabel}
            onPress={onContinueLevel}
            style={[styles.iconContainer, styles.priorityIcon]}
          />
          <IconButton
            icon={<RestartIcon height={36} width={36} />}
            label={'Restart'}
            labelStyles={styles.buttonLabel}
            onPress={onResetLevel}
            style={styles.iconContainer}
          />
        </View>
      </View>
    ),
    [LEVEL_RESULT.TooLow]: (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.textIcon}>🍌</Text>
          <OutlinedText
            color={COLORS.gradientGold_1}
            fontSize={40}
            offset={2}
            strokeColor={COLORS.brown}
          >
            Uh-oh…
          </OutlinedText>
        </View>
        <OutlinedText fontSize={18} style={styles.subTitle}>
          That tower’s too short...
        </OutlinedText>
        <View style={styles.mainContent}>
          <OutlinedText fontSize={24}> You've got just</OutlinedText>
          <View style={styles.blockCounter}>
            <View style={styles.block}>
              <OutlinedText
                color={COLORS.roofTerracotta70}
                fontSize={32}
                strokeColor={COLORS.gradientGold_1}
              >
                {`${userBlockValue}`}
              </OutlinedText>
              <BlockIcon size={30} />
            </View>
            <OutlinedText fontSize={24}> but it</OutlinedText>
          </View>
          <OutlinedText fontSize={24}> must</OutlinedText>
          <OutlinedText fontSize={24}> be at least</OutlinedText>
          <View style={styles.blockCounter}>
            <View style={styles.block}>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={32}
                strokeColor={COLORS.brown}
              >
                {`${goldResult}`}
              </OutlinedText>
              <BlockIcon size={30} />
            </View>
          </View>
        </View>
        <OutlinedText fontSize={18} style={styles.secondaryContent}>
          Reset steps, restart the level, or head Home?
        </OutlinedText>
        <View style={styles.buttonsContainer}>
          <IconButton
            icon={<HomeIcon height={36} width={36} />}
            label={'Home'}
            labelStyles={styles.buttonLabel}
            onPress={onGoHome}
            style={styles.iconContainer}
          />
          <IconButton
            icon={<BuyIcon height={36} width={36} />}
            label={'Reset Steps'}
            labelStyles={styles.buttonLabel}
            onPress={onContinueLevel}
            style={[styles.iconContainer, styles.priorityIcon]}
          />
          <IconButton
            icon={<RestartIcon height={36} width={36} />}
            label={'Restart'}
            labelStyles={styles.buttonLabel}
            onPress={onResetLevel}
            style={styles.iconContainer}
          />
        </View>
      </View>
    ),
    [LEVEL_RESULT.GoldResult]: (
      <View style={styles.container}>
        <View style={[styles.titleContainer, styles.subTitle]}>
          <Text style={styles.textIcon}>🥇</Text>
          <OutlinedText
            color={COLORS.gradientGold_1}
            fontSize={40}
            offset={2}
            strokeColor={COLORS.brown}
          >
            Brilliant!
          </OutlinedText>
        </View>
        <OutlinedText fontSize={24}>Top monkey style!</OutlinedText>
        <View style={styles.starsContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <StarIcon height={30} key={index} width={30} />
          ))}
        </View>
        <View style={styles.prizeContainer}>
          <OutlinedText fontSize={20}>You've received</OutlinedText>
          <View style={[styles.block, styles.prizeBlock]}>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={25}
              strokeColor={COLORS.brown}
              style={styles.prizeLabel}
            >{`${goldPrize}`}</OutlinedText>
            <BananasIcon height={30} width={30} />
          </View>
        </View>
        <OutlinedText fontSize={16} style={styles.secondaryContent}>
          But wait… what’s better than that? Maybe double the bananas?
        </OutlinedText>
        <View style={styles.buttonsContainer}>
          <IconButton
            icon={<CardsIcon height={36} width={36} />}
            isDisabled={true}
            label={'Double'}
            onPress={() => {}}
            style={[styles.iconContainer, styles.priorityIcon]}
          />
          <IconButton
            icon={<ReceiveIcon height={36} width={36} />}
            label={'Get Prize'}
            onPress={onContinueLevel}
            style={styles.iconContainer}
          />
        </View>
      </View>
    ),
    [LEVEL_RESULT.SilverResult]: (
      <View style={styles.container}>
        <View style={[styles.titleContainer, styles.subTitle]}>
          <Text style={styles.textIcon}>🥈</Text>
          <OutlinedText
            color={COLORS.gradientGold_1}
            fontSize={40}
            offset={2}
            strokeColor={COLORS.brown}
          >
            Nice!
          </OutlinedText>
        </View>
        <OutlinedText fontSize={24}>Wow! Not bad at all!</OutlinedText>
        <View style={styles.starsContainer}>
          {Array.from({ length: 2 }).map((_, index) => (
            <StarIcon height={30} key={index} width={30} />
          ))}
        </View>
        <View style={styles.prizeContainer}>
          <OutlinedText fontSize={20}>You've received</OutlinedText>
          <View style={[styles.block, styles.prizeBlock]}>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={25}
              strokeColor={COLORS.brown}
              style={styles.prizeLabel}
            >{`${silverPrize}`}</OutlinedText>
            <BananasIcon height={30} width={30} />
          </View>
        </View>
        <OutlinedText fontSize={16} style={styles.secondaryContent}>
          Keep your reward, restart the level, or reset steps and go for gold?
        </OutlinedText>
        <View style={styles.buttonsContainer}>
          <IconButton
            icon={<RestartIcon height={36} width={36} />}
            label={'Restart'}
            labelStyles={styles.buttonLabel}
            onPress={onResetLevel}
            style={styles.iconContainer}
          />
          <IconButton
            icon={<BuyIcon height={36} width={36} />}
            label={'Reset Steps'}
            labelStyles={styles.buttonLabel}
            onPress={onContinueLevel}
            style={[styles.iconContainer, styles.priorityIcon]}
          />
          <IconButton
            icon={<ReceiveIcon height={36} width={36} />}
            label={'Get Prize'}
            onPress={onContinueLevel}
            style={styles.iconContainer}
          />
        </View>
      </View>
    ),
    [LEVEL_RESULT.BronzeResult]: (
      <View style={styles.container}>
        <View style={[styles.titleContainer, styles.subTitle]}>
          <Text style={styles.textIcon}>🥉</Text>
          <OutlinedText
            color={COLORS.gradientGold_1}
            fontSize={40}
            offset={2}
            strokeColor={COLORS.brown}
          >
            Good job!
          </OutlinedText>
        </View>
        <OutlinedText fontSize={24}>
          Even one star is worthy of an award
        </OutlinedText>
        <View style={styles.starsContainer}>
          {Array.from({ length: 1 }).map((_, index) => (
            <StarIcon height={30} key={index} width={30} />
          ))}
        </View>
        <View style={styles.prizeContainer}>
          <OutlinedText fontSize={20}>You've received</OutlinedText>
          <View style={[styles.block, styles.prizeBlock]}>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={25}
              strokeColor={COLORS.brown}
              style={styles.prizeLabel}
            >{`${bronzePrize}`}</OutlinedText>
            <BananasIcon height={30} width={30} />
          </View>
        </View>
        <OutlinedText fontSize={16} style={styles.secondaryContent}>
          Get a prize, restart the level, or reset steps and go for extra stars?
        </OutlinedText>
        <View style={styles.buttonsContainer}>
          <IconButton
            icon={<RestartIcon height={36} width={36} />}
            label={'Restart'}
            labelStyles={styles.buttonLabel}
            onPress={onResetLevel}
            style={styles.iconContainer}
          />
          <IconButton
            icon={<BuyIcon height={36} width={36} />}
            label={'Reset Steps'}
            labelStyles={styles.buttonLabel}
            onPress={onContinueLevel}
            style={[styles.iconContainer, styles.priorityIcon]}
          />
          <IconButton
            icon={<ReceiveIcon height={36} width={36} />}
            label={'Get Prize'}
            onPress={onContinueLevel}
            style={styles.iconContainer}
          />
        </View>
      </View>
    ),
  }[levelResult]
}

export default LevelResultModalContent
