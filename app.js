const STORAGE_KEY = "partydeck.players";
const WATER_BREAK_STORAGE_KEY = "partydeck.waterBreaksEnabled";
const WATER_BREAK_CHANCE = 0.12;

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

const kingsCupRules = {
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
  J: "Rule: Keksi uusi sääntö.",
  Q: "Question Master: Saat kysellä, ja jos joku vastaa, hän häviää.",
  K: "King’s Cup: Lisää sääntö / kuningaskortti. Neljäs kuningas lopettaa kierroksen.",
};

const diceRules = {
  1: "Ota itse yksi rangaistus.",
  2: "Valitse joku ottamaan yksi rangaistus.",
  3: "Kaikki ottavat yhden.",
  4: "Vasemmalla oleva ottaa.",
  5: "Oikealla oleva ottaa.",
  6: "Keksi sääntö seuraavalle kierrokselle.",
};

const diceExtras = [
  "Kerro nopea tarina tai ota rangaistus.",
  "Valitse pelaaja, joka saa immuniteetin seuraavalle kierrokselle.",
  "Kaikki äänestävät, kuka heittää seuraavaksi.",
  "Jos noppa osuu samaan numeroon uudestaan, kaikki ottavat.",
  "Valitse joku tekemään 5 sekunnin haaste.",
];

