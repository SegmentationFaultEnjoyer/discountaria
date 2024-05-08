import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

import { ROUTES } from '@/enums'

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
  const LoginPage = lazy(() => import('@/pages/LoginPage'))

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
          element: <LoginPage {...pageTransitionOpts} />,
        },
        {
          path: '*',
          element: <Navigate replace to={ROUTES.login} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
