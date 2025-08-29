import Toast, { ToastShowParams } from 'react-native-toast-message'

const CustomToast = (options: ToastShowParams) =>
  Toast.show({
    visibilityTime: 1500,
    autoHide: true,
    ...options,
  })

export default CustomToast
