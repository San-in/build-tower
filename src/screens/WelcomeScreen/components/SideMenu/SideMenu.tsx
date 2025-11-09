import {
  AwardsIcon,
  CalendarIcon,
  MarketIcon,
  MenuIcon,
  SettingsIcon,
} from '@assets/icons'
import { IconButton } from '@components/atoms'
import { AnimatePresence, MotiView } from 'moti'
import { FC, useMemo, useState } from 'react'
import { View } from 'react-native'

import { styles } from './SideMenu.styles'
import { SideMenuProps } from './SideMenu.types'

const ICON_SIZE = 35
const ICON_MENU_SIZE = 40

const SideMenu: FC<SideMenuProps> = ({
  handleCalendar,
  handleSettings,
  handleAwards,
  handleMarket,
}) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)

  const items = useMemo(
    () => [
      {
        icon: <SettingsIcon height={ICON_SIZE} key="i1" width={ICON_SIZE} />,
        callback: handleSettings,
      },
      {
        icon: <CalendarIcon height={ICON_SIZE} key="i2" width={ICON_SIZE} />,
        callback: handleCalendar,
      },
      {
        icon: <AwardsIcon height={ICON_SIZE} key="i3" width={ICON_SIZE} />,
        callback: handleAwards,
      },
      {
        icon: <MarketIcon height={ICON_SIZE} key="i4å" width={ICON_SIZE} />,
        callback: handleMarket,
      },
    ],
    [handleAwards, handleCalendar, handleMarket, handleSettings]
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
            style={styles.menuListContainer}
            transition={{ type: 'timing', duration: 180 }}
          >
            <View style={styles.menuListContent}>
              {items.map(({ icon, callback }, idx) => (
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
                  <IconButton icon={icon} onPress={callback} />
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
