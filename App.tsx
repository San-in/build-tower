import { RootStackWrapper } from '@components/wrappers'
import { GameStack } from '@navigation/GameStack'
import { SettingsProvider } from '@providers'
import { NavigationContainer } from '@react-navigation/native'
import { store } from '@store/index'
import { Platform, StyleSheet, UIManager } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const App = () => (
  <SettingsProvider>
    <ReduxProvider store={store}>
      <GestureHandlerRootView style={styles.gestureHandlerContainer}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <NavigationContainer>
            <RootStackWrapper>
              <GameStack />
            </RootStackWrapper>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ReduxProvider>
  </SettingsProvider>
)

const styles = StyleSheet.create({
  gestureHandlerContainer: { flex: 1 },
})

export default App
