import { api } from '@/api'
import { OfferData } from '@/types'

export function useOffers() {
  const createOffer = async (companyId: string | number, data: OfferData) =>
    api.post(`/companies/${companyId}/offers`, data)

  return {
    createOffer,
  }
}
