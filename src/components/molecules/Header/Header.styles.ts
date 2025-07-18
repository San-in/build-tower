import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  actionButtonsContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 5,
    marginLeft: 'auto',
  },
  bananasContainer: {
    alignItems: 'center',
    borderColor: COLORS.yellow,
    borderRadius: 18,
    borderWidth: 4,
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 5,
  },
  bananasExternalContainer: {
    borderColor: COLORS.white60,
    borderRadius: 22,
    borderWidth: 4,
  },
  container: {
    alignItems: 'flex-end',
    elevation: 3,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    marginTop: -5,
    paddingHorizontal: 16,
    shadowColor: COLORS.codeGrey,
    shadowOffset: { width: 5, height: 3 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'flex-start',
    flexGrow: 1,
    gap: 5,
  },
  gradientContainer: {
    alignItems: 'center',
    borderColor: COLORS.roseWhite,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
  },
  powerUp: {
    borderColor: COLORS.codeGrey,
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    position: 'relative',
    width: 30,
  },
  powerUpContent: { bottom: 4 },
  powerUpCounter: { position: 'absolute', right: -1, top: -8 },
  powerUpPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.9 }],
  },
  powerUpsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
})
