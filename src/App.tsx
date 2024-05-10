import '@mantine/core/styles.css'

import { Flex, MantineProvider } from '@mantine/core'

import { UserContextProvider } from './context'
import { Router } from './Router'
import { theme } from './theme'

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <UserContextProvider>
        <Flex w='100%' h='100dvh'>
          <Router />
        </Flex>
      </UserContextProvider>
    </MantineProvider>
  )
}
