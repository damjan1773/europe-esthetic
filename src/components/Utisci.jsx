import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { izBlura } from './Hero.jsx'
import SectionLabel from './SectionLabel.jsx'
import { Star } from './Icons.jsx'
import { utisci } from '../data/utisci.js'
import styles from './Utisci.module.css'

// Ceo red se aktivira jednom kad uđe u ekran, a kartice se redom izoštre iz blura (bez pomeranja,
// kao na prvoj strani). Pomeranje (x) bi i poremetilo početnu poziciju reda zbog scroll-snap-a.
const rail = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const card = izBlura(8, 0.8)

// Automatsko klizanje utisaka
const BRZINA = 20 // px u sekundi – sporo
const PAUZA_POSLE_DODIRA = 4000 // ms: posle dodira/prevlačenja klizanje čeka pa nastavlja

// Red sam polako klizi ulevo, u krug. Kartice su u DOM-u dva puta zaredom, pa kad prva
// grupa izađe levo, pozicija se vrati za tačno širinu jedne grupe – izgleda isto, bez skoka.
//
// Glatkoća: tokom klizanja se NE menja scrollLeft (telefoni ga zaokružuju na cele piksele, pa
// sporo kretanje „secka”), nego se red (.track) pomera transform-om, u delovima piksela, na GPU-u.
// Ukupna pozicija = rail.scrollLeft + pomeraj. Čim korisnik dodirne red, pomeraj se „prebaci”
// u scrollLeft (razlika < 1 px, neprimetno) i ručno prevlačenje radi kao običan skrol.
//
// Staje dok korisnik dodiruje/prevlači (i još PAUZA_POSLE_DODIRA posle), i kad sekcija nije na ekranu.
function useAutoKlizanje(railRef, trackRef, ukljuceno, brojKartica, onKartica) {
  useEffect(() => {
    const rail = railRef.current
    const track = trackRef.current
    if (!ukljuceno || !rail || !track) return

    let raf = 0
    let prosli = 0
    let pomeraj = 0
    let drzi = false
    let pauzaDo = 0
    let poslednjaKartica = -1

    const kartice = () => track.querySelectorAll('figure')
    const sirinaGrupe = () => {
      const f = kartice()
      return f.length > brojKartica ? f[brojKartica].offsetLeft - f[0].offsetLeft : 0
    }
    const korak = () => {
      const f = kartice()
      return f.length > 1 ? f[1].offsetLeft - f[0].offsetLeft : 0
    }
    const primeni = () => {
      track.style.transform = pomeraj ? `translate3d(${-pomeraj}px, 0, 0)` : ''
    }
    // Postavi ukupnu poziciju: ceo deo u scrollLeft, ostatak (delovi piksela) u transform
    const postavi = (ukupno) => {
      rail.scrollLeft = Math.floor(ukupno)
      pomeraj = ukupno - rail.scrollLeft
      primeni()
    }
    // Prebaci pomeraj u scrollLeft (pre ručnog prevlačenja i kad se klizanje zaustavi)
    const prebaci = () => {
      if (!pomeraj) return
      const ukupno = rail.scrollLeft + pomeraj
      rail.scrollLeft = Math.round(ukupno)
      pomeraj = 0
      primeni()
    }

    const klizi = (vreme) => {
      raf = requestAnimationFrame(klizi)
      const dt = prosli ? Math.min(vreme - prosli, 64) : 0
      prosli = vreme
      if (drzi || vreme < pauzaDo) return

      pomeraj += (BRZINA * dt) / 1000
      const w = sirinaGrupe()
      const ukupno = rail.scrollLeft + pomeraj
      if (w > 0 && ukupno >= w) postavi(ukupno - w)
      else primeni()

      // Tačkice: scroll događaj se ne dešava dok klizi transform, pa ih ažuriramo odavde
      const k = korak()
      if (k > 0) {
        const i = Math.round((rail.scrollLeft + pomeraj) / k) % brojKartica
        if (i !== poslednjaKartica) {
          poslednjaKartica = i
          onKartica(i)
        }
      }
    }
    const start = () => {
      // data-auto isključuje scroll-snap dok je klizanje uključeno (i tokom pauze): inače bi red
      // pri svakom dodiru skočio na najbližu karticu i izgledao trzavo
      rail.dataset.auto = ''
      if (!raf) {
        prosli = 0
        raf = requestAnimationFrame(klizi)
      }
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      prebaci()
      delete rail.dataset.auto
    }

    const pritisak = () => {
      prebaci() // sinhrono, pre nego što pregledač krene da skroluje prstom
      drzi = true
    }
    const pusti = () => {
      if (!drzi) return // dodir je počeo negde drugde na stranici
      drzi = false
      pauzaDo = performance.now() + PAUZA_POSLE_DODIRA
    }
    const kratkaPauza = () => {
      prebaci()
      pauzaDo = performance.now() + PAUZA_POSLE_DODIRA
    }
    rail.addEventListener('pointerdown', pritisak)
    rail.addEventListener('touchstart', pritisak, { passive: true })
    window.addEventListener('pointerup', pusti)
    window.addEventListener('pointercancel', pusti)
    rail.addEventListener('touchend', pusti)
    rail.addEventListener('touchcancel', pusti)
    rail.addEventListener('wheel', kratkaPauza, { passive: true })
    rail.addEventListener('focusin', kratkaPauza)

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.2 })
    io.observe(rail)

    return () => {
      io.disconnect()
      stop()
      rail.removeEventListener('pointerdown', pritisak)
      rail.removeEventListener('touchstart', pritisak)
      window.removeEventListener('pointerup', pusti)
      window.removeEventListener('pointercancel', pusti)
      rail.removeEventListener('touchend', pusti)
      rail.removeEventListener('touchcancel', pusti)
      rail.removeEventListener('wheel', kratkaPauza)
      rail.removeEventListener('focusin', kratkaPauza)
    }
  }, [railRef, trackRef, ukljuceno, brojKartica, onKartica])
}

