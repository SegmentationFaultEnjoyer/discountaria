import { GenericAbortSignal } from 'axios'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { api } from '@/api'
import { logger } from '@/helpers'
import { AuthTokensResponse, AuthType } from '@/types'

type AuthResponse = { url: string }
type AuthCredentials = {
  state: string | null
  code: string | null
  scope: string | null
  type: AuthType | null
}

const getAuthType = (scope: string | null): AuthType | null => {
  if (!scope) return null

  switch (true) {
    case scope.includes('google'):
      return 'google'
    case scope.includes('facebook'):
      return 'facebook'
    case scope.includes('linkedin'):
      return 'linkedin'

    default:
      return null
  }
}

export function useOAuth() {
  const location = useLocation()

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  )

  const credentials: AuthCredentials = useMemo(
    () => ({
      state: searchParams.get('state'),
      code: searchParams.get('code'),
      scope: searchParams.get('scope'),
      type: getAuthType(searchParams.get('scope')),
    }),
    [searchParams],
  )

  const getHostedLink = async (type: AuthType) => {
    const {
      data: { url },
    } = await api.get<AuthResponse>(`/oauth2/${type}`)

    logger.debug({ url })

    return url
  }

  const getAuthTokens = async (
    { state, code, type }: AuthCredentials,
    signal?: GenericAbortSignal,
  ) => {
    const { data } = await api.post<AuthTokensResponse>(
      `/oauth2/${type}/callback`,
      { state, code },
      { signal },
    )

    logger.debug('Auth tokens', data)

    return data
  }

  useEffect(() => {
    logger.debug(credentials)
  }, [credentials])

  return {
    getHostedLink,
    getAuthTokens,

    credentials,
  }
}
