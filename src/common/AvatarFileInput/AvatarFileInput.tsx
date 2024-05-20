import { Avatar, FileButton, FileButtonProps, Group } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { useRef } from 'react'

import { ICON_NAMES } from '@/enums'

import { Icon } from '../Icon/Icon'
import classes from './AvatarFileInput.module.scss'

type Props = {
  backgoundUrl?: string
  size: number
  onFileChange: (file: File) => void | Promise<void>
} & Partial<FileButtonProps>

export const AvatarFileInput = ({
  backgoundUrl,
  size,
  onFileChange,
  ...rest
}: Props) => {
  const { hovered, ref } = useHover()
  const resetRef = useRef<() => void>(null)

  const onChange = (file: File | null) => {
    if (!file) return

    onFileChange(file)

    resetRef.current?.()
  }

  return (
    <FileButton
      accept='image/png,image/jpeg'
      {...rest}
      resetRef={resetRef}
      onChange={onChange}
    >
      {({ onClick }) => (
        <Group
          pos='relative'
          className={classes['avatar-file-input']}
          ref={ref}
          onClick={onClick}
        >
          <Avatar size={size} src={backgoundUrl} />
          {hovered && (
            <>
              <Group
                pos='absolute'
                w={size}
                h={size}
                className={classes['avatar-file-input__overlay']}
              />
              <Icon
                name={ICON_NAMES.camera}
                size={50}
                className={classes['avatar-file-input__icon']}
              />
            </>
          )}
        </Group>
      )}
    </FileButton>
  )
}
