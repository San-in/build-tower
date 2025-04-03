
import { GlobalStyles } from '@theme'
import { FC } from 'react'
import {  SafeAreaView, Text, View } from 'react-native'


const GameScreen: FC = () => (
    <SafeAreaView style={GlobalStyles.safeAreaContainer}>
   <View><Text>Game Screen</Text></View>
    </SafeAreaView>
  )

export default GameScreen
