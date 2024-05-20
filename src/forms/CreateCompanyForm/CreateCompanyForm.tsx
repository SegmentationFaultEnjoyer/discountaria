import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FormEvent, HTMLAttributes } from 'react'

import { api } from '@/api'
import { AvatarFileInput } from '@/common'
import { useFormState } from '@/hooks'
import { applyRules, Bus, maxLength, minLength, required } from '@/utils'

import classes from './CreateCompanyForm.module.scss'

type Props = { userId: number } & HTMLAttributes<HTMLFormElement>

export const CreateCompanyForm = ({ userId, onSubmit }: Props) => {
  const form = useForm({
    initialValues: {
      name: '',
      url: '',
      description: '',
      logoFile: null as File | null,
    },
    validate: {
      name: applyRules(required, minLength(3), maxLength(60)),
      description: applyRules(required, minLength(3), maxLength(60)),
      url: required,
    },
    validateInputOnBlur: true,
  })

  const { disableForm, enableForm, isFormDisabled } = useFormState()

  const uploadLogo = async () => {
    const formData = new FormData()
    formData.append('Document', form.values.logoFile!)

    const {
      data: { url },
    } = await api.post<{ url: string }>('/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return url
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.isValid()) return

    disableForm()
    try {
      const logoUrl = await uploadLogo()

      await api.post(`/users/${userId}/companies`, {
        name: form.values.name,
        url: form.values.url,
        description: form.values.description,
        logo_url: logoUrl,
      })

      onSubmit && onSubmit(e)
    } catch (error) {
      Bus.error({
        title: 'Failed to create company',
        message:
          error instanceof Error ? error.message : 'Something went wrong...',
      })
    }
    enableForm()
  }

  return (
    <form className={classes['create-company-form']} onSubmit={handleSubmit}>
      <AvatarFileInput
        size={100}
        backgoundUrl={
          form.values.logoFile ? URL.createObjectURL(form.values.logoFile) : ''
        }
        onFileChange={file => {
          form.setFieldValue('logoFile', file)
        }}
      />
      <TextInput
        placeholder='Назва'
        disabled={isFormDisabled}
        {...form.getInputProps('name')}
      />
      <TextInput
        placeholder='Опис'
        disabled={isFormDisabled}
        {...form.getInputProps('description')}
      />
      <TextInput
        placeholder='Веб Сайт'
        disabled={isFormDisabled}
        {...form.getInputProps('url')}
      />
      <Button
        type='submit'
        size='lg'
        variant='outline'
        mt={25}
        disabled={isFormDisabled}
      >
        Створити
      </Button>
    </form>
  )
}
