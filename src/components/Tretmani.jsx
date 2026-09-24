import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal, { EASE, MARGINA } from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'
import { ArrowUpRight, Chevron, Clock } from './Icons.jsx'
import { kategorije, brojTretmana } from '../data/tretmani.js'
import { izBlura } from './Hero.jsx'
import styles from './Tretmani.module.css'

// Kategorije 01–04 se redom izoštre iz blura kad lista uđe u ekran (bez pomeranja, kao na prvoj strani)
const lista = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const kategorija = izBlura(8, 0.8)

export default function Tretmani({ otvorena, onToggle }) {
  // Visina nije transformacija pa je MotionConfig ne gasi – zato ručno za reduced motion.
  const reduce = useReducedMotion()
  const panelTransition = reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }

  return (
    <section id="tretmani" className={styles.section} aria-labelledby="tretmani-naslov">
      <Reveal as="header" className={styles.header}>
        <SectionLabel>TRETMANI</SectionLabel>
        <h2 id="tretmani-naslov" className={styles.title}>
          Nega prilagođena baš vama
        </h2>
        <p className={styles.lead}>
          Otvorite kategoriju i pogledajte tretmane. Tačan plan pravimo zajedno, na prvom terminu.
        </p>
      </Reveal>

      <motion.div
        className={styles.list}
        variants={lista}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2, margin: MARGINA }}
      >
        {kategorije.map((c) => {
          const open = c.id === otvorena
          const panelId = `tretmani-${c.id}`
          return (
            <motion.section
              key={c.id}
              variants={kategorija}
              className={`${styles.cat} ${open ? styles.open : ''}`}
            >
              <h3 className={styles.catHeading}>
                <button
                  type="button"
                  className={`${styles.toggle} tap`}
                  aria-expanded={open}
                  aria-controls={open ? panelId : undefined}
                  onClick={() => onToggle(open ? null : c.id)}
                >
                  <span className={styles.num}>{c.num}</span>
                  <span className={styles.catText}>
                    <span className={styles.catName}>{c.name}</span>
                    <span className={styles.count}>{brojTretmana(c.items.length)}</span>
                  </span>
                  <span className={styles.chevron}>
                    <Chevron size={18} />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="panel"
                    id={panelId}
                    className={styles.panelClip}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={panelTransition}
                  >
                    <div className={styles.panel}>
                      {c.items.map((t, j) => (
                        <motion.article
                          key={t.name}
                          className={styles.item}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.08 + j * 0.06 }}
                        >
                          <h4 className={styles.itemName}>{t.name}</h4>
                          <p className={styles.itemDesc}>{t.desc}</p>
                          <div className={styles.meta}>
                            {/* PLACEHOLDER: trajanje i cena – src/data/tretmani.js */}
                            <span className={styles.chip} data-placeholder="trajanje">
                              <Clock size={14} />
                              <span>{t.time}</span>
                            </span>
                            <span className={styles.chip} data-placeholder="cena">{t.price}</span>
                            <a href="#kontakt" className={`${styles.book} tap`} aria-label={`Zakaži: ${t.name}`}>
                              <span>Zakaži</span>
                              <ArrowUpRight size={15} />
                            </a>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )
        })}
      </motion.div>
    </section>
  )
}
