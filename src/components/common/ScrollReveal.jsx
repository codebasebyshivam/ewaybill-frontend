// components/Reveal.jsx
import { motion } from 'framer-motion';

/**
 * ScrollReveal - Animates children into view on scroll using Framer Motion.
 * @param {ReactNode} children - Content to animate.
 * @param {string} className - Additional classes.
 * @param {number} delay - Animation delay (for staggered effects).
 */
export default function ScrollReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={`will-change-transform will-change-opacity ${className}`}
    >
      {children}
    </motion.div>
  );
}
