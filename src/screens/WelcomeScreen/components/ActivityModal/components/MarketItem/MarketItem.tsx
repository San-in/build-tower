import { Button, OutlinedText } from '@components/atoms'
import PowerUpButton from '@components/atoms/PowerUpButton/PowerUpButton'
import {
  EMPTY_FUNCTION,
  POWER_UP_PRICE_MULTIPLIER,
  POWER_UP_PRICE_X2_THRESHOLD,
  POWER_UP_PURCHASE_LIMIT,
} from '@constants'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { removeBananas } from '@store/slices/bananasSlice'
import { incrementProduct } from '@store/slices/marketSlice'
import { COLORS } from '@theme'
import { MARKET_PRODUCT, POWER_UP_GRADE } from '@types'
import {
  formatTabletElementsSize,
  getPowerUpInfoByMarketProduct,
  Haptics,
  playSfx,
} from '@utils'
import React, { FC, memo, useCallback, useMemo } from 'react'
import { Pressable, View } from 'react-native'

import { styles } from './MarketItem.styles'
import { MarketItemProps } from './MarketItem.types'

const MarketItem: FC<MarketItemProps> = ({
  product,
  toggleSelect,
  isSelected,
  totalBananas,
}) => {
  const dispatch = useAppDispatch()

  const countPowerUps = useAppSelector((state) => state.market[product])
  const { price, description, type, grade } =
    getPowerUpInfoByMarketProduct(product)

  const isMaxed = countPowerUps >= POWER_UP_PURCHASE_LIMIT
  const currentPrice =
    countPowerUps >= POWER_UP_PRICE_X2_THRESHOLD
      ? price * POWER_UP_PRICE_MULTIPLIER
      : price
  const isBuyDisabled = isMaxed || totalBananas < currentPrice

  const borderColor = useMemo(
    () =>
      ({
        [POWER_UP_GRADE.Bronze]: COLORS.gradientBronze_1,
        [POWER_UP_GRADE.Silver]: COLORS.gradientSilver_1,
        [POWER_UP_GRADE.Gold]: COLORS.gradientGold_1,
        [POWER_UP_GRADE.Base]: COLORS.white,
      })[grade],
    [grade]
  )

  const handleBuyPowerUp = useCallback(
    async (type: MARKET_PRODUCT) => {
      if (isBuyDisabled) {
        return
      }
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      playSfx('monkey_notification')
      dispatch(incrementProduct({ product: type, count: 1 }))
      dispatch(removeBananas(currentPrice))
    },
    [dispatch, currentPrice, isBuyDisabled]
  )

  return (
    <Pressable
      onPress={toggleSelect}
      style={({ pressed }) => [
        styles.container,
        (pressed || isSelected) && styles.activeContainer,
        { borderColor },
      ]}
    >
      <PowerUpButton
        color={grade}
        count={countPowerUps}
        isDisabled={true}
        onPress={EMPTY_FUNCTION}
        size={formatTabletElementsSize(50)}
        type={type}
      />

      <View style={styles.descriptionContainer}>
        <OutlinedText
          fontSize={formatTabletElementsSize(10, 2.5)}
          style={styles.description}
        >
          {description}
        </OutlinedText>
      </View>
      <Button
        buttonContainerStyle={styles.buttonContainer}
        isDisabled={isBuyDisabled}
        onPress={() => handleBuyPowerUp(product)}
        textIcon={isMaxed ? undefined : ' 🍌'}
        textIconStyle={styles.buttonIcon}
        textSize={formatTabletElementsSize(12, 2.5)}
        title={isMaxed ? 'MAX' : `${currentPrice}`}
      />
    </Pressable>
  )
}
export default memo(MarketItem)
