import { Z_INDEX_TYPE } from '@constants'
import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  currentBtn: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    gap: 4,
    height: 34,
    paddingTop: 5,
    padding: 5,
  },
  currentBtnDisabled: {
    backgroundColor: COLORS.codeGrey40,
    borderWidth: 1,
  },
  dropdown: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.codeGrey20,
    borderRadius: 8,
    gap: 4,
    overflow: 'hidden',

    paddingVertical: 4,
    position: 'absolute',
    right: 0,
    top: -15,
    width: 'auto',
    zIndex: Z_INDEX_TYPE.extra_high,
  },
  dropdownWrapper: {
    position: 'relative',
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
  },
  itemActive: {
    backgroundColor: COLORS.codeGrey20,
    borderRadius: 6,
  },
  warningText: { alignItems: 'flex-end', marginTop: 5 },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
  },
})
