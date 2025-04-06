import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  arrowDropIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
  },
  checkIconContainer: { marginLeft: 'auto' },
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  countyCodeContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  dropdown: {
    backgroundColor: COLORS.serenade,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: 162,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 62,
    zIndex: 3,
  },
  dropdownContainer: {
    paddingBottom: 20,
  },
  iconContainer: { marginTop: 18, width: 24 },
  input: {
    alignItems: 'center',
    borderColor: COLORS.codeGrey70,
    borderRadius: 8,
    borderWidth: 1,
    color: COLORS.codeGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 200,
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 17.5,
  },
  inputContainer: { flex: 1, position: 'relative' },
  inputDisabled: {
    borderColor: COLORS.codeGrey20,
    color: COLORS.codeGrey40,
  },
  inputFocused: {
    borderColor: COLORS.tango,
    borderWidth: 3,
  },
  inputFocusedInvalid: {
    borderColor: COLORS.roofTerracotta,
    borderWidth: 3,
  },
  inputInvalid: {
    borderColor: COLORS.roofTerracotta,
    color: COLORS.roofTerracotta,
  },
  label: {
    backgroundColor: COLORS.white,
    color: COLORS.codeGrey70,
    left: 16,
    paddingHorizontal: 4,
    position: 'absolute',
    zIndex: 2,
  },
  labelDisabled: {
    color: COLORS.codeGrey40,
  },
  labelFocused: {
    color: COLORS.tango,
  },
  labelInvalid: {
    color: COLORS.roofTerracotta,
  },
  option: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 18,
    paddingHorizontal: 50,
    paddingTop: 17,
  },
  optionCountry: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 18,
    paddingHorizontal: 16,
    paddingTop: 17,
  },
  optionSelected: {
    backgroundColor: COLORS.tuftBush,
    paddingHorizontal: 16,
  },
  phoneDropdown: {
    height: 122,
    left: -2,
    right: -2,
    top: 60,
  },
  phoneIconContainer: { marginTop: 20, width: 24 },
  phoneInputContainer: {
    borderColor: COLORS.codeGrey70,
    borderRadius: 8,
    borderWidth: 1,
    color: COLORS.codeGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 2,
    position: 'relative',
  },
  phoneInputText: {
    flex: 1,
    marginLeft: 5,
    paddingVertical: 16,
    transform: [{ translateY: -1.2 }],
  },
  phoneLabel: { left: 35 },
  scrollViewContainer: {
    maxHeight: 150,
  },
  selectCountryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  separateLine: {
    backgroundColor: COLORS.codeGrey40,
    height: '60%',
    width: 1,
  },
  supportingText: {
    color: COLORS.codeGrey70,
    marginLeft: 16,
    marginTop: 4,
  },
  supportingTextDisabled: {
    color: COLORS.codeGrey30,
  },
  supportingTextError: {
    color: COLORS.roofTerracotta,
  },
  textDisabled: {
    color: COLORS.codeGrey40,
  },
  textEnabled: {
    color: COLORS.codeGrey,
  },
  textError: {
    color: COLORS.roofTerracotta,
  },
  textPlaceholder: {
    color: COLORS.codeGrey50,
  },
  transparentBorder: {
    borderColor: 'transparent',
    borderWidth: 2,
  },
})
