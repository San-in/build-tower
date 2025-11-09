import { LANGUAGES } from '@types'
import { StyleProp, ViewStyle } from 'react-native'

export type LanguageSelectorProps = {
  value: LANGUAGES
  onSelect: (lang: LANGUAGES) => void
  visibleCount?: number
  containerStyle?: StyleProp<ViewStyle>
  isDisabled?: boolean
}
