import { StarIcon } from '@assets/icons'
import { formatTabletElementsSize } from '@utils'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './StarsRow.styles'
import { StarsRowProps } from './StarsRow.types'

const StarsRow: FC<StarsRowProps> = ({ stars }) => (
  <View style={styles.container}>
    {Array.from({ length: stars }).map((_, index) => (
      <StarIcon
        height={formatTabletElementsSize(30)}
        key={index}
        width={formatTabletElementsSize(30)}
      />
    ))}
  </View>
)

export default memo(StarsRow)
