import { Flex } from '@mantine/core'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { SideBar } from '@/common'
import { ROUTES } from '@/enums'

import classes from './AppLayout.module.scss'

const routesWithoutSidebar = [ROUTES.login]

export const AppLayout = () => {
  const location = useLocation()

  return (
    <Suspense fallback={<></>}>
      <AnimatePresence>
        <Flex flex={1} className={classes['app-layout']}>
          {!routesWithoutSidebar.includes(
            location.pathname as unknown as ROUTES,
          ) && <SideBar />}

          <Outlet />
        </Flex>
      </AnimatePresence>
    </Suspense>
  )
}
