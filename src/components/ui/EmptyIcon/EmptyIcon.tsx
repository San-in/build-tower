import { FC } from 'react'
import { View } from 'react-native'
import { EmptyIconProps } from '@components/ui/EmptyIcon/EmptyIcon.types'

const EmptyIcon: FC<EmptyIconProps> = ({ width = 24, height = 24 }) => (
  <View style={{ width, height }} />
)
export default EmptyIcon
