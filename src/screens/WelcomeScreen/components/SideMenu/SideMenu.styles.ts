import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: 5,
    position: 'absolute',
    right: 20,
    top: 0,
    zIndex: 5,
  },
  menuListContainer: { borderRadius: 12, marginLeft: 8, overflow: 'visible' },
  menuListContent: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: 6,
  },
})
