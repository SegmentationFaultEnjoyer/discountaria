import { Avatar, Button, Flex, FlexProps, Text } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'

import { ICON_NAMES, ROUTES } from '@/enums'
import { useUserContext } from '@/hooks'
import { colors } from '@/theme'

import { Icon } from '../Icon/Icon'
import classes from './SideBar.module.scss'

type LinkInfo = {
  to: ROUTES
  label: string
  icon: ICON_NAMES
}

type Props = FlexProps

export const SideBar = ({ ...rest }: Props) => {
  const location = useLocation()

  const { userData } = useUserContext()

  const links: LinkInfo[] = [
    {
      to: ROUTES.home,
      label: 'Пропозиції',
      icon: ICON_NAMES.moneyBag,
    },
    {
      to: ROUTES.settings,
      label: 'Налаштування',
      icon: ICON_NAMES.settings,
    },
  ]

  return (
    <Flex
      direction='column'
      justify='space-between'
      className={classes['side-bar']}
      {...rest}
    >
      <Flex direction='column' mt={30} gap={200}>
        <Avatar
          m='0 auto'
          variant='outline'
          alt='user-avatar'
          color={colors.primary[9]}
          size={150}
          src={userData?.photo_url}
        >
          <Icon name={ICON_NAMES.user} size={80} />
        </Avatar>

        <Flex direction='column' gap={23}>
          {links.map(({ label, to, icon }, idx) => (
            <Link
              className={classes['side-bar__link']}
              aria-selected={to === location.pathname}
              key={idx}
              to={to}
            >
              <Icon name={icon} size={25} />
              <Text size='22px'>{label}</Text>
            </Link>
          ))}
        </Flex>
      </Flex>

      <Button
        variant='outline'
        size='lg'
        leftSection={<Icon name={ICON_NAMES.qrCode} size={24} />}
      >
        Відсканувати QR-code
      </Button>
    </Flex>
  )
}
