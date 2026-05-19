const STORAGE_KEY = "partydeck.players";
const WATER_BREAK_STORAGE_KEY = "partydeck.waterBreaksEnabled";
const MODE_STORAGE_KEY = "partydeck-mode";
const WATER_BREAK_CHANCE = 0.12;

const modes = [
  { id: "chill", title: "Chill", icon: "🌿", label: "Mood: Chill", description: "Rento ja kevyt" },
  { id: "spicy", title: "Spicy", icon: "🌶️", label: "Mood: Spicy", description: "Rohkeampi ja kiusallisempi" },
  { id: "wild", title: "Wild", icon: "😈", label: "Mood: Wild", description: "Kaikkein villein" },
];

const suits = [
  { id: "hearts", symbol: "♥", name: "hertta", color: "red" },
  { id: "diamonds", symbol: "♦", name: "ruutu", color: "red" },
  { id: "clubs", symbol: "♣", name: "risti", color: "black" },
  { id: "spades", symbol: "♠", name: "pata", color: "black" },
];

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const valueRank = Object.fromEntries(values.map((value, index) => [value, index + 1]));

const waterBreaks = [
  "Vesitauko. Kaikki ottavat hörpyn vettä.",
  "Pieni hengähdys. Täytä lasi vedellä ennen seuraavaa kierrosta.",
  "Taukokortti. Kysy vieruskaverilta, tarvitseeko hän vettä.",
  "Vesikierros. Hyvä hetki venytellä ja pitää pieni paussi.",
];

const neverHaveIEverModes = {
  chill: [
    "En ole koskaan myöhästynyt ja syyttänyt liikennettä.",
    "En ole koskaan esittänyt tietäväni biisin sanat.",
    "En ole koskaan nauranut omalle jutulleni liikaa.",
    "En ole koskaan unohtanut jonkun nimeä heti esittelyn jälkeen.",
    "En ole koskaan lähettänyt viestiä väärään chattiin.",
    "En ole koskaan avannut jääkaappia tietämättä mitä etsin.",
    "En ole koskaan katsonut sarjaa koko kauden yhdessä päivässä.",
    "En ole koskaan teeskennellyt kuuntelevani.",
    "En ole koskaan ottanut kuvaa ruoasta ennen syömistä.",
    "En ole koskaan eksynyt paikassa, jossa olen käynyt monta kertaa.",
    "En ole koskaan sanonut 'olen kohta siellä', vaikka olin vielä kotona.",
    "En ole koskaan käyttänyt samaa tekosyytä monta kertaa.",
    "En ole koskaan laulanut väärillä sanoilla täysillä.",
    "En ole koskaan unohtanut miksi menin huoneeseen.",
    "En ole koskaan ostanut jotain vain koska se oli alennuksessa.",
    "En ole koskaan hävinnyt väittelyä ja googlannut asiaa myöhemmin.",
    "En ole koskaan nauranut väärässä tilanteessa.",
    "En ole koskaan jättänyt viestiä lukematta tahallaan.",
    "En ole koskaan ollut liian laiska vastaamaan viestiin.",
    "En ole koskaan syönyt jonkun toisen ruokaa jääkaapista.",
  ],
  spicy: [
    "En ole koskaan lähettänyt flirttailevaa viestiä ja katunut sitä heti.",
    "En ole koskaan ihastunut kaverin kaveriin.",
    "En ole koskaan stalkannut jonkun somea liian pitkään.",
    "En ole koskaan poistanut viestiä, koska se oli liian rohkea.",
    "En ole koskaan miettinyt, mitä tapahtuisi jonkun tässä huoneessa olevan kanssa.",
    "En ole koskaan punastunut viestistä.",
    "En ole koskaan käyttänyt tekosyytä vain nähdäkseni jonkun.",
    "En ole koskaan flirttaillut vahingossa.",
    "En ole koskaan flirttaillut tahallani saadakseni jotain.",
    "En ole koskaan katunut, etten tehnyt aloitetta.",
    "En ole koskaan lähettänyt sydän-emojia ja miettinyt sitä liikaa.",
    "En ole koskaan ollut treffeillä, joista halusin lähteä kesken.",
    "En ole koskaan ihastunut johonkin vain äänen perusteella.",
    "En ole koskaan pitänyt salaa jostain samassa porukassa.",
    "En ole koskaan miettinyt, kuka tässä porukassa on paras suutelija.",
    "En ole koskaan saanut viestiä, joka sai hymyilemään typerästi.",
    "En ole koskaan antanut tarkoituksella liian pitkää halausta.",
    "En ole koskaan yrittänyt näyttää paremmalta vain yhden ihmisen takia.",
    "En ole koskaan pitänyt jonkun katseesta vähän liikaa.",
    "En ole koskaan ollut tilanteessa, jossa tunnelma oli selvästi flirttaileva.",
  ],
  wild: [
    "En ole koskaan tehnyt jotain, mitä en kehtaisi selittää seuraavana päivänä.",
    "En ole koskaan kadonnut bileistä sanomatta kenellekään.",
    "En ole koskaan suudellut jotakuta spontaanisti.",
    "En ole koskaan herännyt ja miettinyt, mitä eilen tapahtui.",
    "En ole koskaan tehnyt bileissä päätöstä, jota kadun vähän.",
    "En ole koskaan ollut mukana totuus vai tehtävä -tilanteessa, joka meni liian pitkälle.",
    "En ole koskaan vaihtanut vaatekappaletta jonkun kanssa illan aikana.",
    "En ole koskaan suudellut ihmistä, jota en tuntenut hyvin.",
    "En ole koskaan tehnyt jotain vain siksi, että muut yllyttivät.",
    "En ole koskaan pitänyt salassa illan tapahtumia.",
    "En ole koskaan ollut tilanteessa, jossa kaikki katsoivat minua.",
    "En ole koskaan flirttaillut liian rohkeasti.",
    "En ole koskaan tehnyt jotain, mistä kaverit muistuttavat vieläkin.",
    "En ole koskaan ollut bileiden legendaarisin hahmo.",
    "En ole koskaan saanut rohkeaa haastetta ja tehnyt sitä.",
    "En ole koskaan keksinyt tekosyytä päästäkseni lähemmäs jotakuta.",
    "En ole koskaan ollut tilanteessa, jossa vaatekerros lähti pelin takia.",
    "En ole koskaan suudellut poskelle jotakuta pelin aikana.",
    "En ole koskaan ottanut riskiä flirttitilanteessa.",
    "En ole koskaan tehnyt jotain, mitä en laittaisi someen.",
  ],
};

