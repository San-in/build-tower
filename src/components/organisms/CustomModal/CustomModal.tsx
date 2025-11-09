import { CloseCrossIcon } from '@assets/icons'
import {
  ModalBorderBlueImg,
  ModalBorderGreenImg,
  ModalBorderOrangeImg,
  ModalBorderPurpleImg,
  MonkeyModalImg,
} from '@assets/images'
import { OutlinedText } from '@components/atoms'
import { useAssetsReady } from '@hooks'
import { COLORS, GlobalStyles } from '@theme'
import { MODAL_TYPE } from '@types'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'

import { styles } from './CustomModal.styles'
import { CustomModalProps } from './CustomModal.types'

const SHAKE_INTERVAL = 5000

const BG_BY_TYPE = {
  [MODAL_TYPE.Orange]: ModalBorderOrangeImg,
  [MODAL_TYPE.Green]: ModalBorderGreenImg,
  [MODAL_TYPE.Purple]: ModalBorderPurpleImg,
  [MODAL_TYPE.Blue]: ModalBorderBlueImg,
} as const

const PLACEHOLDER_BY_TYPE = {
  [MODAL_TYPE.Orange]: COLORS.tango60,
  [MODAL_TYPE.Green]: COLORS.green60,
  [MODAL_TYPE.Purple]: COLORS.purple60,
  [MODAL_TYPE.Blue]: COLORS.blue40,
} as const

const GRADIENT_BY_TYPE = {
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
} as const

const ASSET_KEYS = {
  BG: 'background',
  MONKEY: 'monkey',
} as const

const CustomModal: FC<CustomModalProps> = ({
  modalVisible,
  handleClose,
  title = '',
  children,
  type = MODAL_TYPE.Orange,
  containerStyles = {},
  withCrossIcon = true,
  isMonkeyVisible = true,
}) => {
  const [shake, setShake] = useState(false)

  const ASSET_LABELS = useMemo(() => Object.values(ASSET_KEYS), [])
  const {
    ready: allReady,
    done: assetLoaded,
    reset,
  } = useAssetsReady(ASSET_LABELS)

  const timerRef = useRef<number | null>(null)
  useEffect(() => {
    if (modalVisible) {
      timerRef.current = setInterval(() => {
        setShake(true)
        setTimeout(() => setShake(false), 300)
      }, SHAKE_INTERVAL) as unknown as number
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [modalVisible])

  const prev = useRef({ visible: false, type })
  useEffect(() => {
    const opened = !prev.current.visible && modalVisible
    const typeChangedWhileOpen = modalVisible && prev.current.type !== type
    if (opened || typeChangedWhileOpen) {
      reset()
    }
    prev.current = { visible: modalVisible, type }
  }, [modalVisible, type, reset])

  const bgSrc = BG_BY_TYPE[type]
  const placeholder = PLACEHOLDER_BY_TYPE[type]
  const gradientColors = useMemo(() => GRADIENT_BY_TYPE[type], [type])

  return (
    <Modal
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      visible={modalVisible}
    >
      <View style={[GlobalStyles.centeredContainer, styles.background]}>
        <MotiView
          animate={{
            opacity: modalVisible && allReady ? 1 : 0,
            scale: shake ? [1, 1.02, 0.98, 1.02, 1] : 1,
          }}
          from={{ opacity: 0, scale: 1 }}
          pointerEvents={allReady ? 'auto' : 'none'}
          style={[styles.container, containerStyles]}
          transition={{ type: 'timing', duration: 160 }}
        >
          <Image
            cachePolicy="memory-disk"
            contentFit="contain"
            onError={() => assetLoaded(ASSET_KEYS.MONKEY)}
            onLoadEnd={() => assetLoaded(ASSET_KEYS.MONKEY)}
            priority="high"
            source={MonkeyModalImg}
            style={[styles.monkeyImage, { opacity: Number(isMonkeyVisible) }]}
            transition={120}
          />

          <View style={styles.imageBackground}>
            <Image
              cachePolicy="memory-disk"
              contentFit="cover"
              onError={() => assetLoaded(ASSET_KEYS.BG)}
              onLoadEnd={() => assetLoaded(ASSET_KEYS.BG)}
              priority="high"
              recyclingKey={`modal-bg-${type}`}
              source={bgSrc}
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: placeholder },
              ]}
              transition={100}
            />

            {withCrossIcon && (
              <Pressable
                onPress={handleClose}
                style={({ pressed }) => [
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
              <View style={styles.contentContainer}>
                {!!title && (
                  <OutlinedText fontSize={26} offset={2}>
                    {title}
                  </OutlinedText>
                )}
                {children}
              </View>
            </LinearGradient>
          </View>
        </MotiView>
      </View>
    </Modal>
  )
}

export default CustomModal
