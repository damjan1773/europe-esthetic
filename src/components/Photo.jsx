import { useState } from 'react'
import styles from './Photo.module.css'

// Fotografija sa toplim placeholderom.
// - bez `src` (ili ako fajl ne postoji): prikazuje gradijent iz dizajna (klasa kroz `className`) i isprekidanu oznaku `label`
// - sa `src`: prikazuje sliku iz public/images/ (npr. src="/images/tatjana.jpg")
// - `priority`: za sliku koja se vidi odmah pri otvaranju (hero) – bez lazy učitavanja
export default function Photo({ src, alt = '', label = 'FOTO', hint, className = '', labelClassName = '', imgClassName = '', priority = false }) {
  const [neuspeo, setNeuspeo] = useState(null)

  if (src && neuspeo !== src) {
    return (
      <div className={`${styles.photo} ${className}`}>
        <img
          className={`${styles.img} ${imgClassName}`}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          draggable={false}
          onError={() => setNeuspeo(src)}
        />
      </div>
    )
  }

  return (
    <div
      className={`${styles.photo} ${styles.placeholder} ${className}`}
      role="img"
      aria-label={hint ?? `Mesto za fotografiju: ${alt}`}
      data-placeholder="foto"
    >
      {label && <span className={`${styles.label} ${labelClassName}`}>{label}</span>}
    </div>
  )
}
