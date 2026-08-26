import { OutlinedTextProps } from '@components/atoms/OutlinedText/OutlinedText.types'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import React, { memo, useState } from 'react'
import { Text, View } from 'react-native'

import { styles } from './OutlinedText.styles'

const OutlinedText = ({
  children,
  fontSize = formatTabletElementsSize(32),
  color = COLORS.roseWhite,
  strokeColor = COLORS.codeGrey,
  offset = formatTabletElementsSize(1.5, 1),
  style,
  containerStyle,
  numberOfLines,
}: OutlinedTextProps) => {
  const [textDimensions, setTextDimensions] = useState({})

  const directions = [
    { x: -offset, y: -offset },
    { x: offset, y: -offset },
    { x: -offset, y: offset },
    { x: offset, y: offset },
  ]

  return (
    <View style={[styles.container, containerStyle]}>
      {directions.map(({ x, y }, index) => (
        <Text
          allowFontScaling={false}
          key={index}
          numberOfLines={numberOfLines}
          style={[
            styles.frontText,
            { left: x, top: y, color: strokeColor, fontSize },
            textDimensions,
            style,
          ]}
        >
          {children}
        </Text>
      ))}
      <Text
        allowFontScaling={false}
        numberOfLines={numberOfLines}
        onLayout={({ nativeEvent }) => {
          setTextDimensions({
            width: nativeEvent.layout.width,
            height: nativeEvent.layout.height,
          })
        }}
        style={[styles.text, { color, fontSize }, style]}
      >
        {children}
      </Text>
    </View>
  )
}

export default memo(OutlinedText)
