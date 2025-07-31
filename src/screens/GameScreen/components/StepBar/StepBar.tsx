import { OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import { MotiView } from 'moti'
import { FC } from 'react'
import { View } from 'react-native'

import { styles } from './StepBar.styles'
import { StepBarProps } from './StepBar.types'

const StepBar: FC<StepBarProps> = ({
  totalSteps,
  currentStep,
  animationKey,
}) => {
  const isLastStep = totalSteps === currentStep
  return (
    <MotiView
      animate={{ opacity: 1 }}
      from={{ opacity: 0 }}
      style={styles.container}
      transition={{ type: 'timing', duration: 500, delay: 300 }}
    >
      <MotiView
        animate={{
          shadowOpacity: [0.5, 1, 0],
          shadowColor: [COLORS.yellow, COLORS.yellow20, COLORS.yellow],
          scale: [1, 1.1, 1],
        }}
        from={{ shadowOpacity: 0, shadowColor: COLORS.yellow, scale: 1 }}
        key={currentStep}
        style={styles.contentContainer}
        transition={{ type: 'timing', duration: 2000 }}
      >
        <OutlinedText fontSize={18}>
          {isLastStep ? 'Last step' : 'Step'}
        </OutlinedText>

        <View style={styles.stepBarContainer}>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isVisible = index < currentStep
            const isLastVisibleStep = index === currentStep - 1

            return (
              <View key={index} style={{ width: `${100 / totalSteps}%` }}>
                <MotiView
                  animate={{ opacity: 1 }}
                  from={{ opacity: isLastVisibleStep ? 0.2 : 1 }}
                  transition={{ type: 'timing', duration: 1500, delay: 500 }}
                >
                  <MotiView
                    animate={{
                      backgroundColor: isVisible
                        ? [COLORS.collar, COLORS.gradientGold_1, COLORS.collar]
                        : 'transparent',
                    }}
                    from={{
                      backgroundColor: isVisible
                        ? COLORS.collar
                        : COLORS.collar20,
                    }}
                    key={animationKey}
                    style={styles.stepContainer}
                    transition={{
                      backgroundColor: {
                        type: 'timing',
                        duration: 2000,
                        loop: true,
                        repeatReverse: true,
                      },
                    }}
                  />
                </MotiView>
                <View style={styles.stepLabel}>
                  <OutlinedText
                    fontSize={isLastVisibleStep && !isLastStep ? 18 : 12}
                  >{`${index + 1}`}</OutlinedText>
                </View>
              </View>
            )
          })}
        </View>
      </MotiView>
    </MotiView>
  )
}

export default StepBar
