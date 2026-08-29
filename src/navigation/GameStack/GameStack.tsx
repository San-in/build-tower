import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GameScreen, LevelsScreen, WelcomeScreen } from '@screens'
import { SCREENS } from '@types'
import React from 'react'

const Stack = createNativeStackNavigator<GameStackParamList>()

const GameStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
      freezeOnBlur: true,
    }}
  >
    <Stack.Screen
      component={WelcomeScreen}
      name={SCREENS.WelcomeScreen}
      // The persistent ActivityCalendar bottom sheet loses its native
      // gesture/Reanimated wiring across a react-freeze cycle: JS state
      // (isOpen, the ref, the effect) keeps working, but `.expand()` stops
      // reaching the sheet after this screen has been frozen and refocused.
      options={{ animation: 'fade', freezeOnBlur: false }}
    />
    <Stack.Screen
      component={GameScreen}
      name={SCREENS.GameScreen}
      options={{ animation: 'fade' }}
    />
    <Stack.Screen
      component={LevelsScreen}
      name={SCREENS.LevelsScreen}
      options={{ animation: 'fade', gestureEnabled: true }}
    />
  </Stack.Navigator>
)

export default GameStack