const mostLikelyModes = {
  chill: [
    "Kuka todennäköisimmin alkaa DJ:ksi kesken illan?",
    "Kuka todennäköisimmin tilaa ruokaa vielä yöllä?",
    "Kuka todennäköisimmin unohtaa mihin laittoi puhelimensa?",
    "Kuka todennäköisimmin nauraa omalle vitsilleen eniten?",
    "Kuka todennäköisimmin myöhästyy mutta tulee hyvällä energialla?",
    "Kuka todennäköisimmin ottaa ryhmäkuvan?",
    "Kuka todennäköisimmin ehdottaa jatkoja?",
    "Kuka todennäköisimmin unohtaa juomansa jonnekin?",
    "Kuka todennäköisimmin kertoo saman tarinan kahdesti?",
    "Kuka todennäköisimmin laulaa mukana väärillä sanoilla?",
    "Kuka todennäköisimmin voittaa lautapelin vahingossa?",
    "Kuka todennäköisimmin eksyy matkalla vessaan?",
    "Kuka todennäköisimmin alkaa tanssia ensimmäisenä?",
    "Kuka todennäköisimmin tekee illasta TikTok-materiaalin?",
    "Kuka todennäköisimmin unohtaa, mitä oli sanomassa?",
    "Kuka todennäköisimmin järjestää seuraavat bileet?",
    "Kuka todennäköisimmin selittää pitkän tarinan ilman pointtia?",
    "Kuka todennäköisimmin ostaa yöllä kebabin?",
    "Kuka todennäköisimmin keksii uuden sisäpiirivitsin?",
    "Kuka todennäköisimmin lähtee kotiin viimeisenä?",
  ],
  spicy: [
    "Kuka todennäköisimmin flirttailee vahingossa kaikille?",
    "Kuka todennäköisimmin punastuu helpoiten?",
    "Kuka todennäköisimmin lähettää rohkeimman viestin?",
    "Kuka todennäköisimmin ihastuu kaverin kaveriin?",
    "Kuka todennäköisimmin saa jonkun ihastumaan itseensä illan aikana?",
    "Kuka todennäköisimmin antaa liian pitkän halauksen?",
    "Kuka todennäköisimmin osaa flirttailla katseella?",
    "Kuka todennäköisimmin on salaa romantikko?",
    "Kuka todennäköisimmin vastaa viestiin vasta seuraavana päivänä?",
    "Kuka todennäköisimmin saa eniten DM-viestejä?",
    "Kuka todennäköisimmin ihastuu nopeimmin?",
    "Kuka todennäköisimmin esittää vaikeasti tavoiteltavaa?",
    "Kuka todennäköisimmin lähettää sydän-emojin vahingossa?",
    "Kuka todennäköisimmin olisi paras treffeillä?",
    "Kuka todennäköisimmin unohtaa, että flirttaili jollekulle?",
    "Kuka todennäköisimmin jää kiinni stalkkaamisesta?",
    "Kuka todennäköisimmin on porukan paras wingman?",
    "Kuka todennäköisimmin sanoo jotain liian suoraa?",
    "Kuka todennäköisimmin saa muut nauramaan kiusallisessa tilanteessa?",
    "Kuka todennäköisimmin näyttää viattomalta, mutta ei ole?",
  ],
  wild: [
    "Kuka todennäköisimmin aloittaa illan rauhassa ja lopettaa legendana?",
    "Kuka todennäköisimmin tekee illasta tarinan, jota kerrotaan vielä vuoden päästä?",
    "Kuka todennäköisimmin suutelee jotakuta pelin aikana, jos molemmat suostuvat?",
    "Kuka todennäköisimmin ottaa rohkeimman haasteen vastaan?",
    "Kuka todennäköisimmin päätyy keskelle draamaa?",
    "Kuka todennäköisimmin uskaltaa tehdä ensimmäisen siirron?",
    "Kuka todennäköisimmin menettää vaatekerroksen pelissä?",
    "Kuka todennäköisimmin saa muut huutamaan 'ei vitsi'?",
    "Kuka todennäköisimmin tekee jotain, mitä ei halua muistaa huomenna?",
    "Kuka todennäköisimmin on illan vaarallisin flirtti?",
    "Kuka todennäköisimmin saa rohkeimman kysymyksen?",
    "Kuka todennäköisimmin tekee pelistä liian kilpailullisen?",
    "Kuka todennäköisimmin katoaa mystisesti hetkeksi?",
    "Kuka todennäköisimmin vaihtaa paikkaa kiinnostavimman ihmisen viereen?",
    "Kuka todennäköisimmin antaa poskisuudelman, jos toinen suostuu?",
    "Kuka todennäköisimmin on salaa villimpi kuin näyttää?",
    "Kuka todennäköisimmin saa kaikki nauramaan nololla paljastuksella?",
    "Kuka todennäköisimmin yllyttää muita rohkeisiin tehtäviin?",
    "Kuka todennäköisimmin ei kerro kaikkea seuraavana päivänä?",
    "Kuka todennäköisimmin päätyy illan legendaksi?",
  ],
};

