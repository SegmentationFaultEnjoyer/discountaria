import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & MotionProps

export default function LoginPage({ ...rest }: Props) {
  return <motion.div {...rest}>DICK</motion.div>
}
