// TEMP: awards test panel — remove after testing (whole folder + 2 lines in WelcomeScreen)
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  increaseRepeatsForAward,
  resetAwardsToDefault,
  selectAwardsDetails,
} from '@store/slices/awardsSlice'
import React, { useEffect } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import {
  AWARD_TYPE,
  reachAwardsConditions,
} from '../ActivityModal/components/AwardsContent/config'
import { styles } from './AwardsDevPanel.styles'

const COUNTER_AWARDS: Array<{ type: AWARD_TYPE; label: string }> = [
  { type: AWARD_TYPE.EARLY_CLEAR, label: 'Early' },
  { type: AWARD_TYPE.LEVEL_COMPLETED, label: 'Complete' },
  { type: AWARD_TYPE.NO_POWER_UPS, label: 'NoPwr' },
  { type: AWARD_TYPE.NO_RESET_STEPS, label: 'NoReset' },
  { type: AWARD_TYPE.ADD_BLOCKS_MASTER, label: 'AddM' },
  { type: AWARD_TYPE.REMOVE_BLOCKS_MASTER, label: 'RemM' },
  { type: AWARD_TYPE.ADD_EXTRA_STEP_MASTER, label: 'StepM' },
]

const AwardsDevPanel = () => {
  const dispatch = useAppDispatch()
  const awardsDetails = useAppSelector(selectAwardsDetails)

  const maxAllCounters = () => {
    COUNTER_AWARDS.forEach(({ type }) => {
      const config = reachAwardsConditions.find((c) => c.type === type)
      if (!config) {
        return
      }
      const maxRepeats = config.levelConditions[config.maxLevel]?.targetRepeats
      for (let i = 0; i < (maxRepeats ?? 0); i += 1) {
        dispatch(increaseRepeatsForAward(type))
      }
    })
  }

  useEffect(() => {
    const snapshot = awardsDetails.map(({ config, progress }) => {
      const unclaimed = Object.entries(progress.levelsInfo)
        .filter(([, info]) => info.isAvailable && !info.isPrizeClaimed)
        .map(([level]) => Number(level))
      return {
        award: config.name,
        lvl: `${progress.currentLevel}/${config.maxLevel}`,
        repeats: progress.currentRepeats,
        unclaimedLevels: unclaimed.length ? unclaimed.join(',') : '-',
      }
    })
    // eslint-disable-next-line no-console
    console.log('AWARDS STATE ↓')
    // eslint-disable-next-line no-console
    console.table(snapshot)
  }, [awardsDetails])

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          <Pressable
            onPress={() => dispatch(resetAwardsToDefault())}
            style={styles.resetButton}
          >
            <Text style={styles.buttonLabel}>RESET</Text>
          </Pressable>
          <Pressable onPress={maxAllCounters} style={styles.button}>
            <Text style={styles.buttonLabel}>MAX ALL</Text>
          </Pressable>
          {COUNTER_AWARDS.map(({ type, label }) => (
            <Pressable
              key={type}
              onPress={() => dispatch(increaseRepeatsForAward(type))}
              style={styles.button}
            >
              <Text style={styles.buttonLabel}>+{label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default AwardsDevPanel
