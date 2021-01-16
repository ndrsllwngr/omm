import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { ProtectedRoute } from '@/components/context/authContext'
import { DraftsCollection } from '@/components/DraftsCollection'

const ProfilePage = () => {
  return (
    <>
      <ProtectedRoute>
        <HtmlHead title={'Profile'} />
        <Navbar />
        <DraftsCollection />
      </ProtectedRoute>
    </>
  )
}

export default ProfilePage
