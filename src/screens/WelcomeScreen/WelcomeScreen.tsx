import { BackColorIcon, BananasIcon, SettingsIcon } from '@assets/icons'
import { Button, IconButton, OutlinedText } from '@components/atoms'
import { LevelCard } from '@components/molecules'
import {
  EMPTY_FUNCTION,
  LEVEL_CARD_GAP,
  LEVEL_CARD_WIDTH,
  TOTAL_LEVELS,
} from '@constants'
import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { useNavigation } from '@react-navigation/core'
import { NavigationProp } from '@react-navigation/native'
import { useAppSelector } from '@store/hooks'
import { getAllAvailableLevels } from '@store/slices/levelsSlice'
import { COLORS, GlobalStyles } from '@theme'
import { BUTTON_TYPE, LevelId, SCREENS } from '@types'
import { AnimatePresence, MotiImage, MotiView } from 'moti'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native'

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
  const [selectedLevel, setSelectedLevel] = useState<LevelId>(
    availableLevels.length as LevelId
  )

  const isLetsGoButtonDisabled = useMemo(
    () => selectedLevel > availableLevels.length,
    [selectedLevel, availableLevels]
  )
  const handleCloseModal = () => {
    setChooseLevelModalVisible(false)
  }

  const handleGoBackPressed = () => {
    setStarted(false)
    handleCloseModal()
  }

  const handleLetsGoButtonPress = () => {
    navigation.navigate(SCREENS.GameScreen, { level: selectedLevel })
    setImmediate(() => {
      handleCloseModal()
    })
  }

  const handleStartButtonPress = () => {
    setChooseLevelModalVisible(true)
    setStarted(true)
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined

    if (chooseLevelModalVisible) {
      const translationLength =
        (selectedLevel - 1) * (LEVEL_CARD_WIDTH + LEVEL_CARD_GAP)

      timeout = setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: translationLength,
          animated: true,
        })
      }, 100)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [chooseLevelModalVisible, selectedLevel])

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={backgroundImage}
      style={styles.backgroundImage}
    >
      <MotiImage
        animate={{ opacity: isStarted ? 0 : 1 }}
        resizeMode="cover"
        source={foregroundImage}
        style={styles.foregroundImage}
        transition={{ type: 'timing', duration: 100, delay: 0 }}
      />
      <MotiView
        animate={{ opacity: isStarted ? 0 : 1 }}
        style={styles.iconsContainer}
        transition={{ type: 'timing', duration: 100, delay: 0 }}
      >
        <IconButton
          icon={<SettingsIcon height={30} width={30} />}
          onPress={EMPTY_FUNCTION}
        />
      </MotiView>
      <SafeAreaView style={GlobalStyles.centeredContainer}>
        <Modal
          animationType="fade"
          onRequestClose={handleCloseModal}
          transparent={true}
          visible={chooseLevelModalVisible}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <IconButton
                icon={<BackColorIcon height={36} width={36} />}
                onPress={handleGoBackPressed}
                pressedStyles={styles.backIconPressed}
                style={GlobalStyles.transparent}
              />
              <View style={styles.bananasCounter}>
                <OutlinedText fontSize={25}>{`${bananas}`}</OutlinedText>
                <BananasIcon height={35} width={35} />
              </View>
            </View>

            <View style={styles.modalContentContainer}>
              <OutlinedText>Choose level</OutlinedText>
              <ScrollView
                horizontal
                contentContainerStyle={[
                  styles.levelsList,
                  {
                    paddingHorizontal: width / 2 - LEVEL_CARD_WIDTH / 2,
                  },
                ]}
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
              >
                {Array.from({ length: TOTAL_LEVELS }, (_, i) => i).map(
                  (item) => {
                    const level = (item + 1) as LevelId
                    const isSelectedLevel = level === selectedLevel
                    return (
                      <LevelCard
                        isSelectedLevel={isSelectedLevel}
                        key={item}
                        level={level}
                        onPress={() => setSelectedLevel(level)}
                      />
                    )
                  }
                )}
              </ScrollView>

              <Button
                isDisabled={isLetsGoButtonDisabled}
                onPress={handleLetsGoButtonPress}
                style={styles.letsGoButton}
                textSize={22}
                title="LET'S GO"
                type={BUTTON_TYPE.Warning}
              />
            </View>
          </View>
        </Modal>
        <AnimatePresence>
          {!isStarted && (
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
                style={styles.title}
                transition={{
                  opacity: {
                    delay: 100,
                    duration: 100,
                  },
                }}
              >
                <OutlinedText
                  color={COLORS.yellow}
                  fontSize={60}
                  offset={5}
                  strokeColor={COLORS.brown}
                >
                  BuildTower
                </OutlinedText>
              </MotiView>
              <MotiView
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                exitTransition={{
                  opacity: {
                    duration: 300,
                  },
                }}
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
            </>
          )}
        </AnimatePresence>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default WelcomeScreen
