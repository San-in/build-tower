import { GameStack } from '@navigation/GameStack'
import { NavigationContainer } from '@react-navigation/native'
import { RootStackWrapper } from '@components/wrappers'

const App = () => (
  <NavigationContainer>
    <RootStackWrapper>
      <GameStack />
    </RootStackWrapper>
  </NavigationContainer>
)

export default App