const truthOrDareModes = {
  chill: {
    truth: [
      "Mikä on noloin asia, jonka olet tehnyt tällä viikolla?",
      "Mikä on oudoin tapasi?",
      "Mikä biisi kuvaa sinua parhaiten?",
      "Mikä on huonoin tekosyy, jota olet käyttänyt?",
      "Kuka tässä porukassa saa sinut nauramaan helpoiten?",
      "Mikä oli viimeisin asia, jota googlasit?",
      "Mikä on lempimukavuusruokasi?",
      "Mikä on pieni asia, josta ärsyynnyt helposti?",
      "Mikä on hauskin muistosi viime ajoilta?",
      "Mitä et osaa, vaikka pitäisi?",
    ],
    dare: [
      "Tee 5 sekunnin tanssiliike.",
      "Keksi itsellesi uusi lempinimi loppukierroksen ajaksi.",
      "Puhu seuraava kierros kuin urheiluselostaja.",
      "Kehu vasemmalla olevaa pelaajaa.",
      "Näytä viimeisin käyttämäsi emoji.",
      "Matki jotain julkkista 5 sekuntia.",
      "Vaihda paikkaa jonkun kanssa.",
      "Kerro huono vitsi.",
      "Ota dramaattinen poseeraus.",
      "Laula yksi rivi valitsemastasi biisistä.",
    ],
  },
  spicy: {
    truth: [
      "Kuka tässä porukassa on eniten sinun tyyppiäsi?",
      "Mikä on flirttailevin viesti, jonka olet lähettänyt?",
      "Milloin viimeksi punastuit jonkun takia?",
      "Oletko koskaan ihastunut kaverin kaveriin?",
      "Kuka tässä porukassa vaikuttaa parhaimmalta treffeillä?",
      "Mikä on suurin turn-on persoonassa?",
      "Mikä on suurin turn-off?",
      "Oletko koskaan stalkannut jonkun somea liian pitkään?",
      "Mikä on rohkein aloite, jonka olet tehnyt?",
      "Kuka tässä porukassa osaa mielestäsi flirttailla parhaiten?",
    ],
    dare: [
      "Anna valitsemallesi pelaajalle kehu, joka saa hänet punastumaan, tai ota rangaistus.",
      "Pidä katsekontakti valitsemasi pelaajan kanssa 10 sekuntia tai ota rangaistus.",
      "Lähetä flirttaileva katse jollekin pelaajalle.",
      "Valitse joku ja keksikää teille yhteinen ship-nimi.",
      "Sano yhdelle pelaajalle asia, joka tekee hänestä viehättävän.",
      "Näytä flirttailevin katseesi tai ota rangaistus.",
      "Valitse pelaaja, joka saa kysyä sinulta yhden rohkean kysymyksen.",
      "Istu seuraava kierros eri paikassa jonkun vieressä.",
      "Kerro, kuka pelaajista olisi paras wingman.",
      "Anna yhdelle pelaajalle uusi flirttaileva lempinimi.",
    ],
  },
  wild: {
    truth: [
      "Kuka tässä porukassa olisi vaarallisin flirtti?",
      "Kuka tässä porukassa voisi saada sinut tekemään tyhmän päätöksen?",
      "Mikä on rohkein asia, jonka olet tehnyt bileissä?",
      "Oletko koskaan suudellut jotakuta pelin takia?",
      "Kuka tässä porukassa vaikuttaa parhaimmalta suutelijalta?",
      "Mikä on asia, jota et kehtaisi kertoa vanhemmillesi?",
      "Oletko koskaan kadonnut bileistä ilman selitystä?",
      "Mikä on rohkein viesti, jonka olet lähettänyt?",
      "Kuka tässä porukassa saa sinut hermostumaan hyvällä tavalla?",
      "Mikä on villein asia, jonka uskaltaisit tehdä tässä pelissä?",
    ],
    dare: [
      "Suutele valitsemaasi pelaajaa poskelle — vain jos molemmat suostuvat. Muuten ota rangaistus.",
      "Anna valitsemallesi pelaajalle käsi- tai poskisuudelma vain jos molemmat haluavat. Muuten ota rangaistus.",
      "Ota pois yksi asuste, kuten hattu, koru, huppari tai takki — tai ota rangaistus.",
      "Jos sinulla on takki, huppari tai ylimääräinen vaate päällä, ota se pois kierroksen ajaksi tai ota rangaistus.",
      "Valitse joku ja pitäkää katsekontakti 15 sekuntia — tai ota rangaistus.",
      "Valitse joku, jonka kanssa ottaisit yhteiskuvan. Ota kuva tai ota rangaistus.",
      "Valitse pelaaja: hän saa antaa sinulle rohkean mutta turvallisen haasteen. Tee se tai ota rangaistus.",
      "Kerro kuka tässä porukassa on eniten sinun tyyppiäsi, tai ota rangaistus.",
      "Anna valitsemallesi pelaajalle kehu, joka on vähän liian rohkea, tai ota rangaistus.",
      "Valitse joku ja vaihtakaa paikkaa loppukierroksen ajaksi.",
      "Anna jonkun pelaajan päättää sinulle kevyt rooli seuraavaksi kierrokseksi.",
      "Tee dramaattinen catwalk-hidas kävely huoneen poikki tai ota rangaistus.",
      "Valitse pelaaja ja sanokaa toisillenne yksi viehättävä asia.",
      "Anna valitsemallesi pelaajalle lupa kysyä sinulta yksi erittäin rohkea kysymys. Vastaa tai ota rangaistus.",
      "Jos uskallat, kerro kenelle antaisit poskisuudelman tässä porukassa. Muuten ota rangaistus.",
    ],
  },
};

const diceModes = {
  chill: {
    rules: {
      1: "Ota itse yksi rangaistus.",
      2: "Valitse joku ottamaan yksi rangaistus.",
      3: "Kaikki ottavat yhden.",
      4: "Vasemmalla oleva ottaa.",
      5: "Oikealla oleva ottaa.",
      6: "Keksi hauska sääntö seuraavalle kierrokselle.",
    },
    extras: [
      "Kerro nopea tarina tai ota rangaistus.",
      "Matki jotakuta pelaajaa 5 sekuntia.",
      "Kerro huono vitsi.",
      "Vaihda paikkaa jonkun kanssa.",
      "Valitse seuraava heittäjä.",
    ],
  },
  spicy: {
    rules: {
      1: "Anna kehu valitsemallesi pelaajalle tai ota rangaistus.",
      2: "Pidä katsekontakti jonkun kanssa 10 sekuntia tai ota rangaistus.",
      3: "Kaikki sinkut ottavat yhden, jos haluavat paljastaa olevansa mukana.",
      4: "Valitse joku kysymään sinulta spicy-kysymys.",
      5: "Oikealla oleva antaa sinulle kevyen haasteen.",
      6: "Keksi flirttaileva sääntö seuraavalle kierrokselle.",
    },
    extras: [
      "Näytä flirttailevin katseesi.",
      "Kerro kuka olisi paras wingman.",
      "Anna yhdelle pelaajalle uusi lempinimi.",
      "Kerro pieni turn-off.",
      "Valitse joku, joka saa immuniteetin seuraavalta rangaistukselta.",
    ],
  },
  wild: {
    rules: {
      1: "Suutele valitsemaasi pelaajaa poskelle vain jos molemmat suostuvat — muuten ota rangaistus.",
      2: "Ota pois yksi asuste tai ylimääräinen vaatekerros, kuten hattu, koru, huppari tai takki — tai ota rangaistus.",
      3: "Valitse joku, joka saa kysyä sinulta erittäin rohkean kysymyksen. Vastaa tai ota rangaistus.",
      4: "Pidä katsekontakti valitsemasi pelaajan kanssa 15 sekuntia — tai ota rangaistus.",
      5: "Kerro kuka tässä porukassa on eniten sinun tyyppiäsi — tai ota rangaistus.",
      6: "Keksi villi mutta turvallinen sääntö seuraavalle kierrokselle. Kaikki saavat skipata.",
    },
    extras: [
      "Anna käsi- tai poskisuudelma vain jos toinen suostuu. Muuten ota rangaistus.",
      "Anna valitsemallesi pelaajalle vähän liian rohkea kehu tai ota rangaistus.",
      "Valitse joku ja vaihtakaa paikkaa loppukierroksen ajaksi.",
      "Kerro rohkein asia, jonka olet tehnyt bileissä, tai ota rangaistus.",
      "Tee catwalk huoneen poikki tai ota rangaistus.",
    ],
  },
};

