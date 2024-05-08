import { Button, Group, useMantineColorScheme } from '@mantine/core'

import { Icon } from '@/common'
import { ICON_NAMES } from '@/enums'

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme()

  return (
    <Group justify='center' mt='xl'>
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button
        onClick={() => setColorScheme('auto')}
        rightSection={<Icon size={20} name={ICON_NAMES.twitter} />}
      >
        Auto
      </Button>
    </Group>
  )
}
