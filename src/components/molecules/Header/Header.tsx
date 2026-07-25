import { BananasIcon, HomeIcon, RestartIcon } from '@assets/icons'
import { IconButton, OutlinedText } from '@components/atoms'
import PowerUpButton from '@components/atoms/PowerUpButton/PowerUpButton'
import { HeaderProps } from '@components/molecules/Header/Header.types'
import { useAppSelector } from '@store/hooks'
import { selectBananas } from '@store/slices/bananasSlice'
import {
  selectTotalAddRandomBlocks,
  selectTotalRemoveRandomBlocks,
} from '@store/slices/marketSlice'
import { COLORS } from '@theme'
import { MARKET_PRODUCT, POWER_UP_TYPE } from '@types'
import { formatTabletElementsSize } from '@utils'
import { FC, memo } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { styles } from './Header.styles'

const ICON_SIZE = formatTabletElementsSize(36)

const Header: FC<HeaderProps> = ({
  onResetPress,
  onHomePress,
  onRandomAddBlockPress,
  onRandomRemoveBlockPress,
  onAddExtraStepPress,
  level,
}) => {
  const bananas = useAppSelector(selectBananas)
  const totalRemoveBlocksPowerUps = useAppSelector(
    selectTotalRemoveRandomBlocks
  )
  const totalAddBlocksPowerUps = useAppSelector(selectTotalAddRandomBlocks)
  const addExtraStepPowerUps = useAppSelector(
    (state) => state.market[MARKET_PRODUCT.AddExtraStep]
  )

  const levelTitle = `Level ${String(level)}`

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.bananasExternalContainer}>
          <View style={styles.bananasContainer}>
            <OutlinedText
              fontSize={formatTabletElementsSize(22)}
            >{`${bananas}`}</OutlinedText>
            <BananasIcon
              height={ICON_SIZE}
              transform="scale(-1,1)"
              width={ICON_SIZE}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          {level && (
            <OutlinedText fontSize={formatTabletElementsSize(25)}>
              {levelTitle}
            </OutlinedText>
          )}
          <View style={styles.powerUpsContainer}>
            <PowerUpButton
              count={totalAddBlocksPowerUps}
              onPress={onRandomAddBlockPress}
              type={POWER_UP_TYPE.AddRandomBlocks}
            />
            <PowerUpButton
              count={totalRemoveBlocksPowerUps}
              onPress={onRandomRemoveBlockPress}
              type={POWER_UP_TYPE.RemoveRandomBlocks}
            />
            <PowerUpButton
              count={addExtraStepPowerUps}
              onPress={onAddExtraStepPress}
              type={POWER_UP_TYPE.AddExtraStep}
            />
          </View>
        </View>
        <View style={styles.actionButtonsContainer}>
          <IconButton
            icon={<RestartIcon height={ICON_SIZE} width={ICON_SIZE} />}
            onPress={onResetPress}
            style={{ backgroundColor: COLORS.roseWhite20 }}
          />
          <IconButton
            icon={<HomeIcon height={ICON_SIZE} width={ICON_SIZE} />}
            onPress={onHomePress}
            style={{ backgroundColor: COLORS.roseWhite20 }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default memo(Header)
