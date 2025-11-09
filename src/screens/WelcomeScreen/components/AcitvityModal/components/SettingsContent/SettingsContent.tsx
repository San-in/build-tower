import { Button, OutlinedText } from '@components/atoms'
import { LanguageSelector } from '@components/molecules/LanguageSelector'
import { useSettings } from '@providers'
import { BUTTON_TYPE } from '@types'
import React, { FC, memo } from 'react'
import { Switch, View } from 'react-native'

import { styles } from './SettingsContent.styles'
import { SettingsContentProps } from './SettingsContent.types'

const SettingsContent: FC<SettingsContentProps> = ({
  onPressResetProgress,
}) => {
  const { soundEnabled, toggleSound, setLanguage, language } = useSettings()

  return (
    <View style={styles.container}>
      <View style={styles.soundContainer}>
        <OutlinedText fontSize={20}>Sounds: </OutlinedText>
        <Switch onValueChange={toggleSound} value={soundEnabled} />
      </View>
      <LanguageSelector
        isDisabled={true}
        onSelect={setLanguage}
        value={language}
      />
      <Button
        buttonContainerStyle={styles.resetButtonContainer}
        onPress={onPressResetProgress}
        style={styles.resetButton}
        textSize={12}
        title={'RESET PROGRESS'}
        type={BUTTON_TYPE.Error}
      />
    </View>
  )
}
export default memo(SettingsContent)
