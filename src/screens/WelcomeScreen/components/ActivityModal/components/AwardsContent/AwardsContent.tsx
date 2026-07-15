import { OutlinedText } from '@components/atoms'
import { useAppSelector } from '@store/hooks'
import {
  selectAwardsDetails,
  SingleAwardState,
} from '@store/slices/awardsSlice'
import { COLORS } from '@theme'
import { formatLevelToRomanNum } from '@utils'
import React, { FC, memo, useState } from 'react'
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native'

import { AwardBottomSheet } from '../../../AwardBottomSheet'
import { SuccessAwardClaimedModalProps } from '../../../SuccessAwardClaimedModal/SuccessAwardClaimedModal'
import { styles } from './AwardsContent.styles'

const AwardsContent: FC<{
  onAwardClaimModalShow: (
    data: Omit<SuccessAwardClaimedModalProps, 'onPress'>
  ) => void
}> = ({ onAwardClaimModalShow }) => {
  const { height } = useWindowDimensions()
  const [selectedAward, setSelectedAward] = useState<{
    isVisible: boolean
    progress: SingleAwardState | null
  }>({
    isVisible: false,
    progress: null,
  })

  const awardsDetails = useAppSelector(selectAwardsDetails)

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
          {awardsDetails.map(({ config: { icon }, progress }) => {
            const { currentLevel, type } = progress
            const isUnblocked = Boolean(currentLevel)
            const iconOpacity = isUnblocked ? 1 : 0.7

            return (
              <Pressable
                key={type}
                onPress={() => setSelectedAward({ isVisible: true, progress })}
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: pressed
                      ? COLORS.codeGrey40
                      : COLORS.codeGrey20,
                    shadowColor: isUnblocked
                      ? COLORS.yellow40
                      : COLORS.codeGrey,
                  },
                ]}
              >
                <View style={[styles.iconWrapper, { opacity: iconOpacity }]}>
                  {icon}
                </View>
                <View
                  style={[styles.romanBadge, { opacity: Number(isUnblocked) }]}
                >
                  <OutlinedText fontSize={15}>
                    {formatLevelToRomanNum(currentLevel)}
                  </OutlinedText>
                </View>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
      <AwardBottomSheet
        isVisible={selectedAward.isVisible}
        onAwardClaimModalShow={onAwardClaimModalShow}
        onClose={() =>
          setSelectedAward((prevState) => ({ ...prevState, isVisible: false }))
        }
        progress={selectedAward.progress}
      />
    </>
  )
}
export default memo(AwardsContent)
