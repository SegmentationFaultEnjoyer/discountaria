import { Flex, Text } from '@mantine/core'

import { ICON_NAMES } from '@/enums'

import { Icon } from '../Icon/Icon'
import classes from './NoDataMessage.module.scss'

type Props = {
  icon?: ICON_NAMES
  iconSize?: number
  title?: string
  message: string
}

export const NoDataMessage = ({
  icon = ICON_NAMES.archive,
  title,
  message,
  iconSize = 60,
}: Props) => (
  <Flex direction='column' align='center' gap={18}>
    <Icon
      name={icon}
      size={iconSize}
      className={classes['no-data-message__icon']}
    />

    <Flex direction='column' align='center' gap={12}>
      {title && (
        <Text size='28px' className={classes['no-data-message__title']}>
          {title}
        </Text>
      )}
      <Text size='22px' className={classes['no-data-message__message']}>
        {message}
      </Text>
    </Flex>
  </Flex>
)
