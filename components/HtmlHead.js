import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

export const HtmlHead = ({ title }) => {
  return (
    <Head>
      <title>{title || `OMM Group Task 01`}</title>
      <meta
        name="author"
        content="Andreas Ellwanger, Andreas Griesbeck, Havy Ha, Maximilian Rauh"
      />
      <meta name="description" content="OMM Group Task 01" />
    </Head>
  )
}

HtmlHead.propTypes = {
  title: PropTypes.string,
}
