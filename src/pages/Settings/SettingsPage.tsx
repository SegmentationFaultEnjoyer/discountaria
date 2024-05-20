import { Button, Flex, Modal, Portal, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes, useEffect, useState } from 'react'

import { AvatarFileInput, CompanyCard, Icon } from '@/common'
import { ICON_NAMES } from '@/enums'
import { CreateCompanyForm } from '@/forms'
import { logger } from '@/helpers'
import { useCompanies, useUser, useUserContext } from '@/hooks'
import { CompanyData } from '@/types'
import { Bus } from '@/utils'

import classes from './Settings.module.scss'

type Props = HTMLAttributes<HTMLDivElement> & MotionProps

export default function SettingsPage({ ...rest }: Props) {
  const [companies, setCompanies] = useState<CompanyData[]>([])

  const { setTokens, userData, id: userId, fetchUserData } = useUserContext()
  const { uploadUserAvatar } = useUser()
  const { getCompanies } = useCompanies()

  const [
    isCreateModalOpen,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure()

  const userInfo: { label: string; value: string }[] = [
    {
      label: `ім'я`,
      value: userData?.name || '',
    },
    {
      label: `пошта`,
      value: userData?.email || '',
    },
    {
      label: `телефон`,
      value: userData?.phone || 'не вказано',
    },
  ]

  const uploadAvatar = async (file: File) => {
    try {
      await uploadUserAvatar(userId, file)

      await fetchUserData()
    } catch (error) {
      Bus.error({
        title: 'Failed to upload user avatar',
        message:
          error instanceof Error ? error.message : 'Something went wrong...',
      })
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const loadCompanies = async () => {
      const data = await getCompanies()

      logger.info('Companies data', data)

      setCompanies(data)
    }

    loadCompanies().catch(console.error)
  }, [])

  return (
    <motion.div {...rest} className={classes['settings-page']}>
      <Button
        variant='subtle'
        size='lg'
        className={classes['settings-page__logout-btn']}
        leftSection={<Icon name={ICON_NAMES.logout} size={25} />}
        onClick={() =>
          setTokens({ id: -1, access_token: '', refresh_token: '' })
        }
      >
        Вийти
      </Button>
      <Flex m='0 auto' align='center' gap={60}>
        <AvatarFileInput
          size={150}
          backgoundUrl={userData?.photo_url}
          onFileChange={uploadAvatar}
        />

        <Flex direction='column' gap={18} w={400}>
          {userInfo.map(({ label, value }, idx) => (
            <Flex key={idx} justify='space-between'>
              <Text
                size='20px'
                className={classes['settings-page__info-label']}
              >
                {label}
              </Text>
              <Text
                size='20px'
                className={classes['settings-page__info-value']}
              >
                {value}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex direction='column' w='100%' mt={90} gap={40}>
        <TextInput
          variant='default'
          placeholder='Пошук'
          size='md'
          className={classes['settings-page__search']}
          leftSection={<Icon name={ICON_NAMES.search} size={20} />}
        />
        <Flex mt={10} gap={40}>
          <Button
            variant='outline'
            className={classes['settings-page__create-company']}
            onClick={openCreateModal}
          >
            <Flex direction='column' align='center' gap={25}>
              <Icon size={70} name={ICON_NAMES.plus} />
              <Text size='22px'>Створити компанію</Text>
            </Flex>
          </Button>
          {Boolean(companies.length) &&
            companies.map(company => (
              <CompanyCard key={company.name} data={company} />
            ))}
        </Flex>
      </Flex>

      <Portal>
        <Modal
          title='Створити компанію'
          opened={isCreateModalOpen}
          onClose={closeCreateModal}
        >
          <CreateCompanyForm userId={userId} onSubmit={closeCreateModal} />
        </Modal>
      </Portal>
    </motion.div>
  )
}
