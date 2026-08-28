import { CustomModal } from '@components/organisms/CustomModal'
import { BasicModalContent } from '@components/organisms/CustomModal/components'
import { MODAL_TYPE } from '@types'
import * as StoreReview from 'expo-store-review'
import { FC, useEffect, useState } from 'react'
import { Linking } from 'react-native'

import { RateAppModalProps } from './RateAppModal.types'

type Step = 'ask' | 'rate'

const RateAppModal: FC<RateAppModalProps> = ({ isVisible, onClose }) => {
  const [step, setStep] = useState<Step>('ask')

  useEffect(() => {
    if (isVisible) {
      setStep('ask')
    }
  }, [isVisible])

  const handleLike = () => {
    setStep('rate')
  }

  const handleRate = async () => {
    try {
      if (await StoreReview.isAvailableAsync()) {
        await StoreReview.requestReview()
      } else {
        const url = StoreReview.storeUrl()
        if (url) {
          await Linking.openURL(url)
        }
      }
    } catch {
      // rating is best-effort — nothing to recover from here
    }
    onClose()
  }

  return (
    <CustomModal
      handleClose={onClose}
      modalVisible={isVisible}
      title={step === 'ask' ? 'Enjoying the game?' : 'Thank you!'}
      type={MODAL_TYPE.Blue}
    >
      {step === 'ask' ? (
        <BasicModalContent
          cancelButtonText="NO"
          confirmButtonText="YES"
          onCancel={onClose}
          onConfirm={handleLike}
          text="Let us know how you like the game"
        />
      ) : (
        <BasicModalContent
          confirmButtonText="Rate Us"
          onConfirm={handleRate}
          text="Leave us a rating in the store — it really helps!"
        />
      )}
    </CustomModal>
  )
}

export default RateAppModal
