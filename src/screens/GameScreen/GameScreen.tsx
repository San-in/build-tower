import { GlobalStyles, TextStyles } from '@theme'
import { FC, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Button, OptionModal } from '@components/ui'
import { BlockTowerCreator } from '@components/gameplay'
import { BUTTON_TYPE } from '@types'
import { generateRandomNumber } from '@utils'
import { generateRandomOperator } from '../../utils/generateRandomOperator'

const GameScreen: FC = () => {
  const [step, setStep] = useState(0)

  const [initialBlockValue, setInitialBlockValue] = useState(0)
  const [userBlockValue, setUserBlockValue] = useState(0)
  const [firstOptionCard, setFirstOptionCard] = useState({
    number: 0,
    operator: null,
  })

  console.log(generateRandomOperator())

  return (
    <SafeAreaView
      style={[GlobalStyles.safeAreaContainer, GlobalStyles.centeredContainer]}
    >
      {!!step && (
        <Text style={[{ marginBottom: 20 }, TextStyles.title_m]}>
          Step {step}
        </Text>
      )}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {!!initialBlockValue && (
          <BlockTowerCreator quantity={initialBlockValue} type={'initial'} />
        )}
        {!!userBlockValue && (
          <BlockTowerCreator quantity={userBlockValue} type={'user'} />
        )}
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 50 }}>
        {!initialBlockValue && (
          <Button
            title={'Start Game'}
            onPress={() => {
              setInitialBlockValue(generateRandomNumber(10, 15))
            }}
          />
        )}
        {!!initialBlockValue && (
          <Button
            title={!!userBlockValue ? 'Reset' : 'Roll First'}
            onPress={() => {
              if (!!userBlockValue) {
                setUserBlockValue(0)
                setInitialBlockValue(0)
                setStep(0)
                return
              }

              setUserBlockValue(generateRandomNumber(1, 5))
              setStep(1)
            }}
            type={BUTTON_TYPE.Outlined}
          />
        )}
        {!!step && !!userBlockValue && (
          <Button title={'GO'} onPress={() => {}} />
        )}
      </View>
      {/*<OptionModal modalVisible={true} handleClose={() => {}} />*/}
    </SafeAreaView>
  )
}

export default GameScreen
