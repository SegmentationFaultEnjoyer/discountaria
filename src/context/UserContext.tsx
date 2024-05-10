import { createContext, HTMLAttributes, useEffect, useState } from 'react'

import { api } from '@/api'
import { LOCAL_STORAGE_KEYS } from '@/enums'
import { logger } from '@/helpers'
import { AuthTokensResponse } from '@/types'

type UserContextValue = {
  setTokens: (data: AuthTokensResponse) => void
} & AuthTokensResponse

export const userContext = createContext<UserContextValue>({
  id: -1,
  access_token: '',
  refresh_token: '',
  setTokens: () => {
    throw new ReferenceError(`'setTokens' not implemented`)
  },
})

export const UserContextProvider = ({
  children,
}: HTMLAttributes<HTMLDivElement>) => {
  const [tokensData, setTokensData] = useState<AuthTokensResponse>({
    id: Number(localStorage.getItem(LOCAL_STORAGE_KEYS.userId) ?? -1),
    access_token: localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken) ?? '',
    refresh_token: localStorage.getItem(LOCAL_STORAGE_KEYS.refreshToken) ?? '',
  })

  const setTokens = (data: AuthTokensResponse) => {
    setTokensData(data)

    localStorage.setItem(LOCAL_STORAGE_KEYS.userId, data.id.toString())
    localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, data.access_token)
    localStorage.setItem(LOCAL_STORAGE_KEYS.refreshToken, data.refresh_token)
  }

  useEffect(() => {
    if (tokensData.id === -1) return

    const getUserInfo = async () => {
      try {
        const { data } = await api.get(`/users/${tokensData.id}`)
        logger.debug('User info', data)
      } catch (error) {
        logger.error(error)
      }
    }

    getUserInfo()
  }, [tokensData])

  return (
    <userContext.Provider value={{ ...tokensData, setTokens }}>
      {children}
    </userContext.Provider>
  )
}
