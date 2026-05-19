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
    "Kuka porukasta päätyy DJ:ksi ilman lupaa?",
    "Kuka teistä tilaisi ruokaa vielä yöllä?",
    "Kuka porukasta unohtaa helpoiten, mihin laittoi puhelimensa?",
    "Kuka tässä porukassa nauraa omalle vitsilleen eniten?",
    "Kuka pelaajista myöhästyy mutta tulee parhaalla energialla?",
    "Kuka porukasta ottaa illan ryhmäkuvan?",
    "Kuka tässä porukassa ehdottaa jatkoja ensimmäisenä?",
    "Kuka porukasta unohtaa juomansa jonnekin?",
    "Kuka tässä porukassa kertoo saman tarinan kahdesti?",
    "Kuka pelaajista laulaa mukana väärillä sanoilla?",
    "Kuka porukasta voittaisi lautapelin vahingossa?",
    "Kuka tässä porukassa eksyisi matkalla vessaan?",
    "Kuka porukasta aloittaisi tanssilattian ensimmäisenä?",
    "Kuka pelaajista tekee illasta parasta TikTok-materiaalia?",
    "Kuka porukasta unohtaa todennäköisimmin, mitä oli sanomassa?",
    "Kuka tässä porukassa järjestäisi seuraavat bileet?",
    "Kuka porukasta selittää pisimmän tarinan ilman pointtia?",
    "Kuka teistä ostaisi yöllä kebabin myös muille?",
    "Kuka porukasta keksii seuraavan sisäpiirivitsin?",
    "Kuka tässä porukassa lähtee kotiin viimeisenä?",
  ],
  spicy: [
    "Kuka porukasta flirttailee vahingossa eniten?",
    "Kuka pelaajista punastuu helpoiten kehusta?",
    "Kuka porukasta lähettäisi rohkeimman viestin?",
    "Kuka tässä porukassa ihastuisi kaverin kaveriin?",
    "Kuka porukasta saisi jonkun ihastumaan itseensä illan aikana?",
    "Kuka pelaajista antaa todennäköisimmin liian pitkän halauksen?",
    "Kenellä porukasta on paras flirttikatse?",
    "Kuka tässä porukassa vaikuttaa salaa romantikolta?",
    "Kuka porukasta vastaisi viestiin vasta seuraavana päivänä?",
    "Kuka pelaajista saisi eniten DM-viestejä?",
    "Kuka porukasta ihastuu nopeimmin?",
    "Kuka tässä porukassa esittäisi vaikeasti tavoiteltavaa?",
    "Kuka porukasta lähettäisi sydän-emojin vahingossa?",
    "Kuka pelaajista olisi paras treffeillä?",
    "Kuka porukasta unohtaisi flirttailleensa jollekulle?",
    "Kuka tässä porukassa jäisi kiinni somestalkkauksesta?",
    "Kuka porukasta olisi paras wingman?",
    "Kuka pelaajista sanoisi jotain liian suoraa?",
    "Kuka porukasta saa muut nauramaan kiusallisessa tilanteessa?",
    "Kuka tässä porukassa näyttää viattomalta, mutta ei ehkä ole?",
  ],
  wild: [
    "Kuka porukasta aloittaa illan rauhassa ja lopettaa legendana?",
    "Kuka tässä porukassa tekee illasta tarinan, jota kerrotaan vuoden päästä?",
    "Kuka porukasta antaisi poskisuudelman pelin aikana?",
    "Kuka pelaajista ottaa rohkeimman haasteen vastaan?",
    "Kuka porukasta päätyy keskelle illan draamaa?",
    "Kuka tässä porukassa uskaltaisi tehdä ensimmäisen siirron?",
    "Kuka porukasta menettäisi asusteen tai ylimääräisen vaatekerroksen pelissä?",
    "Kuka pelaajista saa muut huutamaan 'ei vitsi'?",
    "Kuka porukasta tekee jotain, mistä puhutaan vielä huomenna?",
    "Kuka tässä porukassa on illan vaarallisin flirtti?",
    "Kuka porukasta saisi rohkeimman kysymyksen?",
    "Kuka pelaajista tekee pelistä liian kilpailullisen?",
    "Kuka porukasta katoaa mystisesti illan aikana?",
    "Kuka tässä porukassa vaihtaa paikkaa kiinnostavimman ihmisen viereen?",
    "Kuka porukasta antaisi rohkeimman kehun?",
    "Kuka pelaajista on salaa villimpi kuin näyttää?",
    "Kuka porukasta saa kaikki nauramaan nololla paljastuksella?",
    "Kuka tässä porukassa yllyttää muita rohkeisiin tehtäviin?",
    "Kuka porukasta ei kerro kaikkea seuraavana päivänä?",
    "Kuka pelaajista päätyy illan legendaksi?",
  ],
};

