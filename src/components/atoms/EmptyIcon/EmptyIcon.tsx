import { EmptyIconProps } from '@components/atoms/EmptyIcon/EmptyIcon.types'
import { FC } from 'react'
import { View } from 'react-native'

const EmptyIcon: FC<EmptyIconProps> = ({ width = 24, height = 24 }) => (
  <View style={{ width, height }} />
)
export default EmptyIcon
