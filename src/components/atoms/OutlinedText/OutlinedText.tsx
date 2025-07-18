import { OutlinedTextProps } from '@components/atoms/OutlinedText/OutlinedText.types'
import { COLORS } from '@theme'
import React, { memo } from 'react'
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
            style,
          ]}
        >
          {children}
        </Text>
      ))}
      <Text style={[styles.text, { color, fontSize }, style]}>{children}</Text>
    </View>
  )
}

export default memo(OutlinedText)
