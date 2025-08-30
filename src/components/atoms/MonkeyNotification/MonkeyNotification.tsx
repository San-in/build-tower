import { MonkeyNotificationImg } from '@assets/images'
import { EN_PHRASES } from '@components/atoms/MonkeyNotification/constants'
import { styles } from '@components/atoms/MonkeyNotification/MonkeyNotification.styles'
import { MonkeyNotificationProps } from '@components/atoms/MonkeyNotification/MonkeyNotofocation.types'
import {
  pickRandomIndex,
  resolveStatus,
} from '@components/atoms/MonkeyNotification/utils'
import { COLORS } from '@theme'
import { MONKEY_NOTIFICATION_STATUS } from '@types'
import { Image } from 'expo-image'
import { MotiView } from 'moti'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'

import { OutlinedText } from '../OutlinedText'

const MonkeyNotification: FC<MonkeyNotificationProps> = ({
  visible,
  goal,
  current,
  onRequestClose,
  phrases,
  backdropClosable = true,
  autoHideMs = 3000,
  thresholds = {
    tooMuchFactor: 1.5,
    tooLittleFactor: 0.5,
    closeDelta: 0.1,
  },
}) => {
  const status = useMemo(
    () => resolveStatus(goal, current, thresholds),
    [goal, current, thresholds]
  )

  const pool = useMemo(() => {
    const base = { ...EN_PHRASES, ...(phrases || {}) }
    return base[status] || EN_PHRASES[MONKEY_NOTIFICATION_STATUS.Neutral]
  }, [status, phrases])

  const lastIndexRef = useRef<number | undefined>(undefined)
  const [phrase, setPhrase] = useState<string>('')
  const [isImageReady, setIsImageReady] = useState<boolean>(false)

  const handleBackdropPress = () => {
    if (backdropClosable) {
      onRequestClose()
    }
  }

  useEffect(() => {
    if (!visible) {
      return
    }
    const idx = pickRandomIndex(pool.length, lastIndexRef.current)
    lastIndexRef.current = idx
    setPhrase(pool[idx] || '')
  }, [visible, status, pool])

  useEffect(() => {
    if (!visible || !autoHideMs) {
      return
    }
    const requestCloseTimeout = setTimeout(onRequestClose, autoHideMs)
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(requestCloseTimeout)
  }, [visible, autoHideMs, onRequestClose])

  return (
    <Modal
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
      visible={visible}
    >
      <Pressable onPress={handleBackdropPress} style={styles.backdrop}>
        <MotiView
          animate={{
            opacity: visible && isImageReady ? 1 : 0,
            translateX: visible && isImageReady ? 0 : 100,
          }}
          from={{ translateX: 100 }}
          onStartShouldSetResponder={() => true}
          style={styles.card}
          transition={{ type: 'timing', duration: 200 }}
        >
          <Image
            onError={() => setIsImageReady(true)}
            onLoadEnd={() => setIsImageReady(true)}
            priority="high"
            source={MonkeyNotificationImg}
            style={StyleSheet.absoluteFill}
            transition={200}
          />
          <View style={styles.phraseContainer}>
            <OutlinedText
              color={COLORS.yellow}
              fontSize={12}
              strokeColor={COLORS.brown}
            >
              {phrase}
            </OutlinedText>
          </View>
        </MotiView>
      </Pressable>
    </Modal>
  )
}

export default MonkeyNotification
