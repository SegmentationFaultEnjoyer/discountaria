import '@static/fonts/index.css'

import { createTheme, MantineColorsTuple, rem } from '@mantine/core'

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
    Title: {
      styles: {
        root: {
          letterSpacing: rem(5),
          WebkitTextStroke: `2px ${colors.primary[9]}`,
          color: 'white',
        },
      },
    },
    TextInput: {
      classNames: {
        input: classes['text-input-override'],
      },
      styles: {
        input: {
          border: 'none',
          borderRadius: 0,
          borderBottom: `2px solid ${colors.primary[9]}`,
          paddingInlineStart: rem(8),
          paddingBottom: rem(5),
        },
      },
    },
  },
})
