import { api } from '@/api'
import { CompanyData } from '@/types'

type CreateData = Omit<CompanyData, 'logo_url' | 'created_at'> & {
  logoFile: File
}

export const useCompanies = () => {
  const uploadLogo = async (file: File) => {
    const formData = new FormData()
    formData.append('Document', file)

    const {
      data: { url },
    } = await api.post<{ url: string }>('/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return url
  }

  const createCompany = async (userId: number, data: CreateData) => {
    const { logoFile, ...rest } = data

    const logoUrl = await uploadLogo(logoFile)

    await api.post(`/users/${userId}/companies`, {
      ...rest,
      logo_url: logoUrl,
    })
  }

  const getCompanies = async () => {
    const { data } = await api.get<CompanyData[]>('/companies')

    return data
  }

  return {
    createCompany,
    uploadLogo,

    getCompanies,
  }
}