const truthOrDareContent = {
  chill: {
    truths: [
      "Mikä on arkisin moka, jolle nauroit vasta myöhemmin?",
      "Mikä sovellus vie sinulta eniten aikaa ilman hyvää syytä?",
      "Mikä biisi saa sinut laulamaan mukana, vaikka et osaisi sanoja?",
      "Mikä on huonoin tekosyy, jolla olet myöhästynyt?",
      "Mikä on oudoin tapa, joka sinulla on kotona?",
      "Kuka tässä porukassa saa sinut nauramaan helpoiten?",
      "Mikä ruoka pelastaa huonon päivän?",
      "Mikä pieni asia ärsyttää sinua aivan liikaa?",
      "Mikä oli viimeisin asia, jonka googlasit turhaan?",
      "Mikä lapsuuden muisto naurattaa sinua vieläkin?",
      "Mikä on asia, jota et osaa, vaikka kaikkien mielestä pitäisi?",
      "Mikä on puhelimesi turhin ilmoitus?",
      "Mikä on oudoin ostos, jonka olet tehnyt hetken mielijohteesta?",
      "Mikä elokuva tai sarja on sinulle mukavuuskatsottavaa?",
      "Mikä on noloin väärin kuulemasi laulun sana?",
      "Mikä on asia, jonka unohdat jatkuvasti?",
      "Mikä on kaveriporukan roolisi yhdellä sanalla?",
      "Mikä on hauskin kuva, joka sinusta voisi löytyä kamerarullasta?",
      "Mikä on outo ruokayhdistelmä, josta oikeasti pidät?",
      "Mikä on kevyin asia, josta olet teeskennellyt tietäväsi enemmän?",
      "Mikä on viimeisin asia, jolle nauroit yksin?",
      "Mikä on huonoin neuvo, jota olet joskus seurannut?",
      "Mikä on asia, jonka teet aina viime tipassa?",
      "Mikä on hauskin väärinkäsitys, johon olet joutunut?",
      "Mikä on lempisana tai sanonta, jota käytät liikaa?",
      "Mikä on asia, jonka ostaisit heti, jos se olisi alennuksessa?",
      "Mikä on noloin nimi, jonka olet antanut esineelle tai laitteelle?",
      "Mikä on taito, jonka haluaisit oppia yhdessä illassa?",
      "Mikä on kaveriporukan sisäpiirivitsi, jota et jaksa selittää muille?",
      "Mikä on kevyesti nolo asia, jonka teit tänään?",
      "Mikä on asia, jota lykkäät aina huomiselle?",
      "Mikä on paras välipala keskellä yötä?",
      "Mikä on hassuin pelkosi?",
      "Mikä on viimeisin asia, jonka unohdit huoneesta toiseen kävellessä?",
      "Mikä on lempitekosyysi poistua keskustelusta?",
      "Mikä on turhin fakta, jonka muistat ulkoa?",
      "Mikä on asia, jossa olet yllättävän kilpailuhenkinen?",
      "Mikä on kiltisti noloin somehetkesi?",
      "Mikä on paras kehu, jonka olet saanut kaverilta?",
      "Mikä on asia, jonka tekisit uudestaan vain tarinan takia?",
    ],
    dares: [
      "Tee 5 sekunnin tanssiliike.",
      "Keksi itsellesi uusi lempinimi loppukierroksen ajaksi.",
      "Puhu seuraava kierros kuin urheiluselostaja.",
      "Kehu vasemmalla olevaa pelaajaa.",
      "Näytä viimeisin käyttämäsi emoji ja selitä se.",
      "Matki jotain julkkista 5 sekuntia.",
      "Vaihda paikkaa jonkun kanssa.",
      "Kerro huono vitsi niin itsevarmasti kuin pystyt.",
      "Ota dramaattinen poseeraus.",
      "Laula yksi rivi valitsemastasi biisistä.",
      "Keksi ryhmälle uusi bändinimi.",
      "Puhu seuraava lause kuiskaten kuin salainen agentti.",
      "Tee mainos lähimmälle esineelle.",
      "Matki sääennustajaa 10 sekuntia.",
      "Anna oikealla olevalle pelaajalle palkinto ja keksi palkinnon nimi.",
      "Tee käsilläsi ilotulitus.",
      "Keksi uusi tervehdys ja käytä sitä seuraavalla kierroksella.",
      "Sano aakkoset niin dramaattisesti kuin pystyt.",
      "Tee ääniefekti, joka kuvaa tätä iltaa.",
      "Valitse joku ja antakaa toisillenne keksityt taiteilijanimet.",
      "Kerro yhden lauseen satu tästä porukasta.",
      "Pidä kolmen sekunnin voitonpuhe.",
      "Tee hidastettu high five ilmaan.",
      "Lue seuraava kortti kuin uutisankkuri.",
      "Keksi uusi sääntö, joka on voimassa vain yhden kierroksen.",
      "Tee paras robottikävelysi paikallasi.",
      "Näytä ilme, jolla pyytäisit viimeisen pizzapalan.",
      "Keksi nopeasti slogan PartyDeckille.",
      "Sano jokaisesta pelaajasta yksi mukava sana.",
      "Tee tuuletus kuin voitit arvonnan.",
      "Puhu 15 sekuntia ilman r-kirjainta.",
      "Tee lyhyt pantomiimi: kadonnut puhelin.",
      "Keksi itsellesi sisääntulomusiikki ja hyräile sitä.",
      "Näytä, miten kävelisit punaista mattoa pitkin.",
      "Kerro päivän sää omalla mielialallasi.",
      "Tee 5 sekunnin mainos vesitauosta.",
      "Matki jotakuta pelaajaa ystävällisesti ja anna muiden arvata.",
      "Nimeä lähin esine uudelleen ja esittele se.",
      "Puhu seuraavat 20 sekuntia kuin vanhan ajan radiojuontaja.",
      "Keksi porukalle salainen kädenheilautus.",
    ],
  },
  spicy: {
    truths: [
      "Kuka tässä porukassa on eniten sinun tyyppiäsi?",
      "Mikä on rohkein flirttaileva viesti, jonka olet uskaltanut lähettää?",
      "Milloin viimeksi punastuit jonkun takia?",
      "Oletko koskaan ihastunut kaverin kaveriin?",
      "Kuka tässä porukassa vaikuttaa parhaimmalta treffeillä?",
      "Mikä on suurin turn-on persoonassa kevyellä tasolla?",
      "Mikä on suurin turn-off, jota et sanoisi ensitreffeillä?",
      "Oletko koskaan stalkannut jonkun somea liian pitkään?",
      "Mikä on rohkein aloite, jonka olet tehnyt?",
      "Kuka tässä porukassa osaa mielestäsi flirttailla parhaiten?",
      "Mikä on noloin treffimokasi?",
      "Millainen viesti saa sinut hymyilemään heti?",
      "Oletko koskaan miettinyt liikaa yhtä emoji-vastausta?",
      "Kuka tässä porukassa olisi paras wingman?",
      "Mikä on romanttisin asia, jonka olet tehnyt nolostumatta?",
      "Mikä on pieni ele, joka toimii sinuun yllättävän hyvin?",
      "Oletko koskaan ihastunut pelkän äänen perusteella?",
      "Kuka tässä porukassa näyttäisi parhaalta treffi-illallisella?",
      "Mikä on flirttailutyyli, jota et osaa vastustaa?",
      "Oletko koskaan poistanut viestiä, koska se tuntui liian rohkealta?",
      "Mikä on noloin tapa, jolla olet yrittänyt tehdä vaikutuksen?",
      "Kuka tässä porukassa vaikuttaa salaa romantikolta?",
      "Mikä on viimeisin asia, joka sai sinut vähän hämilleen?",
      "Oletko koskaan lähettänyt viestin ja odottanut vastausta liian intensiivisesti?",
      "Mikä on lempikehusi, jonka haluaisit kuulla?",
      "Kuka tässä porukassa voittaisi flirttikilpailun?",
      "Mikä on huonoin iskurepliikki, joka voisi silti naurattaa sinua?",
      "Oletko koskaan ollut treffeillä, joilta halusit paeta kohteliaasti?",
      "Mikä tekee ihmisestä sinulle kiinnostavan heti alussa?",
      "Kuka tässä porukassa saisi sinut lähtemään ex tempore -seikkailuun?",
      "Mikä on asia, jota esität rennommin kuin oikeasti olet?",
      "Oletko koskaan flirttaillut vahingossa ja tajunnut sen liian myöhään?",
      "Mikä on paras tapa aloittaa keskustelu kanssasi?",
      "Kuka tässä porukassa olisi paras järjestämään yllätysdeitit?",
      "Mikä on pieni romanttinen klisee, josta pidät salaa?",
      "Oletko koskaan katunut, ettet tehnyt aloitetta?",
      "Mikä on kiusallisin asia, jonka olet sanonut ihastukselle?",
      "Kuka tässä porukassa näyttää viattomalta, mutta osaa varmasti flirttailla?",
      "Mikä on viimeisin kohteliaisuus, joka jäi mieleesi?",
      "Mikä olisi sinulle täydellinen kevyt flirttitilanne?",
    ],
    dares: [
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
      "Keksi itsellesi deittisovelluksen bio yhdellä lauseella.",
      "Sano yhdelle pelaajalle kehu kuin olisit romanttisessa komediassa.",
      "Valitse joku ja pitäkää äänetön flirttikohtaus 5 sekuntia ilman kosketusta.",
      "Kerro ääneen huonoin iskurepliikki, jonka keksit.",
      "Anna porukalle neuvo täydelliseen ensiviestiin.",
      "Valitse pelaaja ja kysy häneltä yksi kevyt spicy-kysymys.",
      "Näytä miten vastaisit viestiin, joka saa sinut punastumaan.",
      "Keksi kahdelle pelaajalle fiktiivinen treffipaikka.",
      "Sano seuraava lause mahdollisimman itsevarmalla flirttiäänellä.",
      "Valitse joku, joka saa päättää sinulle uuden romanttisen lempinimen.",
      "Kerro yksi turn-on ilman selittelyä tai ota rangaistus.",
      "Kerro yksi turn-off mahdollisimman diplomaattisesti.",
      "Anna oikealla olevalle pelaajalle kohteliaisuus hänen energiastaan.",
      "Valitse pelaaja ja tehkää toisillenne parhaat runway-ilmeet.",
      "Keksi tälle porukalle kuvitteellinen reality-deittiohjelman nimi.",
      "Pidä 10 sekunnin myyntipuhe siitä, miksi olisit hyvä treffeillä.",
      "Kerro millainen emoji kuvaisi flirttityyliäsi.",
      "Valitse pelaaja ja anna hänelle fiktiivinen salainen ihailija -kirje yhdellä virkkeellä.",
      "Kerro yksi asia, jonka huomaat ihmisessä ensimmäisenä.",
      "Tee dramaattinen reaktio siihen, että saat söpön viestin.",
      "Valitse joku ja keksikää teille yhteinen sisäpiirivitsi.",
      "Näytä ilme, jolla yrittäisit pelastaa kiusallisen hiljaisuuden.",
      "Kysy porukalta: kuka olisi paras suunnittelemaan treffit?",
      "Anna yhdelle pelaajalle uusi kohtelias mutta flirttaileva titteli.",
      "Kerro millaisen viestin lähettäisit ihastukselle, mutta älä lähetä sitä.",
      "Tee 5 sekunnin slow motion -sisääntulo.",
      "Valitse pelaaja, joka saa antaa sinulle kevyen sanallisen haasteen.",
      "Kerro yksi romanttinen klisee, josta pidät.",
      "Lue seuraava lause kuin se olisi flirttaileva traileri.",
      "Valitse joku ja vaihtakaa paikkoja, jos molemmat haluatte, tai ota rangaistus.",
      "Keksi porukalle yhteinen red flag -varoitusmerkki leikillä.",
      "Anna yhdelle pelaajalle kehu hänen tyylistään.",
      "Sano yksi asia, joka tekee illasta paremmat treffit kuin tavallinen ilta.",
      "Kerro kenet valitsisit tiimiisi flirttivisassa.",
      "Näytä viaton ilmeesi, kun tiedät tehneesi jotain flirttailevaa.",
      "Valitse joku, joka saa kysyä sinulta kyllä/ei-kysymyksen ihastuksista.",
      "Kerro yksi asia, joka saa sinut vastaamaan viestiin nopeasti.",
      "Pidä 5 sekunnin katsekontakti koko porukalle vuorotellen tai ota rangaistus.",
      "Keksi itsellesi flirttaileva tunnuslause.",
      "Anna yhdelle pelaajalle hyväntahtoinen spicy-haaste ilman fyysistä kontaktia.",
    ],
  },
  wild: {
    truths: [
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
      "Kuka tässä porukassa saisi sinut ottamaan turvallisen riskin?",
      "Mikä on bilepäätös, jota kaduit vähän mutta josta tuli hyvä tarina?",
      "Oletko koskaan vaihtanut paikkaa vain päästäksesi jonkun viereen?",
      "Kuka tässä porukassa olisi paras salainen ihastus?",
      "Mikä on rohkein kehu, jonka voisit sanoa ääneen?",
      "Oletko koskaan saanut poskisuudelmaa pelissä?",
      "Kuka tässä porukassa saisi sinut punastumaan helpoiten?",
      "Mikä on tilanne, jossa tunnelma muuttui yhtäkkiä liian jännittäväksi?",
      "Oletko koskaan miettinyt, ketä tässä porukassa suutelisit, jos molemmat haluaisivat?",
      "Mikä on rohkein asia, jonka olet jättänyt kertomatta kaverille?",
      "Kuka tässä porukassa olisi todennäköisin aloittamaan Wild-haasteen?",
      "Mikä on suurin bileissä tehty tyylimuutoksesi?",
      "Oletko koskaan menettänyt asusteen tai ylimääräisen vaatekerroksen pelin takia?",
      "Kuka tässä porukassa näyttäisi parhaimmalta catwalkissa?",
      "Mikä on villi mutta turvallinen haaste, jonka tekisit nyt?",
      "Oletko koskaan jäänyt kiinni liian rohkeasta flirtistä?",
      "Kuka tässä porukassa olisi paras pitämään rohkean salaisuuden?",
      "Mikä on ilta, jonka yksityiskohdat jäivät tarkoituksella kertomatta?",
      "Kuka tässä porukassa voisi olla illan suurin yllätys?",
      "Mikä on rohkein asia, jonka sanoisit ihastukselle kasvotusten?",
      "Oletko koskaan antanut liian pitkän katseen ja tajunnut sen?",
      "Kuka tässä porukassa olisi paras tekemään ensimmäisen siirron suostumuksella?",
      "Mikä on jännittävin viaton kosketus, jonka muistat?",
      "Oletko koskaan ajatellut, että peli meni melkein liian kiinnostavaksi?",
      "Kuka tässä porukassa saisi sinut hyväksymään rohkean mutta turvallisen tehtävän?",
      "Mikä on paljastus, joka muuttaisi muiden käsitystä sinusta hyvällä tavalla?",
      "Oletko koskaan ollut tilanteessa, jossa kaikki odottivat sinun vastaustasi?",
      "Kuka tässä porukassa voisi saada sinut nauramaan kesken jännittävän hetken?",
      "Mikä on suudelmaan liittyvä muisto, jonka voit kertoa hyvällä maulla?",
      "Oletko koskaan tehnyt jotain villiä vain siksi, että ilta tuntui oikealta?",
      "Kuka tässä porukassa olisi paras valitsemaan sinulle turvallisen Wild-haasteen?",
      "Mikä on rohkein mutta täysin vapaaehtoinen tehtävä, jonka hyväksyisit?",
      "Oletko koskaan jättänyt kertomatta, kenestä olit kiinnostunut?",
      "Kuka tässä porukassa voisi saada sinut unohtamaan ujoutesi?",
      "Mikä on asia, jonka tekisit vain tutussa ja turvallisessa porukassa?",
      "Oletko koskaan pitänyt salaa jonkun tavasta flirttailla?",
      "Kuka tässä porukassa olisi paras pari sinulle leikkimieliseen haasteeseen?",
      "Mikä on rohkein kysymys, johon vastaisit juuri nyt?",
      "Oletko koskaan päätynyt tilanteeseen, josta tuli seuraavan päivän legenda?",
      "Kuka tässä porukassa näyttää rauhalliselta mutta voisi yllättää Wild-moodissa?",
    ],
    dares: [
      "Suutele valitsemaasi pelaajaa poskelle vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Anna valitsemallesi pelaajalle käsi- tai poskisuudelma vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Ota pois yksi asuste, kuten hattu, koru, huppari tai takki — tai ota rangaistus.",
      "Jos sinulla on takki, huppari tai ylimääräinen vaate päällä, ota se pois kierroksen ajaksi tai ota rangaistus.",
      "Valitse joku ja pitäkää katsekontakti 15 sekuntia — tai ota rangaistus.",
      "Valitse joku, jonka kanssa ottaisit yhteiskuvan. Ota kuva vain jos molemmat haluatte — muuten ota rangaistus.",
      "Valitse pelaaja: hän saa antaa sinulle rohkean mutta turvallisen haasteen. Tee se tai ota rangaistus.",
      "Kerro kuka tässä porukassa on eniten sinun tyyppiäsi, tai ota rangaistus.",
      "Anna valitsemallesi pelaajalle kehu, joka on vähän liian rohkea, tai ota rangaistus.",
      "Valitse joku ja vaihtakaa paikkaa loppukierroksen ajaksi — tai ota rangaistus.",
      "Anna jonkun pelaajan päättää sinulle kevyt rooli seuraavaksi kierrokseksi — tai ota rangaistus.",
      "Tee dramaattinen catwalk-hidas kävely huoneen poikki tai ota rangaistus.",
      "Valitse pelaaja ja sanokaa toisillenne yksi viehättävä asia — tai ota rangaistus.",
      "Anna valitsemallesi pelaajalle lupa kysyä sinulta yksi erittäin rohkea kysymys. Vastaa tai ota rangaistus.",
      "Jos uskallat, kerro kenelle antaisit poskisuudelman tässä porukassa vain jos molemmat suostuisitte. Muuten ota rangaistus.",
      "Valitse joku ja tehkää 10 sekunnin tanssikohtaus ilman kosketusta — tai ota rangaistus.",
      "Anna valitsemallesi pelaajalle poskisuudelma vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Valitse joku ja pitäkää kädestä 10 sekuntia vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Kerro yksi rohkea mutta turvallinen fantasia täydellisestä bilehetkestä tai ota rangaistus.",
      "Valitse pelaaja ja antakaa toisillenne rohkea kehu — tai ota rangaistus.",
      "Ota yhteiskuva valitsemasi pelaajan kanssa vain jos molemmat haluatte — muuten ota rangaistus.",
      "Vaihda paikkaa kiinnostavimman vapaaehtoisen viereen — tai ota rangaistus.",
      "Valitse joku ja tehkää leikkimielinen promokuvausposeeraus vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Kerro kenelle antaisit rohkean kehun ja sano se ääneen — tai ota rangaistus.",
      "Anna valitsemallesi pelaajalle turvallinen Wild-haaste. Hän saa skipata ja ottaa rangaistuksen.",
      "Valitse joku ja katsokaa toisianne silmiin 20 sekuntia vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Ota pois ylimääräinen asuste ja anna sille dramaattinen jäähyväispuhe — tai ota rangaistus.",
      "Kerro rohkein viesti, jonka voisit lähettää, mutta älä lähetä sitä — tai ota rangaistus.",
      "Valitse pelaaja ja pyydä häntä keksimään sinulle villi mutta turvallinen lempinimi — tai ota rangaistus.",
      "Tee catwalk ja osoita lopuksi valitsemaasi pelaajaa kehuen — tai ota rangaistus.",
      "Kerro keneltä ottaisit vastaan poskisuudelman vain jos molemmat suostuisivat — tai ota rangaistus.",
      "Valitse joku ja tehkää yhteinen voitonposeeraus vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Kerro yksi salainen ihastusvihje ilman nimiä — tai ota rangaistus.",
      "Anna valitsemallesi pelaajalle kädelle suudelma vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Valitse kaksi vapaaehtoista tekemään draamallinen saippuasarjakohtaus ilman kosketusta — tai ota rangaistus.",
      "Kerro mikä asuste tässä huoneessa sopisi sinulle parhaiten — tai ota rangaistus.",
      "Valitse joku ja vaihtakaa jokin asuste keskenään vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Pidä rohkea mutta kohtelias maljapuhe valitsemallesi pelaajalle — tai ota rangaistus.",
      "Kerro yksi asia, joka tekee jostakusta tässä porukassa viehättävän — tai ota rangaistus.",
      "Valitse pelaaja ja kysykää toisiltanne yksi Wild-kysymys. Kumpikin saa skipata ja ottaa rangaistuksen.",
      "Tee 15 sekunnin hidas tanssiliike yksin tai ota rangaistus.",
      "Valitse joku ja istukaa vierekkäin seuraava kierros vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Kerro rohkein bilemuistosi yhdellä lauseella tai ota rangaistus.",
      "Anna valitsemallesi pelaajalle poskelle ilmasuudelma ilman kosketusta — tai ota rangaistus.",
      "Valitse joku ja tehkää yhteinen sydän käsillä vain jos molemmat suostuvat — muuten ota rangaistus.",
      "Kerro kenet valitsisit turvapariksi Wild-haasteeseen — tai ota rangaistus.",
      "Pyydä vapaaehtoista antamaan sinulle turvallinen rooli loppukierrokselle — tai ota rangaistus.",
      "Kerro mikä olisi turvallinen rajasi Wild-tehtävissä — tai ota rangaistus.",
      "Valitse joku ja antakaa toisillenne yksi sana, joka kuvaa tunnelmaanne — tai ota rangaistus.",
      "Tee rohkein hyväksyttävä poseerauksesi kameralle, ilman kuvan ottamista — tai ota rangaistus.",
      "Valitse joku ja sanokaa ääneen, että molemmat saavat skipata minkä tahansa tehtävän — tai ota rangaistus.",
      "Kerro, mikä tehtävä olisi sinulle liian rohkea, ja ota rangaistus jos et halua vastata.",
    ],
  },
};

