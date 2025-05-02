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
    position: 'relative',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  textButton: { color: COLORS.tango },
  textButtonDisabled: { color: COLORS.codeGrey50 },
  textButtonFilled: { color: COLORS.white },
  gradientBackground: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
})
