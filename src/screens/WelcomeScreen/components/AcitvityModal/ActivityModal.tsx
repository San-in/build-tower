import { CustomModal } from '@components/organisms'
import { Toast } from '@components/wrappers'
import { bananasService, levelService, marketService } from '@services'
import { MODAL_TYPE } from '@types'
import React, { FC, memo, useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { userActivityService } from '../../../../services/userActivityService'
import { styles } from './ActivityModal.styles'
import { ACTIVITY_MODAL_TYPES, ActivityModalProps } from './ActivityModal.types'
import { MarketContent, SettingsContent, WarningModal } from './components'

const ActivityModal: FC<ActivityModalProps> = ({
  isVisible,
  onClose,
  onReopen,
  type,
}) => {
  const [isResetProgressModalVisible, setIsResetProgressModalVisible] =
    useState<boolean>(false)
  const dispatch = useDispatch()

  const handleResetProgress = async () => {
    try {
      await bananasService.reset(dispatch)
      await levelService.reset(dispatch)
      await marketService.reset(dispatch)
      await userActivityService.reset(dispatch)
      Toast({
        type: 'info',
        text1: 'Everything reset — good luck!',
      })
    } catch (error) {
      console.warn(error)
      Toast({
        type: 'error',
        text1: 'Something went wrong...',
      })
    } finally {
      setIsResetProgressModalVisible(false)
    }
  }
  const onPressResetProgress = useCallback(() => {
    setIsResetProgressModalVisible(true)
    onClose()
  }, [onClose])

  const handleCloseWarningModal = () => {
    onReopen()
    setIsResetProgressModalVisible(false)
  }

  const modalConfig = useMemo(
    () =>
      ({
        [ACTIVITY_MODAL_TYPES.SETTINGS]: {
          title: 'Settings',
          color: MODAL_TYPE.Blue,
          content: (
            <SettingsContent onPressResetProgress={onPressResetProgress} />
          ),
        },
        [ACTIVITY_MODAL_TYPES.MARKET]: {
          title: 'Market',
          color: MODAL_TYPE.Purple,
          content: <MarketContent />,
        },
      })[type],
    [onPressResetProgress, type]
  )

  const { title, content, color } = modalConfig
  return (
    <>
      <CustomModal
        containerStyles={styles.mainModalContainer}
        handleClose={onClose}
        isMonkeyVisible={false}
        modalVisible={isVisible}
        title={title}
        type={color}
      >
        {content}
      </CustomModal>
      <WarningModal
        handleClose={handleCloseWarningModal}
        handleConfirm={handleResetProgress}
        isVisible={isResetProgressModalVisible}
      />
    </>
  )
}

export default memo(ActivityModal)
