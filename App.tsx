import { RootStackWrapper } from '@components/wrappers'
import { GameStack } from '@navigation/GameStack'
import { SettingsProvider } from '@providers'
import { NavigationContainer } from '@react-navigation/native'
import { store } from '@store/index'
import { Platform, UIManager } from 'react-native'
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
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer>
          <RootStackWrapper>
            <GameStack />
          </RootStackWrapper>
        </NavigationContainer>
      </SafeAreaProvider>
    </ReduxProvider>
  </SettingsProvider>
)

export default App
