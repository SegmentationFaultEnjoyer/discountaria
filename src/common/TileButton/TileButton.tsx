import { Button, ButtonProps, Flex, Text } from '@mantine/core'
import { HTMLAttributes } from 'react'

import { ICON_NAMES } from '@/enums'

import { Icon } from '../Icon/Icon'
import classes from './TileButton.module.scss'

type Props = { text: string; icon?: ICON_NAMES } & ButtonProps &
  HTMLAttributes<HTMLButtonElement>

export const TileButton = ({
  text,
  icon = ICON_NAMES.plus,
  ...rest
}: Props) => (
  <Button
    variant='outline'
    {...rest}
    className={classes['tile-button']}
    h={190}
    w={280}
  >
    <Flex direction='column' align='center' gap={25}>
      <Icon size={70} name={icon} />
      <Text size='22px'>{text}</Text>
    </Flex>
  </Button>
)
