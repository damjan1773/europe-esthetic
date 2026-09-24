import styles from './SectionLabel.module.css'

export default function SectionLabel({ children, tone = 'light', className = '' }) {
  return (
    <div className={`${styles.label} ${tone === 'dark' ? styles.dark : ''} ${className}`}>
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
    </div>
  )
}
