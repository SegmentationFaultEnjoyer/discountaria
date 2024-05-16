import { Flex, Title } from '@mantine/core'
import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'
import { useSearchParams } from 'react-router-dom'

import { SignInForm, SignUpForm } from '@/forms'

import classes from './LoginPage.module.scss'

type Props = HTMLAttributes<HTMLDivElement> & MotionProps

type PageMode = 'sign-in' | 'sign-up'

export default function LoginPage({ ...rest }: Props) {
  const [params] = useSearchParams()

  const mode = params.get('mode') as PageMode

  return (
    <motion.div {...rest} className={classes['login-page']}>
      <Flex
        direction='column'
        align='center'
        justify='center'
        className={classes['login-page__main']}
      >
        <Title className={classes['login-page__title']}>DISCOUNTARIA</Title>
      </Flex>
      <Flex
        align='center'
        justify='center'
        direction='column'
        gap={80}
        flex={1}
      >
        <Title>{mode === 'sign-in' ? 'Логін' : 'Реєстрація'}</Title>
        {mode === 'sign-in' ? <SignInForm /> : <SignUpForm />}
      </Flex>
    </motion.div>
  )
}
