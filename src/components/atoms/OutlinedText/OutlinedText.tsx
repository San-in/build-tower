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
  containerStyle,
  numberOfLines,
  adjustsFontSizeToFit,
}: OutlinedTextProps) => {
  const scaledFontSize = fontSize
  const scaledOffset = offset
  const autoFit = Boolean(adjustsFontSizeToFit)

  const [textDimensions, setTextDimensions] = useState({})
  const [containerWidth, setContainerWidth] = useState(0)
  const [naturalWidth, setNaturalWidth] = useState(0)

  const fitRatio =
    autoFit && containerWidth > 0 && naturalWidth > containerWidth
      ? containerWidth / naturalWidth
      : 1

  const finalFontSize = scaledFontSize * fitRatio
  const finalOffset = scaledOffset * fitRatio
  const directions = [
    { x: -finalOffset, y: -finalOffset },
    { x: finalOffset, y: -finalOffset },
    { x: -finalOffset, y: finalOffset },
    { x: finalOffset, y: finalOffset },
  ]

  return (
    <View
      onLayout={
        autoFit
          ? ({ nativeEvent }) => setContainerWidth(nativeEvent.layout.width)
          : undefined
      }
      style={[styles.container, containerStyle]}
    >
      {autoFit && (
        <Text
          numberOfLines={1}
          onLayout={({ nativeEvent }) =>
            setNaturalWidth(nativeEvent.layout.width)
          }
          style={[styles.measure, { fontSize: scaledFontSize }, style]}
        >
          {children}
        </Text>
      )}
      {directions.map(({ x, y }, index) => (
        <Text
          key={index}
          numberOfLines={numberOfLines}
          style={[
            styles.frontText,
            autoFit && styles.strokeStretch,
            autoFit
              ? {
                  transform: [{ translateX: x }, { translateY: y }],
                  color: strokeColor,
                  fontSize: finalFontSize,
                }
              : {
                  left: x,
                  top: y,
                  color: strokeColor,
                  fontSize: finalFontSize,
                },
            autoFit ? null : textDimensions,
            style,
          ]}
        >
          {children}
        </Text>
      ))}
      <Text
        numberOfLines={numberOfLines}
        onLayout={
          autoFit
            ? undefined
            : ({ nativeEvent }) => {
                setTextDimensions({
                  width: nativeEvent.layout.width,
                  height: nativeEvent.layout.height,
                })
              }
        }
        style={[styles.text, { color, fontSize: finalFontSize }, style]}
      >
        {children}
      </Text>
    </View>
  )
}

export default memo(OutlinedText)
