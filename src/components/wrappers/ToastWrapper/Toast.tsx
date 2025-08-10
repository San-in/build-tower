import RNToast from 'react-native-toast-message'

const originalShow = RNToast.show

RNToast.show = (options) => {
  originalShow({
    visibilityTime: 2000,
    autoHide: true,
    onPress: () => RNToast.hide(),
    ...options,
  })
}

export default RNToast
