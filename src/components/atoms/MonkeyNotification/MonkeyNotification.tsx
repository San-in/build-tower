import { EN_PHRASES } from '@components/atoms/MonkeyNotification/constants'
import { styles } from '@components/atoms/MonkeyNotification/MonkeyNotification.styles'
import { MonkeyNotificationProps } from '@components/atoms/MonkeyNotification/MonkeyNotofocation.types'
import {
  pickRandomIndex,
  resolveStatus,
} from '@components/atoms/MonkeyNotification/utils'
import { COLORS } from '@theme'
import { MONKEY_NOTIFICATION_STATUS } from '@types'
import { MotiView } from 'moti'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Image, Modal, Pressable, View } from 'react-native'

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
          animate={{ opacity: visible ? 1 : 0, translateX: visible ? 0 : 100 }}
          from={{ translateX: 100 }}
          style={styles.card}
          transition={{ type: 'timing', duration: 100 }}
        >
          <Image
            resizeMode="contain"
            source={require('../../../../assets/images/monkey-notification.png')}
            style={styles.image}
          />
          <View style={styles.phraseContainer}>
            <OutlinedText
              color={COLORS.yellow}
              fontSize={14}
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
