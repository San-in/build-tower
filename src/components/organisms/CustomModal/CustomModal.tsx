import { CloseCrossIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import { COLORS, GlobalStyles } from '@theme'
import { MODAL_TYPE } from '@types'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, MotiView } from 'moti'
import { FC, useEffect, useState } from 'react'
import { ImageBackground, Modal, Pressable, View } from 'react-native'

import { styles } from './CustomModal.styles'
import { CustomModalProps } from './CustomModal.types'

const CustomModal: FC<CustomModalProps> = ({
  modalVisible,
  handleClose,
  title = '',
  children,
  type = MODAL_TYPE.Orange,
  containerStyles = {},
  withCrossIcon = true,
}) => {
  const [isModalShacked, setIsModalShacked] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (modalVisible) {
      timeout = setTimeout(() => {
        setIsModalShacked(true)
      }, 800)
    } else {
      setIsModalShacked(false)
    }

    return () => clearTimeout(timeout)
  }, [modalVisible])

  const backgroundImage = {
    [MODAL_TYPE.Orange]: require('../../../../assets/images/modal-border-orange.png'),
    [MODAL_TYPE.Green]: require('../../../../assets/images/modal-border-green.png'),
    [MODAL_TYPE.Purple]: require('../../../../assets/images/modal-border-purple.png'),
    [MODAL_TYPE.Blue]: require('../../../../assets/images/modal-border-blue.png'),
  }[type]

  const gradientColors: readonly [string, string, ...Array<string>] = {
    [MODAL_TYPE.Orange]: [
      COLORS.tango60,
      COLORS.tango80,
      COLORS.gradientOrange_3,
      COLORS.gradientOrange_3,
      COLORS.tango40,
      COLORS.tango60,
    ],
    [MODAL_TYPE.Green]: [
      COLORS.green60,
      COLORS.green80,
      COLORS.gradientGreen_3,
      COLORS.gradientGreen_3,
      COLORS.green40,
      COLORS.green60,
    ],
    [MODAL_TYPE.Purple]: [
      COLORS.purple60,
      COLORS.purple80,
      COLORS.gradientPurple_3,
      COLORS.gradientPurple_1,
      COLORS.gradientPurple_2,
      COLORS.purple60,
    ],
    [MODAL_TYPE.Blue]: [
      COLORS.blue20,
      COLORS.blue40,
      COLORS.blue50,
      COLORS.blue60,
      COLORS.blue40,
      COLORS.blue20,
    ],
  }[type] as [string, string, ...Array<string>]

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      transparent={true}
      visible={modalVisible}
    >
      <View style={[GlobalStyles.centeredContainer, styles.background]}>
        <MotiView
          animate={{
            scale:
              !isModalShacked && modalVisible ? [1, 1.02, 0.98, 1.02, 1] : 1,
          }}
          from={{ scale: 1 }}
          style={[styles.container, containerStyles]}
          transition={{
            type: 'timing',
            duration: 30,
          }}
        >
          <Image
            resizeMode={'contain'}
            source={require('../../../../assets/images/monkey-modal.png')}
            style={styles.monkeyImage}
          />
          <ImageBackground
            resizeMode={'cover'}
            source={backgroundImage}
            style={styles.imageBackground}
          >
            {withCrossIcon && (
              <Pressable
                onPress={handleClose}
                style={({ pressed }: { pressed: boolean }) => [
                  styles.closeIcon,
                  pressed && styles.closeIconPressed,
                ]}
              >
                <CloseCrossIcon height={40} width={40} />
              </Pressable>
            )}
            <LinearGradient
              colors={gradientColors}
              end={{ x: 1, y: 1 }}
              start={{ x: 0, y: 0 }}
              style={styles.gradientContainer}
            >
              <View style={[styles.contentContainer]}>
                <>
                  {title && (
                    <OutlinedText fontSize={26} offset={2}>
                      {title}
                    </OutlinedText>
                  )}
                  {children}
                </>
              </View>
            </LinearGradient>
          </ImageBackground>
        </MotiView>
      </View>
    </Modal>
  )
}

export default CustomModal
