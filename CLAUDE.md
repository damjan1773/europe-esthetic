# EUROPE ESTHETIC – mobilni sajt

Estetski salon, Novi Beograd. Kozmetolog Tatjana Petrović (25 godina iskustva).
Jurija Gagarina 30G, zgrada Sun City · +381 63 714 2142

## Izvor dizajna
`design/` sadrži 7 ekrana (390 px širine, iPhone) u ovom redosledu:
1. `Main.dc.html` – Hero
2. `Tatjana.dc.html` – o kozmetologu
3. `Tretmani.dc.html` – harmonika sa kategorijama (podaci o tretmanima su u `<script>` na dnu fajla)
4. `Rezultati.dc.html` – pre/posle klizač + prebacivanje primera
5. `Kamuflaza.dc.html` – kamuflaža strija i vitiliga
6. `Utisci.dc.html` – horizontalne kartice sa utiscima
7. `Kontakt.dc.html` – poziv, Viber, Instagram, mapa, radno vreme

Fajlovi su u "Design Component" formatu: običan HTML sa inline stilovima, plus
`{{promenljiva}}`, `<sc-for>` (petlja) i `<sc-if>` (uslov) koje popunjava klasa
`Component` u `<script type="text/x-dc">`. Ne pokreću se samostalno – koristi ih
kao tačnu referencu za izgled, tekst i ponašanje. `support.js` ne postoji i ne treba.

## Dizajn tokeni
Paleta je zamenjena u odnosu na `design/`: umesto toplih braon tonova sajt koristi **crnu, slonovaču/belu i zlato**
(po tetkinom crno-zlatnom logou i AI maketi). Sve boje su CSS varijable u `src/index.css` – nove boje dodavati tamo.
- Pozadine: slonovača `#F7F4EF` (`--c-krem`), tamnija slonovača `#EFEAE2` (`--c-pesak`), kartice bele `#FFFFFF`
- Tekst: skoro crna `#16130F` (`--c-espresso`), telo `#4A443E`, prigušen `#716960`
- Zlato: `#C9A96E` (`--c-zlatna`, linije/zvezdice), `#8A6A30` (`--c-zlatna-tamna`, zlatni tekst na svetlom),
  `#E2C78F` (`--c-zlatna-bleda`, zlatni tekst na tamnom), dugmad `#E3C68E` (`--c-pill`) sa tamnim tekstom
- Linije: `#E6DFD4`
- Tamne sekcije (Hero, Rezultati, Vaš kozmetolog): `#141210` / `#0E0C0A`, tekst `#F5F1EA`
- Oznake sekcija: na svetlom tamni tekst + zlatna linija, na tamnom zlatni tekst i linija
- Fontovi: EB Garamond (naslovi, 400/500; bez kurziva usred naslova – dizajn ga ima, ali na telefonu deluje kao mešanje fontova) + Manrope (tekst, 400–700), Google Fonts. Dizajn koristi Cormorant Garamond, ali on crta kvačice na š/ž/č kao odvojeno „v”; EB Garamond je iste širine i ima pravilne srpske dijakritike
- Radijusi: kartice 20–28 px, dugmad i pill-ovi 999 px
- Staklo: `rgba(255,252,247,0.12)` + `backdrop-filter: blur(18px)` + border `rgba(255,252,247,0.22)`
- Navigacija: `rgba(20,18,16,0.78)` + blur 20 px, visina 64 px, "Zakaži" zlatna pill
- Tap zone ≥ 44 px, horizontalne margine 16 px

## Pravila za implementaciju
- Jedna stranica koja se skroluje; svaka sekcija je komponenta.
- Hero je `min-height: 100svh`; pill navigacija je `position: fixed` pri dnu, uz `env(safe-area-inset-bottom)`.
- Linkovi na `X.dc.html` u dizajnu postaju skrol do odgovarajuće sekcije (`#tretmani`, `#rezultati`, `#kontakt`).
- Horizontalni redovi kartica: `overflow-x: auto` + `scroll-snap`, sledeća kartica delimično vidljiva.
- Tekst na srpskom (latinica), `<html lang="sr-Latn">`.
- Placeholderi (fotografije, cene "od X din", trajanje "XX min", radno vreme, Instagram nalog, utisci) ostaju označeni dok vlasnica ne dostavi prave podatke. Ne izmišljati utiske klijentkinja.
- Fotografije idu u `public/images/`.
