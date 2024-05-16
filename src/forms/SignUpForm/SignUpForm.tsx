import { Button, Divider, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FormEvent, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

import { api } from '@/api'
import { SocialAuth } from '@/common'
import { ROUTES } from '@/enums'
import { logger } from '@/helpers'
import { useFormState, useUserContext } from '@/hooks'
import globalClasses from '@/styles/components.module.scss'
import { AuthTokensResponse } from '@/types'
import { applyRules, Bus, email, required, sameAs } from '@/utils'

import classes from './SignUpForm.module.scss'

type Props = HTMLAttributes<HTMLFormElement>

export const SignUpForm = ({ onSubmit, ...rest }: Props) => {
  const { setTokens } = useUserContext()

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      repeatPassword: '',
    },
    validateInputOnBlur: true,
    validate: {
      name: required,
      email: applyRules(required, email),
      password: required,
      repeatPassword: applyRules(required, sameAs('password')),
    },
  })

  const { disableForm, enableForm, isFormDisabled } = useFormState()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.validate()

    if (!form.isValid()) return

    disableForm()
    try {
      const { data } = await api.post<AuthTokensResponse>('/users/register', {
        name: form.values.name,
        email: form.values.email,
        password: form.values.password,
      })

      logger.info('User registered', data)

      setTokens(data)

      onSubmit && onSubmit(e)
    } catch (error) {
      Bus.error({
        title: 'Failed to sign-up',
        message:
          error instanceof Error ? error.message : 'Something went wrong...',
      })
    }
    enableForm()
  }

  return (
    <form className={classes['sign-up-form']} {...rest} onSubmit={handleSubmit}>
      <TextInput
        placeholder='Імʼя*'
        disabled={isFormDisabled}
        {...form.getInputProps('name')}
      />
      <TextInput
        placeholder='Пошта*'
        type='email'
        disabled={isFormDisabled}
        {...form.getInputProps('email')}
      />
      <TextInput
        placeholder='Телефон'
        type='tel'
        disabled={isFormDisabled}
        {...form.getInputProps('phoneNumber')}
      />
      <TextInput
        placeholder='Пароль*'
        type='password'
        disabled={isFormDisabled}
        {...form.getInputProps('password')}
      />
      <TextInput
        placeholder='Повторити пароль*'
        type='password'
        disabled={isFormDisabled}
        {...form.getInputProps('repeatPassword')}
      />

      <Button mt={10} disabled={isFormDisabled} variant='outline' type='submit'>
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
}