const kingsCupModes = {
  chill: {
    A: "Waterfall / Vesiputous: Kaikki aloittavat, eikä kukaan saa lopettaa ennen oikealla olevaa.",
    2: "You: Valitse joku ottamaan rangaistus.",
    3: "Me: Sinä otat rangaistuksen.",
    4: "Floor: Viimeinen, joka koskee lattiaa, häviää.",
    5: "Guys: Kaikki pojat ottavat rangaistuksen.",
    6: "Chicks: Kaikki tytöt ottavat rangaistuksen.",
    7: "Heaven: Viimeinen, joka nostaa käden ylös, häviää.",
    8: "Mate: Valitse juomapari.",
    9: "Rhyme: Sano sana, muut keksivät riimejä.",
    10: "Categories: Valitse kategoria, muut jatkavat.",
    J: "Rule: Keksi hauska sääntö.",
    Q: "Question Master: Jos joku vastaa kysymykseesi, hän häviää.",
    K: "King’s Cup: Lisää sääntö / kuningaskortti. Neljäs kuningas lopettaa kierroksen.",
  },
  spicy: {
    A: "Spicy vesiputous: Kaikki aloittavat. Lopettaessa sano flirttaileva kehu seuraavalle.",
    2: "You: Valitse joku kertomaan flirttaileva paljastus tai ottamaan rangaistus.",
    3: "Me: Kerro noloin ihastumismokasi tai ota rangaistus.",
    4: "Floor: Viimeinen lattiaan koskeva kertoo pienen turn-offin.",
    5: "Guys: Kaikki pojat kertovat parhaan iskurepliikkinsä tai ottavat rangaistuksen.",
    6: "Chicks: Kaikki tytöt kertovat kehun, jonka haluaisivat kuulla, tai ottavat rangaistuksen.",
    7: "Heaven: Viimeinen käden nostaja näyttää flirttailevimman katseensa.",
    8: "Mate: Valitse juomapari ja keksikää teille ship-nimi.",
    9: "Rhyme: Valitse spicy sana ja muut jatkavat riimeillä.",
    10: "Categories: Valitse flirttikategoria, kuten deittibioiden kliseet.",
    J: "Rule: Keksi flirttaileva sääntö seuraavalle kierrokselle.",
    Q: "Question Master: Kysy vain spicy-kysymyksiä. Suoraan vastaava ottaa rangaistuksen.",
    K: "King’s Cup: Lisää rohkeampi sääntö. Neljäs kuningas päättää spicy-haasteen.",
  },
  wild: {
    A: "Wild vesiputous: Kaikki aloittavat. Lopettaessa sano rohkea kehu. Kaikki voivat skipata ja ottaa rangaistuksen.",
    2: "You: Valitse joku tekemään vapaaehtoinen Wild-haaste tai ottamaan rangaistus. Älä painosta ketään.",
    3: "Me: Kerro rohkea paljastus tai ota rangaistus.",
    4: "Floor: Viimeinen lattiaan koskeva tekee catwalkin tai ottaa rangaistuksen.",
    5: "Guys: Kaikki pojat antavat rohkean kehun tai ottavat rangaistuksen.",
    6: "Chicks: Kaikki tytöt antavat rohkean kehun tai ottavat rangaistuksen.",
    7: "Heaven: Viimeinen käden nostaja pitää 15 sekunnin katsekontaktin valitsemaansa pelaajaan tai ottaa rangaistuksen.",
    8: "Mate: Valitse juomapari. Voitte antaa toisillenne poskisuudelman vain jos molemmat suostuvat, muuten ottakaa rangaistus.",
    9: "Rhyme: Valitse wild-sana. Epäröijä ottaa rangaistuksen tai skipin.",
    10: "Categories: Valitse villi mutta turvallinen kategoria. Kaikki saavat skipata.",
    J: "Rule: Keksi villi mutta turvallinen sääntö, jonka saa skipata rangaistuksella.",
    Q: "Question Master: Kysy rohkeita mutta turvallisia kysymyksiä. Vastaamatta saa jättää ottamalla rangaistuksen.",
    K: "King’s Cup: Lisää vapaaehtoinen Wild-sääntö. Neljäs kuningas päättää turvallisen haasteen.",
  },
};

const busPenaltyText = {
  chill: "Väärin - ota rangaistus.",
  spicy: "Väärin - ota rangaistus tai vastaa spicy-kysymykseen.",
  wild: "Väärin - ota rangaistus tai tee Wild-haaste, jos haluat.",
};

const pyramidHitText = {
  chill: "Jaa / ota rangaistus.",
  spicy: "Jaa rangaistus tai anna spicy-kysymys.",
  wild: "Jaa rangaistus tai anna vapaaehtoinen Wild-haaste.",
};

const games = [
  {
    id: "never-have-i-ever",
    title: "En ole koskaan",
    description: "Lue väite ääneen. Ne, jotka ovat tehneet sen, ottavat rangaistuksen.",
    rules: "Lue kortti ääneen. Jos olet tehnyt asian, ota rangaistus.",
    type: "question",
    promptLabel: "Väite",
    modes: neverHaveIEverModes,
  },
  {
    id: "most-likely",
    title: "Kuka todennäköisimmin",
    description: "Kaikki osoittavat pelaajaa, johon väite sopii parhaiten.",
    rules: "Lue kysymys ääneen. Eniten ääniä saanut tekee sovitun rangaistuksen tai kertoo selityksen.",
    type: "question",
    promptLabel: "Kysymys",
    modes: mostLikelyModes,
  },
  {
    id: "truth-or-dare",
    title: "Totuus vai tehtävä",
    description: "Valitse totuus tai tehtävä ja lue kortti ääneen.",
    rules: "Vuorossa oleva pelaaja valitsee totuuden tai tehtävän. Kortin voi skipata sovitulla rangaistuksella.",
    type: "truthDare",
    modes: truthOrDareModes,
  },
  {
    id: "kings-cup",
    title: "Ring of Fire / Kings Cup",
    description: "Nosta kortti ja tee siihen kuuluva sääntö.",
    rules: "Puhelin toimii korttipakkana. Sama kortti ei tule uudestaan ennen kuin pakka on käyty loppuun.",
    type: "kingsCup",
    modes: kingsCupModes,
  },
  {
    id: "ride-the-bus",
    title: "Bussi / Ride the Bus",
    description: "Arvaa neljä korttivaihetta putkeen ja selviä bussista.",
    rules: "Arvaa väri, korkeus, väli ja maa. Väärä vastaus aloittaa kierroksen alusta.",
    type: "rideBus",
  },
  {
    id: "pyramid",
    title: "Pyramidipeli",
    description: "Jaa pelaajille kortit ja paljasta pyramidi kortti kerrallaan.",
    rules: "Jos pelaajalla on paljastetun kortin arvo, hän osui ja tekee moodin mukaisen seurauksen.",
    type: "pyramid",
    requiresPlayers: true,
  },
  {
    id: "dice",
    title: "Noppajuomapeli",
    description: "Heitä noppaa ja tee numeron mukainen tehtävä.",
    rules: "Nopan numero määrittää tehtävän. Moodi vaikuttaa tehtävien rohkeuteen.",
    type: "dice",
    modes: diceModes,
  },
];

