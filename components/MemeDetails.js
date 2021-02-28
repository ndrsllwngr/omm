import React, { useState } from 'react'
import { TertiaryBtn } from '@/components/ui/Buttons'
import PropTypes from 'prop-types'
import { MemeDetailsModal } from '@/components/MemeDetailsModal'

export const MemeDetails = ({ memeId }) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <TertiaryBtn onClick={() => setShowDialog(true)}>ℹ️ Details</TertiaryBtn>
      <>
        <MemeDetailsModal
          showDialog={showDialog}
          closeDialog={() => setShowDialog(false)}
          memeId={memeId}
        />
      </>
    </>
  )
}

MemeDetails.propTypes = {
  memeId: PropTypes.string,
}
