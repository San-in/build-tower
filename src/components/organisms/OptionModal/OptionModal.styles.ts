import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  actionTextContainer: { alignItems: 'center', flexDirection: 'row', gap: 5 },
  actionTextIcon: { fontSize: 30 },
  background: {
    backgroundColor: COLORS.codeGrey70,
  },
  container: {
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'space-between',
    maxWidth: 520,
    padding: 24,
    position: 'relative',
  },
  subTitle: { marginBottom: 30 },
  titleContainer: { alignItems: 'center', flexDirection: 'row', gap: 10 },
})
