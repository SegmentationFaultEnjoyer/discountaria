import { Button, Flex, Modal, Portal, Text, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes, useEffect, useMemo, useState } from 'react'

import { AvatarFileInput, CompanyCard, Icon } from '@/common'
import { ICON_NAMES } from '@/enums'
import { ChangePasswordForm, CreateCompanyForm, EditProfileForm } from '@/forms'
import { logger } from '@/helpers'
import { useCompanies, useUser, useUserContext } from '@/hooks'
import { CompanyData } from '@/types'
import { Bus } from '@/utils'

import classes from './Settings.module.scss'

type Props = HTMLAttributes<HTMLDivElement> & MotionProps

const DEFAULT_INPUT_DEBOUNCE = 400

export default function SettingsPage({ ...rest }: Props) {
  const [companies, setCompanies] = useState<CompanyData[]>([])
  const [search, setSearch] = useDebouncedState('', DEFAULT_INPUT_DEBOUNCE)

  const { setTokens, userData, id: userId, fetchUserData } = useUserContext()
  const { uploadUserAvatar } = useUser()
  const { getCompanies } = useCompanies()

  const [
    isCreateModalOpen,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure()
  const [iEditModalOpen, { open: openEditModal, close: closeEditModal }] =
    useDisclosure()
  const [
    isPasswordModalOpen,
    { open: openPasswordModal, close: closePasswordModal },
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

  const filteredCompanies = useMemo(
    () =>
      companies?.filter(el =>
        el.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [companies, search],
  )

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

  const loadCompanies = async () => {
    if (!userId) return

    const data = await getCompanies({ ownerId: userId })

    logger.info('Companies data', data)

    setCompanies(data)
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadCompanies().catch(console.error)
  }, [userId])

  return (
    <motion.div {...rest} className={classes['settings-page']}>
      <Flex className={classes['settings-page__actions']}>
        {!userData?.oauth2_account_provider && (
          <Button
            variant='subtle'
            size='lg'
            leftSection={<Icon name={ICON_NAMES.pencil} size={25} />}
            onClick={openPasswordModal}
          >
            Змінити пароль
          </Button>
        )}

        <Button
          variant='subtle'
          size='lg'
          leftSection={<Icon name={ICON_NAMES.pencil} size={25} />}
          onClick={openEditModal}
        >
          Редагувати
        </Button>
        <Button
          variant='subtle'
          size='lg'
          leftSection={<Icon name={ICON_NAMES.logout} size={25} />}
          onClick={() =>
            setTokens({ id: -1, access_token: '', refresh_token: '' })
          }
        >
          Вийти
        </Button>
      </Flex>

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
          defaultValue={search}
          className={classes['settings-page__search']}
          leftSection={<Icon name={ICON_NAMES.search} size={20} />}
          onChange={e => setSearch(e.target.value)}
        />

        <Flex justify='center' mt={10} gap={40}>
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
          {Boolean(filteredCompanies?.length) &&
            filteredCompanies.map(company => (
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
          <CreateCompanyForm
            userId={userId}
            onSubmit={() => {
              closeCreateModal()
              loadCompanies()
            }}
          />
        </Modal>
        {userData && (
          <Modal
            title='Редагувати профіль'
            opened={iEditModalOpen}
            onClose={closeEditModal}
          >
            <EditProfileForm
              userData={userData}
              userId={userId}
              onSubmit={() => {
                closeEditModal()
                fetchUserData()
              }}
            />
          </Modal>
        )}
        <Modal
          title='Змінити пароль'
          opened={isPasswordModalOpen}
          onClose={closePasswordModal}
        >
          <ChangePasswordForm userId={userId} onSubmit={closePasswordModal} />
        </Modal>
      </Portal>
    </motion.div>
  )
}
