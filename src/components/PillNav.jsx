import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HERO_SRC, NAV_KASNJENJE, izBlura, useSlikaSpremna } from './Hero.jsx'
import { Calendar } from './Icons.jsx'
import styles from './PillNav.module.css'

const SEKCIJE = ['hero', 'tatjana', 'tretmani', 'rezultati', 'utisci', 'kontakt']
const TAMNE = new Set(['rezultati'])

// Sekcija koja preseca horizontalnu liniju na sredini ekrana je trenutna.
function useTrenutnaSekcija() {
  const [trenutna, setTrenutna] = useState('hero')

  useEffect(() => {
    const elementi = SEKCIJE.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setTrenutna(entry.target.id)
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    elementi.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return trenutna
}

const STAVKE = [
  { id: 'tretmani', label: 'Tretmani' },
  { id: 'rezultati', label: 'Rezultati' },
  { id: 'kontakt', label: 'Zakaži', zakazi: true },
]

export default function PillNav() {
  const trenutna = useTrenutnaSekcija()
  const spremna = useSlikaSpremna(HERO_SRC)

  return (
    <motion.nav
      className={`${styles.nav} ${TAMNE.has(trenutna) ? styles.tamna : ''}`}
      aria-label="Glavna navigacija"
      // Poslednji talas ulazne animacije, posle hero fotografije i teksta (vremena su u Hero.jsx)
      variants={izBlura(8, 0.8, NAV_KASNJENJE)}
      initial="hidden"
      animate={spremna ? 'show' : 'hidden'}
    >
      {STAVKE.map((s) => {
        const active = trenutna === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`${styles.item} ${s.zakazi ? styles.zakazi : ''} tap`}
            aria-current={active ? 'location' : undefined}
          >
            {/* Jedan indikator (layoutId) koji klizi do aktivne stavke */}
            {active && (
              <motion.span
                layoutId="nav-aktivna"
                className={styles.indicator}
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                aria-hidden="true"
              />
            )}
            <span className={styles.itemLabel}>
              {s.zakazi && <Calendar size={17} />}
              <span>{s.label}</span>
            </span>
          </a>
        )
      })}
    </motion.nav>
  )
}
