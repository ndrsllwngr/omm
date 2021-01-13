import { ThemeProvider } from 'next-themes'
import { addDecorator } from '@storybook/react'

import '../styles/tailwind.css'
import { FabricProvider } from "@/components/context/fabricContext";
import AuthProvider from "@/components/context/authContext";
import React from "react";

addDecorator((story) => (
  <AuthProvider>
    <ThemeProvider attribute="class" defaultTheme="system">
        <FabricProvider>
          {story()}
        </FabricProvider>
    </ThemeProvider>
  </AuthProvider>
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
