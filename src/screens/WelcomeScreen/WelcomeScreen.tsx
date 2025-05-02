import {
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native'
import { COLORS, GlobalStyles } from '@theme'
import { Button, LevelCard } from '@components/ui'
import { useNavigation } from '@react-navigation/core'
import { NavigationProp } from '@react-navigation/native'
import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { AnimatePresence, MotiImage, MotiView } from 'moti'
import { OutlinedText } from '@components/ui/OutlinedText'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BUTTON_TYPE, LevelId, SCREENS } from '@types'
import { BackColorIcon, BananasIcon, SettingsIcon } from '@assets/icons'
import { LEVEL_CARD_GAP, LEVEL_CARD_WIDTH, TOTAL_LEVELS } from '@constants'
import { useAppSelector } from '@store/hooks'
import { getAllAvailableLevels } from '@store/slices/levelsSlice'
import { styles } from './WelcomeScreen.styles'

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<GameStackParamList>>()
  const availableLevels = useAppSelector(getAllAvailableLevels)
  const bananas = useAppSelector((state) => state.bananas.bananas)
  const backgroundImage = require('../../../assets/images/background.png')
  const foregroundImage = require('../../../assets/images/splash.png')

  const { width } = useWindowDimensions()
  const scrollViewRef = useRef<ScrollView>(null)
  const [isStarted, setStarted] = useState(false)
  const [chooseLevelModalVisible, setChooseLevelModalVisible] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<number>(
    availableLevels.length
  )
  const isLetsGoButtonDisabled = useMemo(
    () => selectedLevel > availableLevels.length,
    [selectedLevel, availableLevels]
  )
  const handleCloseModal = () => {
    setChooseLevelModalVisible(false)
  }

  const handleLetsGoButtonPress = () => {
    navigation.navigate(SCREENS.GameScreen)
    setImmediate(() => {
      handleCloseModal()
    })
  }

  const handleStartButtonPress = () => {
    setChooseLevelModalVisible(true)
    setStarted(true)
  }

  useEffect(() => {
    if (chooseLevelModalVisible) {
      const translationLength =
        (selectedLevel - 1) * (LEVEL_CARD_WIDTH + LEVEL_CARD_GAP)

      const timeout = setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: translationLength,
            animated: true,
          })
        }
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [chooseLevelModalVisible])

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode={'cover'}
      style={styles.backgroundImage}
    >
      <MotiImage
        source={foregroundImage}
        style={styles.foregroundImage}
        resizeMode="cover"
        animate={{ opacity: isStarted ? 0 : 1 }}
        transition={{ type: 'timing', duration: 300, delay: 100 }}
      />
      <MotiView
        style={styles.iconsContainer}
        animate={{ opacity: isStarted ? 0 : 1 }}
        transition={{ type: 'timing', duration: 300, delay: 100 }}
      >
        <Pressable
          onPress={() => {}}
          style={({ pressed }: { pressed: boolean }) => [
            styles.iconContainer,
            pressed && styles.iconContainerPressed,
          ]}
        >
          <SettingsIcon width={32} height={32} />
        </Pressable>
      </MotiView>
      <SafeAreaView style={GlobalStyles.centeredContainer}>
        <Modal
          animationType="slide"
          onRequestClose={handleCloseModal}
          transparent={true}
          visible={chooseLevelModalVisible}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Pressable
                onPress={() => {
                  setStarted(false)
                  setChooseLevelModalVisible(false)
                }}
                style={({ pressed }: { pressed: boolean }) => [
                  styles.backIcon,
                  pressed && styles.backIconPressed,
                ]}
              >
                <BackColorIcon width={36} height={36} />
              </Pressable>
              <View style={styles.bananasCounter}>
                <OutlinedText fontSize={25}>{`${bananas}`}</OutlinedText>
                <BananasIcon width={25} height={25} transform="scale(-1,1)" />
              </View>
            </View>

            <View style={styles.modalContentContainer}>
              <OutlinedText>Choose level</OutlinedText>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.levelsList,
                  {
                    paddingHorizontal: width / 2 - LEVEL_CARD_WIDTH / 2,
                  },
                ]}
              >
                {Array.from({ length: TOTAL_LEVELS }, (_, i) => i).map(
                  (item) => {
                    const level = (item + 1) as LevelId
                    const isSelectedLevel = level === selectedLevel
                    return (
                      <LevelCard
                        key={item}
                        onPress={() => setSelectedLevel(level)}
                        isSelectedLevel={isSelectedLevel}
                        level={level}
                      />
                    )
                  }
                )}
              </ScrollView>

              <Button
                isDisabled={isLetsGoButtonDisabled}
                title="Let's go"
                onPress={handleLetsGoButtonPress}
                textSize={22}
                type={BUTTON_TYPE.Warning}
                style={styles.letsGoButton}
              />
            </View>
          </View>
        </Modal>
        <AnimatePresence>
          {!isStarted && (
            <>
              <MotiView
                style={styles.title}
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: {
                    delay: 100,
                    duration: 100,
                  },
                }}
                exitTransition={{
                  opacity: {
                    duration: 300,
                  },
                }}
              >
                <OutlinedText
                  fontSize={60}
                  color={COLORS.yellow}
                  strokeColor={COLORS.brown}
                  offset={5}
                >
                  BuildTower
                </OutlinedText>
              </MotiView>
              <MotiView
                key="start-button"
                style={styles.startButton}
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: {
                    delay: 700,
                    duration: 500,
                  },
                }}
                exitTransition={{
                  opacity: {
                    duration: 300,
                  },
                }}
              >
                <Button
                  title="Start"
                  onPress={handleStartButtonPress}
                  textSize={32}
                />
              </MotiView>
            </>
          )}
        </AnimatePresence>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default WelcomeScreen
