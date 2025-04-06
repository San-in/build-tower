import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  activeBackground: {
    backgroundColor: COLORS.serenade,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  icon: {
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 2,
    borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 100,
    height: 40,
    justifyContent: 'center',
    padding: 11,
    width: 40,
  },
  inactiveBackground: {
    backgroundColor: COLORS.white,
  },
  label: {
    color: COLORS.vanCleef,
    flexShrink: 1,
    maxWidth: '100%',
  },
})
