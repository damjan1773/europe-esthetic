import Reveal from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'
import { ArrowRight, ArrowUpRight, Chat, Clock, Instagram, Phone } from './Icons.jsx'
import { adresa, instagram, radnoVreme, telefon, viber } from '../data/kontakt.js'
import styles from './Kontakt.module.css'

export default function Kontakt() {
  return (
    <section id="kontakt" className={styles.section} aria-labelledby="kontakt-naslov">
      <Reveal as="header" className={styles.header}>
        <SectionLabel>KONTAKT</SectionLabel>
        <h2 id="kontakt-naslov" className={styles.title}>
          Zakažite svoj termin
        </h2>
        <p className={styles.lead}>
          Pozovite ili pišite na Viber, a mi ćemo zajedno pronaći vreme koje vam odgovara.
        </p>
      </Reveal>

      <Reveal className={styles.actions}>
        <a href={telefon.href} className={`${styles.call} tap`}>
          <Phone size={22} strokeWidth={1.7} />
          <span className={styles.callText}>
            <span className={styles.callTitle}>Pozovi</span>
            <span className={styles.callNumber}>{telefon.prikaz}</span>
          </span>
          <span className={styles.callIcon}>
            <ArrowRight size={16} />
          </span>
        </a>
        <div className={styles.grid}>
          <a href={viber} className={`${styles.pill} tap`}>
            <Chat size={20} strokeWidth={1.7} />
            <span>Viber</span>
          </a>
          <a href={instagram} className={`${styles.pill} tap`} target="_blank" rel="noopener noreferrer" aria-label="Instagram: @_europeesthetic_">
            <Instagram size={20} strokeWidth={1.7} />
            <span>Instagram</span>
          </a>
        </div>
      </Reveal>

      <Reveal className={styles.mapCard}>
        {/* PLACEHOLDER: stilizovana mapa – po želji zameniti pravom mapom ili slikom */}
        <div className={styles.map} role="img" aria-label="Mesto za mapu: lokacija salona u zgradi Sun City" data-placeholder="mapa">
          <svg className={styles.mapSvg} aria-hidden="true" viewBox="0 0 358 210" preserveAspectRatio="xMidYMid slice">
            <rect width="358" height="210" fill="#EEEAE3" />
            <rect x="18" y="20" width="96" height="62" rx="6" fill="#E3DED5" />
            <rect x="140" y="14" width="80" height="72" rx="6" fill="#E3DED5" />
            <rect x="246" y="22" width="96" height="58" rx="6" fill="#E3DED5" />
            <rect x="18" y="126" width="110" height="70" rx="6" fill="#E3DED5" />
            <rect x="232" y="128" width="110" height="68" rx="6" fill="#DDE2D5" />
            <path d="M0 104 H358" stroke="#FFFFFF" strokeWidth="16" />
            <path d="M128 0 V210" stroke="#FFFFFF" strokeWidth="10" />
            <path d="M232 0 L214 210" stroke="#FFFFFF" strokeWidth="8" />
            <text x="12" y="100" fontFamily="Manrope, sans-serif" fontSize="10" fontWeight="600" fill="#8C857C" letterSpacing="0.06em">JURIJA GAGARINA</text>
          </svg>
          <div className={styles.marker}>
            <span className={styles.markerLabel}>Sun City</span>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#C9A96E" stroke="#141210" strokeWidth="1.2" aria-hidden="true">
              <path d="M12 22s-7-6.2-7-11.5A7 7 0 0 1 19 10.5C19 15.8 12 22 12 22z" />
              <circle cx="12" cy="10.5" r="2.6" fill="#FFFFFF" />
            </svg>
          </div>
          <span className={styles.mapTag}>MAPA</span>
        </div>
        <div className={styles.address}>
          <span className={styles.addressText}>
            <span className={styles.street}>{adresa.ulica}</span>
            <span className={styles.building}>{adresa.opis}</span>
          </span>
          <a href={adresa.mapa} className={`${styles.route} tap`} target="_blank" rel="noopener noreferrer">
            <span>Putanja</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </Reveal>

      {/* PLACEHOLDER: radno vreme – src/data/kontakt.js */}
      <Reveal className={styles.hours} data-placeholder="radno-vreme">
        <div className={styles.hoursHead}>
          <Clock size={18} strokeWidth={1.7} className={styles.hoursIcon} />
          <h3 className={styles.hoursTitle}>RADNO VREME</h3>
        </div>
        <dl className={styles.hoursList}>
          {radnoVreme.map((r) => (
            <div key={r.dani} className={styles.hoursRow}>
              <dt>{r.dani}</dt>
              <dd>{r.vreme}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
