import { IS_TABLET } from '@constants'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 1 },
  buttonContent: { paddingHorizontal: formatTabletElementsSize(5) },
  buttonsContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: formatTabletElementsSize(20, 3),
    justifyContent: 'space-between',
    marginTop: formatTabletElementsSize(25),
    width: IS_TABLET ? '70%' : '100%',
  },
  card: {
    elevation: 4,
    shadowColor: COLORS.codeGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardBackground: {
    alignItems: 'center',
    borderColor: COLORS.codeGrey20,
    borderRadius: 15,
    borderWidth: formatTabletElementsSize(1),
    gap: formatTabletElementsSize(10),
  },
  cardContainer: { flexBasis: '30%' },
  cardContent: {
    alignItems: 'center',
    borderBottomWidth: formatTabletElementsSize(1),
    borderColor: COLORS.codeGrey20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: formatTabletElementsSize(10),
    paddingVertical: formatTabletElementsSize(5),
    width: '100%',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: formatTabletElementsSize(10),
    justifyContent: 'space-between',
    marginBottom: formatTabletElementsSize(25),
    width: '100%',
  },
  container: {
    marginTop: formatTabletElementsSize(10),
    width: '100%',
  },
  infoMessageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: formatTabletElementsSize(75, 1),
  },
  powerUp: {
    alignItems: 'center',
    gap: formatTabletElementsSize(5),
    paddingBottom: formatTabletElementsSize(5),
  },
})