const games = [
  {
    id: "never-have-i-ever",
    title: "En ole koskaan",
    description: "Lue väite ääneen. Ne, jotka ovat tehneet sen, ottavat rangaistuksen.",
    rules:
      "Yksi pelaaja lukee väitteen ääneen. Kaikki, jotka ovat tehneet asian, ottavat sovitun rangaistuksen. Pitäkää tahti rentona ja skipatkaa mikä tahansa kortti, joka ei tunnu hyvältä.",
    type: "prompt",
    promptLabel: "Väite",
    variants: [
      {
        id: "leppo",
        title: "Leppo",
        badge: "Kevyt",
        description: "Hauska ja kevyesti kiusallinen peruspakka.",
        prompts: [
          "En ole koskaan lähettänyt viestiä, jota kadun heti.",
          "En ole koskaan nauranut tilanteessa, jossa ei olisi saanut.",
          "En ole koskaan stalkannut jonkun somea liian pitkään.",
          "En ole koskaan esittänyt tietäväni biisin sanat.",
          "En ole koskaan myöhästynyt ja syyttänyt liikennettä.",
          "En ole koskaan unohtanut miksi menin toiseen huoneeseen.",
          "En ole koskaan tilannut ruokaa vain koska joku muu mainitsi ruoan.",
          "En ole koskaan vastannut viestiin päässäni mutta en oikeasti.",
          "En ole koskaan sanonut olevani viiden minuutin päässä, vaikka olin kotona.",
          "En ole koskaan katsonut sarjaa ilman sitä ihmistä, jonka kanssa piti katsoa yhdessä.",
          "En ole koskaan laulanut suihkussa täysillä.",
          "En ole koskaan teeskennellyt puhelua välttääkseni tilanteen.",
          "En ole koskaan unohtanut jonkun nimeä heti esittelyn jälkeen.",
          "En ole koskaan mennyt jääkaapille ilman suunnitelmaa.",
          "En ole koskaan tanssinut peilin edessä yksin.",
          "En ole koskaan käyttänyt filtteriä ja sanonut kuvan olevan ihan luonnollinen.",
          "En ole koskaan lukenut vanhoja omia viestejä ja nolostunut.",
          "En ole koskaan vaihtanut asua monta kertaa ennen lähtöä.",
          "En ole koskaan esittänyt ymmärtäväni sisäpiirivitsin.",
          "En ole koskaan puhunut lemmikille kuin ihmiselle.",
          "En ole koskaan lähettänyt kuvakaappausta väärälle henkilölle.",
          "En ole koskaan ostanut jotain vain koska se oli alennuksessa.",
          "En ole koskaan sanonut etten ole väsynyt ja nukahtanut heti.",
          "En ole koskaan tehnyt soittolistaa tiettyä tunnelmaa varten.",
          "En ole koskaan vältellyt puheluun vastaamista.",
          "En ole koskaan hakenut googlesta miten jokin hyvin tavallinen sana kirjoitetaan.",
          "En ole koskaan katunut hiustenleikkausta saman päivän aikana.",
          "En ole koskaan syönyt jälkiruokaa ennen oikeaa ruokaa.",
          "En ole koskaan väittänyt muistavani jonkun, vaikka en muistanut.",
          "En ole koskaan puhunut liian kovaa kuulokkeet päässä.",
          "En ole koskaan jäänyt katsomaan yhtä videota ja huomannut tunnin kadonneen.",
          "En ole koskaan lähettänyt ääniviestiä ja kuunnellut sitä heti nolona.",
        ],
      },
      {
        id: "tuhma",
        title: "Tuhma",
        badge: "K-18",
        description: "Rohkeampi pakka aikuiselle porukalle.",
        prompts: [
          "En ole koskaan lähettänyt flirttailevaa viestiä ja esittänyt sen olleen vitsi.",
          "En ole koskaan poistanut viestiä, koska se oli liian rohkea.",
          "En ole koskaan ihastunut kaverin kaveriin yhden illan aikana.",
          "En ole koskaan käyttänyt deittisovellusta vain saadakseni huomiota.",
          "En ole koskaan suudellut jotakuta hetken mielijohteesta.",
          "En ole koskaan lähtenyt jatkoille vain koska siellä oli kiinnostava tyyppi.",
          "En ole koskaan lähettänyt viestiä exälle liian myöhään illalla.",
          "En ole koskaan saanut punaista naamaa kohteliaisuudesta.",
          "En ole koskaan flirtannut saadakseni ilmaisen juoman.",
          "En ole koskaan vaihtanut katseita jonkun kanssa liian pitkään.",
          "En ole koskaan katunut rohkeaa somejulkaisua aamulla.",
          "En ole koskaan teeskennellyt, etten huomannut jonkun flirttiä.",
          "En ole koskaan kysynyt kaverilta apua flirttiviestin muotoiluun.",
          "En ole koskaan suudellut samaa ihmistä uudestaan, vaikka sanoin etten aio.",
          "En ole koskaan pitänyt salaisesta ihastuksesta pidempään kuin myönnän.",
          "En ole koskaan käyttänyt bileitä tekosyynä päästäkseni jonkun viereen.",
          "En ole koskaan kertonut liian henkilökohtaista tarinaa liian nopeasti.",
          "En ole koskaan antanut puhelintani kaverille, jotta en lähettäisi viestiä.",
          "En ole koskaan stalkannut ihastuksen vanhoja kuvia nolon pitkälle.",
          "En ole koskaan ollut treffeillä, joista en kertonut kenellekään.",
          "En ole koskaan sanonut olevani rento, vaikka olin aivan hermona ihastuksen takia.",
          "En ole koskaan vaihtanut asua siksi, että tiesin tietyn ihmisen tulevan paikalle.",
          "En ole koskaan pyytänyt kaveria selvittämään, onko joku sinkku.",
          "En ole koskaan lähetellyt vihjailevia emojeita ja toivonut, että viesti ymmärretään.",
          "En ole koskaan mennyt tanssilattialle vain päästäkseni lähemmäs jotakuta.",
          "En ole koskaan tallentanut jonkun viestiä, koska se oli liian hyvä.",
          "En ole koskaan valehdellut katsoneeni vain yhden kuvan somessa.",
          "En ole koskaan pitänyt jostakusta, jonka tiesin olevan vähän huono idea.",
          "En ole koskaan pyytänyt numeroa ja jättänyt sitten viestimättä.",
          "En ole koskaan suostunut peliin vain koska mukana oli ihastus.",
          "En ole koskaan sanonut kaverille, että nyt pitää estää minua tekemästä jotain typerää.",
          "En ole koskaan herännyt ja ajatellut, että eilinen flirtti meni aika pitkälle.",
        ],
      },
    ],
  },
  {
    id: "most-likely",
    title: "Kuka todennäköisimmin",
    description: "Lue kysymys ääneen. Kaikki osoittavat pelaajaa, johon väite sopii parhaiten.",
    rules:
      "Lukekaa kysymys ääneen. Kaikki osoittavat yhtä pelaajaa tai sanovat nimen yhtä aikaa. Eniten ääniä saanut tekee sovitun rangaistuksen tai kertoo lyhyen selityksen.",
    type: "prompt",
    promptLabel: "Kysymys",
    variants: [
      {
        id: "leppo",
        title: "Leppo",
        badge: "Kevyt",
        description: "Hauska ja hyväntuulinen äänestyspakka.",
        prompts: [
          "Kuka todennäköisimmin unohtaa mihin laittoi puhelimensa?",
          "Kuka todennäköisimmin alkaa selittää pitkää tarinaa ilman pointtia?",
          "Kuka todennäköisimmin tilaa ruokaa vielä yöllä?",
          "Kuka todennäköisimmin ottaa DJ-roolin väkisin?",
          "Kuka todennäköisimmin nauraa omalle vitsilleen eniten?",
          "Kuka todennäköisimmin eksyy matkalla vessaan?",
          "Kuka todennäköisimmin ehdottaa jatkoja ensimmäisenä?",
          "Kuka todennäköisimmin tietää kaikkien horoskoopit?",
          "Kuka todennäköisimmin dokumentoi illan eniten?",
          "Kuka todennäköisimmin ottaa ryhmäkuvan liian monta kertaa?",
          "Kuka todennäköisimmin löytää uuden parhaan ystävän jonosta?",
          "Kuka todennäköisimmin unohtaa mitä oli sanomassa?",
          "Kuka todennäköisimmin puhuu käsillään eniten?",
          "Kuka todennäköisimmin haluaa pelata vielä yhden kierroksen?",
          "Kuka todennäköisimmin tilaa saman annoksen kuin joku muu?",
          "Kuka todennäköisimmin aloittaa yhteislaulun?",
          "Kuka todennäköisimmin ottaa parhaat kuvat?",
          "Kuka todennäköisimmin myöhästyy mutta tuo hyvän fiiliksen?",
          "Kuka todennäköisimmin antaa kaikille lempinimet?",
          "Kuka todennäköisimmin muistaa illan oudoimman yksityiskohdan?",
          "Kuka todennäköisimmin vaihtaa mielipidettä viime hetkellä?",
          "Kuka todennäköisimmin tekee dramaattisen sisääntulon?",
          "Kuka todennäköisimmin kysyy saako soittaa yhden biisin?",
          "Kuka todennäköisimmin tekee parhaat eväät jatkoille?",
          "Kuka todennäköisimmin selittää meemin väärin mutta itsevarmasti?",
          "Kuka todennäköisimmin tarvitsee kolme muistutusta lähtöajasta?",
          "Kuka todennäköisimmin unohtaa juomansa jonnekin?",
          "Kuka todennäköisimmin tekee spontaanin suunnitelman huomiselle?",
          "Kuka todennäköisimmin löytää tanssilattian ensimmäisenä?",
          "Kuka todennäköisimmin lähettää aamulla kiitosviestin?",
          "Kuka todennäköisimmin sanoo olevansa rauhallinen ja innostuu eniten?",
          "Kuka todennäköisimmin muistaa kaikkien tilaukset ulkoa?",
        ],
      },
      {
        id: "tuhma",
        title: "Tuhma",
        badge: "K-18",
        description: "Rohkeampi äänestyspakka aikuiselle porukalle.",
        prompts: [
          "Kuka todennäköisimmin lähettää viestin ihastukselle vielä tänä iltana?",
          "Kuka todennäköisimmin flirttailee vahingossa kaikille?",
          "Kuka todennäköisimmin punastuu ensimmäisenä rohkeasta kysymyksestä?",
          "Kuka todennäköisimmin myöntää ihastuksen vasta kolmannen kysymyksen jälkeen?",
          "Kuka todennäköisimmin päätyy suutelemaan jotakuta illan aikana?",
          "Kuka todennäköisimmin tarvitsee kaverin estämään exälle viestimisen?",
          "Kuka todennäköisimmin tanssii tarkoituksella liian lähellä ihastusta?",
          "Kuka todennäköisimmin kertoo salaisen deittitarinan vahingossa?",
          "Kuka todennäköisimmin saa eniten match-ilmoituksia illan aikana?",
          "Kuka todennäköisimmin pyytää jonkun numeroa rohkeasti?",
          "Kuka todennäköisimmin esittää viatonta, vaikka flirttailee selvästi?",
          "Kuka todennäköisimmin lähettää vihjailevimman emojin?",
          "Kuka todennäköisimmin päätyy pitkään katsekontaktiin jonkun kanssa?",
          "Kuka todennäköisimmin kertoo parhaan suutelutarinan?",
          "Kuka todennäköisimmin jää kiinni ihastuksen someprofiilin katsomisesta?",
          "Kuka todennäköisimmin tekee ensimmäisen liikkeen?",
          "Kuka todennäköisimmin on porukan salainen romantikko?",
          "Kuka todennäköisimmin saa oudoimman iskurepliikin toimimaan?",
          "Kuka todennäköisimmin vaihtaa suunnitelmaa kiinnostavan ihmisen takia?",
          "Kuka todennäköisimmin muistaa kaikkien deittidraamat?",
          "Kuka todennäköisimmin lähtee jatkoille flirttailun takia?",
          "Kuka todennäköisimmin on rohkein tanssilattialla?",
          "Kuka todennäköisimmin väittää ettei ole mustasukkainen, vaikka vähän on?",
          "Kuka todennäköisimmin saa viestin, joka saa koko pöydän kiljumaan?",
          "Kuka todennäköisimmin käyttää kaveria siipihenkilönä?",
          "Kuka todennäköisimmin sanoo jotain liian suoraa ja katuu heti?",
          "Kuka todennäköisimmin hymyilee puhelimelleen epäilyttävän paljon?",
          "Kuka todennäköisimmin tekee deittisuunnitelman viidessä minuutissa?",
          "Kuka todennäköisimmin ihastuu vain ääneen tai nauruun?",
          "Kuka todennäköisimmin lähettää aamulla viestin 'olipa hauska ilta'?",
          "Kuka todennäköisimmin saa muut huutamaan 'nyt menet juttelemaan'?",
          "Kuka todennäköisimmin yrittää selittää, että flirtti oli vain kohteliaisuutta?",
        ],
      },
    ],
  },
  {
    id: "kings-cup",
    title: "Ring of Fire / Kings Cup",
    description: "Nosta kortti ja tee siihen kuuluva sääntö.",
    rules:
      "Puhelin toimii korttipakkana. Nosta kortti, lue sääntö ääneen ja tehkää kortin mukainen tehtävä. Sama kortti ei tule uudestaan ennen kuin pakka on käyty loppuun.",
    type: "kingsCup",
  },
  {
    id: "ride-the-bus",
    title: "Bussi / Ride the Bus",
    description: "Arvaa neljä korttivaihetta putkeen ja selviä bussista.",
    rules:
      "Arvaa ensin punainen vai musta, sitten korkeampi vai matalampi, sen jälkeen välissä vai ulkona ja lopuksi maa. Oikea vastaus vie eteenpäin, väärä aloittaa kierroksen alusta.",
    type: "rideBus",
  },
  {
    id: "pyramid",
    title: "Pyramidipeli",
    description: "Jaa pelaajille kortit ja paljasta pyramidi kortti kerrallaan.",
    rules:
      "Jokaiselle pelaajalle jaetaan neljä korttia. Pyramidi paljastetaan yksi kortti kerrallaan. Jos pelaajalla on sama arvo, hän osui ja jakaa tai ottaa rivin mukaisen rangaistuksen.",
    type: "pyramid",
    requiresPlayers: true,
  },
  {
    id: "dice",
    title: "Noppajuomapeli",
    description: "Heitä noppaa ja tee numeron mukainen tehtävä.",
    rules:
      "Heitä noppaa. Numero 1-6 kertoo perustehtävän, ja sovellus voi lisätä satunnaisen lisähaasteen tai kohdepelaajan.",
    type: "dice",
  },
];

