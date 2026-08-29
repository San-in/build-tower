import { Button, OutlinedText, Toggle } from '@components/atoms'
import { LanguageSelector } from '@components/molecules/LanguageSelector'
import { useSettings } from '@providers'
import { BUTTON_TYPE } from '@types'
import { formatTabletElementsSize } from '@utils'
import React, { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './SettingsContent.styles'
import { SettingsContentProps } from './SettingsContent.types'

const SettingsContent: FC<SettingsContentProps> = ({
  onPressResetProgress,
}) => {
  const {
    soundEnabled,
    toggleSound,
    hapticsEnabled,
    toggleHaptics,
    setLanguage,
    language,
  } = useSettings()

  return (
    <View style={styles.container}>
      <View style={styles.soundContainer}>
        <OutlinedText fontSize={formatTabletElementsSize(20)}>
          Sounds:
        </OutlinedText>
        <Toggle onValueChange={toggleSound} value={soundEnabled} />
      </View>
      <View style={styles.soundContainer}>
        <OutlinedText fontSize={formatTabletElementsSize(20)}>
          Vibration:
        </OutlinedText>
        <Toggle onValueChange={toggleHaptics} value={hapticsEnabled} />
      </View>
      <LanguageSelector
        isDisabled={true}
        onSelect={setLanguage}
        value={language}
      />
      <Button
        buttonContainerStyle={styles.resetButtonContainer}
        numberOfLines={1}
        onPress={onPressResetProgress}
        style={styles.resetButton}
        textSize={formatTabletElementsSize(12)}
        title={'RESET PROGRESS'}
        type={BUTTON_TYPE.Error}
      />
    </View>
  )
}
export default memo(SettingsContent)
