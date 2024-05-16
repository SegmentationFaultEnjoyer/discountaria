import { HTMLAttributes } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { ROUTES } from '@/enums'
import { useUserContext } from '@/hooks'

type Props = HTMLAttributes<HTMLDivElement>

export const AuthGuard = ({ children }: Props) => {
  const { userData } = useUserContext()

  const location = useLocation()

  const isLoginPage = location.pathname.includes('login')

  if (!userData && !isLoginPage) return <Navigate replace to={ROUTES.login} />

  if (isLoginPage && userData) return <Navigate replace to={ROUTES.home} />

  return children
}
