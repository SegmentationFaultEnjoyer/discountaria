import { api } from '@/api'
import { ApiListResponse, CompanyData } from '@/types'

type CreateData = Omit<
  CompanyData,
  'logo_url' | 'created_at' | 'id' | 'user_id'
> & {
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

  // TODO: pagination maybe:)
  const getCompanies = async (filter?: { ownerId: number }) => {
    const { data } = await api.get<ApiListResponse<CompanyData[]>>(
      '/companies',
      filter && {
        params: {
          'filter[owner_id]': filter.ownerId,
        },
      },
    )

    return data.Data
  }

  const getCompany = async (companyId: string | number) => {
    const { data } = await api.get<CompanyData>(`/companies/${companyId}`)

    return data
  }

  return {
    createCompany,
    uploadLogo,

    getCompanies,
    getCompany,
  }
}