export default function Utisci() {
  const railRef = useRef(null)
  const trackRef = useRef(null)
  const [aktivan, setAktivan] = useState(0)
  const n = utisci.length

  // Uz prefers-reduced-motion nema automatskog klizanja (ni duplih kartica)
  const auto = !useReducedMotion()
  const lista = auto ? [...utisci, ...utisci] : utisci
  useAutoKlizanje(railRef, trackRef, auto, n, setAktivan)

  // Tačkice prate karticu koja je trenutno poravnata levo (kopije se računaju kao originali).
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
    const naKraju = !auto && rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2
    setAktivan(naKraju ? n - 1 : najbliza % n)
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
      {/* whileInView je na vidljivom okviru (.rail), ne na redu (.track): red sa 20 kartica je
          širok ~6000 px, pa nikad ne bi bilo 25% njega na ekranu i kartice bi ostale nevidljive.
          Varijante (izoštravanje iz blura) se preko konteksta prenose na kartice u redu. */}
      <motion.div
        ref={railRef}
        className={styles.rail}
        onScroll={onScroll}
        variants={rail}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div ref={trackRef} className={styles.track}>
          {lista.map((u, i) => {
            const kopija = i >= n
            return (
              <motion.figure
                key={`${u.id}-${kopija ? 'b' : 'a'}`}
                variants={card}
                className={`${styles.card} ${u.tone === 'light' ? styles.light : styles.dark}`}
                data-placeholder="utisak"
                aria-hidden={kopija || undefined}
              >
                {u.ocena && (
                  <div className={styles.stars} role="img" aria-label={`Ocena ${u.ocena} od 5`}>
                    {Array.from({ length: 5 }, (_, j) => (
                      <Star key={j} size={16} className={j < u.ocena ? styles.starOn : styles.starOff} />
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
            )
          })}
          <div className={styles.railEnd} aria-hidden="true" />
        </div>
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
