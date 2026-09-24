import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from './Photo.jsx'
import Reveal, { EASE } from './Reveal.jsx'
import SectionLabel from './SectionLabel.jsx'
import { ChevronLeft, ChevronRight, Drag } from './Icons.jsx'
import { primeri } from '../data/rezultati.js'
import styles from './Rezultati.module.css'

const clamp = (v) => Math.min(100, Math.max(0, v))
const PRAG_POKRETA = 6 // px pre nego što odlučimo da li je potez horizontalan
const PRAG_SWIPE = 50 // px za prelazak na sledeći/prethodni primer

export default function Rezultati() {
  const [idx, setIdx] = useState(0)
  const [pos, setPos] = useState(50)
  const sliderRef = useRef(null)
  const drag = useRef(null)
  const swipe = useRef(null)

  const n = primeri.length
  const ex = primeri[idx]

  // Položaj linije ide kroz CSS promenljivu, a clip-path i ručica je čitaju u CSS-u.
  useLayoutEffect(() => {
    sliderRef.current?.style.setProperty('--pos', `${pos}%`)
  }, [pos])

  const pick = (i) => {
    setIdx((i + n) % n)
    setPos(50)
  }

  const posFromEvent = (e) => {
    const r = sliderRef.current.getBoundingClientRect()
    return clamp(((e.clientX - r.left) / r.width) * 100)
  }

  // --- Klizač: prevlačenje bilo gde po slici ---
  const onSliderDown = (e) => {
    const mouse = e.pointerType === 'mouse'
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, active: mouse }
    if (mouse) {
      e.currentTarget.setPointerCapture(e.pointerId)
      setPos(posFromEvent(e))
    }
  }

  const onSliderMove = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (!d.active) {
      const dx = Math.abs(e.clientX - d.x)
      const dy = Math.abs(e.clientY - d.y)
      if (dx > PRAG_POKRETA && dx > dy) {
        d.active = true
        e.currentTarget.setPointerCapture(e.pointerId)
      } else if (dy > PRAG_POKRETA) {
        drag.current = null // vertikalni skrol stranice
        return
      } else {
        return
      }
    }
    setPos(posFromEvent(e))
  }

  const onSliderUp = (e) => {
    const d = drag.current
    if (d && d.id === e.pointerId && !d.active) setPos(posFromEvent(e)) // dodir = skok na tu tačku
    drag.current = null
  }

  const onSliderKey = (e) => {
    const korak = e.shiftKey ? 10 : 5
    const mapa = {
      ArrowLeft: pos - korak,
      ArrowDown: pos - korak,
      ArrowRight: pos + korak,
      ArrowUp: pos + korak,
      Home: 0,
      End: 100,
    }
    if (e.key in mapa) {
      e.preventDefault()
      setPos(clamp(mapa[e.key]))
    }
  }

  // --- Swipe levo/desno između primera (dodir van slike) ---
  const onSectionDown = (e) => {
    if (e.pointerType === 'mouse' || sliderRef.current.contains(e.target)) return
    swipe.current = { id: e.pointerId, x: e.clientX, y: e.clientY }
  }

  const onSectionUp = (e) => {
    const s = swipe.current
    swipe.current = null
    if (!s || s.id !== e.pointerId) return
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    if (Math.abs(dx) > PRAG_SWIPE && Math.abs(dx) > Math.abs(dy) * 1.5) {
      pick(dx < 0 ? idx + 1 : idx - 1)
    }
  }

  return (
    <section
      id="rezultati"
      className={styles.section}
      aria-labelledby="rezultati-naslov"
      onPointerDown={onSectionDown}
      onPointerUp={onSectionUp}
      onPointerCancel={() => (swipe.current = null)}
    >
      <Reveal as="header" className={styles.header}>
        <SectionLabel tone="dark">REZULTATI</SectionLabel>
        <h2 id="rezultati-naslov" className={styles.title}>Pre i posle</h2>
        <p className={styles.lead}>Prevucite liniju levo i desno da uporedite.</p>
      </Reveal>

      <Reveal
        ref={sliderRef}
        className={styles.compare}
        role="slider"
        tabIndex={0}
        aria-label="Uporedi pre i posle"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% posle`}
        onPointerDown={onSliderDown}
        onPointerMove={onSliderMove}
        onPointerUp={onSliderUp}
        onPointerCancel={() => (drag.current = null)}
        onKeyDown={onSliderKey}
      >
        {/* Fotografije pre/posle – src/data/rezultati.js. Dok fajl ne postoji, oba sloja crtaju istu
            oznaku na istom mestu, pa izgleda kao jedna oznaka preko linije. */}
        <Photo
          className={`${styles.layer} ${styles[`before-${ex.id}`]}`}
          src={ex.before}
          alt={`${ex.name}, pre tretmana`}
          hint="Mesto za fotografiju: stanje pre tretmana"
          label="FOTO PRE · FOTO POSLE"
          labelClassName={styles.placeholderLabel}
        />
        <div className={styles.afterClip}>
          <Photo
            className={`${styles.layer} ${styles[`after-${ex.id}`]}`}
            src={ex.after}
            alt={`${ex.name}, posle tretmana`}
            hint="Mesto za fotografiju: stanje posle tretmana"
            label="FOTO PRE · FOTO POSLE"
            labelClassName={styles.placeholderLabel}
          />
        </div>
        <span className={styles.tagBefore} aria-hidden="true">PRE</span>
        <span className={styles.tagAfter} aria-hidden="true">POSLE</span>
        <div className={styles.line} aria-hidden="true" />
        <div className={styles.handle} aria-hidden="true">
          <Drag size={22} />
        </div>
      </Reveal>

      <Reveal className={styles.controls}>
        <div className={styles.caption} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={ex.id}
              className={styles.captionInner}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              <span className={styles.name}>{ex.name}</span>
              <span className={styles.note} data-placeholder="opis">{ex.note}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.arrows}>
          <button type="button" className={`${styles.prev} tap`} onClick={() => pick(idx - 1)} aria-label="Prethodni primer">
            <ChevronLeft size={18} />
          </button>
          <button type="button" className={`${styles.next} tap`} onClick={() => pick(idx + 1)} aria-label="Sledeći primer">
            <ChevronRight size={18} />
          </button>
        </div>
      </Reveal>

      <Reveal className={styles.dots}>
        {primeri.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
            onClick={() => pick(i)}
            aria-label={`Primer ${i + 1}: ${p.name}`}
            aria-current={i === idx ? 'true' : undefined}
          >
            <span />
          </button>
        ))}
      </Reveal>
    </section>
  )
}