const state = {
  players: readPlayers(),
  waterBreaksEnabled: readWaterBreakPreference(),
  activeGameId: null,
  activeVariantId: null,
  decks: buildPromptDecks(),
  round: buildPromptRounds(),
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
  playerForm: document.querySelector("[data-player-form]"),
  playerInput: document.querySelector("#player-name"),
  playerList: document.querySelector("[data-player-list]"),
  waterBreakToggle: document.querySelector("[data-water-break-toggle]"),
  waterBreakLabel: document.querySelector("[data-water-break-label]"),
  beginGameButton: document.querySelector('[data-action="begin-game"]'),
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
  rulesModal: document.querySelector("[data-rules-modal]"),
  rulesTitle: document.querySelector("[data-rules-title]"),
  rulesText: document.querySelector("[data-rules-text]"),
};

document.addEventListener("click", handleClick);
elements.playerForm.addEventListener("submit", addPlayer);
elements.waterBreakToggle.addEventListener("change", updateWaterBreakPreference);

renderPlayers();
renderWaterBreakPreference();
renderGames();

function handleClick(event) {
  const choice = event.target.closest("[data-bus-choice]")?.dataset.busChoice;
  if (choice) {
    handleBusChoice(choice);
    return;
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  if (action === "start") showScreen("menu");
  if (action === "back-menu") showScreen("menu");
  if (action === "reset-players") resetPlayers();
  if (action === "begin-game") beginGame();
  if (action === "next-card") handlePrimaryPlayAction();
  if (action === "show-rules") showRules();
  if (action === "close-rules") closeRules();
}

function renderGames() {
  elements.gameList.innerHTML = games
    .map((game) => {
      const actions = game.variants
        ? game.variants
            .map(
              (variant) => `
                <button class="mode-button" type="button" data-game-id="${game.id}" data-variant-id="${variant.id}">
                  <span>${variant.title}</span>
                  <small>${variant.badge} · ${variant.prompts.length} korttia</small>
                </button>
              `,
            )
            .join("")
        : `
            <button class="mode-button wide" type="button" data-game-id="${game.id}" data-variant-id="default">
              <span>Pelaa</span>
              <small>${getGameMeta(game)}</small>
            </button>
          `;

      return `
        <article class="game-card">
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <div class="variant-actions ${game.variants ? "" : "single"}">${actions}</div>
        </article>
      `;
    })
    .join("");

  elements.gameList.querySelectorAll("[data-game-id][data-variant-id]").forEach((button) => {
    button.addEventListener("click", () => selectGame(button.dataset.gameId, button.dataset.variantId));
  });
}

function renderPlayers() {
  if (state.players.length === 0) {
    elements.playerList.innerHTML = '<li class="empty-state">Ei pelaajia lisättynä.</li>';
    return;
  }

  elements.playerList.innerHTML = state.players
    .map(
      (player) => `
        <li class="player-pill">
          <span>${escapeHtml(player)}</span>
          <button class="remove-player" type="button" aria-label="Poista ${escapeHtml(player)}" data-remove-player="${escapeHtml(player)}">×</button>
        </li>
      `,
    )
    .join("");

  elements.playerList.querySelectorAll("[data-remove-player]").forEach((button) => {
    button.addEventListener("click", () => removePlayer(button.dataset.removePlayer));
  });
}

function addPlayer(event) {
  event.preventDefault();
  const name = elements.playerInput.value.trim();

  if (!name || state.players.some((player) => player.toLowerCase() === name.toLowerCase())) {
    elements.playerInput.value = "";
    return;
  }

  state.players.push(name);
  savePlayers();
  renderPlayers();
  elements.playerInput.value = "";
  elements.playerInput.focus();
}

function removePlayer(name) {
  state.players = state.players.filter((player) => player !== name);
  savePlayers();
  renderPlayers();
}

function resetPlayers() {
  state.players = [];
  savePlayers();
  renderPlayers();
}

function selectGame(gameId, variantId) {
  const game = games.find((item) => item.id === gameId);
  if (game?.requiresPlayers && state.players.length === 0) {
    state.activeGameId = gameId;
    state.activeVariantId = variantId;
    elements.setupTitle.textContent = game.title;
    elements.setupBadge.textContent = "Tarvitsee pelaajat";
    elements.setupHeading.textContent = "Lisää pelaajat ennen pyramidipeliä.";
    elements.setupDescription.textContent =
      "Pyramidipeli jakaa jokaiselle pelaajalle omat kortit, joten lisää vähintään yksi pelaaja valikossa.";
    showScreen("setup");
    elements.waterBreakToggle.closest(".setup-setting").hidden = true;
    elements.beginGameButton.hidden = true;
    return;
  }

  state.activeGameId = gameId;
  state.activeVariantId = variantId;
  const variant = getActiveVariant();
  elements.waterBreakToggle.closest(".setup-setting").hidden = false;
  elements.setupTitle.textContent = variant ? `${game.title}: ${variant.title}` : game.title;
  elements.setupBadge.textContent = variant
    ? `${variant.badge} · ${variant.prompts.length} korttia`
    : getGameMeta(game);
  elements.setupHeading.textContent = game.title;
  elements.setupDescription.textContent = variant?.description || game.description;
  elements.gameTitle.textContent = elements.setupTitle.textContent;
  elements.beginGameButton.hidden = false;
  showScreen("setup");
}

function beginGame() {
  const game = getActiveGame();
  if (!game) return;

  state.sessions[game.id] = createGameSession(game);
  elements.gameTitle.textContent = getActiveTitle();
  showScreen("play");
  renderActiveGame({ firstRender: true });
}

function handlePrimaryPlayAction() {
  const game = getActiveGame();
  if (!game) return;

  if (game.type === "prompt") showPromptCard();
  if (game.type === "kingsCup") drawKingsCupCard();
  if (game.type === "pyramid") revealPyramidCard();
  if (game.type === "dice") rollDice();
}

function renderActiveGame(options = {}) {
  const game = getActiveGame();
  if (!game) return;

  if (game.type === "prompt") {
    showPromptCard({ forcePrompt: options.firstRender });
  }

  if (game.type === "kingsCup") {
    elements.primaryPlayAction.textContent = "Nosta kortti";
    drawKingsCupCard();
  }

  if (game.type === "rideBus") {
    elements.primaryPlayAction.hidden = true;
    renderBus();
  } else {
    elements.primaryPlayAction.hidden = false;
  }

  if (game.type === "pyramid") {
    elements.primaryPlayAction.textContent = "Paljasta seuraava kortti";
    renderPyramid();
  }

  if (game.type === "dice") {
    elements.primaryPlayAction.textContent = "Heitä noppaa";
    renderDice();
  }
}

function showPromptCard(options = {}) {
  const game = getActiveGame();
  const variant = getActiveVariant();
  if (!game || !variant) return;

  elements.primaryPlayAction.textContent = "Seuraava";
  const useWaterBreak =
    state.waterBreaksEnabled && !options.forcePrompt && Math.random() < WATER_BREAK_CHANCE;
  const text = useWaterBreak ? randomItem(waterBreaks) : drawPrompt(game, variant);
  const kicker = useWaterBreak ? "Vesitauko" : `${game.promptLabel} · ${variant.title}`;
  const deckKey = getDeckKey(game.id, variant.id);

  animateCardUpdate(() => {
    elements.promptKicker.textContent = kicker;
    elements.promptText.className = "prompt-text";
    elements.promptText.innerHTML = escapeHtml(text);
    elements.targetPlayer.textContent = getTargetText(game.id, useWaterBreak);
    elements.roundLabel.textContent = `${Math.max(state.round[deckKey], 1)}. kortti`;
  });
}

function drawPrompt(game, variant) {
  const deckKey = getDeckKey(game.id, variant.id);

  if (state.decks[deckKey].length === 0) {
    state.decks[deckKey] = shuffleDeck([...variant.prompts]);
  }

  state.round[deckKey] += 1;
  return state.decks[deckKey].pop();
}

function drawKingsCupCard() {
  const session = getSession();
  if (session.deck.length === 0) {
    session.deck = shuffleDeck(createDeck());
  }

  const card = drawCard(session.deck);
  if (card.value === "K") session.kings += 1;

  animateCardUpdate(() => {
    elements.promptKicker.textContent = `${session.deck.length} korttia jäljellä`;
    elements.promptText.className = `prompt-text playing-card ${card.color}`;
    elements.promptText.innerHTML = card.label;
    elements.targetPlayer.textContent =
      card.value === "K" && session.kings === 4
        ? "Neljäs kuningas. Kierros päättyy, jos niin sovitte."
        : kingsCupRules[card.value];
    elements.roundLabel.textContent = "Nosta kortti";
  });
}

function handleBusChoice(choice) {
  const session = getSession();
  const step = session.steps[session.stepIndex];
  const card = randomCard();
  const previous = session.cards.at(-1);
  const result = evaluateBusChoice(step.id, choice, card, session.cards);
  session.cards.push(card);

  if (result) {
    session.message =
      session.stepIndex === session.steps.length - 1
        ? "Selvisit bussista!"
        : "Oikein. Seuraava vaihe!";
    session.stepIndex += 1;
    session.finished = session.stepIndex >= session.steps.length;
  } else {
    session.message = "Väärin - ota rangaistus.";
    session.stepIndex = 0;
    session.cards = [];
    session.finished = false;
  }

  session.lastCard = card;
  session.previousCard = previous;
  renderBus();
}

function renderBus() {
  const session = getSession();
  const step = session.steps[session.stepIndex] || session.steps.at(-1);
  const cards = session.cards.map(cardMarkup).join("");
  const choices = session.finished
    ? `<button class="mode-button wide" type="button" data-action="begin-game"><span>Uusi kierros</span><small>Aloita bussi alusta</small></button>`
    : step.options
        .map(
          (option) => `
            <button class="choice-button" type="button" data-bus-choice="${option.id}">
              ${option.label}
            </button>
          `,
        )
        .join("");

  animateCardUpdate(() => {
    elements.promptKicker.textContent = session.finished ? "Valmis" : `Vaihe ${session.stepIndex + 1} / 4`;
    elements.promptText.className = "prompt-text custom-game";
    elements.promptText.innerHTML = `
      <span class="game-status">${escapeHtml(session.message || step.title)}</span>
      <span class="bus-step">${escapeHtml(session.finished ? "Selvisit bussista!" : step.title)}</span>
      <span class="card-row">${cards || '<span class="mini-note">Ensimmäinen kortti odottaa.</span>'}</span>
      <span class="choice-grid">${choices}</span>
    `;
    elements.targetPlayer.textContent = session.lastCard ? `Viimeisin kortti: ${session.lastCard.label}` : "";
    elements.roundLabel.textContent = "Bussi";
  });
}

function renderPyramid() {
  const session = getSession();
  const next = getNextPyramidCard(session);
  const revealed = session.revealedCount;
  const total = session.pyramid.flat().length;

  animateCardUpdate(() => {
    elements.promptKicker.textContent = `${revealed} / ${total} paljastettu`;
    elements.promptText.className = "prompt-text custom-game";
    elements.promptText.innerHTML = `
      <span class="pyramid-grid">${renderPyramidRows(session)}</span>
      <span class="player-hands">${renderPlayerHands(session)}</span>
    `;
    elements.targetPlayer.textContent = session.finished
      ? "Pyramidi valmis."
      : session.message
        ? session.message
      : next
        ? `Seuraava rivi: ${next.penalty} rangaistus${next.penalty > 1 ? "ta" : ""}.`
        : "";
    elements.primaryPlayAction.textContent = session.finished ? "Uusi pyramidi" : "Paljasta seuraava kortti";
    elements.roundLabel.textContent = "Pyramidi";
  });
}

function revealPyramidCard() {
  const session = getSession();

  if (session.finished) {
    state.sessions.pyramid = createPyramidSession();
    renderPyramid();
    return;
  }

  const next = getNextPyramidCard(session);
  if (!next) return;

  next.card.revealed = true;
  session.revealedCount += 1;
  const hits = findPyramidHits(session, next.card);
  session.message = hits.length
    ? `${hits.join(", ")} osui! Jaa / ota ${next.penalty} rangaistus${next.penalty > 1 ? "ta" : ""}.`
    : `Ei osumia. Rangaistusmäärä oli ${next.penalty}.`;
  session.finished = session.revealedCount >= session.pyramid.flat().length;
  renderPyramid();
}

function renderDice() {
  const session = getSession();
  const value = session.currentValue || "-";

  animateCardUpdate(() => {
    elements.promptKicker.textContent = session.rolls ? `${session.rolls}. heitto` : "Valmis heittoon";
    elements.promptText.className = "prompt-text custom-game";
    elements.promptText.innerHTML = `
      <span class="dice-face ${session.rolling ? "is-rolling" : ""}">${value}</span>
      <span class="game-status">${escapeHtml(session.message || "Heitä noppaa ja tee tehtävä.")}</span>
      <span class="mini-note">${escapeHtml(session.extra || "")}</span>
    `;
    elements.targetPlayer.textContent = session.target || "";
    elements.roundLabel.textContent = "Noppa";
  });
}

function rollDice() {
  const session = getSession();
  let ticks = 0;
  session.rolling = true;

  const interval = window.setInterval(() => {
    session.currentValue = randomNumber(1, 6);
    renderDice();
    ticks += 1;

    if (ticks >= 8) {
      window.clearInterval(interval);
      const value = randomNumber(1, 6);
      const sameAgain = session.lastValue === value;
      session.currentValue = value;
      session.lastValue = value;
      session.rolls += 1;
      session.rolling = false;
      session.message = diceRules[value];
      session.extra = Math.random() < 0.65 ? randomItem(diceExtras) : "";
      session.target = getDiceTarget();
      if (sameAgain) session.extra = "Sama numero uudestaan. Kaikki ottavat!";
      renderDice();
    }
  }, 70);
}

function createGameSession(game) {
  if (game.type === "kingsCup") return { deck: shuffleDeck(createDeck()), kings: 0 };
  if (game.type === "rideBus") return createBusSession();
  if (game.type === "pyramid") return createPyramidSession();
  if (game.type === "dice") return { currentValue: null, lastValue: null, rolls: 0, message: "", extra: "", target: "" };
  return {};
}

function createBusSession() {
  return {
    stepIndex: 0,
    cards: [],
    lastCard: null,
    message: "",
    finished: false,
    steps: [
      {
        id: "color",
        title: "Punainen vai musta?",
        options: [
          { id: "red", label: "Punainen" },
          { id: "black", label: "Musta" },
        ],
      },
      {
        id: "higherLower",
        title: "Korkeampi vai matalampi?",
        options: [
          { id: "higher", label: "Korkeampi" },
          { id: "lower", label: "Matalampi" },
        ],
      },
      {
        id: "insideOutside",
        title: "Välissä vai ulkona?",
        options: [
          { id: "inside", label: "Välissä" },
          { id: "outside", label: "Ulkona" },
        ],
      },
      {
        id: "suit",
        title: "Valitse maa",
        options: suits.map((suit) => ({ id: suit.id, label: suit.name })),
      },
    ],
  };
}

function createPyramidSession() {
  const deck = shuffleDeck(createDeck());
  const hands = state.players.map((player) => ({
    player,
    cards: [drawCard(deck), drawCard(deck), drawCard(deck), drawCard(deck)],
  }));
  const rowSizes = [4, 3, 2, 1];
  const pyramid = rowSizes.map((size, rowIndex) =>
    Array.from({ length: size }, () => ({
      ...drawCard(deck),
      revealed: false,
      penalty: rowIndex + 1,
    })),
  );

  return { deck, hands, pyramid, revealedCount: 0, finished: false, message: "" };
}

function evaluateBusChoice(stepId, choice, card, cards) {
  if (stepId === "color") return choice === card.color;

  if (stepId === "higherLower") {
    const previous = cards.at(-1);
    if (!previous || valueRank[card.value] === valueRank[previous.value]) return false;
    return choice === "higher"
      ? valueRank[card.value] > valueRank[previous.value]
      : valueRank[card.value] < valueRank[previous.value];
  }

  if (stepId === "insideOutside") {
    const first = valueRank[cards[0].value];
    const second = valueRank[cards[1].value];
    const current = valueRank[card.value];
    const low = Math.min(first, second);
    const high = Math.max(first, second);
    const inside = current > low && current < high;
    return choice === "inside" ? inside : !inside;
  }

  if (stepId === "suit") return choice === card.suit;

  return false;
}

function getNextPyramidCard(session) {
  for (const row of session.pyramid) {
    const card = row.find((item) => !item.revealed);
    if (card) return { card, penalty: card.penalty };
  }
  return null;
}

function findPyramidHits(session, pyramidCard) {
  return session.hands
    .filter((hand) => hand.cards.some((card) => card.value === pyramidCard.value))
    .map((hand) => hand.player);
}

function renderPyramidRows(session) {
  return session.pyramid
    .slice()
    .reverse()
    .map(
      (row) => `
        <span class="pyramid-row">
          ${row
            .map((card) =>
              card.revealed
                ? cardMarkup(card)
                : `<span class="mini-card hidden-card">?</span>`,
            )
            .join("")}
        </span>
      `,
    )
    .join("");
}

function renderPlayerHands(session) {
  return session.hands
    .map(
      (hand) => `
        <span class="hand-row">
          <strong>${escapeHtml(hand.player)}</strong>
          <span>${hand.cards.map(cardMarkup).join("")}</span>
        </span>
      `,
    )
    .join("");
}

function getTargetText(gameId, isWaterBreak) {
  if (isWaterBreak) return "Kaikki mukana.";
  if (gameId !== "most-likely") return "";
  if (state.players.length === 0) return "Kaikki äänestävät.";

  return Math.random() < 0.35
    ? `Kohdepelaaja: ${randomItem(state.players)}`
    : "Kaikki äänestävät.";
}

function getDiceTarget() {
  if (state.players.length === 0 || Math.random() > 0.45) return "";
  const player = randomItem(state.players);
  return Math.random() > 0.5
    ? `${player} valitsee jonkun.`
    : `${player} ottaa seuraavan haasteen.`;
}

function showRules() {
  const game = getActiveGame();
  const variant = getActiveVariant();
  if (!game) return;

  elements.rulesTitle.textContent = variant ? `${game.title}: ${variant.title}` : game.title;
  elements.rulesText.textContent = variant
    ? `${game.rules} Tämä on ${variant.description.toLowerCase()}`
    : game.rules;
  elements.rulesModal.hidden = false;
}

function closeRules() {
  elements.rulesModal.hidden = true;
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[name].classList.add("is-active");
  closeRules();
}

function animateCardUpdate(update) {
  elements.promptCard.classList.remove("is-changing");
  window.requestAnimationFrame(() => {
    update();
    elements.promptCard.classList.add("is-changing");
  });
}

function getActiveGame() {
  return games.find((game) => game.id === state.activeGameId);
}

function getActiveVariant() {
  return getActiveGame()?.variants?.find((variant) => variant.id === state.activeVariantId);
}

function getActiveTitle() {
  const game = getActiveGame();
  const variant = getActiveVariant();
  return variant ? `${game.title}: ${variant.title}` : game?.title || "Peli";
}

function getSession() {
  return state.sessions[state.activeGameId];
}

function getDeckKey(gameId, variantId) {
  return `${gameId}:${variantId}`;
}

function buildPromptDecks() {
  return Object.fromEntries(
    games.flatMap((game) =>
      game.variants
        ? game.variants.map((variant) => [getDeckKey(game.id, variant.id), shuffleDeck([...variant.prompts])])
        : [],
    ),
  );
}

function buildPromptRounds() {
  return Object.fromEntries(
    games.flatMap((game) =>
      game.variants ? game.variants.map((variant) => [getDeckKey(game.id, variant.id), 0]) : [],
    ),
  );
}

function getGameMeta(game) {
  if (game.type === "kingsCup") return "52 korttia";
  if (game.type === "rideBus") return "4 vaihetta";
  if (game.type === "pyramid") return "Pelaajilla";
  if (game.type === "dice") return "1-6 tehtävää";
  return "Pelaa";
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

function shuffleDeck(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function drawCard(deck) {
  return deck.pop();
}

function randomCard() {
  return randomItem(createDeck());
}

function cardMarkup(card) {
  return `<span class="mini-card ${card.color}">${card.label}</span>`;
}

function savePlayers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.players));
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

function readPlayers() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function readWaterBreakPreference() {
  const stored = localStorage.getItem(WATER_BREAK_STORAGE_KEY);

  if (stored === null) return true;

  try {
    return JSON.parse(stored) === true;
  } catch {
    return true;
  }
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}
