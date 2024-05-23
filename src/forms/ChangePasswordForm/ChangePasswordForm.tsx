import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FormEvent, HTMLAttributes } from 'react'

import { useFormState, useUser } from '@/hooks'
import { applyRules, Bus, required, sameAs } from '@/utils'

import classes from './ChangePasswordForm.module.scss'

type Props = { userId: number } & HTMLAttributes<HTMLFormElement>

export const ChangePasswordForm = ({ userId, onSubmit, ...rest }: Props) => {
  const form = useForm({
    initialValues: {
      password: '',
      old_password: '',
      repeatPassword: '',
    },
    validateInputOnBlur: true,
    validate: {
      password: required,
      old_password: required,
      repeatPassword: applyRules(required, sameAs('password')),
    },
  })
  const { disableForm, enableForm, isFormDisabled } = useFormState()

  const { editUser } = useUser()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.validate()

    if (!form.isValid()) return

    disableForm()
    try {
      await editUser(userId, {
        password: form.values.password,
        old_password: form.values.old_password,
      })

      onSubmit && onSubmit(e)
    } catch (error) {
      Bus.error({
        title: 'Failed to update password',
        message:
          error instanceof Error ? error.message : 'Something went wrong...',
      })
    }
    enableForm()
  }

  return (
    <form
      className={classes['change-password-form']}
      {...rest}
      onSubmit={handleSubmit}
    >
      <TextInput
        placeholder='Старий пароль'
        disabled={isFormDisabled}
        {...form.getInputProps('old_password')}
      />
      <TextInput
        placeholder='Новий пароль'
        disabled={isFormDisabled}
        {...form.getInputProps('password')}
      />
      <TextInput
        placeholder='Повторити новий пароль'
        disabled={isFormDisabled}
        {...form.getInputProps('repeatPassword')}
      />

      <Button
        type='submit'
        size='md'
        variant='outline'
        mt={25}
        disabled={isFormDisabled}
      >
        Зберегти
      </Button>
    </form>
  )
}
