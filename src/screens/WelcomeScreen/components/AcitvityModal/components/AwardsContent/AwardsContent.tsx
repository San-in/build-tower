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
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            rowGap: 20,
            columnGap: 10,
            justifyContent: 'space-around',
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          {awardsDetails.map(({ config: { icon }, progress }) => {
            const { currentLevel, type } = progress
            const isUnblocked = Boolean(currentLevel)

            return (
              <Pressable
                key={type}
                onPress={() => setSelectedAward({ isVisible: true, progress })}
                style={({ pressed }) => [
                  {
                    position: 'relative',
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: pressed
                      ? COLORS.codeGrey40
                      : COLORS.codeGrey20,
                    borderRadius: 20,

                    elevation: 4,
                    shadowColor: isUnblocked
                      ? COLORS.yellow40
                      : COLORS.codeGrey,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                  },
                ]}
              >
                <View
                  style={{
                    opacity: isUnblocked ? 1 : 0.7,
                    width: 50,
                    aspectRatio: 1,
                  }}
                >
                  {icon}
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: 5,
                    opacity: Number(isUnblocked),
                  }}
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
