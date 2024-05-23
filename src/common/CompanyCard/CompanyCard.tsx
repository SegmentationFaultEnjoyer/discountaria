import { Chip, Flex, FlexProps, Image, Text } from '@mantine/core'

import { ICON_NAMES } from '@/enums'
import { CompanyData } from '@/types'

import { Icon } from '../Icon/Icon'
import classes from './CompanyCard.module.scss'

type Props = {
  data: CompanyData
} & FlexProps

export const CompanyCard = ({
  data: { name, logo_url, description, category },
  ...rest
}: Props) => (
  <Flex
    direction='column'
    justify='space-between'
    align='flex-end'
    className={classes['company-card']}
    {...rest}
  >
    <Flex align='center' w='100%' gap={20}>
      {logo_url ? (
        <Image
          alt='company logo'
          fit='cover'
          radius='md'
          w={100}
          h={100}
          src={logo_url}
        />
      ) : (
        <Icon size={100} name={ICON_NAMES.store} />
      )}

      <Flex direction='column' gap={20}>
        <Text className={classes['company-card__title']} size='20px'>
          {name}
        </Text>
        <Text size='14px'>{description}</Text>
      </Flex>
    </Flex>
    <Chip>{category}</Chip>
  </Flex>
)
