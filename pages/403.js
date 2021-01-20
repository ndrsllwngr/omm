import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'

const UnauthorizedPage = () => {
  return (
    <>
      <HtmlHead title={'Forbidden'} />
      <Navbar />
      <p className={'flex flex-col justify-center items-center'}>403 (Forbidden)</p>
    </>
  )
}

export default UnauthorizedPage
