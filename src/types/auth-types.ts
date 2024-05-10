export type AuthType = 'facebook' | 'google' | 'linkedin'

export type AuthTokensResponse = {
  id: number
  access_token: string
  refresh_token: string
}