const state = {
  players: readPlayers(),
  waterBreaksEnabled: readWaterBreakPreference(),
  currentMode: getCurrentMode(),
  activeGameId: null,
  decks: {},
  sessions: {},
};

const screens = {
  start: document.querySelector('[data-screen="start"]'),
  menu: document.querySelector('[data-screen="menu"]'),
  setup: document.querySelector('[data-screen="setup"]'),
  play: document.querySelector('[data-screen="play"]'),
};

const elements = {
  gameList: document.querySelector("[data-game-list]"),
  modeList: document.querySelector("[data-mode-list]"),
  currentModeLabel: document.querySelector("[data-current-mode-label]"),
  wildMenuNote: document.querySelector("[data-wild-menu-note]"),
  wildConfirm: document.querySelector("[data-wild-confirm]"),
  playerForm: document.querySelector("[data-player-form]"),
  playerInput: document.querySelector("#player-name"),
  playerList: document.querySelector("[data-player-list]"),
  waterBreakToggle: document.querySelector("[data-water-break-toggle]"),
  waterBreakLabel: document.querySelector("[data-water-break-label]"),
  beginGameButton: document.querySelector('[data-action="begin-game"]'),
  setupCard: document.querySelector(".setup-card:not(.wild-confirm)"),
  setupTitle: document.querySelector("[data-setup-title]"),
  setupBadge: document.querySelector("[data-setup-badge]"),
  setupHeading: document.querySelector("[data-setup-heading]"),
  setupDescription: document.querySelector("[data-setup-description]"),
  gameTitle: document.querySelector("[data-game-title]"),
  roundLabel: document.querySelector("[data-round-label]"),
  promptCard: document.querySelector("[data-prompt-card]"),
  promptKicker: document.querySelector("[data-prompt-kicker]"),
  promptText: document.querySelector("[data-prompt-text]"),
  targetPlayer: document.querySelector("[data-target-player]"),
  primaryPlayAction: document.querySelector('[data-action="next-card"]'),
  wildSkipButton: document.querySelector("[data-action='wild-skip']"),
  rulesModal: document.querySelector("[data-rules-modal]"),
  rulesTitle: document.querySelector("[data-rules-title]"),
  rulesText: document.querySelector("[data-rules-text]"),
};

document.addEventListener("click", handleClick);
elements.playerForm.addEventListener("submit", addPlayer);
elements.waterBreakToggle.addEventListener("change", updateWaterBreakPreference);

renderPlayers();
renderWaterBreakPreference();
renderModes();
renderGames();

function handleClick(event) {
  const modeButton = event.target.closest("[data-mode-id]");
  if (modeButton) {
    setCurrentMode(modeButton.dataset.modeId);
    return;
  }

  const gameButton = event.target.closest("[data-game-id]");
  if (gameButton) {
    selectGame(gameButton.dataset.gameId);
    return;
  }

  const busChoice = event.target.closest("[data-bus-choice]");
  if (busChoice) {
    handleBusChoice(busChoice.dataset.busChoice);
    return;
  }

  const truthDareChoice = event.target.closest("[data-truth-dare-choice]");
  if (truthDareChoice) {
    handleTruthDareChoice(truthDareChoice.dataset.truthDareChoice);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) {
    return;
  }

  const actions = {
    start: () => showScreen("menu"),
    "back-menu": backToMenu,
    "reset-players": resetPlayers,
    "begin-game": beginGame,
    "confirm-wild": confirmWildMode,
    "next-card": nextAction,
    "show-rules": showRules,
    "close-rules": closeRules,
    "wild-skip": handleWildSkip,
  };

  actions[actionButton.dataset.action]?.();
}

function showScreen(screenName) {
  Object.entries(screens).forEach(([name, screen]) => {
    screen.classList.toggle("is-active", name === screenName);
  });
}

function getCurrentMode() {
  const storedMode = localStorage.getItem(MODE_STORAGE_KEY);
  return modes.some((mode) => mode.id === storedMode) ? storedMode : "chill";
}

function setCurrentMode(mode) {
  state.currentMode = modes.some((item) => item.id === mode) ? mode : "chill";
  localStorage.setItem(MODE_STORAGE_KEY, state.currentMode);
  state.decks = {};
  renderModes();
  renderGames();
}

function getModeConfig(mode = state.currentMode) {
  return modes.find((item) => item.id === mode) || modes[0];
}

function renderModes() {
  const activeMode = getModeConfig();

  elements.currentModeLabel.textContent = activeMode.label;
  elements.wildMenuNote.hidden = state.currentMode !== "wild";
  elements.modeList.innerHTML = modes
    .map(
      (mode) => `
        <button
          class="mode-card ${mode.id} ${mode.id === state.currentMode ? "is-active" : ""}"
          type="button"
          data-mode-id="${mode.id}"
          aria-pressed="${mode.id === state.currentMode}"
        >
          <span class="mode-icon">${mode.icon}</span>
          <strong>${mode.title}</strong>
          <small>${mode.description}</small>
        </button>
      `,
    )
    .join("");
}

function renderGames() {
  elements.gameList.innerHTML = games
    .map(
      (game) => `
        <article class="game-card">
          <span class="card-meta">${getGameMeta(game)}</span>
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <div class="variant-actions single">
            <button class="mode-button wide" type="button" data-game-id="${game.id}">
              <span>Pelaa</span>
              <small>${getModeConfig().label}</small>
            </button>
          </div>
        </article>
      `,
    )
    .join("");
}

function getGameMeta(game) {
  const labels = {
    question: "Kysymyspeli",
    truthDare: "Totuus / tehtävä",
    kingsCup: "Korttipakka",
    rideBus: "Korttihaaste",
    pyramid: "Pyramidipakka",
    dice: "Noppa",
  };

  return labels[game.type] || "Peli";
}

