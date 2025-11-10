import { BananasIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import { useAppSelector } from '@store/hooks'
import { MARKET_PRODUCT } from '@types'
import React, { FC, memo, useCallback, useState } from 'react'
import { ScrollView, useWindowDimensions, View } from 'react-native'

import { MarketItem } from '../MarketItem'
import { styles } from './MarketContent.styles'

const PRODUCTS = Object.values(MARKET_PRODUCT)

const MarketContent: FC = () => {
  const { height } = useWindowDimensions()
  const bananas = useAppSelector((state) => state.bananas.bananas)
  const [selectedProduct, setSelectedProduct] = useState<MARKET_PRODUCT | null>(
    null
  )

  const handleToggleSelect = useCallback(
    (product: MARKET_PRODUCT) => {
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
      <View style={styles.container}>
        <OutlinedText fontSize={15}>{`${bananas}`}</OutlinedText>
        <BananasIcon height={20} transform="scale(-1,1)" width={20} />
      </View>
      <ScrollView
        style={[
          styles.contentContainer,
          {
            minHeight: height * 0.7,
            maxHeight: height * 0.9,
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
    </>
  )
}
export default memo(MarketContent)
