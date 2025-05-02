import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GameScreen, WelcomeScreen } from '@screens'
import { SCREENS } from '@types'
import React from 'react'

const Stack = createNativeStackNavigator<GameStackParamList>()

const GameStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      component={WelcomeScreen}
      name={SCREENS.WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={GameScreen}
      name={SCREENS.GameScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)

export default GameStack
