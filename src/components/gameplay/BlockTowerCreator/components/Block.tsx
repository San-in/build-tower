import { BlockProps } from '@components/gameplay/BlockTowerCreator/BlockTowerCreator.types'
import { COLORS } from '@theme'
import { FC } from 'react'
import { View } from 'react-native'

const Block: FC<BlockProps> = ({ type }) => (
    <View
      style={{
        width: 30,
        height: 15,
        backgroundColor: type === 'initial' ? COLORS.tango : COLORS.tuftBush,
        borderWidth: 1,
      }}
    />
  )

export default Block
