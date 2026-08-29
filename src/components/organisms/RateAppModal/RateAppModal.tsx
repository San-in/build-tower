import { CustomModal } from '@components/organisms/CustomModal'
import { BasicModalContent } from '@components/organisms/CustomModal/components'
import { MODAL_TYPE } from '@types'
import { openStoreForReview } from '@utils'
import { FC } from 'react'

import { RateAppModalProps } from './RateAppModal.types'

const RateAppModal: FC<RateAppModalProps> = ({ isVisible, onClose }) => {
  const handleLike = () => {
    // Close our own Modal before presenting the native review sheet — leaving
    // it open while iOS stacks SKStoreReviewController on top can strand it
    // in a broken presentation state that keeps blocking touches even after
    // isVisible flips to false.
    onClose()
    void openStoreForReview()
  }

  return (
    <CustomModal
      handleClose={onClose}
      modalVisible={isVisible}
      title="Enjoying the game?"
      type={MODAL_TYPE.Blue}
    >
      <BasicModalContent
        cancelButtonText="NO"
        confirmButtonText="YES"
        onCancel={onClose}
        onConfirm={handleLike}
        text="Let us know how you like the game"
      />
    </CustomModal>
  )
}

export default RateAppModal
