import { CustomModal } from '@components/organisms'
import { Toast } from '@components/wrappers'
import { useAppDispatch } from '@store/hooks'
import { resetAwardsToDefault } from '@store/slices/awardsSlice'
import { resetBananas } from '@store/slices/bananasSlice'
import { resetLevels } from '@store/slices/levelsSlice'
import { resetMarket } from '@store/slices/marketSlice'
import {
  resetActivityToDefault,
  resetStreakToFirstDay,
} from '@store/slices/userActivitySlice'
import { MODAL_TYPE } from '@types'
import React, { FC, memo, useCallback, useMemo, useState } from 'react'

import { styles } from './ActivityModal.styles'
import { ACTIVITY_MODAL_TYPES, ActivityModalProps } from './ActivityModal.types'
import { MarketContent, SettingsContent, WarningModal } from './components'
import { AwardsContent } from './components/AwardsContent'

const ActivityModal: FC<ActivityModalProps> = ({
  isVisible,
  onClose,
  onReopen,
  type,
  onAwardClaimModalShow,
}) => {
  const [isResetProgressModalVisible, setIsResetProgressModalVisible] =
    useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleResetProgress = async () => {
    try {
      dispatch(resetBananas())
      dispatch(resetLevels())
      dispatch(resetMarket())
      dispatch(resetActivityToDefault())
      dispatch(resetStreakToFirstDay())
      dispatch(resetAwardsToDefault())
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
          color: MODAL_TYPE.Green,
          content: (
            <SettingsContent onPressResetProgress={onPressResetProgress} />
          ),
        },
        [ACTIVITY_MODAL_TYPES.MARKET]: {
          title: 'Market',
          color: MODAL_TYPE.Blue,
          content: <MarketContent />,
        },
        [ACTIVITY_MODAL_TYPES.AWARDS]: {
          title: 'Awards',
          color: MODAL_TYPE.Purple,
          content: (
            <AwardsContent onAwardClaimModalShow={onAwardClaimModalShow} />
          ),
        },
      })[type],
    [onPressResetProgress, type, onAwardClaimModalShow]
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
