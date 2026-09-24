import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Photo from './Photo.jsx'
import { EASE } from './Reveal.jsx'
import { Calendar, Phone, Pin } from './Icons.jsx'
import { telefon } from '../data/kontakt.js'
import styles from './Hero.module.css'

export const HERO_SRC = '/images/hero.webp'
const KASNJENJE = 0.5 // s: prvi element (gornja dugmad) kreće pola sekunde posle fotografije
const RAZMAK = 0.25 // s: svaki sledeći talas kreće ovoliko posle prethodnog
const BROJ_TALASA = 4 // EUROPE ESTHETIC, naslov, tekst, dugme
// Donja navigacija je poslednji talas (koristi se u PillNav.jsx)
export const NAV_KASNJENJE = KASNJENJE + RAZMAK * (BROJ_TALASA + 1)
const MAX_CEKANJE = 1500 // ms: ako je veza spora, elementi se pojave i bez fotografije

// Ulazna animacija u talasima: prvo samo fotografija, pa posle KASNJENJE gornja dugmad,
// pa na svakih RAZMAK sekundi sledeći element, i na kraju donja navigacija.
// Elementi se ne pomeraju: stoje na svom mestu i samo se izoštre iz blagog zamućenja (blur + fade).
// Na kraju filter mora biti 'none': i blur(0px) bi pokvario stakleni efekat (backdrop-filter) na dugmadima.
// delay se navodi samo za samostalne elemente; bez njega talase raspoređuje roditelj (staggerChildren)
export const izBlura = (blur, trajanje, delay) => ({
  hidden: { opacity: 0, filter: `blur(${blur}px)` },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: trajanje, ease: EASE, ...(delay !== undefined && { delay }) },
    transitionEnd: { filter: 'none' },
  },
})
const header = izBlura(8, 0.8, KASNJENJE)
const content = {
  hidden: {},
  show: { transition: { staggerChildren: RAZMAK, delayChildren: KASNJENJE + RAZMAK } },
}

// true kad je fotografija preuzeta (ili posle MAX_CEKANJE, da stranica ne ostane prazna)
// Koristi ga i PillNav, da i navigacija broji vreme od istog trenutka.
export function useSlikaSpremna(src) {
  const [spremna, setSpremna] = useState(false)
  useEffect(() => {
    const img = new Image()
    const gotovo = () => setSpremna(true)
    img.onload = gotovo
    img.onerror = gotovo
    img.src = src
    if (img.complete) gotovo()
    const t = setTimeout(gotovo, MAX_CEKANJE)
    return () => {
      clearTimeout(t)
      img.onload = img.onerror = null
    }
  }, [src])
  return spremna
}
const talas = izBlura(10, 0.9)
const slika = izBlura(12, 1.1)

export default function Hero() {
  const spremna = useSlikaSpremna(HERO_SRC)

  return (
    <motion.section
      id="hero"
      className={styles.hero}
      aria-label="Početna"
      initial="hidden"
      animate={spremna ? 'show' : 'hidden'}
    >
      <motion.div
        className={styles.photoWrap}
        variants={slika}
      >
        {/* Prethodne verzije: /images/hero-osmeh.webp (nasmejana, karamel pozadina),
            /images/hero-profil.webp (profil zatvorenih očiju) – obe imaju lice na sredini,
            pa bi uz njih trebalo vratiti podizanje slike (translateY) u Hero.module.css */}
        <Photo
          src={HERO_SRC}
          priority
          className={styles.photo}
          imgClassName={styles.photoImg}
          labelClassName={styles.photoLabel}
          alt="Žena tamne kose u crnoj haljini, sa rukom uz blistavo, negovano lice"
          hint="Mesto za fotografiju: portret žene preko celog ekrana, lice u gornjem delu kadra"
          label="FOTO · PORTRET, LICE GORE"
        />
      </motion.div>
      <svg className={styles.grain} aria-hidden="true" width="100%" height="100%">
        <filter id="grainHero">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainHero)" />
      </svg>
      <div className={styles.shade} aria-hidden="true" />

      <motion.header className={styles.header} variants={header}>
        <a href="#kontakt" className={`${styles.glass} ${styles.location} tap`}>
          <Pin size={18} strokeWidth={1.6} />
          <span>Sun City · Novi Beograd</span>
        </a>
        <a href={telefon.href} className={`${styles.glass} ${styles.call} tap`} aria-label="Pozovi salon">
          <Phone size={20} strokeWidth={1.6} />
        </a>
      </motion.header>

      <motion.div className={styles.content} variants={content}>
        <motion.div className={styles.brand} variants={talas}>
          <span className={styles.brandName}>EUROPE ESTHETIC</span>
          <span className={styles.brandSub}>CENTAR ESTETIKE I NEGE KOŽE</span>
        </motion.div>
        <motion.h1 className={styles.title} variants={talas}>
          25 godina posvećenosti vašoj koži
        </motion.h1>
        <motion.p className={styles.lead} variants={talas}>
          Stručni tretmani podmlađivanja i nege lica, u mirnom prostoru gde se vaša koža oseća sigurno.
        </motion.p>
        <motion.div className={styles.actions} variants={talas}>
          <a href="#kontakt" className={`${styles.cta} tap`}>
            <Calendar size={18} strokeWidth={1.7} />
            <span>Zakaži termin</span>
          </a>
        </motion.div>
      </motion.div>

    </motion.section>
  )
}
