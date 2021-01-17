import React from 'react'
import { HtmlHead } from '@/components/HtmlHead'
import { Navbar } from '@/components/Navbar'
import { ProtectedRoute } from '@/components/context/authContext'
import { ProfileDrafts } from '@/components/ProfileDrafts'
import { ProfileInfo } from '@/components/ProfileInfo'
import { ProfileMemeHistory } from '@/components/ProfileMemeHistory'

const ProfilePage = () => {
  return (
    <>
      <ProtectedRoute>
        <HtmlHead title={'Profile'} />
        <Navbar />
        <div className={'max-w-7xl mx-auto mt-4'}>
          <h2 className={'font-semibold font-lg text-black dark:text-white border-b-2 mb-4'}>
            About
          </h2>
          <ProfileInfo />
          <h2 className={'font-semibold font-lg text-black dark:text-white border-b-2 mb-4 mt-8'}>
            Drafts
          </h2>
          <ProfileDrafts
            className={
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-2 px-4 py-4 sm:px-6 sm:py-4 lg:px-0'
            }
          />
          <h2 className={'font-semibold font-lg text-black dark:text-white border-b-2 mb-4 mt-8'}>
            History
          </h2>
          <ProfileMemeHistory
            className={
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-2 px-4 py-4 sm:px-6 sm:py-4 lg:px-0'
            }
          />
        </div>
      </ProtectedRoute>
    </>
  )
}

export default ProfilePage
