import { ActionIcon, Flex, FlexProps } from '@mantine/core'
import { useEffect } from 'react'

import { Icon } from '@/common/Icon/Icon'
import { ICON_NAMES } from '@/enums'
import { logger } from '@/helpers'
import { useOAuth, useUserContext } from '@/hooks'
import { AuthType } from '@/types'

type Props = FlexProps

export const SocialAuth = ({ ...rest }: Props) => {
  const { getHostedLink, getAuthTokens, credentials } = useOAuth()
  const { setTokens } = useUserContext()

  const handleAuth = async (type: AuthType) => {
    try {
      const authLink = await getHostedLink(type)

      window.open(authLink, '_self')
    } catch (error) {
      logger.error(error)
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!credentials.code || !credentials.state || !credentials.type) return

    const abortController = new AbortController()

    const authenticate = async () => {
      const tokens = await getAuthTokens(credentials, abortController.signal)
      setTokens(tokens)
    }

    authenticate().catch(err => logger.error(err))

    return () => {
      abortController.abort(
        'One of the requests cancelled due to racing condition',
      )
    }
  }, [credentials])

  return (
    <Flex gap={25} {...rest}>
      <ActionIcon
        p={2}
        size='lg'
        variant='transparent'
        onClick={() => handleAuth('facebook')}
      >
        <Icon name={ICON_NAMES.facebook} />
      </ActionIcon>
      <ActionIcon
        p={4}
        size='lg'
        variant='transparent'
        onClick={() => handleAuth('google')}
      >
        <Icon name={ICON_NAMES.google} />
      </ActionIcon>
      <ActionIcon
        p={3}
        size='lg'
        variant='transparent'
        onClick={() => handleAuth('linkedin')}
      >
        <Icon name={ICON_NAMES.linkedin} />
      </ActionIcon>
    </Flex>
  )
}
