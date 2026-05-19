const STORAGE_KEY = "partydeck.players";
const WATER_BREAK_STORAGE_KEY = "partydeck.waterBreaksEnabled";
const WATER_BREAK_CHANCE = 0.12;

const waterBreaks = [
  "Vesitauko. Kaikki ottavat hörpyn vettä.",
  "Pieni hengähdys. Täytä lasi vedellä ennen seuraavaa kierrosta.",
  "Taukokortti. Kysy vieruskaverilta, tarvitseeko hän vettä.",
  "Vesikierros. Hyvä hetki venytellä ja pitää pieni paussi.",
];

const games = [
  {
    id: "never-have-i-ever",
    title: "En ole koskaan",
    description: "Lue väite ääneen. Ne, jotka ovat tehneet sen, ottavat rangaistuksen.",
    promptLabel: "Väite",
    rules: "Yksi pelaaja lukee väitteen ääneen. Kaikki, jotka ovat tehneet asian, ottavat sovitun rangaistuksen. Pitäkää tahti rentona ja skipatkaa mikä tahansa kortti, joka ei tunnu hyvältä.",
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
    promptLabel: "Kysymys",
    rules: "Lukekaa kysymys ääneen. Kaikki osoittavat yhtä pelaajaa tai sanovat nimen yhtä aikaa. Eniten ääniä saanut tekee sovitun rangaistuksen tai kertoo lyhyen selityksen.",
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
];

const state = {
  players: readPlayers(),
  waterBreaksEnabled: readWaterBreakPreference(),
  activeGameId: null,
  activeVariantId: null,
  decks: buildDecks(),
  round: buildRounds(),
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
  const action = event.target.closest("[data-action]")?.dataset.action;

  if (!action) return;

  if (action === "start") showScreen("menu");
  if (action === "back-menu") showScreen("menu");
  if (action === "reset-players") resetPlayers();
  if (action === "begin-game") beginGame();
  if (action === "next-card") showNextCard();
  if (action === "show-rules") showRules();
  if (action === "close-rules") closeRules();
}

function renderGames() {
  elements.gameList.innerHTML = games
    .map(
      (game) => `
        <article class="game-card">
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <div class="variant-actions">
            ${game.variants
              .map(
                (variant) => `
                  <button class="mode-button" type="button" data-game-id="${game.id}" data-variant-id="${variant.id}">
                    <span>${variant.title}</span>
                    <small>${variant.badge} · ${variant.prompts.length} korttia</small>
                  </button>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");

  elements.gameList.querySelectorAll("[data-game-id][data-variant-id]").forEach((button) => {
    button.addEventListener("click", () => startGame(button.dataset.gameId, button.dataset.variantId));
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

function startGame(gameId, variantId) {
  state.activeGameId = gameId;
  state.activeVariantId = variantId;
  const game = getActiveGame();
  const variant = getActiveVariant();
  elements.setupTitle.textContent = `${game.title}: ${variant.title}`;
  elements.setupBadge.textContent = `${variant.badge} · ${variant.prompts.length} korttia`;
  elements.setupHeading.textContent = game.title;
  elements.setupDescription.textContent = variant.description;
  elements.gameTitle.textContent = `${game.title}: ${variant.title}`;
  showScreen("setup");
}

function beginGame() {
  const game = getActiveGame();
  const variant = getActiveVariant();
  if (!game || !variant) return;

  elements.gameTitle.textContent = `${game.title}: ${variant.title}`;
  showScreen("play");
  showNextCard({ forcePrompt: true });
}

function showNextCard(options = {}) {
  const game = getActiveGame();
  const variant = getActiveVariant();
  if (!game) return;

  const useWaterBreak =
    state.waterBreaksEnabled && !options.forcePrompt && Math.random() < WATER_BREAK_CHANCE;
  const text = useWaterBreak ? randomItem(waterBreaks) : drawPrompt(game, variant);
  const kicker = useWaterBreak ? "Vesitauko" : `${game.promptLabel} · ${variant.title}`;

  elements.promptCard.classList.remove("is-changing");
  window.requestAnimationFrame(() => {
    elements.promptKicker.textContent = kicker;
    elements.promptText.textContent = text;
    elements.targetPlayer.textContent = getTargetText(game.id, useWaterBreak);
    elements.roundLabel.textContent = `${Math.max(state.round[getDeckKey(game.id, variant.id)], 1)}. kortti`;
    elements.promptCard.classList.add("is-changing");
  });
}

function drawPrompt(game, variant) {
  const deckKey = getDeckKey(game.id, variant.id);

  if (state.decks[deckKey].length === 0) {
    state.decks[deckKey] = shuffle([...variant.prompts]);
  }

  state.round[deckKey] += 1;
  return state.decks[deckKey].pop();
}

function getTargetText(gameId, isWaterBreak) {
  if (isWaterBreak) return "Kaikki mukana.";
  if (gameId !== "most-likely") return "";
  if (state.players.length === 0) return "Kaikki äänestävät.";

  return Math.random() < 0.35
    ? `Kohdepelaaja: ${randomItem(state.players)}`
    : "Kaikki äänestävät.";
}

function showRules() {
  const game = getActiveGame();
  const variant = getActiveVariant();
  if (!game) return;

  elements.rulesTitle.textContent = `${game.title}: ${variant.title}`;
  elements.rulesText.textContent = `${game.rules} Tämä on ${variant.description.toLowerCase()}`;
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

function getActiveGame() {
  return games.find((game) => game.id === state.activeGameId);
}

function getActiveVariant() {
  return getActiveGame()?.variants.find((variant) => variant.id === state.activeVariantId);
}

function getDeckKey(gameId, variantId) {
  return `${gameId}:${variantId}`;
}

function buildDecks() {
  return Object.fromEntries(
    games.flatMap((game) =>
      game.variants.map((variant) => [getDeckKey(game.id, variant.id), shuffle([...variant.prompts])]),
    ),
  );
}

function buildRounds() {
  return Object.fromEntries(
    games.flatMap((game) => game.variants.map((variant) => [getDeckKey(game.id, variant.id), 0])),
  );
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

function shuffle(items) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
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
