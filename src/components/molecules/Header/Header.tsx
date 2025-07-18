import { BananasIcon, HomeIcon, RestartIcon } from '@assets/icons'
import { IconButton, OutlinedText } from '@components/atoms'
import { HeaderProps } from '@components/molecules/Header/Header.types'
import { useAppSelector } from '@store/hooks'
import {
  selectTotalAddRandomBlocks,
  selectTotalRemoveRandomBlocks,
} from '@store/slices/marketSlice'
import { COLORS } from '@theme'
import { LinearGradient } from 'expo-linear-gradient'
import { FC, memo } from 'react'
import { Pressable, SafeAreaView, View } from 'react-native'

import { styles } from './Header.styles'

const Header: FC<HeaderProps> = ({
  onResetPress,
  onHomePress,
  onRandomAddBlockPress,
  onRandomRemoveBlockPress,
  level,
}) => {
  const bananas = useAppSelector((state) => state.bananas.bananas)
  const totalRemoveBlocksPowerUps = useAppSelector(
    selectTotalRemoveRandomBlocks
  )
  const totalAddBlocksPowerUps = useAppSelector(selectTotalAddRandomBlocks)
  const levelTitle = `Level ${String(level)}`

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.bananasExternalContainer}>
          <View style={styles.bananasContainer}>
            <OutlinedText fontSize={22}>{`${bananas}`}</OutlinedText>
            <BananasIcon height={35} transform="scale(-1,1)" width={35} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          {level && <OutlinedText fontSize={25}>{levelTitle}</OutlinedText>}
          <View style={styles.powerUpsContainer}>
            <Pressable
              onPress={onRandomAddBlockPress}
              style={({ pressed }) => [
                styles.powerUp,
                pressed && styles.powerUpPressed,
              ]}
            >
              <LinearGradient
                colors={[
                  COLORS.gradientGreen_1,
                  COLORS.gradientGreen_2,
                  COLORS.gradientGreen_3,
                  COLORS.gradientGreen_1,
                ]}
                end={{ x: 1, y: 0 }}
                start={{ x: 0, y: 0 }}
                style={styles.gradientContainer}
              >
                <View style={styles.powerUpContent}>
                  <OutlinedText fontSize={24}>+</OutlinedText>
                </View>
              </LinearGradient>
              {!!totalAddBlocksPowerUps && (
                <View style={styles.powerUpCounter}>
                  <OutlinedText fontSize={13}>
                    {`${totalAddBlocksPowerUps}`}
                  </OutlinedText>
                </View>
              )}
            </Pressable>
            <Pressable
              onPress={onRandomRemoveBlockPress}
              style={({ pressed }) => [
                styles.powerUp,
                pressed && styles.powerUpPressed,
              ]}
            >
              <LinearGradient
                colors={[
                  COLORS.gradientRed_1,
                  COLORS.gradientRed_2,
                  COLORS.gradientRed_3,
                  COLORS.gradientRed_1,
                ]}
                end={{ x: 1, y: 0 }}
                start={{ x: 0, y: 0 }}
                style={styles.gradientContainer}
              >
                <View style={styles.powerUpContent}>
                  <OutlinedText fontSize={24}>-</OutlinedText>
                </View>
              </LinearGradient>
              {!!totalRemoveBlocksPowerUps && (
                <View style={styles.powerUpCounter}>
                  <OutlinedText fontSize={13}>
                    {`${totalRemoveBlocksPowerUps}`}
                  </OutlinedText>
                </View>
              )}
            </Pressable>
          </View>
        </View>
        <View style={styles.actionButtonsContainer}>
          <IconButton
            icon={<RestartIcon height={36} width={36} />}
            onPress={onResetPress}
            style={{ backgroundColor: COLORS.roseWhite20 }}
          />
          <IconButton
            icon={<HomeIcon height={36} width={36} />}
            onPress={onHomePress}
            style={{ backgroundColor: COLORS.roseWhite20 }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default memo(Header)