const partyTruthOrDareContent = {
  chill: {
    truths: [
      "Kuka porukasta nauraa helpoiten omille jutuilleen?",
      "Kuka tässä porukassa eksyisi helpoiten matkalla vessaan?",
      "Kenellä porukasta on oudoin arkirutiini?",
      "Kuka pelaajista olisi paras keksimään huonon tekosyyn?",
      "Kuka teistä tilaisi todennäköisimmin ruokaa vielä yöllä?",
      "Kuka porukasta aloittaisi tanssilattian ensimmäisenä?",
      "Kuka tässä porukassa kertoo saman tarinan kahdesti?",
      "Kuka porukasta unohtaa helpoiten, mitä oli sanomassa?",
      "Kenellä porukasta on paras huono vitsi?",
      "Kuka pelaajista käyttäisi samaa tekosyytä monta kertaa?",
      "Kuka porukasta olisi paras selittämään myöhästymisen?",
      "Kuka tässä porukassa ottaisi eniten kuvia illan aikana?",
      "Kenellä porukasta on omituisin lempiruoka?",
      "Kuka teistä olisi paras juontamaan tätä peliä?",
      "Kuka porukasta nauraisi väärässä tilanteessa ensimmäisenä?",
      "Kuka tässä porukassa unohtaisi juomansa jonnekin?",
      "Kenellä porukasta on hauskin tapa reagoida yllätyksiin?",
      "Kuka pelaajista olisi paras keksimään ryhmälle lempinimen?",
      "Kuka porukasta olisi todennäköisin kysymään 'missä mun puhelin on'?",
      "Kuka tässä porukassa laulaisi väärät sanat kovimpaa?",
      "Kenellä porukasta on paras pokerinaama huonossa vitsissä?",
      "Kuka teistä lähtisi helpoiten mukaan outoon ideaan?",
      "Kuka porukasta olisi paras pitämään taukojumppaa?",
      "Kuka tässä porukassa voittaisi lautapelin vahingossa?",
      "Kenellä porukasta on eniten turhia sovelluksia puhelimessa?",
      "Kuka pelaajista söisi todennäköisimmin jonkun viimeisen sipsin?",
      "Kuka porukasta tekee parhaat ilmeet valokuvissa?",
      "Kuka tässä porukassa olisi paras salainen agentti viiden minuutin ajan?",
      "Kenellä porukasta on huvittavin tapa kertoa tarina?",
      "Kuka teistä pystyisi selittämään mitä tahansa vakuuttavasti?",
      "Kuka porukasta unohtaisi helpoiten miksi meni keittiöön?",
      "Kuka tässä porukassa keksii parhaat sisäpiirivitsit?",
      "Kenellä porukasta on erikoisin tapa rentoutua?",
      "Kuka pelaajista olisi paras tekemään mainoksen vesitauosta?",
      "Kuka porukasta on illan todennäköisin DJ?",
      "Kuka tässä porukassa lähtisi kotiin viimeisenä?",
      "Kenelle porukasta uskoisit salaisen välipalavaraston?",
      "Kuka teistä olisi paras esittämään olevansa asiantuntija?",
      "Kuka porukasta tarvitsee eniten muistutuksia juoda vettä?",
      "Kuka tässä porukassa tekee pienestä asiasta isoimman shown?",
    ],
    dares: [
      "Anna jokaiselle pelaajalle yhden sanan lempinimi.",
      "Tee 5 sekunnin tanssiliike porukan keskellä.",
      "Matki ystävällisesti yhtä pelaajaa ja anna muiden arvata.",
      "Kerro huono vitsi mahdollisimman itsevarmasti.",
      "Puhu seuraava kierros kuin urheiluselostaja.",
      "Valitse porukasta joku ja kehu hänen energiaansa.",
      "Keksi tälle porukalle bändinimi.",
      "Tee dramaattinen poseeraus ryhmäkuvaa varten.",
      "Laula yksi rivi biisistä, jonka kaikki tunnistavat.",
      "Pidä kolmen sekunnin voitonpuhe.",
      "Keksi porukalle salainen kädenheilautus.",
      "Tee mainos lähimmälle esineelle.",
      "Valitse joku ja vaihtakaa paikkaa yhden kierroksen ajaksi.",
      "Näytä ilme, jolla pyytäisit viimeisen pizzapalan.",
      "Kerro yhden lauseen satu tästä porukasta.",
      "Matki sääennustajaa 10 sekuntia.",
      "Tee robottikävely paikallasi.",
      "Anna oikealla olevalle pelaajalle kuvitteellinen palkinto.",
      "Keksi PartyDeckille slogan.",
      "Puhu seuraavat 15 sekuntia kuin radiojuontaja.",
      "Näytä viimeisin käyttämäsi emoji ja selitä se.",
      "Tee hidastettu high five ilmaan.",
      "Keksi ryhmälle uusi juhlahuuto.",
      "Lue seuraava kortti kuin uutisankkuri.",
      "Tee pantomiimi: kadonnut puhelin.",
      "Valitse pelaaja, joka saa keksiä sinulle uuden tittelin.",
      "Tee ääniefekti, joka kuvaa tätä iltaa.",
      "Kerro porukalle päivän sää omalla mielialallasi.",
      "Esittele lähin esine kuin se olisi kallis keksintö.",
      "Keksi tälle illalle elokuvan nimi.",
      "Tee 5 sekunnin ilotulitus käsilläsi.",
      "Puhu yksi lause kuiskaten kuin salainen agentti.",
      "Valitse joku ja tehkää synkronoitu peukkuylös.",
      "Nimeä porukan virallinen välipalavastaava.",
      "Keksi jokaiselle pelaajalle sopiva biisityyli.",
      "Tee ilme, kun kuulet parhaan sisäpiirivitsin.",
      "Näytä, miten kävelisit punaista mattoa pitkin.",
      "Kerro yhdelle pelaajalle paras asia hänen pelityylissään.",
      "Tee mini-mainos vesitauosta.",
      "Keksi porukalle kuvitteellinen realitysarjan nimi.",
    ],
  },
  spicy: {
    truths: [
      "Kuka porukasta flirttailee vahingossa eniten?",
      "Kuka tässä porukassa on eniten sinun tyyppiäsi?",
      "Kenellä porukasta on paras flirttikatse?",
      "Kuka pelaajista punastuisi helpoiten kehusta?",
      "Kuka porukasta olisi paras treffeillä?",
      "Kenen kanssa porukasta lähtisit mieluiten jatkoille?",
      "Kuka tässä porukassa vaikuttaa salaa romantikolta?",
      "Kuka porukasta saisi sinut vastaamaan viestiin nopeimmin?",
      "Kenelle porukasta antaisit parhaan wingman-palkinnon?",
      "Kuka pelaajista lähettäisi rohkeimman viestin?",
      "Kuka porukasta olisi paras pelastamaan kiusallisen hiljaisuuden?",
      "Kuka tässä porukassa osaa kehua luontevimmin?",
      "Kenellä porukasta olisi paras ensitreffi-idea?",
      "Kenen kanssa porukasta keskustelu venyisi pisimpään yöllä?",
      "Kuka porukasta vaikuttaa vaikeimmin tavoiteltavalta?",
      "Kuka pelaajista voisi saada jonkun ihastumaan itseensä tänään?",
      "Kuka porukasta osaa pitää katsekontaktin parhaiten?",
      "Kuka tässä porukassa näyttää viattomalta, mutta ei ehkä ole?",
      "Kenelle porukasta uskaltaisit lähettää sydän-emojin?",
      "Kuka porukasta olisi paras kirjoittamaan flirttailevan viestin?",
      "Kenen kanssa porukasta lähtisit mieluiten kahville?",
      "Kuka pelaajista saisi sinut hämilleen yhdellä kehulla?",
      "Kuka porukasta olisi hauskin deittiohjelmassa?",
      "Kuka tässä porukassa voisi olla salainen ihastus?",
      "Kenellä porukasta on paras hymy?",
      "Kuka porukasta olisi paras järjestämään yllätysdeitit?",
      "Kenen kanssa porukasta olisi helpointa jutella vakavasti?",
      "Kuka pelaajista flirttaa eniten vitseillä?",
      "Kuka porukasta saisi sinut nauramaan treffeillä eniten?",
      "Kuka tässä porukassa voisi saada sinut tekemään aloitteen?",
      "Kenelle porukasta kertoisit ensimmäisenä ihastuksesta?",
      "Kuka porukasta on paras lukemaan tunnelmaa?",
      "Kuka pelaajista olisi paras wingman juuri sinulle?",
      "Kuka porukasta punastuisi, jos häntä kehuttaisiin nyt?",
      "Kuka tässä porukassa olisi paras romanttisessa komediassa?",
      "Kenen kanssa porukasta tanssisit mieluiten yhden biisin?",
      "Kuka porukasta osaa tehdä tavallisesta tilanteesta flirttailevan?",
      "Kuka pelaajista olisi vaarallisin tekstailija?",
      "Kuka tässä porukassa saa kehun kuulostamaan aidolta?",
      "Kenen kanssa porukasta olisi hauskinta suunnitella feikkitreffit?",
    ],
    dares: [
      "Anna rohkea mutta hyväntahtoinen kehu jollekin porukasta.",
      "Pidä katsekontakti yhden pelaajan kanssa 10 sekuntia.",
      "Näytä flirttailevin katseesi porukalle.",
      "Valitse joku ja keksikää teille yhteinen ship-nimi.",
      "Anna yhdelle pelaajalle flirttaileva lempinimi.",
      "Kysy joltakulta porukasta kevyt spicy-kysymys.",
      "Sano yhdelle pelaajalle asia, joka tekee hänestä viehättävän.",
      "Kerro porukalle paras huono iskurepliikkisi.",
      "Valitse pelaaja, joka saa kysyä sinulta yhden rohkean kysymyksen.",
      "Istu seuraava kierros jonkun uuden pelaajan vieressä.",
      "Keksi itsellesi deittisovelluksen bio yhdellä lauseella.",
      "Pidä 10 sekunnin myyntipuhe siitä, miksi olisit hyvä treffeillä.",
      "Anna oikealla olevalle pelaajalle kehu hänen tyylistään.",
      "Kerro yksi pieni turn-on porukalle.",
      "Kerro yksi turn-off mahdollisimman diplomaattisesti.",
      "Tee dramaattinen reaktio söpöön viestiin.",
      "Valitse joku ja tehkää äänetön flirttikohtaus ilman kosketusta.",
      "Keksi kahdelle pelaajalle kuvitteellinen treffipaikka.",
      "Näytä ilme, jolla pelastaisit kiusallisen hiljaisuuden.",
      "Kysy porukalta, kuka olisi paras suunnittelemaan treffit.",
      "Anna yhdelle pelaajalle kohtelias spicy-titteli.",
      "Kerro, millaisen viestin lähettäisit ihastukselle lähettämättä sitä.",
      "Tee 5 sekunnin slow motion -sisääntulo.",
      "Valitse pelaaja, joka antaa sinulle kevyen sanallisen haasteen.",
      "Kerro yksi romanttinen klisee, josta pidät.",
      "Lue seuraava lause kuin se olisi flirttaileva traileri.",
      "Keksi porukalle yhteinen red flag leikillä.",
      "Anna yhdelle pelaajalle kehu hänen energiastaan.",
      "Kerro kuka porukasta olisi paras wingman.",
      "Näytä viaton ilmeesi, kun tiedät tehneesi jotain flirttailevaa.",
      "Valitse joku kysymään sinulta kyllä/ei-kysymys ihastuksista.",
      "Kerro asia, joka saa sinut vastaamaan viestiin nopeasti.",
      "Pidä 5 sekunnin katsekontakti kolmelle pelaajalle vuorotellen.",
      "Keksi itsellesi flirttaileva tunnuslause.",
      "Anna porukalle neuvo täydelliseen ensiviestiin.",
      "Valitse joku ja anna hänelle kuvitteellinen salainen ihailija -kirje yhdellä virkkeellä.",
      "Kerro yksi asia, jonka huomaat pelaajissa ensimmäisenä.",
      "Tee runway-ilme yhdessä valitsemasi pelaajan kanssa.",
      "Keksi tälle porukalle deittiohjelman nimi.",
      "Kerro kenet valitsisit tiimiisi flirttivisassa.",
      "Valitse joku ja tehkää teille yhteinen sisäpiirivitsi.",
      "Sano yksi asia, joka tekee tästä illasta vähän flirttailevan.",
      "Anna yhdelle pelaajalle kehu, joka voisi saada hänet hymyilemään.",
      "Kerro porukalle oma emoji-flirttityylisi.",
      "Valitse joku ja keksikää teille yhteinen ravintola-arvostelu.",
      "Kysy porukalta, kuka näyttäisi parhaimmalta ensitreffeillä.",
      "Tee 5 sekunnin kohtaus, jossa saat yllättävän kehut.",
      "Keksi yhdelle pelaajalle romanttisen komedian rooli.",
      "Valitse pelaaja, joka saa antaa sinulle uuden spicy-lempinimen.",
      "Kerro yksi asia, joka tekee ihmisestä heti kiinnostavan.",
    ],
  },
  wild: {
    truths: [
      "Kuka porukasta vaikuttaa parhaimmalta suutelijalta?",
      "Kuka tässä porukassa olisi vaarallisin flirtti?",
      "Kuka porukasta saisi sinut tekemään tyhmän mutta hauskan päätöksen?",
      "Kenen kanssa porukasta lähtisit mieluiten seikkailuun?",
      "Kuka pelaajista saisi sinut punastumaan nopeimmin?",
      "Kenelle porukasta antaisit rohkeimman kehusi?",
      "Kuka tässä porukassa olisi illan suurin yllätys?",
      "Kuka porukasta uskaltaisi tehdä ensimmäisen siirron?",
      "Kenen kanssa porukasta vaihtaisit paikkaa heti?",
      "Kuka pelaajista olisi paras Wild-haastekumppani?",
      "Kuka porukasta saisi sinut unohtamaan ujoutesi?",
      "Kuka tässä porukassa näyttää rauhalliselta mutta voisi yllättää?",
      "Kenelle porukasta kertoisit rohkeimman salaisuuden?",
      "Kuka porukasta olisi legendaarisin bilehahmo?",
      "Kenen kanssa porukasta tanssisit rohkeimmin?",
      "Kuka pelaajista voisi saada sinut ottamaan turvallisen riskin?",
      "Kuka porukasta olisi paras pitämään rohkean salaisuuden?",
      "Kuka tässä porukassa saisi sinut vastaamaan liian nopeasti?",
      "Keneltä porukasta ottaisit vastaan Wild-kysymyksen?",
      "Kuka porukasta vaikuttaa salaa villimmältä kuin näyttää?",
      "Kenen kanssa porukasta voisi syntyä paras tarina tältä illalta?",
      "Kuka pelaajista olisi paras valitsemaan sinulle haasteen?",
      "Kuka porukasta olisi rohkein catwalkissa?",
      "Kuka tässä porukassa voisi saada muut huutamaan 'ei vitsi'?",
      "Kenelle porukasta antaisit poskisuudelman?",
      "Kuka porukasta olisi paras flirttailemaan katseella?",
      "Kenen kanssa porukasta pitäisit pisimmän katsekontaktin?",
      "Kuka pelaajista olisi vaarallisin jatkoilla?",
      "Kuka porukasta saisi sinut nauramaan kesken jännittävän hetken?",
      "Kuka tässä porukassa voisi olla salainen ihastuksesi?",
      "Kenelle porukasta antaisit asusteestasi lainaan jotain?",
      "Kuka porukasta olisi paras tekemään rohkean paljastuksen?",
      "Kenen kanssa porukasta ottaisit yhteiskuvan ensimmäisenä?",
      "Kuka pelaajista olisi illan todennäköisin legenda?",
      "Kuka porukasta osaa luoda eniten sähköä huoneeseen?",
      "Kuka tässä porukassa saisi sinut tekemään aloitteen?",
      "Kenelle porukasta uskaltaisit sanoa suoraan, että hän on viehättävä?",
      "Kuka porukasta olisi paras pelaamaan tätä moodia?",
      "Kenen kanssa porukasta juttelisit kahden kesken pisimpään?",
      "Kuka pelaajista olisi paras turvallisen Wild-säännön keksijä?",
      "Kuka porukasta näyttäisi parhaimmalta draamallisessa sisääntulossa?",
      "Kuka tässä porukassa voisi saada sinut vaihtamaan suunnitelmia?",
      "Kenelle porukasta antaisit luvan kysyä sinulta rohkean kysymyksen?",
      "Kuka porukasta olisi paras pitämään tunnelman hyvänä?",
      "Kenen kanssa porukasta olisi kiinnostavinta pelata parihaaste?",
      "Kuka pelaajista saisi sinut hymyilemään pelkällä katseella?",
      "Kuka porukasta voisi päätyä illan puheenaiheeksi?",
      "Kuka tässä porukassa on rohkein hyvällä tavalla?",
      "Kenelle porukasta antaisit illan parhaan flirttipalkinnon?",
      "Kuka porukasta olisi paras päättämään seuraavan kierroksen tunnelman?",
    ],
    dares: [
      "Anna poskisuudelma jollekin porukasta.",
      "Ota pois yksi asuste tai ylimääräinen vaatekerros.",
      "Vaihda paikkaa sen kanssa, joka on eniten sinun tyyppiäsi.",
      "Pidä katsekontakti jonkun porukasta kanssa 15 sekuntia.",
      "Anna rohkea kehu jollekin porukasta.",
      "Valitse porukasta joku, joka saa kysyä sinulta rohkean kysymyksen.",
      "Kerro kenelle porukasta antaisit poskisuudelman.",
      "Valitse joku ja tehkää hidas tanssikohtaus ilman musiikkia.",
      "Anna käsi- tai poskisuudelma valitsemallesi pelaajalle.",
      "Kerro kuka porukasta on eniten sinun tyyppiäsi.",
      "Tee dramaattinen catwalk huoneen poikki.",
      "Valitse joku ja ottakaa yhteiskuva.",
      "Sano yhdelle pelaajalle asia, joka tekee hänestä viehättävän.",
      "Vaihda jokin asuste jonkun pelaajan kanssa.",
      "Valitse pelaaja ja sanokaa toisillenne yksi rohkea kehu.",
      "Pidä 20 sekunnin katsekontakti valitsemasi pelaajan kanssa.",
      "Kerro rohkein bilemuistosi yhdellä lauseella.",
      "Anna ilmasuudelma jollekin porukasta.",
      "Valitse joku ja tehkää yhteinen voitonposeeraus.",
      "Kerro yksi salainen ihastusvihje ilman nimeä.",
      "Pyydä porukkaa nimeämään illan vaarallisin flirtti.",
      "Valitse joku ja istu hänen viereensä seuraavaksi kierrokseksi.",
      "Kerro kenet valitsisit Wild-haastekumppaniksi.",
      "Anna yhdelle pelaajalle vähän liian rohkea lempinimi.",
      "Tee 15 sekunnin hidas tanssiliike yksin.",
      "Kysy yhdeltä pelaajalta rohkea kyllä/ei-kysymys.",
      "Kerro kuka porukasta saisi sinut punastumaan helpoiten.",
      "Valitse joku ja tehkää yhteinen sydän käsillä.",
      "Anna rohkea maljapuhe yhdelle pelaajalle.",
      "Kerro mikä asuste tässä porukassa sopisi sinulle parhaiten.",
      "Valitse joku ja vaihtakaa paikkoja loppukierroksen ajaksi.",
      "Tee promokuvausposeeraus valitsemasi pelaajan kanssa.",
      "Kerro kuka porukasta näyttäisi parhaimmalta catwalkissa.",
      "Anna yhdelle pelaajalle turvallinen Wild-haaste.",
      "Kerro minkä rohkean kysymyksen kysyisit porukalta.",
      "Valitse joku ja tehkää draamallinen saippuasarjakohtaus.",
      "Kerro kenet porukasta ottaisit jatkoille mukaan ensimmäisenä.",
      "Anna yhdelle pelaajalle rooli seuraavaksi kierrokseksi.",
      "Tee rohkein hyväksyttävä poseerauksesi.",
      "Kerro mikä olisi sinulle liian rohkea tehtävä.",
      "Valitse joku ja sanokaa toisillenne yksi sana tämän illan tunnelmasta.",
      "Kerro kuka porukasta olisi paras pitämään salaisuuden.",
      "Anna yhdelle pelaajalle kehu, jota et normaalisti uskaltaisi sanoa.",
      "Valitse porukasta joku, jonka viereen siirtyisit jatkoilla.",
      "Kerro mikä pelaajista tekee tästä illasta villimmän.",
      "Tee 10 sekunnin runway-kävely ja valitse tuomarisi.",
      "Kysy porukalta, kuka olisi paras suutelija.",
      "Anna yhdelle pelaajalle kuvitteellinen Wild-palkinto.",
      "Kerro kenelle porukasta lähettäisit rohkean viestin.",
      "Valitse joku ja tehkää yhteinen sisääntulo huoneeseen.",
      "Kerro porukalle rohkein kehu, jonka voisit antaa.",
      "Valitse pelaaja, joka saa päättää seuraavan Wild-kysymyksen.",
    ],
  },
};

