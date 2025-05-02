import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '@theme'
import { styles } from '@components/ui/OutlinedText/OutlinedText.styles'
import { OutlinedTextProps } from '@components/ui/OutlinedText/OutlinedText.types'

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

export default OutlinedText
