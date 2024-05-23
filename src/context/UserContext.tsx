import { CanceledError } from 'axios'
import { createContext, HTMLAttributes, useEffect, useState } from 'react'

import { LOCAL_STORAGE_KEYS } from '@/enums'
import { logger } from '@/helpers'
import { useUser } from '@/hooks/useUser'
import { AuthTokensResponse, UserData } from '@/types'

type UserContextValue = {
  setTokens: (data: AuthTokensResponse) => void
  fetchUserData: (signal?: AbortSignal) => Promise<void>
  userData?: UserData
  isLoading: boolean
} & AuthTokensResponse

export const userContext = createContext<UserContextValue>({
  id: -1,
  access_token: '',
  refresh_token: '',
  userData: undefined,
  isLoading: false,
  fetchUserData: () => {
    throw new ReferenceError(`'fetchUserData' not implemented`)
  },
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

  const [userData, setUserData] = useState<UserData>()
  const [isLoading, setIsLoading] = useState(true)

  const { getUserData } = useUser()

  const setTokens = (data: AuthTokensResponse) => {
    setTokensData(data)

    localStorage.setItem(LOCAL_STORAGE_KEYS.userId, data.id.toString())
    localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, data.access_token)
    localStorage.setItem(LOCAL_STORAGE_KEYS.refreshToken, data.refresh_token)
  }

  const getUserInfo = async (signal?: AbortSignal) => {
    setIsLoading(true)
    try {
      const data = await getUserData(tokensData.id, signal)

      logger.debug('User info', data)

      setUserData(data)

      setIsLoading(false)
    } catch (error) {
      logger.error(error)
      setUserData(undefined)

      if (!(error instanceof CanceledError)) {
        setIsLoading(false)
      }
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const abortController = new AbortController()

    getUserInfo(abortController.signal)

    return () => {
      abortController.abort(`'getUserInfo' cancelled due to racing condition`)
    }
  }, [tokensData])

  return (
    <userContext.Provider
      value={{
        ...tokensData,
        userData,
        setTokens,
        fetchUserData: getUserInfo,
        isLoading,
      }}
    >
      {children}
    </userContext.Provider>
  )
}
