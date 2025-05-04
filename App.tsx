import { RootStackWrapper } from '@components/wrappers'
import { GameStack } from '@navigation/GameStack'
import { NavigationContainer } from '@react-navigation/native'
import { store } from '@store/index'
import { Platform, UIManager } from 'react-native'
import { Provider } from 'react-redux'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const App = () => (
  <NavigationContainer>
    <Provider store={store}>
      <RootStackWrapper>
        <GameStack />
      </RootStackWrapper>
    </Provider>
  </NavigationContainer>
)

export default App
