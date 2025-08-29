import {
  AwardsIcon,
  CalendarIcon,
  MarketIcon,
  MenuIcon,
  SettingsIcon,
} from '@assets/icons'
import { IconButton } from '@components/atoms'
import { EMPTY_FUNCTION } from '@constants'
import { AnimatePresence, MotiView } from 'moti'
import { FC, useMemo, useState } from 'react'
import { View } from 'react-native'

import { SideMenuProps } from './SideMenu.types'
import { styles } from './SideMeny.styles'

const ICON_SIZE = 35
const ICON_MENU_SIZE = 40

const SideMenu: FC<SideMenuProps> = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)

  const items = useMemo(
    () => [
      <SettingsIcon height={ICON_SIZE} key="i1" width={ICON_SIZE} />,
      <CalendarIcon height={ICON_SIZE} key="i2" width={ICON_SIZE} />,
      <AwardsIcon height={ICON_SIZE} key="i3" width={ICON_SIZE} />,
      <MarketIcon height={ICON_SIZE} key="i4å" width={ICON_SIZE} />,
    ],
    []
  )

  return (
    <MotiView
      animate={{ opacity: 1 }}
      from={{ opacity: 0 }}
      style={styles.container}
      transition={{ type: 'timing', duration: 120 }}
    >
      <IconButton
        icon={
          <MotiView
            animate={{ scaleX: isMenuExpanded ? 1 : -1 }}
            from={{ scaleX: -1 }}
            transition={{ type: 'timing', duration: 180 }}
          >
            <MenuIcon height={ICON_MENU_SIZE} width={ICON_MENU_SIZE} />
          </MotiView>
        }
        onPress={() => setIsMenuExpanded((p) => !p)}
      />

      <AnimatePresence>
        {isMenuExpanded && (
          <MotiView
            animate={{ opacity: 1, translateX: 0, scaleX: 1 }}
            exit={{ opacity: 0, translateX: -16, scaleX: 0.95 }}
            from={{ opacity: 0, translateX: -16, scaleX: 0.95 }}
            style={{ marginLeft: 8, borderRadius: 12, overflow: 'visible' }}
            transition={{ type: 'timing', duration: 180 }}
          >
            <View
              style={{
                flexDirection: 'row-reverse',
                gap: 6,
                alignItems: 'center',
              }}
            >
              {items.map((icon, idx) => (
                <MotiView
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0, translateX: -10 }}
                  from={{ opacity: 0, translateX: -10 }}
                  key={idx}
                  transition={{
                    type: 'timing',
                    duration: 100,
                    delay: 50 * idx,
                  }}
                >
                  <IconButton icon={icon} onPress={EMPTY_FUNCTION} />
                </MotiView>
              ))}
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </MotiView>
  )
}

export default SideMenu
