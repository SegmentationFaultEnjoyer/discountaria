import { Button, Divider, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FormEvent, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

import { SocialAuth } from '@/common'
import { ROUTES } from '@/enums'
import classes from '@/forms/SignUpForm/SignUpForm.module.scss'
import { logger } from '@/helpers'
import { useFormState, useUser, useUserContext } from '@/hooks'
import globalClasses from '@/styles/components.module.scss'
import { applyRules, Bus, email, required } from '@/utils'

type Props = HTMLAttributes<HTMLFormElement>

export const SignInForm = ({ onSubmit, ...rest }: Props) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validateInputOnBlur: true,
    validate: {
      email: applyRules(required, email),
      password: required,
    },
  })

  const { disableForm, enableForm, isFormDisabled } = useFormState()
  const { setTokens } = useUserContext()

  const { loginUser } = useUser()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.validate()

    if (!form.isValid()) return

    disableForm()
    try {
      const data = await loginUser({
        email: form.values.email,
        password: form.values.password,
      })

      setTokens(data)

      logger.info('User logged in', data)

      onSubmit && onSubmit(e)
    } catch (error) {
      Bus.error({
        title: 'Failed to sign in',
        message:
          error instanceof Error ? error.message : 'Something went wrong...',
      })
    }
    enableForm()
  }

  return (
    <form className={classes['sign-up-form']} {...rest} onSubmit={handleSubmit}>
      <TextInput
        placeholder='Пошта'
        disabled={isFormDisabled}
        {...form.getInputProps('email')}
      />
      <TextInput
        placeholder='Пароль'
        disabled={isFormDisabled}
        {...form.getInputProps('password')}
      />

      <Button mt={10} variant='outline' type='submit' disabled={isFormDisabled}>
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
}