function selectGame(gameId) {
  const game = getGame(gameId);
  if (!game) {
    return;
  }

  state.activeGameId = game.id;
  elements.setupTitle.textContent = game.title;
  elements.setupBadge.textContent = `${getModeConfig().label} · ${getGameMeta(game)}`;
  elements.setupHeading.textContent = game.requiresPlayers && state.players.length === 0
    ? "Lisää pelaajat ensin"
    : "Aloitetaanko?";
  elements.setupDescription.textContent = game.requiresPlayers && state.players.length === 0
    ? "Pyramidipeli tarvitsee pelaajalistan, jotta kortit voidaan jakaa."
    : `${game.description} ${state.currentMode === "wild" ? "Muista: kaikki tehtävät ovat vapaaehtoisia." : ""}`;

  const needsPlayers = game.requiresPlayers && state.players.length === 0;
  elements.beginGameButton.disabled = needsPlayers;
  elements.beginGameButton.textContent = needsPlayers ? "Lisää pelaajat valikossa" : "Aloita peli";

  const shouldConfirmWild = state.currentMode === "wild";
  elements.wildConfirm.hidden = !shouldConfirmWild;
  elements.setupCard.hidden = shouldConfirmWild;
  elements.beginGameButton.closest(".play-actions").hidden = shouldConfirmWild;
  showScreen("setup");
}

function confirmWildMode() {
  elements.wildConfirm.hidden = true;
  elements.setupCard.hidden = false;
  elements.beginGameButton.closest(".play-actions").hidden = false;
}

function backToMenu() {
  state.activeGameId = null;
  closeRules();
  renderModes();
  renderGames();
  showScreen("menu");
}

function beginGame() {
  const game = getActiveGame();
  if (!game || (game.requiresPlayers && state.players.length === 0)) {
    return;
  }

  state.sessions[game.id] = createSession(game);
  elements.gameTitle.textContent = game.title;
  elements.primaryPlayAction.disabled = false;
  elements.wildSkipButton.hidden = state.currentMode !== "wild";
  showScreen("play");
  renderActiveGame(true);
}

function nextAction() {
  const game = getActiveGame();
  if (game?.type === "pyramid") {
    revealPyramidCard();
    return;
  }

  renderActiveGame(false);
}

function renderActiveGame(isFirstRender = false) {
  const game = getActiveGame();
  if (!game) {
    return;
  }

  elements.roundLabel.textContent = getModeConfig().label;
  elements.wildSkipButton.hidden = state.currentMode !== "wild";
  elements.primaryPlayAction.hidden = false;

  const renderers = {
    question: () => renderQuestionGame(game, isFirstRender),
    truthDare: () => renderTruthOrDare(game),
    kingsCup: () => renderKingsCup(game),
    rideBus: () => renderBus(),
    pyramid: () => renderPyramid(),
    dice: () => renderDice(isFirstRender),
  };

  renderers[game.type]?.();
}

function renderQuestionGame(game, isFirstRender) {
  if (!isFirstRender && shouldShowWaterBreak()) {
    updatePrompt({
      kicker: "Vesitauko",
      text: randomItem(waterBreaks),
      target: "Pidä pieni tauko ennen seuraavaa korttia.",
    });
    return;
  }

  const card = getNextCard(game.id, state.currentMode);
  const target = game.id === "most-likely" ? getMostLikelyTarget() : "";
  elements.primaryPlayAction.textContent = "Seuraava";
  updatePrompt({
    kicker: `${game.promptLabel} · ${getModeConfig().title}`,
    text: card,
    target,
  });
}

function renderTruthOrDare(game) {
  const session = state.sessions[game.id];
  elements.primaryPlayAction.hidden = true;
  elements.wildSkipButton.hidden = state.currentMode !== "wild" || !session?.currentCard;

  const turn = state.players.length ? `Vuorossa: ${state.players[session.turnIndex % state.players.length]}` : "";
  const cardHtml = session?.currentCard
    ? `<span class="game-status">${session.currentChoice === "truth" ? "Totuus" : "Tehtävä"}</span>
       <span class="bus-step">${escapeHtml(session.currentCard)}</span>`
    : `<span class="game-status">Valitse kortti</span>
       <span class="bus-step">Totuus vai tehtävä?</span>`;

  updatePrompt({
    kicker: `${getModeConfig().title} · Totuus vai tehtävä`,
    html: `
      <div class="custom-game">
        ${cardHtml}
        <div class="choice-grid truth-dare-actions">
          <button class="choice-button" type="button" data-truth-dare-choice="truth">Totuus</button>
          <button class="choice-button" type="button" data-truth-dare-choice="dare">Tehtävä</button>
        </div>
      </div>
    `,
    target: turn,
  });
}

function handleTruthDareChoice(choice) {
  const game = getActiveGame();
  if (!game || game.type !== "truthDare") {
    return;
  }

  const session = state.sessions[game.id];
  const modeData = getModeData(game, state.currentMode);
  const cards = modeData[choice] || modeData.truth || [];
  const key = `${game.id}:${state.currentMode}:${choice}`;
  session.currentChoice = choice;
  session.currentCard = getNextFromDeck(key, cards);
  session.turnIndex += 1;
  renderTruthOrDare(game);
}

function renderKingsCup(game) {
  const session = state.sessions[game.id];
  const card = drawFromSessionDeck(session);
  const rules = getModeData(game, state.currentMode);
  session.kingsDrawn += card.value === "K" ? 1 : 0;

  elements.primaryPlayAction.textContent = "Nosta kortti";
  updatePrompt({
    kicker: `${getModeConfig().title} · ${session.deck.length} korttia jäljellä`,
    html: `
      <div class="custom-game">
        ${renderPlayingCard(card)}
        <span class="game-status">${escapeHtml(rules[card.value] || "")}</span>
        ${card.value === "K" ? `<span class="mini-note">Kuningaskortteja nostettu: ${session.kingsDrawn}/4</span>` : ""}
      </div>
    `,
    target: card.value === "K" && session.kingsDrawn >= 4 ? "Neljäs kuningas. Kierros päättyy tai pakka alkaa uudestaan." : "",
  });
}

function renderBus() {
  const session = state.sessions["ride-the-bus"];
  elements.primaryPlayAction.hidden = true;

  if (session.finished) {
    updatePrompt({
      kicker: `${getModeConfig().title} · Bussi`,
      html: `
        <div class="custom-game">
          <span class="bus-step">Selvisit bussista!</span>
          <div class="card-row">${session.cards.map(renderMiniCard).join("")}</div>
          <button class="choice-button" type="button" data-bus-choice="new-round">Uusi kierros</button>
        </div>
      `,
      target: "Hyvin ajettu.",
    });
    return;
  }

  const step = getBusStep(session);
  const lastCard = session.cards.at(-1);
  updatePrompt({
    kicker: `${getModeConfig().title} · Vaihe ${session.step + 1}/4`,
    html: `
      <div class="custom-game">
        <span class="bus-step">${step.title}</span>
        ${lastCard ? renderPlayingCard(lastCard) : '<span class="mini-note">Ensimmäinen kortti ratkaisee värin.</span>'}
        ${session.message ? `<span class="game-status">${escapeHtml(session.message)}</span>` : ""}
        <div class="choice-grid">
          ${step.choices.map((choice) => `<button class="choice-button" type="button" data-bus-choice="${choice.id}">${choice.label}</button>`).join("")}
        </div>
      </div>
    `,
    target: "",
  });
}

