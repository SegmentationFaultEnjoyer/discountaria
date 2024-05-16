import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & MotionProps

export default function HomePage({ ...rest }: Props) {
  return <motion.div {...rest}>HOMe</motion.div>
}
