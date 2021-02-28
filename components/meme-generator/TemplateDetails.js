import React, { useState } from 'react'
import { TertiaryBtn } from '@/components/ui/Buttons'
import { TemplateDetailsModal } from '@/components/meme-generator/TemplateDetailsModal'
import PropTypes from 'prop-types'

export const TemplateDetails = ({ templateId }) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <TertiaryBtn onClick={() => setShowDialog(true)}>ℹ️</TertiaryBtn>
      <>
        <TemplateDetailsModal
          showDialog={showDialog}
          closeDialog={() => setShowDialog(false)}
          templateId={templateId}
        />
      </>
    </>
  )
}

TemplateDetails.propTypes = {
  templateId: PropTypes.string,
}
