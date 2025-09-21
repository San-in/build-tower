import { StyleSheet } from 'react-native'
export const FONT_FAMILY = {
  regular: 'BellGothicBlack',
  bold: 'BellGothicBold',
}

export const TextStyles = StyleSheet.create({
  buttonLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 21,
  },
  main_l: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 21,
  },
  main_m: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
  },
  main_s: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 18,
  },
  title_l: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 36,
  },
  title_m: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 32,
  },
  title_s: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 21,
  },
})
