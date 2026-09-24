import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Hero from './components/Hero.jsx'
import Tatjana from './components/Tatjana.jsx'
import Tretmani from './components/Tretmani.jsx'
import Rezultati from './components/Rezultati.jsx'
// Sekcija Kamuflaža je privremeno skrivena (fajl ostaje u src/components/Kamuflaza.jsx).
// Za vraćanje: import Kamuflaza from './components/Kamuflaza.jsx' i <Kamuflaza onOpenKategorija={setOtvorena} /> posle <Rezultati />.
import Utisci from './components/Utisci.jsx'
import Kontakt from './components/Kontakt.jsx'
import PillNav from './components/PillNav.jsx'
import { POCETNA_KATEGORIJA } from './data/tretmani.js'

export default function App() {
  // Otvorena kategorija harmonike (samo jedna u isto vreme).
  const [otvorena, setOtvorena] = useState(POCETNA_KATEGORIJA)

  return (
    // reducedMotion="user": uz prefers-reduced-motion nema pomeranja ni layout animacija
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <Rezultati />
        <Tretmani otvorena={otvorena} onToggle={setOtvorena} />
        <Utisci />
        <Tatjana />
        <Kontakt />
      </main>
      <PillNav />
    </MotionConfig>
  )
}
