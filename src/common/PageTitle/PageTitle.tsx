import { Flex, Title } from '@mantine/core'

import classes from './PageTitle.module.scss'

type Props = {
  title: string
}

export const PageTitle = ({ title }: Props) => (
  <Flex justify='center' align='center' className={classes['page-title']}>
    <Title size='110px' className={classes['page-title__title']}>
      {title}
    </Title>
  </Flex>
)
