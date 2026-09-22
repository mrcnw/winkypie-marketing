module.exports = async ({ Scene, PALETTE, FONT }) => {
  const s = new Scene({ font: FONT.hand, roughness: 1 })

  const G = PALETTE.grey.stroke
  const R = PALETTE.red.stroke
  const GR = PALETTE.green.stroke
  const OR = PALETTE.orange.stroke
  const BL = PALETTE.blue.stroke
  const VI = PALETTE.violet.stroke
  const TE = PALETTE.teal.stroke


  const T = (x, y, str, w, size, color) =>
    s.text(x, y, str, { width: w, size: size || 12, color: color || '#1e1e1e' })

  // pudełko z tytułem i treścią — sam liczę wysokość, żeby nic nie wyszło poza ramkę
  const CARD = (x, y, w, accent, label, body, o = {}) => {
    const ls = o.labelSize || 15
    const bs = o.bodySize || 11
    const n = body ? body.split('\n').length : 0
    const bodyTop = 14 + ls * 1.45 + 8
    const h = o.h || Math.round(bodyTop + n * bs * 1.5 + 14)
    const el = s.rect(x, y, w, h, { accent, fill: o.fill || 'tint' })
    s.meta.set(el.id, { zone: true })   // to jest tło pod tekst, nie figura — validate ma je pominąć
    T(x + 18, y + 14, label, w - 36, ls, o.labelColor || PALETTE[accent].stroke)
    if (body) T(x + 18, y + bodyTop, body, w - 36, bs, o.bodyColor)
    return el
  }

  // ZIELONE POLE = nasz wybór + dlaczego
  const PICK = (x, y, w, label, why) =>
    CARD(x, y, w, 'green', label, why, { labelSize: 14, bodySize: 11 })

  /* ═════════════ TYTUŁ ═════════════ */
  s.text(80, 40, 'META ADS — PANEL STEROWANIA', { size: 36 })
  s.text(80, 98, 'Co tu w ogóle można kliknąć, co z tego jest nieodwracalne, i co wybieramy MY', { size: 16, color: G })
  s.text(80, 130, 'WinkyPie · aplikacja iOS · stan na 22.09.2026', { size: 13, color: G })
  s.text(80, 156,
    'ZIELONE POLE = nasz wybór wraz z uzasadnieniem.     [M] = żywa dokumentacja Meta, sprawdzona dziś — fakt.     ' +
    '[B] = badanie z ujawnioną próbką.     [P] = opinia praktyka bez metodologii — kierunek, nie dowód.',
    { size: 12, color: G })

  /* ═════════════ 1 · RODZAJE KAMPANII ═════════════ */
  s.zone(80, 240, 1400, 600, '1 · RODZAJE KAMPANII — sześć celów (ODAX — cele ułożone według wyniku biznesowego)', { accent: 'violet' })
  T(110, 268, 'Cel wybierasz RAZ, przy tworzeniu kampanii. Nie zmienisz go później — żeby zmienić, budujesz kampanię od nowa. [M1]', 1340, 12, R)

  const cele = [
    ['ŚWIADOMOŚĆ  / Awareness', 'zasięg, zapamiętanie reklamy', 'premiera marki, duży budżet, brak pomiaru sprzedaży', 'grey'],
    ['RUCH  / Traffic', 'kliknięcia, wejścia na stronę', 'rozgrzewanie ruchu pod remarketing', 'grey'],
    ['ZAANGAŻOWANIE  / Engagement', 'reakcje, wiadomości, obejrzenia', 'budowa grup z oglądających wideo', 'grey'],
    ['KONTAKTY  / Leads', 'formularz, rozmowa, telefon', 'B2B, usługi, wysoka cena', 'grey'],
    ['APLIKACJA  / App Promotion', 'instalacja albo zdarzenie w apce', 'jedyny cel, który umie kupić instalację', 'green'],
    ['SPRZEDAŻ  / Sales', 'zakup na stronie (piksel + CAPI)', 'e-commerce — u nas: lejek webowy', 'orange'],
  ]
  cele.forEach(([name, opt, when, col], i) => {
    const y = 306 + i * 54
    T(115, y, name, 310, 13, PALETTE[col].stroke)
    T(435, y, opt, 330, 12)
    T(780, y, when, 500, 12, G)
  })

  PICK(115, 640, 620, 'NASZ WYBÓR:  APLIKACJA',
    'Produkt to apka iOS. To jedyna droga, którą Meta\numie sprzedać instalację.')
  CARD(775, 640, 620, 'orange', 'DRUGIE DRZWI:  SPRZEDAŻ',
    'Gdyby darmowy photo-check wyszedł na web przed\npaywall — patrz strefa 7, wiersz „drabina".',
    { labelSize: 14 })
  T(115, 748, 'Cel „Ruch" to najczęstsza pomyłka początkujących: chcesz sprzedaży, wybierasz Ruch, dostajesz klikaczy zamiast kupujących.\n' +
    '„Ruch w sklepie" (Store Traffic) zniknął z listy w ogóle — nie ma zamiennika.', 1340, 12, G)

  /* ═════════════ 2 · TRZY PIĘTRA ═════════════ */
  s.zone(1560, 240, 1300, 600, '2 · TRZY PIĘTRA — który przycisk siedzi gdzie', { accent: 'blue' })

  const kamp = CARD(1590, 268, 1240, 'blue', 'KAMPANIA',
    'ZAMROŻONE:  cel · kategoria specjalna · metoda atrybucji: AEM (pomiar Mety) albo SKAN (pomiar Apple)\n' +
    'WOLNO:  wspólny budżet kampanii — CBO, czyli jedna kwota, którą algorytm sam rozdziela · strategia licytacji · limit wydatku · test A/B',
    { labelSize: 17 })

  const zest = CARD(1590, 384, 1240, 'red', 'ZESTAW REKLAM   (ad set)',
    'ZAMROŻONE:  zdarzenie optymalizacji (w kampanii aplikacyjnej)\n' +
    'RESET NAUKI:  budżet · kraj, język, system · umiejscowienia · strategia licytacji\n' +
    'WOLNO:  harmonogram · nazwa',
    { labelSize: 17 })

  const rekl = CARD(1590, 520, 1240, 'green', 'REKLAMA   (ad)',
    'WOLNO WSZYSTKO:  wideo / obraz · tekst główny · nagłówek · opis · CTA · link\n' +
    'To jedyne piętro, na którym możesz pracować codziennie bez kary.',
    { labelSize: 17 })

  s.arrow(kamp, zest)
  s.arrow(zest, rekl)

  T(1590, 638, 'TU MIESZKA FAZA UCZENIA — liczy się NA ZESTAW, nie na reklamę.', 1240, 13, R)
  T(1590, 664, 'Z tej jednej linijki wynika cała reszta taktyki. Kiedyś dzieliłeś na piętrze ZESTAWU: wiele zestawów = wiele testów.\n' +
    'Dziś dzielisz na piętrze REKLAMY — bo każdy dodatkowy zestaw rozcieńcza te same 50 zdarzeń tygodniowo.', 1240, 12, G)

  PICK(1590, 726, 1240, 'NASZ WYBÓR:  1 kampania  →  1 zestaw  →  6–10 kreacji',
    'Przy $50/dzień każdy dodatkowy zestaw gwarantuje, że żaden nie wyjdzie z fazy uczenia. Meta i tak wymusza jeden zestaw. [M4]')

  /* ═════════════ 3 · NIEODWRACALNE ═════════════ */
  s.zone(2940, 240, 1060, 600, '3 · SIEDEM RZECZY NIEODWRACALNYCH', { accent: 'red' })
  T(2970, 268, 'Tego nie „poprawisz jutro". Każdy wiersz oznacza nowe konto albo nową kampanię.', 1000, 12, R)

  const frozen = [
    ['Waluta konta', 'tylko nowe konto. PLN nie szkodzi finansowo — szkodzi poznawczo: benchmarki są w $'],
    ['Strefa czasowa konta', 'wyznacza granicę doby raportowej. Warszawa + rynek USA = tniesz ich wieczór na pół'],
    ['Cel kampanii', 'żeby zmienić — duplikujesz kampanię'],
    ['Atrybucja AEM vs SKAN', 'wybór przy tworzeniu KAMPANII, przy opcji „iOS 14+ campaign". Pomyłka = od zera [M3]'],
    ['Zdarzenie optymalizacji', '„one ad set with a FIXED optimization choice" [M4]'],
    ['Kategoria specjalna', 'ustawiana na koncie, nie na kampanii'],
    ['Strona FB podpięta w kreacji', 'page_id jest obowiązkowy — bez Strony dosłownie nie stworzysz reklamy'],
  ]
  frozen.forEach(([what, cons], i) => {
    const y = 306 + i * 54
    T(2970, y, what, 260, 13, R)
    T(3240, y, cons, 730, 11, G)
  })

  PICK(2970, 700, 1000, 'ZANIM KLIKNIESZ COKOLWIEK',
    'Waluta USD. Strefa czasowa rynku docelowego. Strona FB + konto IG. Metoda płatności.\nCztery rzeczy, jedna godzina, zero odwrotu.')

  /* ═════════════ 4 · ADVANTAGE+ ═════════════ */
  s.zone(80, 920, 1400, 620, '4 · ADVANTAGE+ — to nie jeden produkt, to rodzina', { accent: 'violet' })

  s.node(110, 948, 660, 48, 'END-TO-END — automatyzują CAŁĄ kampanię', { accent: 'violet', fill: 'tint', size: 13 })
  s.node(800, 948, 650, 48, 'SINGLE-STEP — automatyzują JEDEN element', { accent: 'blue', fill: 'tint', size: 13 })

  T(115, 1014, 'Advantage+ Sales   (dawniej Shopping, w skrócie ASC)\n' +
    'Advantage+ App   (A+AC — Advantage+ App Campaign; dawniej AAA)   ← nasza\n' +
    'Advantage+ Leads', 660, 13)
  T(805, 1014, 'Audience · Placements · Campaign Budget (to jest CBO — wspólny budżet kampanii)\n' +
    'Creative · Detailed Targeting · Lookalike · Catalog Ads', 640, 13)

  CARD(110, 1090, 1340, 'red', 'PRZEŁĄCZNIK „Advantage+ czy ręcznie" NIE ISTNIEJE od 2025-05-29',
    'Status jest WYPROWADZANY z ustawień, nie deklarowany. Zostawisz włączone trzy dźwignie — budżet, odbiorców, umiejscowienia — jesteś w Advantage+.\n' +
    'Dołożysz szczegółowe targetowanie — po cichu wypadasz. To nie jest flaga --advantage-plus. To detekcja typu po kształcie konfiguracji.')

  T(115, 1196, 'OŚ CZASU, przez którą stare poradniki wprowadzają w błąd:', 900, 13, VI)
  const os = [
    ['2025-10-08', 'API v24.0 zakazuje tworzenia nowych kampanii w starej strukturze'],
    ['2026-02-18', 'API v25.0 czyni strukturę Advantage+ OBOWIĄZKOWĄ'],
    ['2026-05-19', 'ASC i A+AC przestają istnieć jako osobne byty — wchodzi jeden wspólny kreator kampanii'],
    ['2026-07-29', 'v26.0 pauzuje resztki starych kampanii i usuwa kolejne umiejscowienia'],
  ]
  os.forEach(([d, w], i) => {
    const y = 1226 + i * 32
    T(115, y, d, 120, 12, VI)
    T(245, y, w, 1180, 12, G)
  })

  CARD(110, 1366, 1340, 'red', 'NA iOS 14.5+ DLA APLIKACJI TO NIE JEST WYBÓR',
    '„meta advantage+ ads: use these ads for ios 14.5 or later. MANUAL SETUP IS NOT SUPPORTED; only advantage+ setup is available." [M4]\n' +
    'Cała publicystyka „Advantage+ czy ręcznie?" opisuje decyzję, której u Was nie ma — nie macie drugiego ramienia do porównania.')

  T(115, 1476, 'Dlatego badanie Hausa (640 eksperymentów, 58% marek miało lepsze realne ROAS na kampaniach ręcznych) — najczęściej cytowany\n' +
    'kontrargument wobec automatyzacji — jest u Was bezprzedmiotowy. Opisuje wybór niedostępny, u reklamodawców 770× większych. [B3]', 1340, 11, G)

  /* ═════════════ 5 · TARGETOWANIE ═════════════ */
  s.zone(1560, 920, 1300, 620, '5 · TARGETOWANIE — trzy klasy wejść', { accent: 'teal' })

  s.node(1590, 948, 400, 48, 'TWARDE KONTROLKI', { accent: 'teal', fill: 'tint', size: 13 })
  s.node(2010, 948, 400, 48, 'SUGESTIE', { accent: 'yellow', fill: 'tint', size: 13 })
  s.node(2430, 948, 400, 48, 'USUNIĘTE', { accent: 'grey', fill: 'tint', size: 13 })

  T(1595, 1010, 'Meta ich NIE przekroczy', 390, 11, G)
  T(2015, 1010, 'Meta MOŻE wyjść poza', 390, 11, G)
  T(2435, 1010, 'nie ma ich już w interfejsie', 390, 11, G)

  T(1595, 1040, 'lokalizacja / kraj\njęzyk\nminimalny wiek\nwykluczenia\nkategoria specjalna', 390, 13)
  T(2015, 1040, 'wiek i płeć\nszczegółowe targetowanie\ngrupy niestandardowe\ngrupy podobnych (lookalike)', 390, 13)
  T(2435, 1040, 'większość zainteresowań\n\n15.01.2026 zestawy zawierające\nwycofane zainteresowania\nPRZESTAŁY SIĘ WYŚWIETLAĆ', 390, 13)

  CARD(1590, 1152, 1240, 'red', 'W KAMPANII APLIKACYJNEJ ZOSTAJĄ DOKŁADNIE TRZY',
    'system operacyjny  ·  kraje  ·  język        — „the only targeting options available" [M5]\n' +
    'NIE MA: płci · wieku (auto 18+) · zainteresowań · zachowań · lookalike · grup niestandardowych · wykluczeń · wyboru urządzenia · wyboru umiejscowień.\n' +
    'Dodatkowo automatyczne okno wykluczenia 90 dni: kto zainstalował aplikację w ciągu 90 dni, reklamy nie zobaczy. [M5]')

  T(1590, 1288, 'Persona z repo — „mężczyźni 22–38, iOS, aktywni na Hinge/Tinder/Bumble" — jest NIEMOŻLIWA do zaimplementowania jako targetowanie.\n' +
    'Przeżywa wyłącznie jako brief kreatywny: kto jest w kadrze, ten się zgłosi. Casting jest Twoim targetowaniem.', 1240, 12, R)

  PICK(1590, 1346, 1240, 'NASZ WYBÓR:  jeden kraj  ·  język angielski  ·  iOS',
    'Kraj to jedna z trzech dźwigni, jakie zostały. Przy $50/dzień rozsypanie po rynkach o różnym CPM to najszybszy sposób, żeby nie nauczyć się niczego.')

  T(1590, 1452, 'Retargeting to jedyne miejsce w całym Meta Ads, gdzie ręczne targetowanie nadal zdecydowanie wygrywa — i jedyne,\n' +
    'którego w kampanii aplikacyjnej nie ma. To kolejny argument za lejkiem webowym: tam retargeting wraca.', 1240, 11, G)

  /* ═════════════ 6 · BUDŻET I LICYTACJA ═════════════ */
  s.zone(2940, 920, 1060, 620, '6 · BUDŻET I LICYTACJA — przyciski i ich NOWE nazwy', { accent: 'orange' })

  T(2970, 948, 'GDZIE WPISUJESZ KWOTĘ', 1000, 13, OR)
  T(2970, 976, 'CBO — campaign budget optimization, po polsku wspólny budżet kampanii: jedna kwota na kampanii,\n' +
    '      a algorytm rozdziela ją między zestawy w czasie rzeczywistym.\n' +
    '      Dla celów Sprzedaż / Kontakty / Aplikacja jest WŁĄCZONY DOMYŚLNIE. [M6]\n' +
    'ABO — ad set budget optimization, po polsku budżet na zestawie: osobna koperta na każdy zestaw,\n' +
    '      a algorytm nie ma prawa przesuwać między nimi.\n' +
    'Ad set budget sharing — do 20% dziennego budżetu wędruje między zestawami.', 1000, 12)

  T(2970, 1076, 'STRATEGIE LICYTACJI — Meta je przemianowała, poradniki jeszcze nie nadążyły [M7]', 1000, 13, OR)
  T(2970, 1106, 'stara nazwa', 190, 11, G)
  T(3170, 1106, 'nowa nazwa', 300, 11, G)
  T(3480, 1106, 'co robi', 490, 11, G)

  const bid = [
    ['Lowest Cost', 'HIGHEST VOLUME', 'maksimum wyników za Twój budżet', 'green'],
    ['Cost Cap', 'COST PER RESULT GOAL', 'trzyma ŚREDNI koszt wyniku; chce 50–100 konwersji/tydz. [M7]', 'grey'],
    ['Minimum ROAS', 'ROAS GOAL', 'pilnuje minimalnego zwrotu z wydatku', 'grey'],
    ['Bid Cap', 'BID CAP  (bez zmian)', 'sufit na pojedynczą stawkę w aukcji', 'grey'],
    ['Highest Value', 'HIGHEST VALUE  (bez zmian)', 'maksimum wartości zakupów', 'grey'],
  ]
  bid.forEach(([o, n, w, col], i) => {
    const y = 1134 + i * 32
    T(2970, y, o, 190, 12, G)
    T(3170, y, n, 300, 13, PALETTE[col].stroke)
    T(3480, y, w, 490, 11, G)
  })

  PICK(2970, 1306, 1000, 'NASZ WYBÓR:  HIGHEST VOLUME, bez bid capa',
    'Meta o kampaniach aplikacyjnych, dosłownie: „we suggest selecting the lowest cost bid\ntype and NOT adding a bid cap for best results". [M8]')

  T(2970, 1412, 'Na czym POLEGA różnica CBO vs ABO — rysunek z przepływem pieniędzy w strefie 13 A, lewa połowa.\n' +
    'Was ta debata nie dotyczy: kampania Advantage+ App ma z definicji JEDEN zestaw, nie ma między czym przesuwać.\n' +
    'UWAGA: zmiana strategii licytacji resetuje kalibrację. Nie klikaj w to „żeby sprawdzić".', 1000, 12, G)

  /* ═════════════ 7 · ZDARZENIE OPTYMALIZACJI ═════════════ */
  s.zone(80, 1620, 1800, 700, '7 · ZDARZENIE OPTYMALIZACJI — najważniejszy przycisk w całym panelu', { accent: 'red' })

  T(110, 1648, 'W kampanii aplikacyjnej masz do wyboru cztery cele wydajności [M8]:', 1740, 13, R)
  const goals = [
    ['Maksimum INSTALACJI', 'mierzysz:  koszt instalacji', 'najczęstsze zdarzenie, jakie masz', 'green'],
    ['Maksimum KLIKNIĘĆ w link', 'mierzysz:  koszt kliknięcia', 'tu Meta spada po cichu, gdy brak SDK', 'grey'],
    ['Maksimum ZDARZEŃ w apce (AEO)', 'mierzysz:  koszt zdarzenia', 'trial, zakup, akcja rdzeniowa', 'grey'],
    ['Maksimum WARTOŚCI konwersji', 'mierzysz:  zwrot z wydatku', 'jedyny typ licytacji: lowest cost', 'grey'],
  ]
  goals.forEach(([n, k, w, col], i) => {
    const y = 1678 + i * 32
    T(110, y, n, 380, 13, PALETTE[col].stroke)
    T(500, y, k, 320, 12)
    T(830, y, w, 540, 11, G)
  })

  CARD(110, 1818, 880, 'red', 'ILE MUSISZ WYDAWAĆ DZIENNIE NA REKLAMĘ  =  koszt jednego zdarzenia × 50 ÷ 7',
    '~50 zdarzeń NA TYDZIEŃ — nie dziennie. Liczone NA ZESTAW REKLAM, od ostatniej istotnej edycji. [M9]\n' +
    'Wyprowadzenie wzoru krok po kroku → strefa 13 B, prawa połowa.',
    { labelSize: 17, bodyColor: G })

  T(110, 1940, 'zdarzenie', 300, 11, G)
  T(420, 1940, 'koszt ~', 150, 11, G)
  T(580, 1940, 'ile wydawać dziennie', 200, 11, G)
  T(800, 1940, 'czy $50/dzień wystarcza?', 300, 11, G)
  const arith = [
    ['instalacja, rynek tańszy', '$1,85', '$13 / dzień', 'TAK, z zapasem', 'green'],
    ['instalacja, USA', '$2,00–5,50', '$14–39 / dzień', 'TAK, ale bez zapasu', 'yellow'],
    ['start triala', '$16–28', '$114–200 / dzień', 'NIE', 'red'],
    ['zakup / subskrypcja', '$50–110', '$357–785 / dzień', 'NIE, strukturalnie', 'red'],
  ]
  arith.forEach(([e, c, f, ok, col], i) => {
    const y = 1968 + i * 32
    T(110, y, e, 300, 12)
    T(420, y, c, 150, 12)
    T(580, y, f, 210, 13, PALETTE[col].stroke)
    T(800, y, ok, 300, 12, PALETTE[col].stroke)
  })

  T(110, 2096, 'ŁAŃCUCH, KTÓRY DECYDUJE ZA CIEBIE:\n' +
    'rzadsze zdarzenie  →  drożej kosztuje jedno  →  tym więcej musisz wydawać dziennie  →  nie zbierasz 50 sztuk  →\n' +
    'utykasz w Learning Limited na stałe  →  wydałeś pieniądze i nie nauczyłeś się NICZEGO.', 940, 12, R)

  T(110, 2188, 'Bez Facebook SDK (biblioteki Mety wszytej w kod apki) w wersji 8.0+ kampania NIE PRZESTAJE DZIAŁAĆ — po cichu optymalizuje na kliknięcia w link zamiast na instalacje.\n' +
    'To najbardziej podstępna awaria w całym panelu: wszystko wygląda dobrze, a kupujesz coś zupełnie innego, niż myślisz.', 1740, 12, R)

  T(1120, 1818, 'DRABINA ZDARZEŃ — i kiedy wolno wejść wyżej', 730, 13, BL)
  const ladder = [
    ['1.  INSTALACJA', 'tu zaczynasz zawsze'],
    ['2.  rejestracja / koniec onboardingu', 'gdy masz 50+ tygodniowo'],
    ['3.  pierwsza akcja rdzeniowa', 'gdy masz 50+ tygodniowo'],
    ['4.  zakup / subskrypcja', 'najczystszy sygnał, najdroższy wstęp'],
  ]
  ladder.forEach(([n, w], i) => {
    const y = 1852 + i * 36
    T(1120, y, n, 400, 13, i === 0 ? GR : G)
    T(1530, y, w, 320, 11, G)
  })
  T(1120, 2004, 'W górę przesuwasz się DOPIERO wtedy, gdy wolumen na to pozwala.\n' +
    'Odwrotna kolejność — „od razu optymalizuję na zakup" — to najdroższy\n' +
    'błąd początkującego. Nie jest za drogi: jest arytmetycznie niemożliwy.', 730, 12, G)

  PICK(1120, 2080, 730, 'NASZ WYBÓR:  INSTALACJA',
    'Meta sama podaje „choose an optimization event that occurs\nmore frequently" jako lek na Learning Limited. [M9]')

  /* ═════════════ 8 · POMIAR ═════════════ */
  s.zone(1940, 1620, 920, 700, '8 · POMIAR — wybór, którego nie cofniesz', { accent: 'blue' })

  s.node(2150, 1648, 340, 44, 'AEM  (Meta)', { accent: 'green', fill: 'tint', size: 14 })
  s.node(2500, 1648, 330, 44, 'SKAN  (Apple)', { accent: 'grey', fill: 'tint', size: 14 })

  const meas = [
    ['szybkość', 'blisko czasu rzeczywistego', 'min. 24 h opóźnienia'],
    ['rozbicia', 'wiek, płeć, kraj, urządzenie,\nplatforma, umiejscowienie', 'brak'],
    ['kolumna „wyniki"', 'JEST', 'NIE MA — tylko zasięg,\nwyświetlenia, kliknięcia, wydatek [M5]'],
    ['raport per kreacja', 'JEST', 'NIE MA'],
    ['liczby tej DRUGIEJ\nmetody obok', 'TAK — „compare attribution settings"\npokazuje SKAN side-by-side [M10]', 'NIE — SKAN nie pokaże Ci AEM'],
    ['okno atrybucji', 'instalacje: 1 / 7 / 28 dni kliknięcia\nzdarzenia po instalacji: 1 / 7 dni [M10]', 'instalacja w ciągu 30 dni\nod kliknięcia'],
    ['zasięg pomiaru', 'tylko Meta', 'wszystkie sieci reklamowe'],
  ]
  meas.forEach(([label, a, b], i) => {
    const y = 1702 + i * 46
    T(1970, y, label, 170, 11, G)
    T(2150, y, a, 340, 12, GR)
    T(2500, y, b, 330, 12, G)
  })

  T(1970, 2058, 'SKAN NIE RAPORTUJE KOLUMNY „WYNIKI". Skoro cała robota pierwszej rundy to iteracja kreacji —\n' +
    'SKAN strukturalnie ją uniemożliwia. Nie „utrudnia". Uniemożliwia.', 860, 11, R)

  CARD(1970, 2106, 860, 'grey', 'CO MAMY DZIŚ — 22.09.2026',
    'SKAN: skonfigurowany ręcznie 16.09 — SKAN 4.0, fine 63/50/40/30/10, coarse high/medium/low. Zamrozi się po starcie kampanii.\n' +
    'AEM: kwalifikowany — nie ma przełącznika. Wszystkie zdarzenia „Eligible" dla celu App Promotion.\n' +
    'KAMPANII ZERO, brak metody płatności → wybór jeszcze nie zapadł. Zapadnie przy pierwszej kampanii.',
    { labelSize: 13 })

  PICK(1970, 2204, 860, 'NASZ WYBÓR:  AEM',
    'Runda 1 kupuje trzy liczby: realny CPI, install→trial, trial→paid. Bez rozbić per kreacja nie kupisz żadnej.\n' +
    'Nie tracisz przy tym pracy z 16.09: schemat SKAN zostaje ważny, a jego liczby widzisz obok. Odwrotnie to nie działa.')

  /* ═════════════ 9 · NASZA WYSEPKA ═════════════ */
  s.zone(2940, 1620, 1060, 700, '9 · NASZA WYSEPKA — ile z tej mapy Was dotyczy', { accent: 'grey' })

  const swiat = CARD(2970, 1648, 1000, 'grey', 'CAŁY ŚWIAT META ADS',
    '6 celów · 4 typy odbiorców · 5 strategii licytacji · budżet wspólny albo osobny · lejek góra/środek/dół\n' +
    'retargeting · lookalike · wybór umiejscowień · formalne testy A/B')

  const wyspa = CARD(2970, 1800, 1000, 'green', 'WASZA WYSEPKA',
    '1 cel:  Aplikacja\n' +
    '1 typ kampanii:  Advantage+ App  (ręczne NIE ISTNIEJE)\n' +
    '1 zestaw reklam na kampanię  →  wspólny budżet (CBO) czy osobne (ABO): pytanie bez treści\n' +
    '3 dźwignie targetowania:  system, kraj, język\n' +
    '1 strategia licytacji:  Highest Volume\n' +
    'do 24 kampanii na aplikację [M4]\n' +
    'do 50 zasobów, 5 tekstów, 5 nagłówków w zestawie [M11]\n' +
    'ZOSTAJE KREACJA — jako jedyna dźwignia, jaką realnie macie.',
    { labelSize: 16, bodySize: 12 })

  s.arrow(swiat, wyspa, { label: 'zostaje z tego' })

  T(2970, 2010, '„Kreacja jest targetowaniem" jest u Was DOSŁOWNIE prawdziwe — ale nie dlatego,\n' +
    'że AI ogląda Wasze wideo. Dlatego, że odebrano Wam wszystkie inne dźwignie.', 1000, 12, R)

  T(2970, 2066, 'Mechanizm, który naprawdę za tym stoi: Meta puszcza reklamę szeroko, patrzy KTO\n' +
    'zareagował, i dosypuje budżet tam, gdzie coś drgnęło. Kreacja jest przynętą,\n' +
    'algorytm jest siecią. Nie „czyta" filmu — obserwuje, kto się zatrzymał.', 1000, 12, G)

  T(2970, 2140, 'Praktyczna różnica: nie próbuj „opisać grupy w kreacji". Projektuj reklamę tak, żeby\n' +
    'właściwi ludzie KLIKALI, a niewłaściwi PRZEWIJALI. Wąski hook = droższy klik, ale\n' +
    'czystszy sygnał. Szeroki hook = tania i zupełnie bezużyteczna publiczność.', 1000, 12, BL)

  T(2970, 2222, 'Od połowy 2026 Meta zaczęła używać modeli językowych także do rozumienia treści\n' +
    'reklamy — ale to warstwa dodana na behawioralnym rdzeniu, nie zamiennik. [B4]', 1000, 11, G)

  /* ═════════════ 10 · KROKI ═════════════ */
  s.zone(80, 2400, 3920, 365, '10 · KROKI — co klikasz, kiedy, i czego NIE ruszasz', { accent: 'green' })

  const kroki = [
    [110, 'T-0   PRZED PIERWSZĄ ZŁOTÓWKĄ', 'red',
      '— Strona FB + konto IG. page_id jest obowiązkowy\n   w KAŻDEJ kreacji — bez tego nie stworzysz reklamy\n' +
      '— metoda płatności, waluta USD, strefa czasowa rynku\n' +
      '— SDK v8.0+, rejestracja aplikacji, AEM w Events Managerze\n' +
      '— 10–20 kreacji GOTOWYCH. Dorzucenie później resetuje naukę\n' +
      '— decyzja: JEDEN kraj'],
    [760, 'T+1   START', 'orange',
      '— 1 kampania · 1 zestaw · 6–10 kreacji\n' +
      '— cel: Aplikacja · zdarzenie: instalacja\n' +
      '— Highest Volume, bez bid capa · atrybucja AEM\n' +
      '— $50/dzień przez 7 dni (~$350)\n\n' +
      'NIE DOTYKASZ NICZEGO PRZEZ 7 DNI.\nJedyny wyjątek: zero instalacji w 24 h — zabij.'],
    [1410, 'T+2   PIERWSZY ODCZYT', 'yellow',
      '— czytasz: CPM, hook rate, CTR, realny CPI\n' +
      '— porównujesz z tablicą diagnostyczną poniżej\n' +
      '— wymieniasz KREACJE, nie ustawienia\n' +
      '— Meta zaleca odświeżanie kreacji 2–4 razy\n   w miesiącu [M11]\n\n' +
      'To pierwszy moment, w którym wolno Ci cokolwiek\nzmienić — i zmieniasz wyłącznie reklamy.'],
    [2060, 'T+3–4   KADENCJA', 'teal',
      '— 3–5 nowych reklam tygodniowo\n' +
      '   (mediana mikro-konta 2,80; top 25%: 4,83 [B1])\n' +
      '— jedna zmienna na raz: ten sam body i CTA,\n   zmienia się TYLKO pierwsze 1,5 sekundy\n' +
      '— ~4 wykonania na kąt kreatywny\n\n' +
      'Pięć briefów to dobra liczba KĄTÓW\ni zła liczba REKLAM.'],
    [2710, 'T+5–6   PIERWSZY ZWYCIĘZCA', 'blue',
      '— trafialność ~5%: 20 wypuszczonych reklam\n   ≈ 1 zwycięzca [B1]\n' +
      '— zwycięzcę kopiujesz „hard duplicate" (twardą kopią) do kampanii\n   skalującej — zachowuje polubienia i komentarze,\n   czyli dowód społeczny, który sam podnosi CTR\n\n' +
      'Motion: „Top-performing accounts aren\'t smarter —\nthey\'re just shipping way more ads."'],
    [3360, 'T+7–8   SKALOWANIE', 'green',
      '— +10–20% budżetu DZIENNIE, nie więcej [P1]\n' +
      '— po każdej zmianie czekasz 72 h przed oceną\n   (modelowane konwersje dochodzą z opóźnieniem)\n' +
      '— dopiero TERAZ rozważasz przesunięcie zdarzenia\n   w górę drabiny\n\n' +
      'Podwojenie budżetu z dnia na dzień: +80–120% CPA\ni 5–7 dni powrotu do normy. [P1]'],
  ]
  kroki.forEach(([x, title, col, body]) => {
    s.node(x, 2428, 610, 46, title, { accent: col, fill: 'tint', size: 13 })
    T(x + 5, 2492, body, 600, 11)
  })

  T(110, 2692, 'Przez pierwsze dwa tygodnie Twoją pracą NIE jest optymalizowanie kampanii. Twoją pracą jest produkcja kreacji i powstrzymanie się od klikania.\n' +
    'To brzmi jak bierność, a jest jedyną taktyką, która przy tym budżecie działa: każda „optymalizacja" w fazie uczenia kasuje tydzień, za który zapłaciłeś.',
    3860, 13, R)

  /* ═════════════ 11 · TABLICA DIAGNOSTYCZNA ═════════════ */
  s.zone(80, 2870, 2400, 790, '11 · TABLICA DIAGNOSTYCZNA — liczba sama w sobie nic nie znaczy', { accent: 'violet' })

  s.node(110, 2898, 620, 44, 'CO WIDZISZ', { accent: 'violet', fill: 'tint', size: 13 })
  s.node(750, 2898, 700, 44, 'CO TO ZNACZY', { accent: 'violet', fill: 'tint', size: 13 })
  s.node(1470, 2898, 980, 44, 'CO ROBISZ', { accent: 'violet', fill: 'tint', size: 13 })

  const diag = [
    ['CPM — koszt 1000 wyświetleń —\npowyżej $30 (USA)', 'drogi rynek albo wyczerpana publiczność.\nBenchmarki 2026: USA ~$20,5 · UK ~$10,9\nKanada ~$14,0 · Australia ~$11,0 [B2]',
      'NIC — sam CPM nie jest werdyktem. Patrz na CPI.\nWysoki CPM przy dobrym CPI znaczy, że kupujesz drożej,\nale właściwych ludzi.', 'grey'],
    ['CPM niski, a konwersji zero', 'kupujesz tanią i bezużyteczną uwagę —\nhook jest za szeroki', 'Zwęź obietnicę w pierwszych 1,5 s. Hook ma ODSIAĆ,\nnie przyciągnąć wszystkich.', 'orange'],
    ['hook rate — ile % obejrzało\npierwsze ~3 sekundy — poniżej 15%', 'otwarcie nie zatrzymuje kciuka [P2]', 'Wymień OTWARCIE, nie stawkę. To naprawa kreatywna,\nnie budżetowa.', 'red'],
    ['hook rate 25–35%', 'zdrowy zakres [P2]', 'Zostaw. Testuj warianty tego samego otwarcia.', 'green'],
    ['hook rate 35%+, ale CTR\n(odsetek klikających) poniżej 1%', 'otwarcie działa, OFERTA nie [P2]', 'Przepisz środek i CTA. Nie ruszaj pierwszych sekund —\nte akurat wygrywają.', 'orange'],
    ['„Learning Limited"', 'nie zbierzesz ~50 zdarzeń w 7 dni [M9]', 'W kolejności podanej przez Metę: połącz zestawy → poszerz\nodbiorców → podnieś budżet → wybierz CZĘSTSZE zdarzenie.', 'red'],
    ['częstotliwość 7-dniowa > 2,5\n(tyle razy ta sama osoba\nwidziała reklamę)', 'publiczność się wyczerpała [P1]', 'Nowe kreacje albo szerszy kraj. Podnoszenie budżetu tylko\npogłębi zmęczenie.', 'orange'],
    ['zero instalacji w pierwsze 24 h', 'nic nie drgnęło', 'Zabij. To JEDYNY wyjątek od zasady „nie dotykaj w fazie\nuczenia".', 'red'],
  ]
  diag.forEach(([a, b, c, col], i) => {
    const y = 2962 + i * 78
    T(115, y, a, 620, 13, PALETTE[col].stroke)
    T(755, y, b, 700, 11, G)
    T(1475, y, c, 970, 11)
  })

  T(115, 3596, 'Wiersze oznaczone [P] to progi praktyków bez ujawnionej metodologii — orientacja, nie dowód. Twój własny pierwszy tydzień jest lepszym\n' +
    'benchmarkiem niż każda z tych liczb. Dlatego runda 1 nie próbuje być rentowna: ona kupuje Twoje własne liczby w miejsce cudzych.', 2340, 12, R)

  /* ═════════════ 12 · RESET FAZY UCZENIA ═════════════ */
  s.zone(2560, 2870, 1440, 790, '12 · CO RESETUJE FAZĘ UCZENIA — i ile to kosztuje', { accent: 'red' })

  s.node(2590, 2898, 660, 44, 'RESETUJE', { accent: 'red', fill: 'tint', size: 13 })
  s.node(3270, 2898, 700, 44, 'NIE RESETUJE', { accent: 'green', fill: 'tint', size: 13 })

  T(2595, 2962, 'zmiana budżetu (zwłaszcza powyżej 20%)\n\n' +
    'zmiana kraju, języka, systemu\n\n' +
    'zmiana zdarzenia optymalizacji\n\n' +
    'zmiana strategii licytacji\n\n' +
    'dodanie albo podmiana kreacji w zestawie\n\n' +
    'wyłączenie i ponowne włączenie zestawu', 650, 13, R)

  T(3275, 2962, 'zmiana nazwy kampanii lub zestawu\n\n' +
    'zmiana harmonogramu w tych samych granicach\n\n' +
    'dodanie kolumn w raporcie\n\n' +
    'oglądanie wyników sto razy dziennie\n' +
    '      (męczy Ciebie, nie algorytm)', 690, 13, GR)

  T(3275, 3130, 'Rozróżnienie brzmi drobiazgowo, dopóki nie stracisz\n' +
    'miesiąca danych przez jedno kliknięcie „sprawdzę tylko,\n' +
    'czy da się podnieść budżet".', 690, 11, G)

  CARD(2590, 3216, 1380, 'orange', 'ILE KOSZTUJE JEDEN RESET',
    'Umiarkowana zmiana:  +35–60% CPA (kosztu jednego wyniku) na 48–72 h.     Podwojenie budżetu z dnia na dzień:  +80–120% CPA i 5–7 dni powrotu. [P1]\n' +
    'Meta, dosłownie: „making changes while the campaign is in the learning phase is not recommended." [M8]',
    { labelSize: 14, bodySize: 12 })

  CARD(2590, 3346, 1380, 'ink', 'ZŁOTA ZASADA',
    'Nie klikaj, żeby sprawdzić.\n' +
    'Każde kliknięcie w ustawienia kasuje tydzień nauki, za który już zapłaciłeś.\n' +
    'Jedyne piętro, na którym wolno Ci pracować codziennie, to REKLAMA.',
    { labelSize: 20, bodySize: 14 })

  T(2590, 3546, 'Dlatego kolejność jest taka, a nie inna: najpierw przygotowujesz WSZYSTKO (strefa 10, kolumna T-0), potem startujesz raz\n' +
    'i trzymasz ręce z dala. Kampania, którą „dopieszczasz" codziennie, nigdy nie wychodzi z fazy uczenia — i nigdy nie dowiesz się,\n' +
    'czy Twoja kreacja była dobra, czy zła. Zapłaciłeś za eksperyment, który sam popsułeś.', 1380, 12, G)

  /* ═════════════ 13 · DWA NIEPOROZUMIENIA ═════════════ */
  s.zone(80, 3740, 3920, 400, '13 · DWA NIEPOROZUMIENIA, KTÓRE WARTO DOMKNĄĆ', { accent: 'teal' })

  /* ── A · CBO vs ABO ── */
  T(110, 3768, 'A ·  CBO czy ABO — czyli gdzie wpisujesz kwotę: RAZ na kampanii, czy OSOBNO na każdym zestawie', 1850, 14, TE)

  s.node(110, 3796, 900, 38, 'CBO  (campaign budget optimization)  —  jedna kwota na KAMPANII', { accent: 'blue', fill: 'tint', size: 12 })
  s.node(1060, 3796, 900, 38, 'ABO  (ad set budget optimization)  —  osobna kwota na KAŻDYM zestawie', { accent: 'orange', fill: 'tint', size: 12 })

  const cboK = s.node(425, 3850, 270, 40, '$50 / dzień', { accent: 'blue', fill: 'tint', size: 13 })
  const cboA = s.node(130, 3934, 270, 36, 'zestaw A  ·  $38', { accent: 'green', fill: 'tint', size: 12 })
  const cboB = s.node(425, 3934, 270, 36, 'zestaw B  ·  $9', { accent: 'yellow', fill: 'tint', size: 12 })
  const cboC = s.node(720, 3934, 270, 36, 'zestaw C  ·  $3', { accent: 'grey', fill: 'tint', size: 12 })
  s.arrow(cboK, cboA)
  s.arrow(cboK, cboB)
  s.arrow(cboK, cboC)

  const aboK = s.node(1375, 3850, 270, 40, 'kampania: BEZ kwoty', { accent: 'grey', fill: 'tint', size: 13 })
  const aboA = s.node(1080, 3934, 270, 36, 'zestaw A  ·  $17', { accent: 'orange', fill: 'tint', size: 12 })
  const aboB = s.node(1375, 3934, 270, 36, 'zestaw B  ·  $17', { accent: 'orange', fill: 'tint', size: 12 })
  const aboC = s.node(1670, 3934, 270, 36, 'zestaw C  ·  $16', { accent: 'orange', fill: 'tint', size: 12 })
  s.arrow(aboK, aboA, { dashed: true })
  s.arrow(aboK, aboB, { dashed: true })
  s.arrow(aboK, aboC, { dashed: true })

  T(130, 3984, 'Algorytm przesuwa pieniądze między zestawami W CZASIE RZECZYWISTYM.\n' +
    'ZALETA: nie przepalasz na przegrywającym zestawie.\n' +
    'WADA: słaby zestaw dostaje zero i nigdy się o nim niczego nie dowiesz.\n' +
    'Wyniki czytasz na poziomie KAMPANII, nie zestawu.', 860, 11, G)

  T(1080, 3984, 'Każdy zestaw dostaje swoje. Algorytm NIE MA PRAWA przesuwać.\n' +
    'ZALETA: czysty odczyt — każdy ma szansę wyjść z fazy uczenia.\n' +
    'WADA: płacisz za przegrywających do samego końca testu.\n' +
    'Kwoty są stałe, niezależnie od wyników.', 860, 11, G)

  T(130, 4066, 'REGUŁA KCIUKA:  testujesz na ABO (chcesz się czegoś dowiedzieć)  ·  skalujesz na CBO (już wiesz i maksymalizujesz).\n' +
    'Meta: CBO ma sens dopiero od 2 zestawów w górę [M6].  U NAS: kampania aplikacyjna ma JEDEN zestaw → pytanie bez treści.\n' +
    'Wraca dopiero przy lejku webowym (cel Sprzedaż), gdzie zestawów może być kilka.', 1830, 11, R)

  /* ── B · 50 zdarzeń ── */
  CARD(2060, 3768, 1910, 'red', 'B ·  „50 zdarzeń" — NA TYDZIEŃ, nie dziennie. I liczone NA ZESTAW REKLAM.',
    'Meta, dosłownie: „an ad set becomes learning limited when it is unlikely to receive about 50 optimization events IN THE WEEK after your last significant edit." [M9]\n' +
    'Tydzień — nie dzień. Zestaw — nie kampania i nie pojedyncza reklama. Licznik startuje od ostatniej istotnej edycji, a każda taka edycja zeruje go od nowa.',
    { labelSize: 14 })

  T(2060, 3884, 'SKĄD SIĘ BIERZE WZÓR — trzy kroki, nic więcej', 1910, 13, BL)
  const derive = [
    ['1.', 'Potrzebujesz 50 zdarzeń w 7 dni', '50 ÷ 7  =  ~7,2 zdarzenia DZIENNIE'],
    ['2.', 'Jedno zdarzenie kosztuje tyle, ile kosztuje', 'np. instalacja w USA:  $4'],
    ['3.', 'Żeby kupić 7,2 zdarzenia dziennie, musisz wydać', '7,2 × $4  =  ~$29 / dzień'],
  ]
  derive.forEach(([n, what, calc], i) => {
    const y = 3914 + i * 32
    T(2060, y, n, 40, 12, BL)
    T(2105, y, what, 620, 12)
    T(2760, y, calc, 500, 13, BL)
  })

  T(2060, 4018, '„× 50 ÷ 7" to nie jest żadna magiczna stała. To skrót od „pięćdziesiąt sztuk rozłożone na siedem dni".\n' +
    'Efekt jest jeden: TYLE PIENIĘDZY MUSISZ WPUSZCZAĆ W REKLAMĘ KAŻDEGO DNIA, żeby algorytm zdążył się nauczyć w tydzień.', 1910, 12)

  T(2060, 4050, 'To NIE jest limit wydatku ani cel do osiągnięcia. To MINIMUM: poniżej tej kwoty algorytm się nie nauczy, więc pieniądze idą w szum —\n' +
    'a powyżej uczy się normalnie. Dlatego przy $50/dzień instalacja przechodzi, a zakup nie ma szans: $50 × 50 ÷ 7 = $357/dzień.\n' +
    'I dlatego wybór zdarzenia optymalizacji (strefa 7) jest ważniejszy niż wybór licytacji, odbiorców i formatu razem wziętych.', 1910, 12, R)

/* ═════════════ 14 · TABELA OPOZYCJI ═════════════ */
  s.zone(80, 4200, 3920, 1080, '14 · TABELA OPOZYCJI — wszystko, co jest „to ALBO to", i co z tego wynika', { accent: 'teal' })

  T(110, 4228, 'Czytaj wierszami. Zielone = nasz wybór. Szare = odrzucone, ale zapisane — za pół roku będziesz chciał wiedzieć, DLACZEGO nie.', 3860, 12, TE)

  s.node(110, 4252, 380, 36, 'WYBÓR MIĘDZY', { accent: 'teal', fill: 'tint', size: 12 })
  s.node(510, 4252, 1140, 36, 'OPCJA A', { accent: 'teal', fill: 'tint', size: 12 })
  s.node(1670, 4252, 1140, 36, 'OPCJA B', { accent: 'teal', fill: 'tint', size: 12 })
  s.node(2830, 4252, 1140, 36, 'CO WYBIERAMY I DLACZEGO', { accent: 'green', fill: 'tint', size: 12 })

  const opoz = [
    [
      "CEL KAMPANII",
      "APLIKACJA  (App Promotion)",
      "zyskujesz: Meta umie kupić instalację; start bez budowania czegokolwiek poza apką",
      "tracisz: brak retargetingu, brak grup podobnych, brak lejka, rzadkie zdarzenia, ubogi raport",
      "SPRZEDAŻ  (Sales — lejek webowy)",
      "zyskujesz: częste zdarzenia z piksela → niższy próg budżetu; retargeting; raport per kreacja",
      "tracisz: musisz zbudować stronę i płatność — to praca produktowa, nie reklamowa",
      "APLIKACJA teraz — nie mamy strony.",
      "SPRZEDAŻ to „drugie drzwi\", gdyby photo-check wyszedł na web.",
      "A"
    ],
    [
      "ADVANTAGE+: ZAKRES",
      "END-TO-END  — automatyzuje CAŁĄ kampanię",
      "zyskujesz: jeden przycisk, nie ma czego zepsuć; Meta dobiera odbiorców, miejsca i budżet",
      "tracisz: nie wiesz, CO zadziałało — brak rozbić po ustawieniach",
      "SINGLE-STEP  — automatyzuje JEDEN element",
      "zyskujesz: trzymasz kontrolę nad tym, na czym Ci zależy",
      "tracisz: przy celach dolnych i tak nie ma czego kontrolować",
      "END-TO-END — WYMUSZONE, nie wybrane.",
      "Na iOS 14.5+ ręczne nie istnieje. [M4]",
      "X"
    ],
    [
      "BUDŻET  (szerzej: strefa 13 A)",
      "CBO  — jedna kwota na kampanii",
      "zyskujesz: nie przepalasz na przegrywającym zestawie",
      "tracisz: słaby zestaw dostaje zero i niczego się o nim nie dowiesz",
      "ABO  — osobna kwota na każdym zestawie",
      "zyskujesz: czysty odczyt, każdy zestaw ma szansę wyjść z fazy uczenia",
      "tracisz: płacisz za przegrywających do samego końca testu",
      "BEZ ZNACZENIA — mamy jeden zestaw.",
      "Wraca przy lejku webowym.",
      "X"
    ],
    [
      "STRATEGIA LICYTACJI",
      "HIGHEST VOLUME  (dawniej Lowest Cost)",
      "zyskujesz: wydaje cały budżet i szuka maksimum wyników",
      "tracisz: koszt jednego wyniku może skakać — nie ma sufitu",
      "COST PER RESULT GOAL  (dawniej Cost Cap)",
      "zyskujesz: pilnuje średniego kosztu wyniku",
      "tracisz: potrzebuje 50–100 konwersji tygodniowo [M7] — u nas nieosiągalne; może nie wydać budżetu",
      "HIGHEST VOLUME, bez bid capa.",
      "Meta zaleca to wprost dla kampanii aplikacyjnych. [M8]",
      "A"
    ],
    [
      "POMIAR  (szerzej: strefa 8)",
      "AEM  — pomiar Mety",
      "zyskujesz: szybko, 8 rozbić, raport per kreacja, liczby SKAN widzisz OBOK",
      "tracisz: działa tylko wewnątrz Meta",
      "SKAN  — pomiar Apple",
      "zyskujesz: wspólny dla wszystkich sieci reklamowych",
      "tracisz: brak kolumny „wyniki\", min. 24 h opóźnienia, zero rozbić, brak raportu per kreacja",
      "AEM.",
      "SKAN nie pokaże Ci AEM — w drugą stronę działa. [M10]",
      "A"
    ],
    [
      "ZDARZENIE OPTYMALIZACJI",
      "INSTALACJA",
      "zyskujesz: najczęstsze zdarzenie — próg 50/tydzień osiągalny przy $50/dzień",
      "tracisz: algorytm szuka instalatorów, niekoniecznie płacących",
      "ZAKUP / SUBSKRYPCJA",
      "zyskujesz: algorytm od razu szuka ludzi, którzy płacą",
      "tracisz: musisz wydawać $357+/dzień, inaczej nauka NIGDY się nie domknie",
      "INSTALACJA.",
      "Zakup nie jest „za drogi\" — jest arytmetycznie niemożliwy.",
      "A"
    ],
    [
      "TARGETOWANIE: KLASA WEJŚĆ",
      "TWARDE KONTROLKI",
      "zyskujesz: Meta ich NIE przekroczy — kraj, język, minimalny wiek, wykluczenia",
      "tracisz: nic. To jedyne, co Ci zostało",
      "SUGESTIE",
      "zyskujesz: podpowiadasz kierunek — zainteresowania, grupy podobne, wiek i płeć",
      "tracisz: Meta może je zignorować; w kampanii aplikacyjnej ich w ogóle NIE MA",
      "SAME TWARDE: kraj, język, iOS.",
      "Reszta jest niedostępna, nie „niewybrana\". [M5]",
      "A"
    ],
    [
      "ILE KRAJÓW",
      "JEDEN KRAJ",
      "zyskujesz: sygnał skoncentrowany — szybciej wychodzisz z fazy uczenia",
      "tracisz: nie dowiesz się, czy gdzie indziej byłoby taniej",
      "WIELE KRAJÓW",
      "zyskujesz: porównanie rynków i kosztów w jednym teście",
      "tracisz: przy $50/dzień każdy rynek dostaje ochłap i żaden nie zbierze 50 zdarzeń",
      "JEDEN KRAJ.",
      "Rozsypanie budżetu = nauczysz się zera.",
      "A"
    ],
    [
      "STRUKTURA KONTA",
      "1 ZESTAW  ·  DUŻO KREACJI",
      "zyskujesz: wszystkie 50 zdarzeń tygodniowo trafiają w jedno miejsce",
      "tracisz: nie porównasz grup odbiorców — ale i tak nie możesz",
      "DUŻO ZESTAWÓW  ·  MAŁO KREACJI",
      "zyskujesz: kiedyś — czysty test na grupę odbiorców",
      "tracisz: dziś — rozcieńczasz naukę; Meta nazywa to „high auction overlap\" [M9]",
      "1 ZESTAW.",
      "Meta i tak wymusza jeden w kampanii aplikacyjnej.",
      "A"
    ],
    [
      "FORMAT KREACJI",
      "STATYK TEKSTOWY",
      "zyskujesz: najtańszy w produkcji i NAJWYŻSZA trafialność — 11,6% vs 7,6% dla UGC [B1]",
      "tracisz: mniej miejsca, żeby pokazać, jak produkt działa",
      "WIDEO PIONOWE 9:16",
      "zyskujesz: Reels to największy wolumen inwentarza; pokazujesz działanie produktu",
      "tracisz: droższa produkcja, niższa trafialność",
      "ZACZYNAMY OD STATYKÓW.",
      "Wideo jako drugi rzut, gdy statyk pokaże, który kąt działa.",
      "A"
    ],
    [
      "CO ZMIENIASZ PO STARCIE",
      "USTAWIENIA  (budżet, kraj, zdarzenie)",
      "zyskujesz: nic",
      "tracisz: reset fazy uczenia — +35–60% kosztu wyniku na 48–72 h [P1]",
      "KREACJE",
      "zyskujesz: jedyna dźwignia, jaka została; Meta zaleca odświeżanie 2–4 razy w miesiącu [M11]",
      "tracisz: tylko czas produkcji",
      "TYLKO KREACJE.",
      "Ustawienia zamrażasz w dniu startu.",
      "B"
    ],
    [
      "PUBLICZNOŚĆ SIĘ WYCZERPAŁA",
      "NOWE KREACJE",
      "zyskujesz: resetujesz uwagę; częstotliwość spada, koszt wraca do normy",
      "tracisz: koszt i czas produkcji",
      "WYŻSZY BUDŻET",
      "zyskujesz: więcej zasięgu — ale tym samym ludziom",
      "tracisz: przy częstotliwości 7-dniowej > 2,5 pogłębiasz zmęczenie zamiast je leczyć [P1]",
      "NOWE KREACJE.",
      "Budżet dolewasz dopiero, gdy kreacja jest świeża.",
      "A"
    ],
    [
      "KAMPANIE: ROLE",
      "KAMPANIA TESTOWA",
      "zyskujesz: wypuszczasz nowe kreacje, nie ruszając tego, co już działa",
      "tracisz: dzielisz budżet między dwie kampanie",
      "KAMPANIA SKALUJĄCA",
      "zyskujesz: zwycięzca dostaje całą moc",
      "tracisz: każda nowa kreacja wrzucona tutaj resetuje naukę zwycięzcy",
      "JEDNA KAMPANIA do T+5.",
      "Rozdzielenie ma sens dopiero, gdy jest już zwycięzca.",
      "X"
    ],
    [
      "WALUTA KONTA  (nieodwracalne)",
      "PLN",
      "zyskujesz: brak przewalutowania, jeśli karta też jest w PLN — płacisz taniej",
      "tracisz: wszystkie benchmarki są w dolarach, przeliczasz w głowie przy każdym odczycie",
      "USD",
      "zyskujesz: czytasz liczby wprost, bez przeliczania",
      "tracisz: spread bankowy przy każdym rozliczeniu kartą w PLN",
      "ZOSTAJEMY PRZY PLN.",
      "Nie zakładamy konta od nowa dla samej waluty. Następne konto — USD.",
      "A"
    ]
  ]

  opoz.forEach(([temat, aNaz, aPlus, aMinus, bNaz, bPlus, bMinus, wybor, powod, ktora], i) => {
    const y = 4304 + i * 66
    const colA = ktora === 'A' ? GR : G
    const colB = ktora === 'B' ? GR : G
    T(110, y + 6, temat, 380, 12, PALETTE.teal.stroke)
    T(510, y, aNaz, 1120, 12, colA)
    T(510, y + 20, '+  ' + aPlus, 1120, 10.5, G)
    T(510, y + 38, '\u2013  ' + aMinus, 1120, 10.5, G)
    T(1670, y, bNaz, 1120, 12, colB)
    T(1670, y + 20, '+  ' + bPlus, 1120, 10.5, G)
    T(1670, y + 38, '\u2013  ' + bMinus, 1120, 10.5, G)
    T(2830, y, wybor, 1120, 12, ktora === 'X' ? OR : GR)
    T(2830, y + 20, powod, 1120, 10.5, G)
  })

  T(110, 5218, 'POMARAŃCZOWE = wybory, których NIE MAMY. Advantage+ end-to-end jest wymuszony przez Metę, budżet wspólny vs osobny nie ma treści przy jednym zestawie,\n' +
    'a rozdzielenie kampanii na testową i skalującą ma sens dopiero przy pierwszym zwycięzcy. Pozostałych jedenaście wierszy to REALNE rozwidlenia — i każde\n' +
    'z nich kosztuje coś, czego nie widać w dniu wyboru. Dlatego odrzucona strona zostaje na rysunku: za pół roku będziesz chciał wiedzieć, dlaczego nie.',
    3860, 12, R)


  /* ═════════════ 15 · ŹRÓDŁA ═════════════ */
  s.zone(80, 5380, 3920, 470, '15 · ŹRÓDŁA — każda liczba ma adres', { accent: 'grey' })

  T(110, 5408, 'DOKUMENTACJA META  [M] — sprawdzona 22.09.2026 przez API centrum pomocy, nie przez blog. To są fakty, nie opinie.', 3860, 13, BL)
  const meta = [
    ['M1', 'Cele kampanii ODAX — sześć celów, cel zamrożony po starcie', 'facebook.com/business/help/ — przegląd celów'],
    ['M2', 'Reach people using iOS 14.5+ — ścieżki AEM i SKAN', 'facebook.com/business/help/331612538028890'],
    ['M3', 'AEM vs SKAN — „both campaign attribution methods", różnice w raportach', 'facebook.com/business/help/1356268495231843'],
    ['M4', 'App promotion, iOS 14.5+ — „manual setup is not supported", 1 zestaw, 24 kampanie', 'facebook.com/business/help/651033805513936'],
    ['M5', 'Targetowanie i raportowanie A+AC — trzy dźwignie, okno 90 dni, braki SKAN', 'facebook.com/business/help/1153577308409919'],
    ['M6', 'Advantage+ campaign budget — domyślnie włączony dla Sprzedaż / Kontakty / Aplikacja', 'facebook.com/business/help/343242619559352'],
    ['M7', 'Zmiana nazw strategii licytacji  +  About cost per result goal (próg 50–100/tydz.)', 'facebook.com/business/help/559588428575663'],
    ['M8', 'Best practices A+AC — cztery cele wydajności, „not adding a bid cap", faza uczenia', 'facebook.com/business/help/711378409718185'],
    ['M9', 'About learning limited — reguła ~50 zdarzeń i kolejność napraw', 'facebook.com/business/help/269269737396981'],
    ['M10', 'Raportowanie AEM — „compare attribution settings", okna 1/7/28 dni, 8 rozbić', 'facebook.com/business/help/3499572073626051'],
    ['M11', 'Kreacje w A+AC — do 50 zasobów, 5 tekstów, 5 nagłówków; odświeżanie 2–4× / mies.', 'facebook.com/business/help/716015512512235'],
  ]
  meta.forEach(([tag, what, url], i) => {
    const col = i % 2
    const y = 5436 + Math.floor(i / 2) * 28
    const x = 110 + col * 1950
    T(x, y, tag, 50, 11, BL)
    T(x + 52, y, what, 1000, 11)
    T(x + 1060, y, url, 830, 11, G)
  })

  T(110, 5628, 'BADANIA Z UJAWNIONĄ PRÓBKĄ  [B] — liczby, pod którymi stoi metodologia.', 1900, 13, VI)
  T(110, 5654, 'B1   Motion, Creative Benchmarks 2026 — 578 750 kreacji, $1,29 mld wydatku, 6 015 kont, IX.2025–I.2026. Kadencja mikro-kont\n' +
    '        (<$10 tys./mies.): mediana 2,80 nowych reklam/tydz., top 25%: 4,83. Trafialność ~5%.  motionapp.com/library/research/creative-benchmarks-2026/\n' +
    'B2   CPM wg kraju 2026 — USA ~$20,5 · Kanada ~$14,0 · Australia ~$11,0 · UK ~$10,9. Źródła wtórne różnią się o ±15%.\n' +
    'B3   Haus, The Meta Report — 640 eksperymentów inkrementalnych, średni reklamodawca ~$14 mln/rok. U nas bezprzedmiotowe (patrz strefa 4).\n' +
    'B4   Transkrypt calla Meta Q2 2026 (07.08.2026) — LLM-y w rankingu reklam jako warstwa dodana, nie zamiennik modeli behawioralnych.',
    1900, 11)

  T(2060, 5628, 'OPINIE PRAKTYKÓW  [P] — bez ujawnionej metodologii. Kierunek, nie dowód.', 1900, 13, OR)
  T(2060, 5654, 'P1   RocketShip HQ (IV.2026) — skalowanie budżetu +10–20%/dzień, okno oceny 72 h po zmianie, koszt resetu +35–60% CPA,\n' +
    '        częstotliwość 7d > 2,5 = wyczerpanie publiczności. Dane z „30+ kampanii", bez publikacji próbki.\n' +
    'P2   Progi hook rate / hold rate / CTR — konsensus mediabuyerów (adlibrary, Triple Whale, Sovran, Vaizle).\n' +
    '        UWAGA: „hold rate" bywa liczony dwiema różnymi metodami (15 s ÷ wyświetlenia  vs  75% obejrzeń ÷ 3 s) — dlatego\n' +
    '        jedne źródła podają 20–25%, a inne 40–50%. Sprawdź definicję, zanim porównasz do tego swoją liczbę.',
    1900, 11)

  T(110, 5758, 'CZEGO ŚWIADOMIE NIE CYTUJĘ: gatunku „Meta Ads 2026 algorithm explained". Te teksty recyklingują się nawzajem, wymyślają mechanizmy — „Entity IDs" nie\n' +
    'istnieje w żadnym źródle Mety — i przypisują Mecie statystyki, których nigdy nie opublikowała. Wszystkie liczby wydajnościowe podawane przez samą Metę\n' +
    '(+8% jakości reklam z Andromedy, +22% ROAS z Advantage+ Creative) są samoraportowane, bez metodologii i bez niezależnej replikacji — dyskontuj mocno.',
    3860, 12, R)

  /* ═════════════ SŁOWNICZEK ═════════════
   * Rysowany NA KOŃCU, po zjechaniu reszty w dół. Dzięki temu dołożenie paska
   * u góry nie wymaga przeliczania stu współrzędnych — przesuwam gotową scenę.
   * Próg 200 px omija blok tytułowy (kończy się ~171), a łapie wszystko poniżej.
   */
  const SHIFT = 250
  for (const el of s.elements) if (el.y >= 200) el.y += SHIFT

  s.zone(80, 220, 3920, 210, 'SŁOWNICZEK — każdy skrót i każde obce słowo użyte na tym rysunku', { accent: 'grey' })

  const slownik = [
    ['CBO', 'campaign budget optimization — wspólny budżet kampanii: jedna kwota, algorytm ją rozdziela'],
    ['ABO', 'ad set budget optimization — budżet na zestawie: osobna kwota na każdym, algorytm nie przesuwa'],
    ['AEM', 'aggregated event measurement — pomiar zagregowany, system atrybucji Mety'],
    ['SKAN', 'SKAdNetwork — prywatnościowy system atrybucji APPLE, wspólny dla wszystkich sieci'],
    ['atrybucja', 'przypisanie sprzedaży do reklamy, która ją wywołała'],
    ['ODAX', 'outcome-driven ad experiences — sześć celów kampanii ułożonych wg wyniku biznesowego'],
    ['A+AC', 'Advantage+ App Campaign — jedyny typ kampanii aplikacyjnej na iOS 14.5+'],
    ['ASC', 'Advantage+ Shopping Campaign — dziś nazywa się Advantage+ Sales'],
    ['AAA', 'automated app ads — stara nazwa A+AC'],
    ['AEO', 'app event optimization — optymalizacja pod zdarzenie WEWNĄTRZ aplikacji, nie pod instalację'],
    ['CPM', 'cost per mille — ile płacisz za tysiąc wyświetleń reklamy'],
    ['CTR', 'click-through rate — jaki procent oglądających kliknął'],
    ['CPI', 'cost per install — ile płacisz za jedną instalację aplikacji'],
    ['CPA', 'cost per action — ile płacisz za jedno zdarzenie docelowe (u nas: za płacącego)'],
    ['ROAS', 'return on ad spend — przychód podzielony przez wydatek na reklamę'],
    ['KPI', 'key performance indicator — liczba, po której oceniasz, czy działa'],
    ['CTA', 'call to action — przycisk akcji w reklamie: „Zainstaluj", „Kup teraz"'],
    ['SDK', 'software development kit — biblioteka Mety wszyta w kod aplikacji; melduje zdarzenia'],
    ['API', 'interfejs programistyczny — tędy narzędzia gadają z Metą, bez klikania w panel'],
    ['CAPI', 'conversions API — serwerowy kanał wysyłania zdarzeń do Mety, obok piksela'],
    ['piksel', 'fragment kodu na Twojej stronie, który melduje Mecie, co user zrobił'],
    ['faza uczenia', 'okres, w którym algorytm zbiera ~50 zdarzeń i dopiero ustala, komu pokazywać'],
    ['learning limited', 'stan trwały: zestaw nie zbierze 50 zdarzeń w tydzień. Sam nie minie'],
    ['hook rate', 'jaki procent widzów obejrzał pierwsze ~3 sekundy filmu'],
    ['hold rate', 'jaki procent dotrwał do końca (uwaga: liczony dwiema różnymi metodami)'],
    ['trafialność', 'po angielsku hit rate — jaki procent wypuszczonych reklam okazuje się zwycięzcami. Realnie ~5%'],
    ['hook', 'pierwsze 1–2 sekundy reklamy — to one decydują, czy ktoś się zatrzyma'],
    ['kąt kreatywny', 'o czym konkretnie mówi reklama: przed/po, demo, świadectwo, porównanie'],
    ['lookalike', 'grupa podobnych — Meta szuka ludzi podobnych do Twojej listy klientów'],
    ['umiejscowienie', 'gdzie reklama się wyświetla: feed, Reels, Stories, Marketplace'],
    ['bid cap', 'sufit na pojedynczą stawkę w aukcji — „nigdy nie licytuj powyżej X"'],
    ['hard duplicate', 'twarda kopia reklamy — zachowuje polubienia i komentarze, czyli dowód społeczny'],
  ]
  slownik.forEach(([skrot, opis], i) => {
    const x = 110 + (i % 4) * 975
    const y = 258 + Math.floor(i / 4) * 21
    T(x, y, skrot, 130, 11, BL)
    T(x + 136, y, opis, 825, 11, G)
  })

  return s
}
