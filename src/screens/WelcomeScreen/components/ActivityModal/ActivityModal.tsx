import { CustomModal } from '@components/organisms'
import { Toast } from '@components/wrappers'
import { clearAllPersistence } from '@services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { resetAwardsToDefault } from '@store/slices/awardsSlice'
import {
  hideAwardSuccess,
  selectAwardSuccess,
} from '@store/slices/awardsUiSlice'
import { resetBananas } from '@store/slices/bananasSlice'
import { resetLevels } from '@store/slices/levelsSlice'
import { resetMarket } from '@store/slices/marketSlice'
import {
  resetActivityToDefault,
  resetStreakToFirstDay,
} from '@store/slices/userActivitySlice'
import { MODAL_TYPE } from '@types'
import React, { FC, memo, useCallback, useMemo, useState } from 'react'

import SuccessAwardClaimedModal from '../SuccessAwardClaimedModal/SuccessAwardClaimedModal'
import { styles } from './ActivityModal.styles'
import { ACTIVITY_MODAL_TYPES, ActivityModalProps } from './ActivityModal.types'
import { MarketContent, SettingsContent, WarningModal } from './components'
import { AwardsContent } from './components/AwardsContent'

const ActivityModal: FC<ActivityModalProps> = ({
  isVisible,
  onClose,
  onReopen,
  type,
}) => {
  const [isResetProgressModalVisible, setIsResetProgressModalVisible] =
    useState<boolean>(false)
  const dispatch = useAppDispatch()
  const awardSuccess = useAppSelector(selectAwardSuccess)

  const handleResetProgress = async () => {
    try {
      dispatch(resetBananas())
      dispatch(resetLevels())
      dispatch(resetMarket())
      dispatch(resetActivityToDefault())
      dispatch(resetStreakToFirstDay())
      dispatch(resetAwardsToDefault())
      // Flush immediately so a reload before the debounced writers fire
      // cannot re-hydrate the pre-reset values.
      await clearAllPersistence()
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
          content: <AwardsContent />,
        },
      })[type],
    [onPressResetProgress, type]
  )

  const { title, content, color } = modalConfig
  return (
    <>
      <CustomModal
        closeOnBackdropPress
        containerStyles={styles.mainModalContainer}
        handleClose={onClose}
        isMonkeyVisible={false}
        modalVisible={isVisible}
        renderOverlay={
          <SuccessAwardClaimedModal
            countPrize={awardSuccess.countPrize}
            isVisible={awardSuccess.isVisible}
            onPress={() => dispatch(hideAwardSuccess())}
            title={awardSuccess.title}
            typePrize={awardSuccess.typePrize}
          />
        }
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
