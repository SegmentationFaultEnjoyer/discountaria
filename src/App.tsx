import '@mantine/core/styles.css'

import { Flex, MantineProvider } from '@mantine/core'

import { Router } from './Router'
import { theme } from './theme'

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Flex w='100%' h='100dvh'>
        <Router />
      </Flex>
    </MantineProvider>
  )
}
