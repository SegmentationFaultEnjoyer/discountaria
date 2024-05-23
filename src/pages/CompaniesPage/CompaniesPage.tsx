import { Flex, Loader, TextInput } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { CompanyCard, Icon, NoDataMessage, PageTitle } from '@/common'
import { DEFAULT_INPUT_DEBOUNCE } from '@/consts'
import { ICON_NAMES } from '@/enums'
import { useCompanies } from '@/hooks'

import classes from './CompaniesPage.module.scss'

type Props = HTMLAttributes<HTMLDivElement> & MotionProps

export default function CompaniesPage({ ...rest }: Props) {
  const [search, setSearch] = useDebouncedState('', DEFAULT_INPUT_DEBOUNCE)

  const { getCompanies } = useCompanies()

  const { data: companies, isLoading } = useSWR('companies', () =>
    getCompanies(),
  )

  const filteredCompanies = useMemo(
    () =>
      companies?.filter(el =>
        el.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [companies, search],
  )

  return (
    <motion.div {...rest} className={classes['companies-page']}>
      <PageTitle title='Заклади' />

      <Flex direction='column' p='0 60px' flex={1} gap={40}>
        <TextInput
          variant='default'
          placeholder='Пошук'
          size='md'
          defaultValue={search}
          className={classes['companies-page__search']}
          leftSection={<Icon name={ICON_NAMES.search} size={20} />}
          onChange={e => setSearch(e.target.value)}
        />

        {isLoading ? (
          <Loader m='auto' />
        ) : (
          <Flex className={classes['companies-page__companies']} gap={40}>
            {filteredCompanies?.length ? (
              filteredCompanies?.map(company => (
                <Link
                  key={company.id}
                  className={classes['companies-page__link']}
                  to={`/companies/${company.id}`}
                >
                  <CompanyCard data={company} />
                </Link>
              ))
            ) : (
              <NoDataMessage message='Нічого не знайдено' />
            )}
          </Flex>
        )}
      </Flex>
    </motion.div>
  )
}
