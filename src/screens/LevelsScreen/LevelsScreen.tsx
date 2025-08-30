import { BackColorIcon, BananasIcon } from '@assets/icons'
import { BackgroundImg, LockImg } from '@assets/images'
import { Button, IconButton, OutlinedText } from '@components/atoms'
import { LevelCard } from '@components/molecules'
import { LEVEL_CARD_GAP, LEVEL_CARD_WIDTH, TOTAL_LEVELS } from '@constants'
import { useAssetPreload, useAssetsReady } from '@hooks'
import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { useNavigation } from '@react-navigation/core'
import { NavigationProp } from '@react-navigation/native'
import { useAppSelector } from '@store/hooks'
import { getAllAvailableLevels } from '@store/slices/levelsSlice'
import { COLORS, GlobalStyles } from '@theme'
import { BUTTON_TYPE, LevelId, SCREENS } from '@types'
import { getLevelIcon } from '@utils'
import { Image } from 'expo-image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  FlatList,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { styles } from './LevelScreen.styles'

const ITEM_WIDTH = LEVEL_CARD_WIDTH
const ITEM_GAP = LEVEL_CARD_GAP
const ITEM_SIZE = ITEM_WIDTH + ITEM_GAP
const ASSET_KEYS = {
  BG: 'background',
  ASSETS: 'assets',
}

const LevelsScreen = () => {
  const availableLevels = useAppSelector(getAllAvailableLevels)
  const bananas = useAppSelector(({ bananas }) => bananas.bananas)

  const navigation = useNavigation<NavigationProp<GameStackParamList>>()
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()

  const listRef = useRef<FlatList<LevelId>>(null)
  const didInitialCenter = useRef(false)

  const [selectedLevel, setSelectedLevel] = useState<LevelId>(
    (Math.min(availableLevels.length, TOTAL_LEVELS) || 1) as LevelId
  )

  const preloadList = useMemo(
    () => [
      BackgroundImg,
      LockImg,
      ...Array.from({ length: TOTAL_LEVELS }, (_, i) =>
        getLevelIcon((i + 1) as LevelId)
      ),
    ],
    []
  )
  const { ready: assetsReady } = useAssetPreload(preloadList)
  const { ready: contentVisible, done: assetLoaded } = useAssetsReady(
    Object.values(ASSET_KEYS)
  )

  const data = useMemo(
    () => Array.from({ length: TOTAL_LEVELS }, (_, i) => (i + 1) as LevelId),
    []
  )
  const sideSpacer = useMemo(
    () => Math.max(0, width / 2 - ITEM_WIDTH / 2),
    [width]
  )

  const isLetsGoButtonDisabled = useMemo(
    () => selectedLevel > availableLevels.length,
    [selectedLevel, availableLevels]
  )

  const handleGoBackPressed = () => navigation.goBack()
  const handleLetsGoButtonPress = () => {
    navigation.navigate(SCREENS.GameScreen, { level: selectedLevel })
  }

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: ITEM_SIZE,
      offset: ITEM_SIZE * index,
      index,
    }),
    []
  )

  const getOffsetForIndex = useCallback(
    (index: number) => Math.max(0, index * ITEM_SIZE),
    []
  )

  const handleListLayout = useCallback(() => {
    if (didInitialCenter.current) {
      return
    }
    const index = Math.max(0, selectedLevel - 1)
    const offset = getOffsetForIndex(index)
    listRef.current?.scrollToOffset({ offset, animated: false })
    didInitialCenter.current = true
  }, [selectedLevel, getOffsetForIndex])

  const handleSelectLevel = useCallback(
    (level: LevelId) => {
      setSelectedLevel(level)
      const offset = getOffsetForIndex(level - 1)
      listRef.current?.scrollToOffset({ offset, animated: true })
    },
    [getOffsetForIndex]
  )

  useEffect(() => {
    if (assetsReady) {
      assetLoaded(ASSET_KEYS.ASSETS)
    }
  }, [assetLoaded, assetsReady])

  useEffect(() => {
    if (!didInitialCenter.current) {
      return
    }
    const index = Math.max(0, selectedLevel - 1)
    const offset = getOffsetForIndex(index)
    listRef.current?.scrollToOffset({ offset, animated: true })
  }, [width, selectedLevel, getOffsetForIndex])

  const renderItem = useCallback(
    ({ item: level }: { item: LevelId }) => {
      const isSelectedLevel = level === selectedLevel
      return (
        <LevelCard
          isSelectedLevel={isSelectedLevel}
          level={level}
          onPress={() => handleSelectLevel(level)}
        />
      )
    },
    [selectedLevel, handleSelectLevel]
  )

  const keyExtractor = useCallback((lvl: LevelId) => String(lvl), [])

  return (
    <View style={styles.backgroundImage}>
      <Image
        allowDownscaling
        cachePolicy="disk"
        contentFit="cover"
        onError={() => assetLoaded(ASSET_KEYS.BG)}
        onLoadEnd={() => assetLoaded(ASSET_KEYS.BG)}
        placeholder={COLORS.backgroundBlue}
        priority="high"
        source={BackgroundImg}
        style={StyleSheet.absoluteFill}
        transition={0}
      />

      <View
        pointerEvents={contentVisible ? 'auto' : 'none'}
        style={[
          styles.contentContainer,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            opacity: Number(contentVisible),
          },
        ]}
      >
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
          <OutlinedText style={styles.title}>Choose level</OutlinedText>

          <FlatList
            horizontal
            removeClippedSubviews
            ItemSeparatorComponent={() => <View style={{ width: ITEM_GAP }} />}
            ListFooterComponent={<View style={{ width: sideSpacer }} />}
            ListHeaderComponent={<View style={{ width: sideSpacer }} />}
            contentContainerStyle={styles.levelsList}
            data={data}
            decelerationRate={Platform.select({
              ios: 'normal',
              android: 'fast',
            })}
            getItemLayout={getItemLayout}
            initialNumToRender={10}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={8}
            onLayout={handleListLayout}
            onScrollToIndexFailed={({ index }) => {
              requestAnimationFrame(() => {
                const offset = getOffsetForIndex(index)
                listRef.current?.scrollToOffset({ offset, animated: false })
              })
            }}
            ref={listRef}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            updateCellsBatchingPeriod={16}
            windowSize={7}
          />
        </View>
        <View
          style={[
            styles.buttonContainer,
            {
              bottom: insets.bottom + 24,
            },
          ]}
        >
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
    </View>
  )
}

export default LevelsScreen
