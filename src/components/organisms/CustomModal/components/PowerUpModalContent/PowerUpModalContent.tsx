import { Button, OutlinedText } from '@components/atoms'
import { PowerUpIcon } from '@components/molecules/PowerUpIcon'
import { useAppSelector } from '@store/hooks'
import { COLORS } from '@theme'
import {
  BUTTON_TYPE,
  MARKET_PRODUCT,
  POWER_UP_GRADE,
  POWER_UP_TYPE,
} from '@types'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatePresence, MotiView } from 'moti'
import { FC, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'

import { styles } from './PowerUpModalContent.styles'
import { PowerUpModalContentProps } from './PowerUpModalContent.types'

const powerUpOptions: Array<POWER_UP_GRADE> = [
  POWER_UP_GRADE.Bronze,
  POWER_UP_GRADE.Silver,
  POWER_UP_GRADE.Gold,
]

const PowerUpModalContent: FC<PowerUpModalContentProps> = ({
  type,
  onCancel,
  onConfirm,
}) => {
  const [powerUp, setPowerUp] = useState<POWER_UP_GRADE | null>(null)

  const availablePowerUps = {
    [POWER_UP_TYPE.Plus]: {
      [POWER_UP_GRADE.Bronze]: useAppSelector(
        ({ market }) => market[MARKET_PRODUCT.AddRandomBlocks_Bronze]
      ),
      [POWER_UP_GRADE.Silver]: useAppSelector(
        ({ market }) => market[MARKET_PRODUCT.AddRandomBlocks_Silver]
      ),
      [POWER_UP_GRADE.Gold]: useAppSelector(
        ({ market }) => market[MARKET_PRODUCT.AddRandomBlocks_Gold]
      ),
    },
    [POWER_UP_TYPE.Minus]: {
      [POWER_UP_GRADE.Bronze]: useAppSelector(
        ({ market }) => market[MARKET_PRODUCT.RemoveRandomBlocks_Bronze]
      ),
      [POWER_UP_GRADE.Silver]: useAppSelector(
        ({ market }) => market[MARKET_PRODUCT.RemoveRandomBlocks_Silver]
      ),
      [POWER_UP_GRADE.Gold]: useAppSelector(
        ({ market }) => market[MARKET_PRODUCT.RemoveRandomBlocks_Gold]
      ),
    },
  }[type]

  const isSelectedPowerUpAvailable = useMemo(
    () => powerUp && availablePowerUps[powerUp],
    [availablePowerUps, powerUp]
  )

  const getInfoMessage = () => {
    if (!powerUp) {
      return 'Choose at least one card!'
    }

    if (!isSelectedPowerUpAvailable) {
      return `You don't have any ${powerUp.toUpperCase()} cards. 
Get some in the MARKET.`
    }

    return {
      [POWER_UP_GRADE.Bronze]: `Bronze card will ${type === POWER_UP_TYPE.Plus ? 'ADD' : 'REMOVE'} 
between 1 and 10 random blocks`,
      [POWER_UP_GRADE.Silver]: `Silver card will ${type === POWER_UP_TYPE.Plus ? 'ADD' : 'REMOVE'} 
between 1 and 7 random blocks`,
      [POWER_UP_GRADE.Gold]: `Gold card will ${type === POWER_UP_TYPE.Plus ? 'ADD' : 'REMOVE'} 
between 1 and 4 random blocks`,
    }[powerUp]
  }

  const getHeaderBackground = (
    grade: POWER_UP_GRADE
  ): readonly [string, string, ...Array<string>] =>
    ({
      [POWER_UP_GRADE.Bronze]: [
        COLORS.gradientBronze_1,
        COLORS.gradientBronze_2,
        COLORS.gradientBronze_3,
      ],
      [POWER_UP_GRADE.Silver]: [
        COLORS.gradientSilver_1,
        COLORS.gradientSilver_2,
        COLORS.gradientSilver_3,
      ],
      [POWER_UP_GRADE.Gold]: [
        COLORS.gradientGold_1,
        COLORS.gradientGold_2,
        COLORS.gradientGold_3,
      ],
    })[grade] as [string, string, ...Array<string>]

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {powerUpOptions.map((grade) => {
          const isCardSelected = grade === powerUp

          return (
            <Pressable
              key={grade}
              onPress={() =>
                setPowerUp((prev) => (prev === grade ? null : grade))
              }
              style={styles.cardContainer}
            >
              <MotiView
                animate={{ scale: isCardSelected ? 1.15 : 1 }}
                from={{ scale: 1 }}
                style={styles.card}
                transition={{ type: 'timing', duration: 200 }}
              >
                <LinearGradient
                  colors={[
                    COLORS.roseWhite,
                    COLORS.roseWhite90,
                    COLORS.roseWhite70,
                    COLORS.roseWhite70,
                    COLORS.roseWhite60,
                    COLORS.roseWhite90,
                  ]}
                  style={styles.cardBackground}
                >
                  <LinearGradient
                    colors={getHeaderBackground(grade)}
                    style={styles.cardContent}
                  >
                    <OutlinedText fontSize={11}>{grade}</OutlinedText>
                  </LinearGradient>
                  <View style={styles.powerUp}>
                    <PowerUpIcon color={grade} type={type} />
                    <OutlinedText
                      fontSize={20}
                    >{`${availablePowerUps[grade]}`}</OutlinedText>
                  </View>
                </LinearGradient>
              </MotiView>
            </Pressable>
          )
        })}
      </View>

      <View style={styles.infoMessageContainer}>
        <AnimatePresence exitBeforeEnter>
          <MotiView
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            from={{ opacity: 0, translateY: 10 }}
            key={powerUp}
            transition={{ duration: 200 }}
          >
            <OutlinedText fontSize={12}>{getInfoMessage()}</OutlinedText>
          </MotiView>
        </AnimatePresence>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          buttonContainerStyle={styles.buttonContent}
          onPress={onCancel}
          style={styles.button}
          textSize={15}
          title={'CANCEL'}
          type={BUTTON_TYPE.Error}
        />
        <Button
          buttonContainerStyle={styles.buttonContent}
          isDisabled={!isSelectedPowerUpAvailable}
          onPress={onConfirm}
          style={styles.button}
          textSize={15}
          title={'OK'}
          type={BUTTON_TYPE.Warning}
        />
      </View>
    </View>
  )
}

export default PowerUpModalContent
