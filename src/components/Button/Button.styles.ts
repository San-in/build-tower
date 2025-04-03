import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  buttonFilled: { backgroundColor: COLORS.tango },
  buttonFilledDisabled: { backgroundColor: COLORS.swirl },
  buttonFilledPressed: { backgroundColor: COLORS.tango90 },
  buttonOutlined: { borderColor: COLORS.thatch, borderWidth: 1 },
  buttonOutlinedDisabled: { borderColor: COLORS.swirl, borderWidth: 1 },
  buttonOutlinedPressed: {
    backgroundColor: COLORS.serenade,
    borderColor: COLORS.thatch,
    borderWidth: 1,
  },
  buttonText: { backgroundColor: 'transparent' },
  buttonTextDisabled: { backgroundColor: 'transparent' },
  buttonTextPressed: { backgroundColor: COLORS.serenade },
  container: {
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 24.5,
    paddingVertical: 14.5,
  },
  textButton: { color: COLORS.tango },
  textButtonDisabled: { color: COLORS.codeGrey50 },
  textButtonFilled: { color: COLORS.white },
})
