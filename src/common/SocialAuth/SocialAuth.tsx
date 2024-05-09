import { ActionIcon, Flex, FlexProps } from '@mantine/core'

import { Icon } from '@/common/Icon/Icon'
import { ICON_NAMES } from '@/enums'

type Props = FlexProps

export const SocialAuth = ({ ...rest }: Props) => (
  <Flex gap={25} {...rest}>
    <ActionIcon p={2} size='lg' variant='light'>
      <Icon name={ICON_NAMES.facebook} />
    </ActionIcon>
    <ActionIcon p={4} size='lg' variant='light'>
      <Icon name={ICON_NAMES.google} />
    </ActionIcon>
    <ActionIcon p={3} size='lg' variant='light'>
      <Icon name={ICON_NAMES.linkedin} />
    </ActionIcon>
  </Flex>
)
