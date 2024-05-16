import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

import { ROUTES } from '@/enums'

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

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      ),
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
          path: '*',
          element: <Navigate replace to={ROUTES.home} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
