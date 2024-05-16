import 'react-toastify/dist/ReactToastify.css'
import './styles.scss'

import { isObject } from 'lodash'
import { toast, ToastContainer, TypeOptions } from 'react-toastify'
import { useEffectOnce } from 'react-use'

import { Icon } from '@/common/Icon/Icon'
import { ICON_NAMES } from '@/enums'
import { NotificationObjectPayload } from '@/types'
import { Bus } from '@/utils'

const NOTIFICATION_TYPE = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  default: 'default',
}

export const Notifications = () => {
  const showToast = (
    messageType = NOTIFICATION_TYPE.default,
    payload?: string | NotificationObjectPayload | unknown,
  ) => {
    let title = ''
    let message = ''
    let iconName: ICON_NAMES | undefined

    const defaultTitles = {
      [NOTIFICATION_TYPE.success]: 'Success',
      [NOTIFICATION_TYPE.error]: 'Error',
      [NOTIFICATION_TYPE.warning]: 'Warning',
      [NOTIFICATION_TYPE.info]: 'Info',
      [NOTIFICATION_TYPE.default]: 'Default',
    }
    const defaultMessages = {
      [NOTIFICATION_TYPE.default]: 'Just a message',
      [NOTIFICATION_TYPE.info]:
        'Something is happening. Just want you to know that',
      [NOTIFICATION_TYPE.success]: 'Action successful',
      [NOTIFICATION_TYPE.error]: 'Something went wrong',
      [NOTIFICATION_TYPE.warning]: 'Something you are doing is not recommended',
    }
    const defaultIconNames = {
      [NOTIFICATION_TYPE.default]: ICON_NAMES.informationCircle,
      [NOTIFICATION_TYPE.info]: ICON_NAMES.informationCircle,
      [NOTIFICATION_TYPE.success]: ICON_NAMES.checkCircle,
      [NOTIFICATION_TYPE.error]: ICON_NAMES.exclamationCircle,
      [NOTIFICATION_TYPE.warning]: ICON_NAMES.exclamation,
    }

    if (isObject(payload)) {
      const msgPayload = payload as NotificationObjectPayload

      title = msgPayload.title || ''
      message = msgPayload.message
      iconName = msgPayload?.iconName
    } else if (payload) {
      message = payload as string
    } else {
      message = defaultMessages[messageType]
    }

    if (!title) {
      title = defaultTitles[messageType]
    }
    if (!iconName) {
      iconName = defaultIconNames[messageType]
    }

    toast(
      <div className='notification'>
        <Icon className='notification__icon' size={25} name={iconName} />
        <div className='notification__details'>
          <h4 className='notification__title'>{title}</h4>
          <p className='notification__message'>{message}</p>
        </div>
      </div>,
      {
        // toastId: `${messageType}}`,
        icon: false,
        type: messageType as TypeOptions,
      },
    )
  }

  useEffectOnce(() => {
    Bus.on(Bus.eventList.success, payload =>
      showToast(NOTIFICATION_TYPE.success, payload),
    )
    Bus.on(Bus.eventList.warning, payload =>
      showToast(NOTIFICATION_TYPE.warning, payload),
    )
    Bus.on(Bus.eventList.error, payload =>
      showToast(NOTIFICATION_TYPE.error, payload),
    )
    Bus.on(Bus.eventList.info, payload =>
      showToast(NOTIFICATION_TYPE.info, payload),
    )
    Bus.on(Bus.eventList.default, payload =>
      showToast(NOTIFICATION_TYPE.default, payload),
    )
  })

  return <ToastContainer />
}
