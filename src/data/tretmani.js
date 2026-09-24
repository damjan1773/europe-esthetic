// Podaci o tretmanima, preneti iz design/Tretmani.dc.html.
// PLACEHOLDER: trajanje ("XX min") i cena ("od X din") – zameniti pravim podacima
// kada ih vlasnica dostavi (polja `time` i `price` na svakom tretmanu).

const TIME = 'XX min'
const PRICE = 'od X din'

export const kategorije = [
  {
    id: 'podmladjivanje',
    num: '01',
    name: 'Podmlađivanje',
    items: [
      { name: 'Derma pen', desc: 'Mikroiglični tretman koji podstiče prirodnu obnovu kolagena. Ujednačava teksturu kože i ublažava fine linije i ožiljke.', time: TIME, price: PRICE },
      { name: 'Plazma pen', desc: 'Precizno zatezanje opuštene kože bez skalpela, najčešće u predelu kapaka i oko usana.', time: TIME, price: PRICE },
      { name: 'Lift & Glow tretman kože', desc: 'Tretman za čvrstinu i prirodan sjaj, posle kog koža izgleda odmornije i zategnutije.', time: TIME, price: PRICE },
      { name: 'Skin regeneration', desc: 'Obnova i jačanje kože kojoj su sunce, stres ili zahtevni tretmani oduzeli svežinu.', time: TIME, price: PRICE },
    ],
  },
  {
    id: 'nega',
    num: '02',
    name: 'Nega lica',
    items: [
      { name: 'Piling', desc: 'Nežno uklanjanje odumrlih ćelija za glatku, svežu i ujednačenu kožu.', time: TIME, price: PRICE },
      { name: 'Tretman podočnjaka', desc: 'Ciljana nega osetljive regije oko očiju, za svežiji i odmorniji pogled.', time: TIME, price: PRICE },
    ],
  },
  {
    id: 'obrve',
    num: '03',
    name: 'Obrve',
    items: [
      { name: 'Iscrtavanje obrva', desc: 'Oblik i gustina obrva usklađeni sa crtama vašeg lica, za prirodan i uredan izgled.', time: TIME, price: PRICE },
    ],
  },
  {
    id: 'kamuflaza',
    num: '04',
    name: 'Kamuflaža',
    items: [
      { name: 'Kamuflaža strija', desc: 'Tonsko usklađivanje strija sa okolnom kožom, pažljivo i u vašem tempu.', time: TIME, price: PRICE },
      { name: 'Prikrivanje vitiliga', desc: 'Ujednačavanje tena na svetlijim poljima kože, nijansu po nijansu.', time: TIME, price: PRICE },
    ],
  },
]

// Na početku su sve kategorije zatvorene; otvara ih korisnik klikom.
export const POCETNA_KATEGORIJA = null

export function brojTretmana(n) {
  return n + (n === 1 ? ' tretman' : ' tretmana')
}
