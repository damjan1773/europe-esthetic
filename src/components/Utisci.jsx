import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal, { EASE } from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'
import { Star } from './Icons.jsx'
import { utisci } from '../data/utisci.js'
import styles from './Utisci.module.css'

// Ceo red se aktivira jednom kad uđe u ekran, a kartice ulaze redom sa desne strane
// (i delimično vidljiva sledeća kartica, da se vidi da ima još).
const rail = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const card = {
  hidden: { opacity: 0, x: 56 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
}

export default function Utisci() {
  const railRef = useRef(null)
  const [aktivan, setAktivan] = useState(0)

  // Tačkice prate karticu koja je trenutno poravnata levo.
  const onScroll = () => {
    const rail = railRef.current
    const kartice = [...rail.querySelectorAll('figure')]
    const levo = rail.getBoundingClientRect().left
    let najbliza = 0
    let min = Infinity
    kartice.forEach((k, i) => {
      const d = Math.abs(k.getBoundingClientRect().left - levo - 16)
      if (d < min) {
        min = d
        najbliza = i
      }
    })
    const naKraju = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2
    setAktivan(naKraju ? kartice.length - 1 : najbliza)
  }

  return (
    <section id="utisci" className={styles.section} aria-labelledby="utisci-naslov">
      <Reveal as="header" className={styles.header}>
        <SectionLabel>UTISCI</SectionLabel>
        <h2 id="utisci-naslov" className={styles.title}>
          Reči naših klijentkinja
        </h2>
      </Reveal>

      {/* DEMO utisci (izmišljeni) – src/data/utisci.js. Zameniti pravim pre objavljivanja. */}
      <motion.div
        ref={railRef}
        className={styles.rail}
        onScroll={onScroll}
        variants={rail}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {utisci.map((u) => (
          <motion.figure
            key={u.id}
            variants={card}
            className={`${styles.card} ${u.tone === 'light' ? styles.light : styles.dark}`}
            data-placeholder="utisak"
          >
            {u.ocena && (
              <div className={styles.stars} role="img" aria-label={`Ocena ${u.ocena} od 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} className={i < u.ocena ? styles.starOn : styles.starOff} />
                ))}
              </div>
            )}
            <blockquote className={styles.quote}>{u.text}</blockquote>
            <figcaption className={styles.caption}>
              <span className={styles.person}>
                <span className={styles.avatar} aria-hidden="true">{u.name.replace(/[^A-Za-zČĆĐŠŽ]/g, '').charAt(0)}</span>
                <span className={styles.name}>{u.name}</span>
              </span>
              <span className={styles.tag}>{u.tretman}</span>
            </figcaption>
          </motion.figure>
        ))}
        <div className={styles.railEnd} aria-hidden="true" />
      </motion.div>

      <Reveal className={styles.footer}>
        <div className={styles.dots} aria-hidden="true">
          {utisci.map((u, i) => (
            <span key={u.id} className={`${styles.dot} ${i === aktivan ? styles.dotActive : ''}`} />
          ))}
        </div>
        <span className={styles.hint}>Prevucite za još</span>
      </Reveal>
    </section>
  )
}
