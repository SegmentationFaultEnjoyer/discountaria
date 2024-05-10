import { Button, Divider, TextInput } from '@mantine/core'
import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

import { SocialAuth } from '@/common'
import { ROUTES } from '@/enums'
import globalClasses from '@/styles/components.module.scss'

import classes from './SignUpForm.module.scss'

type Props = HTMLAttributes<HTMLFormElement>

export const SignUpForm = ({ onSubmit, ...rest }: Props) => (
  <form className={classes['sign-up-form']} {...rest}>
    <TextInput placeholder='Імʼя*' />
    <TextInput placeholder='Пошта*' />
    <TextInput placeholder='Телефон' />
    <TextInput placeholder='Пароль*' />
    <TextInput placeholder='Повторити пароль*' />

    <Button mt={10} variant='outline'>
      Зареєструватися
    </Button>

    <Divider mt={10} size='sm' label='або через соц. мережі' />

    <SocialAuth m='0 auto' />

    <Link
      className={globalClasses['link-override']}
      style={{ margin: '0 auto' }}
      to={{ pathname: ROUTES.login, search: 'mode=sign-in' }}
    >
      Вже маєте акаунт? Увійти
    </Link>
  </form>
)
