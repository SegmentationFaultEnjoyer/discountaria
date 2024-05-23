import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FormEvent, HTMLAttributes } from 'react'

import { useFormState, useUser } from '@/hooks'
import { UserData } from '@/types'
import { applyRules, Bus, email, required } from '@/utils'

import classes from './EditProfileForm.module.scss'

type Props = {
  userData: UserData
  userId: number
} & HTMLAttributes<HTMLFormElement>

export const EditProfileForm = ({
  userData,
  userId,
  onSubmit,
  ...rest
}: Props) => {
  const form = useForm({
    initialValues: {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
    },
    validateInputOnBlur: true,
    validate: {
      name: required,
      email: applyRules(required, email),
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
      await editUser(userId, form.values)

      onSubmit && onSubmit(e)
    } catch (error) {
      Bus.error({
        title: 'Failed to update profile info',
        message:
          error instanceof Error ? error.message : 'Something went wrong...',
      })
    }
    enableForm()
  }

  return (
    <form
      className={classes['edit-profile-form']}
      {...rest}
      onSubmit={handleSubmit}
    >
      <TextInput placeholder="Ім'я" {...form.getInputProps('name')} />
      <TextInput placeholder='Телефон' {...form.getInputProps('phone')} />

      {!userData.oauth2_account_provider && (
        <>
          <TextInput
            type='email'
            placeholder='Пошта'
            {...form.getInputProps('email')}
          />
        </>
      )}

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
