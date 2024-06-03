import { Button, MultiSelect, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { FormEvent, HTMLAttributes } from 'react'
import { useEffectOnce } from 'react-use'

import { logger } from '@/helpers'
import { useFormState, useOffers, useUser } from '@/hooks'
import { applyRules, Bus, maxValue, minValue, required } from '@/utils'

import classes from './CreateOfferForm.module.scss'

type Props = {
  companyId: string | number
} & HTMLAttributes<HTMLFormElement>

export const CreateOfferForm = ({ companyId, onSubmit, ...rest }: Props) => {
  const form = useForm({
    initialValues: {
      sale: 30,
      expired_at: null as Date | null,
      users: [],
    },
    validateInputOnBlur: true,
    validate: {
      sale: applyRules(minValue(1), maxValue(100)),
      expired_at: required,
    },
  })
  const { disableForm, enableForm, isFormDisabled } = useFormState()

  const { createOffer } = useOffers()
  const { getUserList } = useUser()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.validate()

    if (!form.isValid()) return

    disableForm()
    try {
      await createOffer(companyId, {
        sale: form.values.sale,
        users: form.values.users,
        expired_at: form.values.expired_at?.toISOString() as string,
      })

      onSubmit && onSubmit(e)
    } catch (error) {
      Bus.error({
        title: 'Failed to create offer',
        message:
          error instanceof Error ? error.message : 'Something went wrong...',
      })
    }
    enableForm()
  }

  useEffectOnce(() => {
    const loadUsers = async () => {
      try {
        const list = await getUserList()

        logger.info('User list', list)
      } catch (error) {
        Bus.error({
          title: 'Failed to load user list',
          message:
            error instanceof Error ? error.message : 'Something went wrong...',
        })
      }
    }

    loadUsers()
  })

  return (
    <form
      {...rest}
      className={classes['create-offer-form']}
      onSubmit={handleSubmit}
    >
      <TextInput
        type='number'
        placeholder='Знижка (у відсотках)'
        disabled={isFormDisabled}
        {...form.getInputProps('sale')}
      />
      <DateInput
        placeholder='Термін'
        clearable
        minDate={new Date()}
        disabled={isFormDisabled}
        {...form.getInputProps('expired_at')}
      />
      <MultiSelect
        placeholder='Пошти для особистих пропозицій'
        data={['a', 'b', 'c']}
        disabled={isFormDisabled}
        {...form.getInputProps('users')}
      />

      <Button
        type='submit'
        size='md'
        variant='outline'
        mt={25}
        disabled={isFormDisabled}
      >
        Створити
      </Button>
    </form>
  )
}
