import '@static/fonts/index.css'

import {
  ActionIcon,
  Button,
  createTheme,
  MantineColorsTuple,
  Modal,
  rem,
  TextInput,
  Title,
} from '@mantine/core'

import classes from '@/styles/components.module.scss'

export const colors = {
  primary: [
    '#f2f8f2',
    '#e3eee3',
    '#c2dbc2',
    '#9fc89f',
    '#82b881',
    '#6fae6e',
    '#65aa63',
    '#549552',
    '#498448',
    '#3b723b',
  ] as MantineColorsTuple,
}

export const theme = createTheme({
  fontFamily: 'VDS',
  colors,
  headings: {
    sizes: {
      h1: {
        fontSize: rem(74),
        fontWeight: '400',
      },
    },
  },
  components: {
    Title: Title.extend({
      styles: {
        root: {
          letterSpacing: rem(5),
          WebkitTextStroke: `3px ${colors.primary[9]}`,
          color: 'white',
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        variant: 'underline',
      },
      classNames: {
        input: classes['text-input-override'],
      },
    }),
    Button: Button.extend({
      classNames: {
        root: classes['button-override'],
      },
      defaultProps: {
        color: colors.primary[9],
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: colors.primary[9],
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        centered: true,
        closeOnClickOutside: false,
      },
      styles: {
        title: {
          fontSize: rem(32),
          fontWeight: 600,
          color: colors.primary[9],
        },
        content: {
          padding: rem(20),
          borderRadius: rem(30),
        },
      },
    }),
  },
})
