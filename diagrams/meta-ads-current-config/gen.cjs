// meta-ads-konfiguracja — wszystko o Meta Ads na jednej planszy.
// Towarzyszy dokumentowi release-checklist/META_ADS.md (czesc A)
//
//   DRAW_DEPS_ROOT=/d/CODE/COMMERCIAL/winkypie-remote-claude \
//     node "C:/Users/kiere/.claude/skills/draw-excalidraw/make.mjs" \
//     .tmp/diagrams/meta-ads-konfiguracja/gen.cjs
//
// Bez polskich znakow diakrytycznych — Excalifont ich nie ma.

module.exports = ({ Scene, PALETTE, FONT }) => {
  const s = new Scene({ font: FONT.hand, roughness: 1, background: '#ffffff' })

  const GREY = PALETTE.grey.stroke
  const RED = PALETTE.red.stroke
  const GREEN = PALETTE.green.stroke
  const INK = '#1e1e1e'

  function panel(x, y, w, h, title, body, o) {
    o = o || {}
    const box = s.rect(x, y, w, h, {
      accent: o.accent || 'grey',
      fill: o.fill || 'tint',
      strokeWidth: 1,
    })
    const t = s.text(x + 20, y + 14, title, {
      size: o.titleSize || 14,
      color: o.titleColor || (o.accent ? PALETTE[o.accent].stroke : INK),
    })
    s.meta.set(t.id, { inside: box.id })
    const b = s.text(x + 20, y + (o.bodyTop || 44), body, {
      size: o.bodySize || 12,
      font: o.mono ? FONT.code : FONT.hand,
      color: o.bodyColor || '#343a40',
      width: w - 40,
    })
    s.meta.set(b.id, { inside: box.id })
    return box
  }

  /* ══ TYTUL ═══════════════════════════════════════════════════════════ */
  s.text(80, 60, 'WinkyPie — Meta Ads, cala konfiguracja', { size: 34, color: INK })
  s.text(
    80,
    116,
    'brief pod kampanie  ·  stan 22.09.2026  ·  dokument: release-checklist/META_ADS.md (czesc A)  ·  ZERO kampanii do tej pory',
    { size: 14, color: GREY }
  )

  /* ══ 1 · TRZY PANELE ═════════════════════════════════════════════════ */
  s.text(80, 190, '1 · TRZY PANELE METY — kto czym rzadzi', { size: 22, color: INK })
  s.text(80, 224, 'Nic z tego nie siedzi w kodzie. Aplikacja czyta DWIE zmienne: App ID i Client Token.', {
    size: 13,
    color: GREY,
  })

  const z1 = s.zone(80, 285, 740, 400, 'developers.facebook.com  ·  apka', { accent: 'blue' })
  const z1t = s.text(
    110,
    340,
    'apka PROD — 3176823329181593   (tu patrzysz)\n' +
      'apka DEV — 1065204272937904   (test app, olej)\n' +
      '\n' +
      'Settings -> Basic -> iOS:\n' +
      '  Bundle ID — com.notforget.winkypie\n' +
      '  iPhone Store ID — 6757441777 (tylko PROD)\n' +
      '  Shared secret — PUSTY, i ma zostac\n' +
      '  Log in-app events automatically — OFF\n' +
      '     wlaczenie = KAZDY ZAKUP LICZONY DWA RAZY.\n' +
      '     Nie jest bezzebny przy pustym Shared secret.\n' +
      '\n' +
      'Publikacja apki — ZROBIONA 15.09. W nowym UI nie ma\n' +
      'switcha "App Mode": jest pozycja "Publikuj" w lewym menu.\n' +
      '\n' +
      'Android — platforma POMINIETA (iOS only)\n' +
      'App Secret — NIGDY w apce, tylko serwer',
    { size: 12, color: '#343a40', width: 680 }
  )
  s.meta.set(z1t.id, { inside: z1.id })

  const z2 = s.zone(860, 285, 740, 400, 'Events Manager  ·  dataset + pomiar', { accent: 'violet' })
  const z2t = s.text(
    890,
    340,
    'dataset = App ID. Nie da sie go zduplikowac.\n' +
      '\n' +
      'Settings:\n' +
      '  Event Suggestions             OFF\n' +
      '     codeless events skanuja UI apki — odwrotnosc\n' +
      '     naszej allowlisty, a apka przetwarza twarze\n' +
      '  Automatic Advanced Matching   OFF\n' +
      '     (Meta oznacza jako RECOMMENDED) — wysylaloby\n' +
      '     zahaszowane dane osobowe; logowanie jest\n' +
      '     anonimowe, wiec nie ma czego wysylac\n' +
      '  Automatic event logging   Unspecified\n' +
      '  Core setup Off · nic nie zablokowane\n' +
      '  Linking   dopiero przy Conversions API\n' +
      '\n' +
      'Setup tasks for iOS app events -> SKAdNetwork\n' +
      '  (rozpisane w sekcji 3)\n' +
      '\n' +
      'UWAGA: tego bloku NIE widac przez MCP —\n' +
      'to konsola, nie API reklamowe',
    { size: 12, color: '#343a40', width: 680 }
  )
  s.meta.set(z2t.id, { inside: z2.id })

  const z3 = s.zone(1640, 285, 700, 400, 'Business + Ads Manager  ·  pieniadze', { accent: 'teal' })
  const z3t = s.text(
    1670,
    340,
    'portfolio — 1238495527724745\n' +
      'konto reklamowe — 1660505265688574 "WinkyPie"\n' +
      'status — ACTIVE, waluta PLN\n' +
      'min. budzet dzienny — 3,82 PLN\n' +
      'strona FB — 1045571365299146\n' +
      '\n' +
      'has_payment_method: FALSE   <- BLOKADA\n' +
      'kampanie: ZERO, nigdy\n' +
      'NIP w VIES: zweryfikowany\n' +
      '\n' +
      'PULAPKA: ads_get_ad_account_pages zwraca PUSTA\n' +
      'LISTE. To nie blad — zwraca strony, za ktorymi JUZ\n' +
      'poszla reklama. Przypisywania strony do konta nie ma\n' +
      'juz jako osobnego kroku. page_id bierzesz z portfolio.',
    { size: 12, color: '#343a40', width: 640 }
  )
  s.meta.set(z3t.id, { inside: z3.id })

  /* ══ 2 · LEJEK ═══════════════════════════════════════════════════════ */
  s.text(80, 745, '2 · LEJEK — co aplikacja wysyla i KIEDY', { size: 22, color: INK })

  const f1 = s.node(80, 810, 320, 90, 'instalacja', {
    sub: 'install · first_app_launch',
    accent: 'grey',
    fill: 'tint',
  })
  const f2 = s.node(460, 810, 320, 90, 'onboarding krok 1', {
    sub: 'PROMPT ATT — bez zgody NIC',
    accent: 'red',
    bg: PALETTE.red.bg,
  })
  const f3 = s.node(840, 810, 320, 90, 'paywall z onboardingu', {
    sub: 'initiated_checkout · SKAN 30',
    accent: 'blue',
    fill: 'tint',
  })
  const f4 = s.node(1220, 810, 320, 90, 'trial odebrany', {
    sub: 'StartTrial · SKAN 50',
    accent: 'blue',
    fill: 'tint',
  })
  const f5 = s.node(1600, 810, 320, 90, 'pierwsza generacja', {
    sub: 'achievement_unlocked · SKAN 40',
    accent: 'blue',
    fill: 'tint',
  })
  const f6 = s.node(1980, 810, 320, 90, 'zakup', {
    sub: 'fb_mobile_purchase · SKAN 63',
    accent: 'green',
    bg: PALETTE.green.bg,
  })
  s.arrow(f1, f2, { accent: 'grey' })
  s.arrow(f2, f3, { accent: 'grey' })
  s.arrow(f3, f4, { accent: 'grey' })
  s.arrow(f4, f5, { accent: 'grey' })
  s.arrow(f5, f6, { accent: 'grey' })

  panel(
    80,
    950,
    1120,
    280,
    'CO TO ZNACZY PRZY DOBORZE ZDARZENIA OPTYMALIZACJI',
    'Zasada: jedno zdarzenie na krok lejka, zadne nie odpala sie w tej samej\n' +
      'sekundzie co inne. Cztery nasze + trzy z automatu SDK.\n' +
      '\n' +
      'WEJSCIE DO APKI JEST ZABRAMKOWANE PAYWALLEM. Kto go zamknie —\n' +
      'nie zobaczy produktu w ogole. Dlatego initiated_checkout jest bardzo\n' +
      'blisko instalacji w czasie, a nie w polowie lejka.\n' +
      '\n' +
      'TRIAL JEST BEZ KARTY — grant portfelowy po naszej stronie (2 szt / 7 dni),\n' +
      'a NIE intro offer Apple. RevenueCat go nie widzi, wiec StartTrial MUSI isc\n' +
      'z aplikacji. "Trial" w Mecie nie oznacza tu zadnego zobowiazania karty.\n' +
      'Jeden trial na urzadzenie NA ZAWSZE (klucz w Keychain przezywa reinstall).\n' +
      '\n' +
      'Przy budzecie rzedu $50 i zerowej historii konta INSTALACJE sa bezpieczniejsze\n' +
      'niz Purchase — na Purchase nie uzbiera sie prog uczenia.',
    { accent: 'blue', bodySize: 12 }
  )

  panel(
    1260,
    950,
    1080,
    280,
    'CZEGO NIE MA W SYGNALE — nie szukaj',
    'Subscribe  ·  fb_mobile_complete_registration\n' +
      '   USUNIETE Z KODU 15.09 — dublowaly Purchase i nie nosily informacji.\n' +
      '   Jesli widzisz je w danych — to osad historyczny, nie dzisiejsze zachowanie.\n' +
      '\n' +
      'ODNOWIENIA SUBSKRYPCJI\n' +
      '   Wysylamy tylko pierwszy zakup z urzadzenia. Meta nie wie o przedluzeniach,\n' +
      '   wiec LTV liczony po stronie Mety bedzie ZANIZONY.\n' +
      '\n' +
      'ZDARZENIA WEBOWE\n' +
      '   Pixel 925335243787646 istnieje, ale NIGDY nie strzelil. Do kampanii\n' +
      '   app-install nie jest potrzebny.\n' +
      '\n' +
      'Mapowanie budowane POLE PO POLU — propsy aplikacji nigdy nie ida hurtem,\n' +
      'bo ta apka przetwarza twarze. Pilnuje tego test.',
    { accent: 'grey', bodySize: 12 }
  )

  /* ══ 3 · SKAN + ATT ══════════════════════════════════════════════════ */
  s.text(80, 1290, '3 · SKAdNetwork i ATT — ile sygnalu realnie dochodzi', { size: 22, color: INK })

  panel(
    80,
    1350,
    1120,
    300,
    'SKAdNetwork  ·  skonfigurowane 16.09',
    'SKAdNetwork for the Facebook SDK — On\n' +
      'SKAdNetwork 4.0 — On, i nie przelaczaj tam i z powrotem\n' +
      'Sciezka konfiguracji — Custom Integration\n' +
      'Value Optimization — Off, stad "Purchase (No values)"\n' +
      'Apply to all 3 windows — TAK (0-2 / 3-7 / 8-35 dni)\n' +
      '\n' +
      'FINE — liczy sie KOLEJNOSC, nie waga:\n' +
      '   63 Purchase  ·  50 Start trial  ·  40 Unlock achievement\n' +
      '   30 Initiate checkout  ·  10 Activate app\n' +
      '\n' +
      'COARSE:\n' +
      '   high — Purchase\n' +
      '   medium — Start trial + Unlock achievement\n' +
      '   low — Activate app + Initiate checkout\n' +
      '\n' +
      'ZMIANA FINE PO STARCIE KAMPANII = 72 h PAUZY dzialajacych reklam.\n' +
      'Coarse — bezkarnie. Przy malym budzecie i tak dotra TYLKO coarse.',
    { accent: 'violet', mono: true, bodySize: 11.5 }
  )

  panel(
    1260,
    1350,
    1080,
    300,
    'ATT  —  i co z tego wynika dla Twoich liczb',
    'Prompt pojawia sie PO PIERWSZYM EKRANIE ONBOARDINGU, nie na zimnym\n' +
      'splashu. To roznica miedzy normalnym opt-inem a jednocyfrowym.\n' +
      'Pyta RAZ na instalacje. Bez zgody Meta nie dostaje NIC — provider\n' +
      'sprawdza zgode przed kazdym zdarzeniem i jest FAIL-CLOSED.\n' +
      '\n' +
      'KONSEKWENCJA: liczby w Events Managerze to zdarzenia od userow,\n' +
      'ktorzy dali zgode. Reszta lejka jest niewidoczna inaczej niz przez\n' +
      'SKAdNetwork. NIE porownuj wolumenu Mety 1:1 z Amplitude —\n' +
      'Amplitude widzi wszystkich.\n' +
      '\n' +
      'AEM nie ma przelacznika — to KWALIFIKACJA, nie ustawienie.\n' +
      'Dla celu App Promotion wszystkie zdarzenia sa Eligible.\n' +
      '"Outdated Facebook SDK" to znany falszywy alarm (sdk#2607).\n' +
      '"Verify your app\'s deep link" jest Required, ale dotyczy kampanii\n' +
      're-engagement — apka nie ma universal links w ogole.',
    { accent: 'orange', bodySize: 12 }
  )

  /* ══ 4 · DWIE APKI ═══════════════════════════════════════════════════ */
  s.text(80, 1710, '4 · GDZIE PATRZEC NA DANE', { size: 22, color: INK })

  const m1 = s.node(80, 1775, 620, 100, 'WinkyPie  ·  3176823329181593', {
    sub: 'PRODUKCJA — tu optymalizujesz',
    accent: 'red',
    bg: PALETTE.red.bg,
  })
  const m2 = s.node(80, 1905, 620, 100, 'WinkyPie - DEV  ·  1065204272937904', {
    sub: 'dev client + preview — olej',
    accent: 'grey',
    fill: 'tint',
  })
  s.arrow(m1, m2, { accent: 'grey', label: 'rozdzielone 21.09', labelSize: 11 })

  panel(
    760,
    1765,
    760,
    240,
    'CO SIEDZI W PRODUKCYJNYM DATASECIE',
    '50 zdarzen z 15-19.09 to OSAD z dev clienta, sprzed rozdzielenia apek.\n' +
      'Meta NIE pozwala kasowac historii app events.\n' +
      '-> NIE buduj custom audience z okresu sprzed 21.09.\n' +
      '\n' +
      'Reszta to testy z TestFlighta. TESTFLIGHT JEST PRODUKCYJNY I TAK MA BYC —\n' +
      'binarka z profilu production niesie produkcyjny App ID i raportuje tam,\n' +
      'gdzie bedzie raportowac po wydaniu.\n' +
      '\n' +
      'Rozdzielenie apek chroni CODZIENNE KLIKANIE (dev client, preview),\n' +
      'nie testy przedpremierowe.',
    { accent: 'orange', bodySize: 12 }
  )

  panel(
    1580,
    1765,
    760,
    240,
    'DATASET DEV — dlaczego Invalid dataset_id',
    'ads_get_dataset_details("1065204272937904")  ->  Invalid dataset_id\n' +
      '\n' +
      'Apka DEV nie jest podpieta do portfolio biznesowego, wiec jej dataset\n' +
      'nie pojawia sie na liscie zrodel. Zdarzenia SA zbierane — tylko nie ma\n' +
      'ich jak obejrzec przez API.\n' +
      '\n' +
      'CIEBIE TO NIE DOTYCZY. Dane, na ktorych optymalizujesz, sa w datasecie\n' +
      'produkcyjnym. To nie jest usterka do naprawienia przed kampania.',
    { accent: 'grey', bodySize: 12 }
  )

  /* ══ 5 · MCP ═════════════════════════════════════════════════════════ */
  s.text(80, 2065, '5 · MCP "Meta Ads" — sprawdzaj, nie zgaduj', { size: 22, color: INK })
  s.text(80, 2099, 'Serwer jest podpiety do tego konta: is_ads_mcp_enabled = true, is_queryable = true.', {
    size: 13,
    color: GREY,
  })

  panel(
    80,
    2150,
    1120,
    300,
    'ODCZYT — czym potwierdzisz kazdy fakt z tej planszy',
    'ads_get_ad_accounts()\n' +
      '   status konta, waluta, has_payment_method, min_daily_budget_cents\n' +
      '\n' +
      'ads_get_dataset_details(dataset_id: "3176823329181593")\n' +
      '   is_active, last_fired_time, business_id\n' +
      '\n' +
      'ads_get_dataset_stats(dataset_id: "3176823329181593", aggregation: "event")\n' +
      '   wolumeny per zdarzenie. Okno MAX 28 dni, domyslnie 7.\n' +
      '   start_time/end_time jako UNIXOWE SEKUNDY — ISO 8601 NIE dziala.\n' +
      '\n' +
      'ads_get_ad_entities(ad_account_id: "1660505265688574", level: "campaign",\n' +
      '                    date_preset: "maximum")      dzis zwraca []\n' +
      '\n' +
      'ads_get_dataset_quality(...)   jakosc sygnalu, co innego niz wolumen\n' +
      'ads_get_errors(...)            co Meta odrzuca\n' +
      'ads_library_search(...)        cudze reklamy, research kreacji',
    { accent: 'teal', mono: true, bodySize: 11.5 }
  )

  panel(
    1260,
    2150,
    1080,
    300,
    'PULAPKI ODCZYTU — kazda kosztowala czas',
    'CZASY W PANELACH I W API SA W PT.   CEST = PT + 9 h.\n' +
      'Wiecej niz raz wygladalo to na "zdarzenia nie doszly".\n' +
      '\n' +
      '"Test Events" KLAMIE PRZEZ POMINIECIE — nie wyrenderowalo\n' +
      'fb_mobile_purchase, ktore serwer mial u siebie. Rozstrzyga\n' +
      'ads_get_dataset_stats, nie panel.\n' +
      '\n' +
      '"Inactive" przy datasecie znaczy "brak swiezego ruchu",\n' +
      'nie "nie dziala". Panel potrafil pokazac "29 days ago"\n' +
      'tam, gdzie chodzilo o 29 MINUT.\n' +
      '\n' +
      'API bywa NIESPOJNE przy malym wolumenie: last_fired_time\n' +
      'potrafi wrocic do epoch 0, a statystyki pokazac podzbior.\n' +
      'Przy kilkunastu zdarzeniach panel bywa wiarygodniejszy.\n' +
      '\n' +
      'Agregacja splywa z opoznieniem ~1 h.',
    { accent: 'red', titleColor: RED, bodyColor: INK, bodySize: 12 }
  )

  /* ══ 6 · NIEODWRACALNE ═══════════════════════════════════════════════ */
  s.text(80, 2510, '6 · SIEDEM RZECZY NIEODWRACALNYCH', { size: 22, color: INK })
  s.text(80, 2544, 'Tego nie "poprawisz jutro". Kazdy wiersz oznacza nowe konto albo nowa kampanie.', {
    size: 13,
    color: GREY,
  })

  panel(
    80,
    2595,
    2260,
    250,
    'USTAL PRZED, NIE PO',
    '1 · Waluta konta — PLN, JUZ USTAWIONE. Zmiana = tylko nowe konto. Finansowo nie szkodzi;\n' +
      '     szkodzi poznawczo, bo wszystkie benchmarki branzowe sa w $.\n' +
      '2 · Strefa czasowa konta — Europe/Warsaw, JUZ USTAWIONE. Wyznacza granice doby\n' +
      '     raportowej. Przy rynku USA tniesz ich wieczor na pol.\n' +
      '3 · Cel kampanii — zeby zmienic, duplikujesz kampanie.\n' +
      '4 · Atrybucja AEM vs SKAN — wybor przy tworzeniu ZESTAWU REKLAM. Pomylka = kampania od zera.\n' +
      '5 · Zdarzenie optymalizacji — jeden zestaw = jeden, STALY wybor.\n' +
      '6 · Kategoria specjalna — ustawiana na KONCIE, nie na kampanii.\n' +
      '7 · Strona FB w kreacji — page_id OBOWIAZKOWY. Bez Strony doslownie nie stworzysz\n' +
      '     reklamy. U nas 1045571365299146.\n' +
      '\n' +
      'Do tego FINE CONVERSION VALUES (sekcja 3) — zmiana po starcie pauzuje reklamy na 72 h.',
    { accent: 'red', titleColor: RED, bodyColor: INK, mono: true, bodySize: 11.5 }
  )

  /* ══ 7 · CO BLOKUJE ══════════════════════════════════════════════════ */
  s.text(80, 2905, '7 · CO BLOKUJE START I CZEGO NIE MA', { size: 22, color: INK })

  panel(
    80,
    2965,
    1120,
    250,
    'ZOSTALY DWIE RZECZY — obie NIETECHNICZNE',
    '1  METODA PLATNOSCI + LIMIT WYDATKOW NA KONCIE\n' +
      '   has_payment_method: false. NIP juz zweryfikowany w VIES.\n' +
      '   Limit konta to bezpiecznik przed literowka w budzecie.\n' +
      '   adsmanager.facebook.com/ads/manager/billing/?act=1660505265688574\n' +
      '\n' +
      '2  KREACJE — 10 x wideo 9:16, 1080x1920\n' +
      '   Hook w pierwszych 3 s. NAPISY WYPALONE W OBRAZIE (ogromna czesc\n' +
      '   oglada bez dzwieku). Wszystkie w JEDNYM zestawie reklam —\n' +
      '   Meta sama wybierze zwyciezce.\n' +
      '\n' +
      'Czesc techniczna jest skonczona: SDK zweryfikowany end-to-end na\n' +
      'fizycznym iPhonie, SKAN skonfigurowany, App Privacy opublikowane.',
    { accent: 'green', titleColor: GREEN, bodySize: 12 }
  )

  panel(
    1260,
    2965,
    1080,
    250,
    'CZEGO NIE MA — nie szukaj',
    'MMP (AppsFlyer / Adjust) — swiadomie pozniej, przy wydatkach > $5k/mies.\n' +
      'Conversions API — webhook RevenueCat w Convexie ma wszystkie dane, ale\n' +
      '   integracji nie ma. Wymagalby App Secret PO STRONIE SERWERA.\n' +
      'RevenueCat -> Meta — wylaczone celowo: przy dzialajacej sciezce SDK\n' +
      '   liczyloby zakupy podwojnie.\n' +
      'Deep linki / universal links — nie istnieja w aplikacji.\n' +
      'Android — poza zakresem, iOS only.\n' +
      'Pixel webowy w kampanii — istnieje, nigdy nie strzelil, niepotrzebny\n' +
      '   do kampanii app-install.',
    { accent: 'grey', mono: true, bodySize: 11.5 }
  )

/* ── SŁOWNICZEK (doklejony) ───────────────────────────────────────────
   * Zjeżdża gotową scenę w dół i rysuje pasek w zwolnionym miejscu.
   * Próg 150 px omija blok nagłówkowy, a łapie wszystko poniżej.
   */
  const GL_SHIFT = 230
  for (const el of s.elements) if (el.y >= 150) el.y += GL_SHIFT

  s.zone(80, 170, 2260, 160, 'SŁOWNICZEK — każdy skrót użyty na tym rysunku', { accent: 'grey' })
  const GX = 110, GY = 170, COLS = 2, COLW = 1120
  const slownik = [
    ['SDK', 'software development kit — biblioteka Mety wszyta w kod aplikacji; to ona melduje zdarzenia'],
    ['ATT', 'App Tracking Transparency — systemowe okienko zgody na śledzenie w iOS'],
    ['AEM', 'aggregated event measurement — pomiar zagregowany, własny system atrybucji Mety'],
    ['SKAN', 'SKAdNetwork — prywatnościowy system atrybucji Apple, wspólny dla wszystkich sieci reklamowych'],
    ['MMP', 'mobile measurement partner — zewnętrzny mierzalnik atrybucji (AppsFlyer, Adjust). My go nie mamy'],
    ['atrybucja', 'przypisanie instalacji albo zakupu do reklamy, która je wywołała'],
    ['dataset', 'zbiór zdarzeń w Menedżerze zdarzeń Mety — jeden na aplikację'],
    ['postback', 'sygnał, który Apple odsyła sieci reklamowej po instalacji — z opóźnieniem i w formie zagregowanej'],
    ['conversion value', 'liczba 0–63, którą SKAN niesie zamiast szczegółów zdarzenia. Stąd „fine" i „coarse"'],
  ]
  slownik.forEach(([skrot, opis], i) => {
    const x = GX + (i % COLS) * COLW
    const y = GY + 38 + Math.floor(i / COLS) * 24
    s.text(x, y, skrot, { width: 150, size: 12, color: PALETTE.blue.stroke })
    s.text(x + 156, y, opis, { width: COLW - 180, size: 12, color: GREY })
  })

  return s
}

