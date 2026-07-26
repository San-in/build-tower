import * as Device from 'expo-device'
import { Platform } from 'react-native'

export const IS_TABLET =
  Device.deviceType === Device.DeviceType.TABLET ||
  (Platform.OS === 'ios' && Platform.isPad)
