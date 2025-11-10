import { Button, OutlinedText } from '@components/atoms'
import PowerUpButton from '@components/atoms/PowerUpButton/PowerUpButton'
import { EMPTY_FUNCTION } from '@constants'
import { bananasService, marketService } from '@services'
import { useAppSelector } from '@store/hooks'
import { COLORS } from '@theme'
import { MARKET_PRODUCT, POWER_UP_GRADE } from '@types'
import { getPowerUpInfoByMarketProduct } from '@utils'
import React, { FC, memo, useCallback, useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { styles } from './MarketItem.styles'
import { MarketItemProps } from './MarketItem.types'

const MarketItem: FC<MarketItemProps> = ({
  product,
  toggleSelect,
  isSelected,
  totalBananas,
}) => {
  const dispatch = useDispatch()
  const countPowerUps = useAppSelector((state) => state.market?.[product])
  const { price, description, type, grade } =
    getPowerUpInfoByMarketProduct(product)

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
      if (totalBananas < price) {
        return
      }
      await marketService.increment(dispatch, type)
      await bananasService.removeBananas(dispatch, price)
    },
    [dispatch, price, totalBananas]
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
        size={60}
        type={type}
      />

      <View style={styles.descriptionContainer}>
        <OutlinedText fontSize={10} style={styles.description}>
          {description}
        </OutlinedText>
      </View>
      <Button
        buttonContainerStyle={styles.buttonContainer}
        isDisabled={totalBananas < price}
        onPress={() => handleBuyPowerUp(product)}
        textIcon={' 🍌'}
        textIconStyle={styles.buttonIcon}
        textSize={14}
        title={`BUY ${price}`}
      />
    </Pressable>
  )
}
export default memo(MarketItem)
