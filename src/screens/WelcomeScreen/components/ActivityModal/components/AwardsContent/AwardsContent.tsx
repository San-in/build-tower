import { OutlinedText } from '@components/atoms'
import { useAppSelector } from '@store/hooks'
import { selectAwardsDetails } from '@store/slices/awardsSlice'
import { COLORS } from '@theme'
import {
  formatLevelToRomanNum,
  formatTabletElementsSize,
  playSfx,
} from '@utils'
import React, { FC, memo, useState } from 'react'
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native'

import { AwardBottomSheet } from '../../../AwardBottomSheet'
import { styles } from './AwardsContent.styles'
import { AWARD_TYPE } from './config'

const AwardsContent: FC = () => {
  const { height } = useWindowDimensions()
  const [selected, setSelected] = useState<{
    isVisible: boolean
    type: AWARD_TYPE | null
  }>({
    isVisible: false,
    type: null,
  })

  const awardsDetails = useAppSelector(selectAwardsDetails)

  // Live progress for the open sheet, so claiming updates it (gift → check)
  // without reopening.
  const selectedProgress = selected.type
    ? (awardsDetails.find(({ progress }) => progress.type === selected.type)
        ?.progress ?? null)
    : null

  const handleOpenAward = (type: AWARD_TYPE) => {
    playSfx('power_up')
    setSelected({ isVisible: true, type })
  }

  const handleCloseSheet = () => {
    setSelected((prevState) => ({ ...prevState, isVisible: false }))
  }

  return (
    <>
      <ScrollView
        style={[
          styles.contentContainer,
          {
            minHeight: height * 0.4,
            maxHeight: height * 0.7,
          },
        ]}
      >
        <View style={styles.grid}>
          {awardsDetails.map(({ config, progress, hasUnclaimedPrize }) => {
            const { icon, maxLevel } = config
            const { currentLevel, type } = progress
            const isUnblocked = Boolean(currentLevel)
            const iconOpacity = isUnblocked ? 1 : 0.7
            const isMaxLevelReached = currentLevel === maxLevel

            return (
              <Pressable
                key={type}
                onPress={() => handleOpenAward(type)}
                style={({ pressed }) => [
                  styles.card,
                  hasUnclaimedPrize
                    ? styles.unclaimedBorder
                    : isMaxLevelReached && styles.maxedBorder,
                  {
                    backgroundColor: pressed
                      ? COLORS.codeGrey40
                      : COLORS.codeGrey20,
                    shadowColor: isUnblocked ? COLORS.yellow : COLORS.codeGrey,
                  },
                ]}
              >
                <View style={[styles.iconWrapper, { opacity: iconOpacity }]}>
                  {icon}
                </View>
                <View
                  style={[styles.romanBadge, { opacity: Number(isUnblocked) }]}
                >
                  <OutlinedText fontSize={formatTabletElementsSize(15, 2.5)}>
                    {formatLevelToRomanNum(currentLevel)}
                  </OutlinedText>
                </View>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
      <AwardBottomSheet
        isVisible={selected.isVisible}
        onClose={handleCloseSheet}
        progress={selectedProgress}
      />
    </>
  )
}
export default memo(AwardsContent)
