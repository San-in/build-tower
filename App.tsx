import { PerformanceBadge } from '@components/atoms'
import { RootStackWrapper } from '@components/wrappers'
import { GameStack } from '@navigation/GameStack'
import { SettingsProvider } from '@providers'
import { NavigationContainer } from '@react-navigation/native'
import { store } from '@store/index'
import * as SplashScreen from 'expo-splash-screen'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'

void SplashScreen.preventAutoHideAsync()

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
          <PerformanceBadge />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ReduxProvider>
  </SettingsProvider>
)

const styles = StyleSheet.create({
  gestureHandlerContainer: { flex: 1 },
})

export default App
