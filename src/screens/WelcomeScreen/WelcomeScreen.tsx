import { Button, OutlinedText } from '@components/atoms'
import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { useNavigation } from '@react-navigation/core'
import { NavigationProp } from '@react-navigation/native'
import { COLORS, GlobalStyles } from '@theme'
import { SCREENS } from '@types'
import { AnimatePresence, MotiView } from 'moti'
import { ImageBackground, SafeAreaView } from 'react-native'

import { SideMenu } from './components'
import { styles } from './WelcomeScreen.styles'

const WelcomeScreen = () => {
  const foregroundImage = require('../../../assets/images/splash.png')
  const navigation = useNavigation<NavigationProp<GameStackParamList>>()

  const handleStartButtonPress = () => {
    navigation.navigate(SCREENS.LevelsScreen)
  }

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={foregroundImage}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={GlobalStyles.centeredContainer}>
        <AnimatePresence>
          <>
            <MotiView
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              exitTransition={{
                opacity: {
                  duration: 300,
                },
              }}
              from={{ opacity: 0 }}
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
              }}
              transition={{
                opacity: {
                  delay: 500,
                  duration: 100,
                },
              }}
            >
              <SideMenu />
              <OutlinedText
                color={COLORS.yellow}
                fontSize={60}
                offset={5}
                strokeColor={COLORS.brown}
                style={styles.title}
              >
                BuildTower
              </OutlinedText>
              <MotiView
                animate={{ opacity: 1 }}
                from={{ opacity: 0 }}
                key="start-button"
                style={styles.startButton}
                transition={{
                  opacity: {
                    delay: 500,
                    duration: 300,
                  },
                }}
              >
                <Button
                  onPress={handleStartButtonPress}
                  textSize={27}
                  title="START"
                />
              </MotiView>
            </MotiView>
          </>
        </AnimatePresence>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default WelcomeScreen
