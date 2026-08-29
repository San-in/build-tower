import { CustomModal } from '@components/organisms/CustomModal'
import { BasicModalContent } from '@components/organisms/CustomModal/components'
import { MODAL_TYPE } from '@types'
import { openStoreWriteReviewPage } from '@utils'
import { FC } from 'react'
import { Platform } from 'react-native'

import { RequestMoreLevelsModalProps } from './RequestMoreLevelsModal.types'

const STORE_NAME = Platform.OS === 'ios' ? 'App Store' : 'Google Play'

const RequestMoreLevelsModal: FC<RequestMoreLevelsModalProps> = ({
  isVisible,
  onClose,
}) => {
  const handleConfirm = async () => {
    await openStoreWriteReviewPage()
    onClose()
  }

  return (
    <CustomModal
      handleClose={onClose}
      modalVisible={isVisible}
      title="More levels coming soon!"
      type={MODAL_TYPE.Blue}
    >
      <BasicModalContent
        confirmButtonText="WRITE A REVIEW"
        onConfirm={handleConfirm}
        text={`Want more levels? Write a comment in ${STORE_NAME} and let us know!`}
      />
    </CustomModal>
  )
}

export default RequestMoreLevelsModal
