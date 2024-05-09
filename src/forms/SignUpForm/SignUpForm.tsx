import { TextInput } from '@mantine/core'
import { HTMLAttributes } from 'react'

import classes from './SignUpForm.module.scss'

type Props = HTMLAttributes<HTMLFormElement>

export const SignUpForm = ({ onSubmit, ...rest }: Props) => (
  <form className={classes['sign-up-form']} {...rest}>
    <TextInput placeholder='Імʼя*' />
    <TextInput placeholder='Пошта*' />
    <TextInput placeholder='Телефон' />
    <TextInput placeholder='Пароль*' />
    <TextInput placeholder='Повторити пароль*' />
  </form>
)
