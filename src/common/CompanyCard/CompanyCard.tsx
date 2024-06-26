import { Chip, Flex, FlexProps, Image, Text } from '@mantine/core'

import { CompanyData } from '@/types'

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
    <Flex align='center' gap={20}>
      <Image
        alt='company logo'
        fit='cover'
        radius='md'
        w={100}
        h={100}
        src={logo_url}
      />
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
