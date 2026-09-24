import { motion } from 'framer-motion'
import Photo from './Photo.jsx'
import Reveal, { EASE, MARGINA } from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'
import styles from './Tatjana.module.css'

export default function Tatjana() {
  return (
    <section id="tatjana" className={styles.section} aria-labelledby="tatjana-naslov">
      <Reveal>
        <SectionLabel tone="dark" className={styles.label}>VAŠ KOZMETOLOG</SectionLabel>
      </Reveal>

      <Reveal className={styles.media}>
        <Photo
          src="/images/tatjana.jpg"
          imgClassName={styles.photoImg}
          className={styles.photo}
          labelClassName={styles.photoLabel}
          alt="Kozmetolog Tatjana Petrović u belom mantilu, u tretman sali salona"
          label="FOTO · TATJANA U SALONU"
        />
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6, margin: MARGINA }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.35 }}
        >
          <span className={styles.badgeNum}>25</span>
          <span className={styles.badgeText}>godina<br />iskustva</span>
        </motion.div>
      </Reveal>

      <Reveal className={styles.text}>
        <h2 id="tatjana-naslov" className={styles.title}>Tatjana Petrović</h2>
        <p className={styles.body}>
          Svaki tretman počinje razgovorom. Pre nego što bilo šta predložim, želim da upoznam vašu kožu, vaš ritam i ono što vam je važno. Posle 25 godina rada znam da najlepši rezultati dolaze bez žurbe, uz znanje i pažnju prema detaljima.
        </p>
        <span className={styles.signature}>— Tatjana</span>
      </Reveal>
    </section>
  )
}
