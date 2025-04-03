import { TextStyles } from '@theme'
import { BUTTON_TYPE } from '@types'
import { FC, useMemo } from 'react'
import { Pressable, Text } from 'react-native'

import { styles } from './Button.styles'
import { ButtonProps } from './Button.types'

const Button: FC<ButtonProps> = ({
  title,
  type = BUTTON_TYPE.Filled,
  minWidth = 120,
  isDisabled = false,
  style,
  ...props
}) => {
  const buttonStyle = useMemo(
    () =>
      ({
        [BUTTON_TYPE.Filled]: [
          styles.buttonFilled,
          styles.buttonFilledPressed,
          styles.buttonFilledDisabled,
        ],
        [BUTTON_TYPE.Outlined]: [
          styles.buttonOutlined,
          styles.buttonOutlinedPressed,
          styles.buttonOutlinedDisabled,
        ],
        [BUTTON_TYPE.Text]: [
          styles.buttonText,
          styles.buttonTextPressed,
          styles.buttonTextDisabled,
        ],
      })[type],
    [type]
  )

  const textStyle = useMemo(
    () =>
      ({
        [BUTTON_TYPE.Filled]: isDisabled
          ? styles.textButtonDisabled
          : styles.textButtonFilled,
        [BUTTON_TYPE.Outlined]: isDisabled
          ? styles.textButtonDisabled
          : styles.textButton,
        [BUTTON_TYPE.Text]: isDisabled
          ? styles.textButtonDisabled
          : styles.textButton,
      })[type],
    [type, isDisabled]
  )

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={({ pressed }: { pressed: boolean }) => [
        styles.container,
        style,
        !isDisabled ? buttonStyle[Number(pressed)] : buttonStyle.at(-1),
        { minWidth },
      ]}
    >
      <Text style={[textStyle, TextStyles.buttonLabel]}>{title}</Text>
    </Pressable>
  )
}

export default Button
