import { OutlinedTextProps } from '@components/atoms/OutlinedText/OutlinedText.types'
import { COLORS } from '@theme'
import React, { memo, useState } from 'react'
import { Text, View } from 'react-native'

import { styles } from './OutlinedText.styles'

const OutlinedText = ({
  children,
  fontSize = 32,
  color = COLORS.roseWhite,
  strokeColor = COLORS.codeGrey,
  offset = 1.5,
  style,
}: OutlinedTextProps) => {
  const directions = [
    { x: -offset, y: -offset },
    { x: offset, y: -offset },
    { x: -offset, y: offset },
    { x: offset, y: offset },
  ]
  const [textDimensions, setTextDimensions] = useState({})

  return (
    <View style={styles.container}>
      {directions.map(({ x, y }, index) => (
        <Text
          key={index}
          style={[
            styles.frontText,
            {
              left: x,
              top: y,
              color: strokeColor,
              fontSize,
            },
            textDimensions,
            style,
          ]}
        >
          {children}
        </Text>
      ))}
      <Text
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
