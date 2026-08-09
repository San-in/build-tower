import { BananasIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import { useAppSelector } from '@store/hooks'
import { selectBananas } from '@store/slices/bananasSlice'
import { MARKET_PRODUCT } from '@types'
import { formatTabletElementsSize, playSfx } from '@utils'
import React, { FC, memo, useCallback, useState } from 'react'
import { ScrollView, useWindowDimensions, View } from 'react-native'

import { MarketItem } from '../MarketItem'
import { styles } from './MarketContent.styles'

const PRODUCTS = Object.values(MARKET_PRODUCT)

const MarketContent: FC = () => {
  const { height } = useWindowDimensions()

  const bananas = useAppSelector(selectBananas)
  const [selectedProduct, setSelectedProduct] = useState<MARKET_PRODUCT | null>(
    null
  )

  const handleToggleSelect = useCallback(
    (product: MARKET_PRODUCT) => {
      playSfx('button')
      if (selectedProduct === product) {
        setSelectedProduct(null)
        return
      }
      setSelectedProduct(product)
    },
    [selectedProduct]
  )

  return (
    <>
      <ScrollView
        style={[
          styles.contentContainer,
          {
            minHeight: height * 0.5,
            maxHeight: height * 0.7,
          },
        ]}
      >
        <View style={styles.productsListContainer}>
          {PRODUCTS.map((product) => (
            <MarketItem
              isSelected={selectedProduct === product}
              key={product}
              product={product}
              toggleSelect={() => handleToggleSelect(product)}
              totalBananas={bananas}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.container}>
        <OutlinedText
          fontSize={formatTabletElementsSize(15, 2.5)}
        >{`${bananas}`}</OutlinedText>
        <BananasIcon
          height={formatTabletElementsSize(20)}
          transform="scale(-1,1)"
          width={formatTabletElementsSize(20)}
        />
      </View>
    </>
  )
}
export default memo(MarketContent)
