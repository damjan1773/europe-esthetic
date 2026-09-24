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
- Pozadine: krem `#F4ECE3`, pesak `#EFE4D8`, blush `#F2E6DD`, kartica `#FBF6F0`
- Tekst: espresso `#2A1D15`, telo `#4F3D31`, prigušen `#6B5444`
- Akcenti: karamel `#A8764F`, tamni karamel `#7E5436`, svetla pill dugmad `#F3E3D0`
- Linije: `#DFCDBA`
- Tamne sekcije (Rezultati, hero): `#2A1D15` / `#22160F`, tekst `#F6EADC`
- Fontovi: EB Garamond (naslovi, 400/500; bez kurziva usred naslova – dizajn ga ima, ali na telefonu deluje kao mešanje fontova) + Manrope (tekst, 400–700), Google Fonts. Dizajn koristi Cormorant Garamond, ali on crta kvačice na š/ž/č kao odvojeno „v”; EB Garamond je iste širine i ima pravilne srpske dijakritike
- Radijusi: kartice 20–28 px, dugmad i pill-ovi 999 px
- Staklo: `rgba(255,244,232,0.14)` + `backdrop-filter: blur(18px)` + border `rgba(255,244,232,0.26)`
- Navigacija: `rgba(38,27,20,0.72)` + blur 20 px, visina 64 px, "Zakaži" svetla pill
- Tap zone ≥ 44 px, horizontalne margine 16 px

## Pravila za implementaciju
- Jedna stranica koja se skroluje; svaka sekcija je komponenta.
- Hero je `min-height: 100svh`; pill navigacija je `position: fixed` pri dnu, uz `env(safe-area-inset-bottom)`.
- Linkovi na `X.dc.html` u dizajnu postaju skrol do odgovarajuće sekcije (`#tretmani`, `#rezultati`, `#kontakt`).
- Horizontalni redovi kartica: `overflow-x: auto` + `scroll-snap`, sledeća kartica delimično vidljiva.
- Tekst na srpskom (latinica), `<html lang="sr-Latn">`.
- Placeholderi (fotografije, cene "od X din", trajanje "XX min", radno vreme, Instagram nalog, utisci) ostaju označeni dok vlasnica ne dostavi prave podatke. Ne izmišljati utiske klijentkinja.
- Fotografije idu u `public/images/`.
