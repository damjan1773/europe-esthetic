import { motion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

// Blagi fade-up kada element uđe u ekran (samo prvi put).
// `as` bira HTML element, pa Reveal može direktno da zameni postojeći element bez dodatnog omotača.
// Uz prefers-reduced-motion MotionConfig u App.jsx isključuje pomeranje, ostaje samo fade.
export default function Reveal({ as = 'div', delay = 0, children, ...rest }) {
  const Component = motion[as]
  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Component>
  )
}
