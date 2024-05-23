import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { ROUTES } from '@/enums'
import { AppLayout } from '@/layouts'

import { AuthGuard } from './guards'

const pageTransitionOpts = {
  initial: 'hide',
  animate: 'show',
  exit: 'hide',
  variants: {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  },
  transition: { duration: 0.5 },
}

export function Router() {
  const LoginPage = lazy(() => import('@/pages/LoginPage/LoginPage'))
  const HomePage = lazy(() => import('@/pages/HomePage/HomePage'))
  const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage'))
  const CompaniesPage = lazy(
    () => import('@/pages/CompaniesPage/CompaniesPage'),
  )

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: ROUTES.login,
          element: (
            <AuthGuard>
              <LoginPage {...pageTransitionOpts} />
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.home,
          element: (
            <AuthGuard>
              <HomePage {...pageTransitionOpts} />
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.settings,
          element: (
            <AuthGuard>
              <SettingsPage {...pageTransitionOpts} />
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.companies,
          element: (
            <AuthGuard>
              <CompaniesPage {...pageTransitionOpts} />
            </AuthGuard>
          ),
        },
        {
          path: '/',
          element: <Navigate replace to={ROUTES.home} />,
        },
        {
          path: '*',
          element: <Navigate replace to={ROUTES.home} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
