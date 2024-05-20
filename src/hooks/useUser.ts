import { api } from '@/api'
import { AuthTokensResponse, UserData } from '@/types'

type EditData = Partial<
  Omit<
    UserData,
    'oauth2_account_provider' | 'email_verified' | 'created_at'
  > & { old_password: string }
>

export function useUser() {
  const createUser = async (userData: {
    name: string
    email: string
    password: string
  }) => {
    const { data } = await api.post<AuthTokensResponse>('/users/register', {
      ...userData,
    })

    return data
  }

  const loginUser = async (userData: { email: string; password: string }) => {
    const { data } = await api.post<AuthTokensResponse>('/users/login', {
      ...userData,
    })

    return data
  }

  const editUser = async (userId: number, userData: EditData) =>
    api.patch(`/users/${userId}`, userData)

  const uploadUserAvatar = async (userId: number, file: File) => {
    const formData = new FormData()

    formData.append('Document', file)

    const {
      data: { url },
    } = await api.post<{ url: string }>('/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    await editUser(userId, { photo_url: url })
  }

  const getUserData = async (userId: number, signal?: AbortSignal) => {
    const { data } = await api.get<UserData>(`/users/${userId}`, {
      signal,
    })

    return data
  }

  return {
    createUser,
    editUser,

    loginUser,
    uploadUserAvatar,

    getUserData,
  }
}
