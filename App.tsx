import { RootStackWrapper } from '@components/RootStackWrapper'
import { GameStack } from '@navigation/GameStack'
import { NavigationContainer } from '@react-navigation/native'

const App = () => (
    <NavigationContainer>
      <RootStackWrapper>
        <GameStack/>
      </RootStackWrapper>
    </NavigationContainer>
)

export default App
