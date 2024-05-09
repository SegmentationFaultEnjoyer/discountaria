import { Flex, Image, Title } from '@mantine/core'
import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'

import { SignUpForm } from '@/forms'

import classes from './LoginPage.module.scss'

type Props = HTMLAttributes<HTMLDivElement> & MotionProps

export default function LoginPage({ ...rest }: Props) {
  return (
    <motion.div {...rest} className={classes['login-page']}>
      <Image
        maw='60%'
        src='/images/login-background.png'
        alt='page-background'
        radius={40}
      />
      <Flex align='center' direction='column' gap={80} flex={1}>
        <Title mt={70}>Реєстрація</Title>
        <SignUpForm />
      </Flex>
    </motion.div>
  )
}