const truthOrDareModes = partyTruthOrDareContent;

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

  if (game?.type === "truthDare") {
    const session = state.sessions[game.id];
    if (session?.currentCard) {
      session.currentCard = null;
      session.currentChoice = null;
      renderTruthOrDare(game);
    }
    return;
  }

  renderActiveGame(false);
}

function renderActiveGame(isFirstRender = false) {
  const game = getActiveGame();
  if (!game) {
    return;
  }

  const mode = getModeConfig();
  elements.roundLabel.textContent = `${mode.title} ${mode.icon}`;
  elements.wildSkipButton.hidden = state.currentMode !== "wild";
  elements.primaryPlayAction.hidden = false;
  elements.primaryPlayAction.disabled = false;

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
  elements.primaryPlayAction.hidden = false;
  elements.primaryPlayAction.disabled = !session?.currentCard;
  elements.primaryPlayAction.textContent = "Seuraava";
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
  session.currentChoice = choice;
  session.currentCard = getNextTruthOrDareCard(state.currentMode, choice);
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

function getTruthOrDareCards(mode = state.currentMode, type = "truth") {
  const modeData = truthOrDareModes[mode] || truthOrDareModes.chill;
  const normalizedType = type === "dare" || type === "dares" ? "dares" : "truths";
  const fallbackType = normalizedType === "dares" ? "dare" : "truth";
  return modeData[normalizedType] || modeData[fallbackType] || truthOrDareModes.chill[normalizedType] || [];
}

function getNextTruthOrDareCard(mode = state.currentMode, type = "truth") {
  const normalizedType = type === "dare" || type === "dares" ? "dare" : "truth";
  const cards = getTruthOrDareCards(mode, normalizedType);
  return getNextFromDeck(`truth-or-dare:${mode}:${normalizedType}`, cards);
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
  getTruthOrDareCards,
  getNextTruthOrDareCard,
  shuffleCards,
  getNextCard,
  createDeck,
};