function getBusStep(session) {
  const steps = [
    {
      title: "Punainen vai musta?",
      choices: [
        { id: "red", label: "Punainen" },
        { id: "black", label: "Musta" },
      ],
    },
    {
      title: "Korkeampi vai matalampi?",
      choices: [
        { id: "higher", label: "Korkeampi" },
        { id: "lower", label: "Matalampi" },
      ],
    },
    {
      title: "Välissä vai ulkona?",
      choices: [
        { id: "inside", label: "Välissä" },
        { id: "outside", label: "Ulkona" },
      ],
    },
    {
      title: "Valitse maa",
      choices: suits.map((suit) => ({ id: suit.id, label: suit.name })),
    },
  ];

  return steps[session.step] || steps[0];
}

function handleBusChoice(choice) {
  const session = state.sessions["ride-the-bus"];
  if (!session) {
    return;
  }

  if (choice === "new-round") {
    state.sessions["ride-the-bus"] = createBusSession();
    renderBus();
    return;
  }

  const card = randomCard();
  const correct = isBusChoiceCorrect(session, choice, card);
  session.cards.push(card);

  if (!correct) {
    session.message = busPenaltyText[state.currentMode] || busPenaltyText.chill;
    session.step = 0;
    session.cards = [];
    renderBus();
    return;
  }

  session.message = `Oikein: ${card.label}`;
  session.step += 1;
  session.finished = session.step >= 4;
  renderBus();
}

function isBusChoiceCorrect(session, choice, card) {
  if (session.step === 0) {
    return choice === card.color;
  }

  if (session.step === 1) {
    const previous = session.cards.at(-1);
    return choice === "higher"
      ? valueRank[card.value] > valueRank[previous.value]
      : valueRank[card.value] < valueRank[previous.value];
  }

  if (session.step === 2) {
    const [first, second] = session.cards.slice(-2);
    const low = Math.min(valueRank[first.value], valueRank[second.value]);
    const high = Math.max(valueRank[first.value], valueRank[second.value]);
    const isInside = valueRank[card.value] > low && valueRank[card.value] < high;
    return choice === "inside" ? isInside : !isInside;
  }

  return choice === card.suit;
}

function renderPyramid() {
  const session = state.sessions.pyramid;
  elements.primaryPlayAction.textContent = session.done ? "Uusi pyramidi" : "Paljasta seuraava kortti";

  if (session.done) {
    updatePrompt({
      kicker: `${getModeConfig().title} · Pyramidi valmis`,
      html: renderPyramidHtml(session),
      target: "Kaikki kortit on paljastettu.",
    });
    return;
  }

  updatePrompt({
    kicker: `${getModeConfig().title} · Rivi ${getCurrentPyramidPenalty(session)} (${getCurrentPyramidPenalty(session)} rangaistus)`,
    html: renderPyramidHtml(session),
    target: session.message,
  });
}

