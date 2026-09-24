import Photo from './Photo.jsx'
import Reveal from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'
import { ArrowRight, ArrowUpRight } from './Icons.jsx'
import styles from './Kamuflaza.module.css'

const usluge = [
  { naziv: 'Kamuflaža strija', opis: 'Ton strija usklađujemo sa okolnom kožom.' },
  { naziv: 'Prikrivanje vitiliga', opis: 'Ujednačen ten, nijansu po nijansu.' },
]

export default function Kamuflaza({ onOpenKategorija }) {
  return (
    <section id="kamuflaza" className={styles.section} aria-labelledby="kamuflaza-naslov">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <Reveal>
          <SectionLabel className={styles.label}>KAMUFLAŽA</SectionLabel>
        </Reveal>

        <Reveal className={styles.intro}>
          <h2 id="kamuflaza-naslov" className={styles.title}>
            Vratite sigurnost u svojoj koži
          </h2>
          {/* PLACEHOLDER: fotografija – src="/images/kamuflaza.jpg" */}
          <Photo
            className={styles.photo}
            labelClassName={styles.photoLabel}
            alt="Nežan detalj kože, ruka ili rame"
          />
        </Reveal>

        <Reveal as="p" className={styles.body}>
          Kamuflaža se radi polako i u vašem tempu. Nijansu biramo zajedno, tako da se prirodno stopi sa vašim tenom. Pre svakog tretmana imate vremena da postavite sva pitanja.
        </Reveal>

        <Reveal className={styles.list}>
          {usluge.map((u) => (
            <a
              key={u.naziv}
              href="#tretmani"
              className={styles.card}
              onClick={() => onOpenKategorija('kamuflaza')}
            >
              <span className={styles.cardText}>
                <span className={styles.cardName}>{u.naziv}</span>
                <span className={styles.cardDesc}>{u.opis}</span>
              </span>
              <span className={styles.cardIcon}>
                <ArrowUpRight size={16} />
              </span>
            </a>
          ))}
        </Reveal>

        <Reveal as="a" href="#kontakt" className={styles.cta}>
          <span>Zakažite razgovor</span>
          <ArrowRight size={16} />
        </Reveal>
      </div>
    </section>
  )
}
