import { Avatar, Flex, Modal, Portal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'
import { Link, useParams } from 'react-router-dom'
import useSWR from 'swr'

import { Icon, TileButton } from '@/common'
import { ICON_NAMES } from '@/enums'
import { CreateOfferForm } from '@/forms'
import { useCompanies } from '@/hooks'
import globalClasses from '@/styles/components.module.scss'
import { colors } from '@/theme'

import classes from './CompanyPage.module.scss'

type Props = HTMLAttributes<HTMLDivElement> & MotionProps

export default function CompanyPage({ ...rest }: Props) {
  const { id } = useParams()
  const { getCompany } = useCompanies()

  const [
    isCreateOfferModalOpen,
    { open: openCreateOfferModal, close: closeCreateOfferModal },
  ] = useDisclosure(false)
  /* eslint-disable */
  const {
    data: companyInfo,
    isLoading,
    error,
  } = useSWR(`company-${id}`, () => getCompany(Number(id)))

  return (
    <motion.div {...rest} className={classes['company-page']}>
      <Flex m='100px auto' gap={80}>
        <Avatar
          variant='outline'
          alt='user-avatar'
          color={colors.primary[9]}
          size={150}
        >
          <Icon name={ICON_NAMES.user} size={80} />
        </Avatar>
        <Flex direction='column' gap={20}>
          <Text size='63px' className={classes['company-page__title']}>
            Title
          </Text>
          <Flex direction='column' gap={16}>
            <Flex gap={11} className={classes['company-page__info']}>
              <Icon size={20} name={ICON_NAMES.papyrus} />
              <Text size='20px'>Description</Text>
            </Flex>
            <Flex gap={11} className={classes['company-page__info']}>
              <Icon size={20} name={ICON_NAMES.web} />
              <Link className={globalClasses['link-override']} to='/'>
                <Text size='20px'>WebSite</Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex>
        <TileButton text='Створити пропозицію' onClick={openCreateOfferModal} />
      </Flex>

      {id && (
        <Portal>
          <Modal
            title='Створити пропозицію'
            opened={isCreateOfferModalOpen}
            onClose={closeCreateOfferModal}
          >
            <CreateOfferForm companyId={id} onSubmit={closeCreateOfferModal} />
          </Modal>
        </Portal>
      )}
    </motion.div>
  )
}
