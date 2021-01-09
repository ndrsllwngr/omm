import { ThemeProvider } from 'next-themes'
import { addDecorator } from '@storybook/react'
import UserProvider from '@/components/context/authContext'
import { MemeProvider } from '@/components/archive/memeContext'

import '../styles/tailwind.css'

addDecorator((story) => (
  <UserProvider>
    <ThemeProvider attribute="class" defaultTheme="system">
      <MemeProvider>{story()}</MemeProvider>
    </ThemeProvider>
  </UserProvider>
))

export const parameters = {
  options: {
    storySort: (a, b) => {
      // We want the Welcome story at the top
      if (b[1].kind === 'Welcome') {
        return 1
      }

      // Sort the other stories by ID
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true })
    },
  },
}
