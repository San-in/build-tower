import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { flex: 1 },
  buttonContent: { paddingHorizontal: 5 },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    marginTop: 25,
    width: '100%',
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
    borderWidth: 1,
    gap: 10,
  },
  cardContainer: { flexBasis: '30%' },
  cardContent: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.codeGrey20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 25,
    width: '100%',
  },
  container: { marginTop: 10, width: '100%' },
  infoMessageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 30,
  },
  powerUp: { alignItems: 'center', gap: 5, paddingBottom: 5 },
})