function renderPyramidHtml(session) {
  return `
    <div class="custom-game">
      <div class="pyramid-grid">
        ${session.pyramid
          .map(
            (row) => `
              <div class="pyramid-row">
                ${row.map((card) => (card.revealed ? renderMiniCard(card) : '<span class="mini-card hidden-card">?</span>')).join("")}
              </div>
            `,
          )
          .reverse()
          .join("")}
      </div>
      <div class="player-hands">
        ${session.hands
          .map(
            (hand) => `
              <div class="hand-row">
                <strong>${escapeHtml(hand.player)}</strong>
                <span>${hand.cards.map(renderMiniCard).join("")}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function revealPyramidCard() {
  const session = state.sessions.pyramid;
  if (session.done) {
    state.sessions.pyramid = createPyramidSession();
    renderPyramid();
    return;
  }

  const flat = session.pyramid.flat();
  const card = flat[session.revealedCount];
  card.revealed = true;
  session.revealedCount += 1;

  const rowIndex = session.pyramid.findIndex((row) => row.includes(card));
  const penalty = rowIndex + 1;
  const hitPlayers = session.hands
    .filter((hand) => hand.cards.some((playerCard) => playerCard.value === card.value))
    .map((hand) => hand.player);

  const consequence = pyramidHitText[state.currentMode] || pyramidHitText.chill;
  session.message = hitPlayers.length
    ? `${hitPlayers.join(", ")} osui! ${consequence} (${penalty})`
    : `Ei osumia. Rangaistuksen määrä olisi ${penalty}.`;
  session.done = session.revealedCount >= flat.length;
  renderPyramid();
}

function getCurrentPyramidPenalty(session) {
  const flat = session.pyramid.flat();
  const nextCard = flat[session.revealedCount] || flat.at(-1);
  const rowIndex = session.pyramid.findIndex((row) => row.includes(nextCard));
  return rowIndex + 1;
}

function renderDice(isFirstRender) {
  const session = state.sessions.dice;
  elements.primaryPlayAction.textContent = "Heitä noppaa";

  if (isFirstRender && !session.result) {
    updatePrompt({
      kicker: `${getModeConfig().title} · Noppa valmis`,
      html: `
        <div class="custom-game">
          <span class="dice-face">?</span>
          <span class="mini-note">Heitä noppaa aloittaaksesi.</span>
        </div>
      `,
      target: "",
    });
    return;
  }

  rollDice();
}

function rollDice() {
  const session = state.sessions.dice;
  const modeData = getModeData(getActiveGame(), state.currentMode);
  const result = Math.floor(Math.random() * 6) + 1;
  const extra = Math.random() > 0.45 ? randomItem(modeData.extras) : "";
  const target = state.players.length && Math.random() > 0.45 ? `${randomItem(state.players)} mukana haasteessa.` : "";

  session.result = result;
  session.lastExtra = extra;
  updatePrompt({
    kicker: `${getModeConfig().title} · Nopan tulos`,
    html: `
      <div class="custom-game">
        <span class="dice-face">${result}</span>
        <span class="bus-step">${escapeHtml(modeData.rules[result])}</span>
        ${extra ? `<span class="game-status">${escapeHtml(extra)}</span>` : ""}
      </div>
    `,
    target,
  });
}

function createSession(game) {
  const sessions = {
    truthDare: () => ({ turnIndex: 0, currentChoice: null, currentCard: null }),
    kingsCup: () => ({ deck: shuffleDeck(createDeck()), kingsDrawn: 0 }),
    rideBus: createBusSession,
    pyramid: createPyramidSession,
    dice: () => ({ result: null, lastExtra: "" }),
  };

  return sessions[game.type]?.() || {};
}

function createBusSession() {
  return { step: 0, cards: [], message: "", finished: false };
}

function createPyramidSession() {
  const deck = shuffleDeck(createDeck());
  const hands = state.players.map((player) => ({
    player,
    cards: [drawCard(deck), drawCard(deck), drawCard(deck), drawCard(deck)],
  }));
  const pyramid = [4, 3, 2, 1].map((size) =>
    Array.from({ length: size }, () => ({
      ...drawCard(deck),
      revealed: false,
    })),
  );

  return {
    hands,
    pyramid,
    revealedCount: 0,
    message: "Paljasta ensimmäinen kortti.",
    done: false,
  };
}

function getCardsForGameAndMode(gameId, mode = state.currentMode) {
  const game = getGame(gameId);
  if (!game?.modes) {
    return [];
  }

  const modeCards = game.modes[mode] || game.modes.chill || game.modes.default;
  return Array.isArray(modeCards) ? modeCards : [];
}

function getModeData(game, mode = state.currentMode) {
  return game?.modes?.[mode] || game?.modes?.chill || game?.modes?.default || {};
}

function getNextCard(gameId, mode = state.currentMode) {
  return getNextFromDeck(`${gameId}:${mode}`, getCardsForGameAndMode(gameId, mode));
}

function getNextFromDeck(key, cards) {
  if (!cards.length) {
    return "";
  }

  if (!state.decks[key] || state.decks[key].length === 0) {
    state.decks[key] = shuffleCards(cards);
  }

  return state.decks[key].pop();
}

function shuffleCards(cards) {
  return shuffleDeck([...cards]);
}

function createDeck() {
  return suits.flatMap((suit) =>
    values.map((value) => ({
      value,
      suit: suit.id,
      suitName: suit.name,
      symbol: suit.symbol,
      color: suit.color,
      label: `${value}${suit.symbol}`,
    })),
  );
}

function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function drawCard(deck) {
  if (!deck.length) {
    return randomCard();
  }

  return deck.pop();
}

function drawFromSessionDeck(session) {
  if (!session.deck.length) {
    session.deck = shuffleDeck(createDeck());
    session.kingsDrawn = 0;
  }

  return drawCard(session.deck);
}

function randomCard() {
  return randomItem(createDeck());
}

function renderPlayingCard(card) {
  return `<span class="playing-card ${card.color}" aria-label="${card.label}">${card.label}</span>`;
}

function renderMiniCard(card) {
  return `<span class="mini-card ${card.color}" title="${card.suitName}">${card.label}</span>`;
}

function updatePrompt({ kicker, text, html, target }) {
  animateCardUpdate();
  elements.promptKicker.textContent = kicker || "";
  elements.promptText.innerHTML = html || escapeHtml(text || "");
  elements.targetPlayer.textContent = target || "";
}

function animateCardUpdate() {
  elements.promptCard.classList.remove("is-changing");
  void elements.promptCard.offsetWidth;
  elements.promptCard.classList.add("is-changing");
}

function shouldShowWaterBreak() {
  return state.waterBreaksEnabled && Math.random() < WATER_BREAK_CHANCE;
}

function getMostLikelyTarget() {
  if (!state.players.length || Math.random() < 0.45) {
    return "Kaikki äänestävät.";
  }

  return `Kohdepelaaja: ${randomItem(state.players)}`;
}

function showRules() {
  const game = getActiveGame();
  if (!game) {
    return;
  }

  const wildNote = state.currentMode === "wild"
    ? " Wild sisältää rohkeita tehtäviä. Kaikki tehtävät ovat vapaaehtoisia — älä painosta ketään."
    : "";
  elements.rulesTitle.textContent = `${game.title} · ${getModeConfig().label}`;
  elements.rulesText.textContent = `${game.rules}${wildNote}`;
  elements.rulesModal.hidden = false;
}

function closeRules() {
  elements.rulesModal.hidden = true;
}

function handleWildSkip() {
  if (state.currentMode !== "wild") {
    return;
  }

  elements.targetPlayer.textContent = "Skipattu. Ota sovittu rangaistus ja jatka turvallisesti.";
}

function addPlayer(event) {
  event.preventDefault();
  const name = elements.playerInput.value.trim();
  if (!name) {
    return;
  }

  state.players.push(name);
  elements.playerInput.value = "";
  savePlayers();
  renderPlayers();
}

function removePlayer(index) {
  state.players.splice(index, 1);
  savePlayers();
  renderPlayers();
}

function resetPlayers() {
  state.players = [];
  savePlayers();
  renderPlayers();
}

function renderPlayers() {
  if (!state.players.length) {
    elements.playerList.innerHTML = '<li class="empty-state">Ei pelaajia vielä.</li>';
    return;
  }

  elements.playerList.innerHTML = state.players
    .map(
      (player, index) => `
        <li class="player-pill">
          ${escapeHtml(player)}
          <button class="remove-player" type="button" aria-label="Poista ${escapeHtml(player)}" onclick="window.partyDeckRemovePlayer(${index})">×</button>
        </li>
      `,
    )
    .join("");
}

function savePlayers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.players));
}

function readPlayers() {
  try {
    const players = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(players) ? players.filter((player) => typeof player === "string") : [];
  } catch {
    return [];
  }
}

function updateWaterBreakPreference() {
  state.waterBreaksEnabled = elements.waterBreakToggle.checked;
  localStorage.setItem(WATER_BREAK_STORAGE_KEY, JSON.stringify(state.waterBreaksEnabled));
  renderWaterBreakPreference();
}

function renderWaterBreakPreference() {
  elements.waterBreakToggle.checked = state.waterBreaksEnabled;
  elements.waterBreakLabel.textContent = state.waterBreaksEnabled ? "Päällä" : "Pois";
}

function readWaterBreakPreference() {
  const stored = localStorage.getItem(WATER_BREAK_STORAGE_KEY);
  return stored === null ? true : stored === "true";
}

function getGame(gameId) {
  return games.find((game) => game.id === gameId);
}

function getActiveGame() {
  return getGame(state.activeGameId);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.partyDeckRemovePlayer = removePlayer;

window.partyDeckDebug = {
  getCurrentMode,
  setCurrentMode,
  getCardsForGameAndMode,
  shuffleCards,
  getNextCard,
  createDeck,
};
