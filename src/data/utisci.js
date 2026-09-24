// ⚠️ DEMO UTISCI – IZMIŠLJENI, samo da vlasnica vidi kako sekcija izgleda popunjena.
// PRE OBJAVLJIVANJA SAJTA obavezno zameniti pravim utiscima (tačne reči, ime i ocena, uz saglasnost
// klijentkinje) ili vratiti placeholdere ispod. Lažni utisci i ocene na javnom sajtu obmanjuju posetioce.

export const utisci = [
  {
    id: 1,
    text: 'Posle tri tretmana derma penom koža mi je vidno ujednačenija, a sitni ožiljci od akni skoro da se ne primećuju. Tatjana sve objasni unapred, pa sam od prvog dana bila potpuno opuštena.',
    name: 'Marija M.',
    tretman: 'Derma pen',
    ocena: 5,
    tone: 'dark',
  },
  {
    id: 2,
    text: 'Godinama sam tražila nekoga ko će mi srediti obrve, a da izgledaju prirodno. Oblik je savršeno pogođen i svako jutro mi štedi vreme.',
    name: 'Jelena J.',
    tretman: 'Iscrtavanje obrva',
    ocena: 5,
    tone: 'light',
  },
  {
    id: 3,
    text: 'Zbog strija sam izbegavala kupaće kostime. Radile smo polako i nijansa se stvarno stopila sa mojom kožom. Ovog leta sam prvi put na plaži bez razmišljanja.',
    name: 'Ana N.',
    tretman: 'Kamuflaža',
    ocena: 5,
    tone: 'dark',
  },
  {
    id: 4,
    text: 'Plazma pen sam radila zbog kapaka i rezultat je prirodan, niko ne primećuje da sam nešto radila, samo mi kažu da izgledam odmorno. Oporavak je bio kraći nego što sam očekivala.',
    name: 'Milica S.',
    tretman: 'Plazma pen',
    ocena: 5,
    tone: 'light',
  },
  {
    id: 5,
    text: 'Salon je miran i prijatan, nema žurbe. Posle Lift & Glow tretmana koža mi je sjajna i zategnuta, a Tatjana mi je dala i savete za negu kod kuće.',
    name: 'Ivana R.',
    tretman: 'Lift & Glow',
    ocena: 5,
    tone: 'dark',
  },
  {
    id: 6,
    text: 'Dolazim na piling svakih mesec dana već pola godine. Koža je glatka, pore su manje vidljive, a šminka mi mnogo bolje leži.',
    name: 'Tamara K.',
    tretman: 'Piling',
    ocena: 5,
    tone: 'light',
  },
]

// Placeholderi iz dizajna, za vraćanje umesto demo utisaka (bez ocene – zvezdice se tada ne prikazuju):
// { id: 1, text: '[Utisak klijentkinje: dve do tri rečenice, njenim rečima, o tretmanu i osećaju posle njega.]', name: '[Ime P.]', tretman: 'Derma pen', tone: 'dark' },
// { id: 2, text: '[Utisak klijentkinje: dve do tri rečenice, njenim rečima.]', name: '[Ime P.]', tretman: 'Iscrtavanje obrva', tone: 'light' },
// { id: 3, text: '[Utisak klijentkinje: dve do tri rečenice, njenim rečima.]', name: '[Ime P.]', tretman: 'Kamuflaža', tone: 'dark' },
