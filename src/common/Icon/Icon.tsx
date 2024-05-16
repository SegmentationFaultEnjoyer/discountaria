import { rem } from '@mantine/core'
import { HTMLAttributes } from 'react'

import { ICON_NAMES } from '@/enums'

import classes from './Icon.module.scss'

type Props = {
  name: ICON_NAMES
  size?: number | string
} & HTMLAttributes<HTMLOrSVGElement>

export const Icon = ({ name, size, className = '', ...rest }: Props) => (
  <svg
    className={`${classes.icon} ${className}`}
    aria-hidden='true'
    style={{ width: rem(size), height: rem(size) }}
  >
    <use href={`#${name}-icon`} {...rest} />
  </svg>
)
