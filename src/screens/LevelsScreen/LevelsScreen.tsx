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
import { selectBananas } from '@store/slices/bananasSlice'
import { selectAvailableLevels } from '@store/slices/levelsSlice'
import { GlobalStyles } from '@theme'
import { BUTTON_TYPE, LevelId, SCREENS } from '@types'
import { formatTabletElementsSize, getLevelIcon } from '@utils'
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

const separatorStyle = { width: ITEM_GAP }
const ItemSeparator = () => <View style={separatorStyle} />

const LevelsScreen = () => {
  const availableLevels = useAppSelector(selectAvailableLevels)
  const bananas = useAppSelector(selectBananas)

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

  const handleBgLoaded = useCallback(
    () => assetLoaded(ASSET_KEYS.BG),
    [assetLoaded]
  )

  const handleScrollToIndexFailed = useCallback(
    ({ index }: { index: number }) => {
      requestAnimationFrame(() => {
        const offset = getOffsetForIndex(index)
        listRef.current?.scrollToOffset({ offset, animated: false })
      })
    },
    [getOffsetForIndex]
  )

  return (
    <View style={styles.backgroundImage}>
      <Image
        allowDownscaling
        cachePolicy="disk"
        contentFit="cover"
        onError={handleBgLoaded}
        onLoadEnd={handleBgLoaded}
        priority="high"
        source={BackgroundImg}
        style={[StyleSheet.absoluteFill, styles.image]}
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
            icon={
              <BackColorIcon
                height={formatTabletElementsSize(36)}
                width={formatTabletElementsSize(36)}
              />
            }
            onPress={handleGoBackPressed}
            pressedStyles={styles.backIconPressed}
            style={GlobalStyles.transparent}
          />
          <View style={styles.bananasCounter}>
            <OutlinedText
              fontSize={formatTabletElementsSize(35)}
            >{`${bananas}`}</OutlinedText>
            <BananasIcon
              height={formatTabletElementsSize(55, 1.5)}
              width={formatTabletElementsSize(55, 1.5)}
            />
          </View>
        </View>

        <View style={styles.modalContentContainer}>
          <OutlinedText
            adjustsFontSizeToFit
            containerStyle={styles.titleContainer}
            fontSize={formatTabletElementsSize(32)}
            numberOfLines={1}
            style={styles.title}
          >
            Choose level
          </OutlinedText>

          <FlatList
            horizontal
            removeClippedSubviews
            ItemSeparatorComponent={ItemSeparator}
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
            onScrollToIndexFailed={handleScrollToIndexFailed}
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
              bottom: insets.bottom + formatTabletElementsSize(24),
            },
          ]}
        >
          <Button
            isDisabled={isLetsGoButtonDisabled}
            onPress={handleLetsGoButtonPress}
            style={styles.letsGoButton}
            textSize={formatTabletElementsSize(22)}
            title="LET'S GO"
            type={BUTTON_TYPE.Warning}
          />
        </View>
      </View>
    </View>
  )
}

export default LevelsScreen
