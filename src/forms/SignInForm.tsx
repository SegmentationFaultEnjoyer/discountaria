import { Button, Divider, TextInput } from '@mantine/core'
import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

import { SocialAuth } from '@/common'
import { ROUTES } from '@/enums'
import classes from '@/forms/SignUpForm/SignUpForm.module.scss'
import globalClasses from '@/styles/components.module.scss'

type Props = HTMLAttributes<HTMLFormElement>

export const SignInForm = ({ onSubmit, ...rest }: Props) => (
  <form className={classes['sign-up-form']} {...rest}>
    <TextInput placeholder='Пошта' />
    <TextInput placeholder='Пароль' />

    <Button mt={10} variant='outline'>
      Увійти
    </Button>

    <Divider mt={10} size='sm' label='або через соц. мережі' />

    <SocialAuth m='0 auto' />

    <Link
      className={globalClasses['link-override']}
      style={{ margin: '0 auto' }}
      to={ROUTES.login}
    >
      Не маєте акаунта? Зареєструватися
    </Link>
  </form>
)
