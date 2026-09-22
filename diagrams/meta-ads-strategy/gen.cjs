module.exports = async ({ Scene, PALETTE, FONT }) => {
  const s = new Scene({ font: FONT.hand, roughness: 1 })
  const G = PALETTE.grey.stroke
  const R = PALETTE.red.stroke
  const T = (x, y, str, w, size, color) =>
    s.text(x, y, str, { width: w, size: size || 13, color: color || '#1e1e1e' })

  /* ─────────── TYTUŁ ─────────── */
  s.text(80, 40, 'META ADS — jak to dziś działa i co robić przez 8 tygodni', { size: 34 })
  s.text(80, 92, 'WinkyPie · aplikacja iOS · rynek USA · stan na 22.09.2026', { size: 14, color: G })
  s.text(80, 114, 'Źródła: [T1] = dokumentacja Meta, czyli fakt · [T2] = panel z ujawnioną próbką · próg bez warstwy = orientacja, nie dowód',
    { size: 12, color: G })

  /* ─────────── 1 · KIEDYŚ vs DZIŚ ─────────── */
  s.zone(80, 200, 1180, 500, '1 · CO SIĘ ZMIENIŁO — i dlaczego stare tutoriale mylą', { accent: 'grey' })
  s.node(110, 230, 550, 54, 'KIEDYŚ  ·  2019–2022', { accent: 'orange', fill: 'tint', size: 15 })
  s.node(690, 230, 550, 54, 'DZIŚ  ·  2025–2026', { accent: 'violet', fill: 'tint', size: 15 })

  const cmp = [
    ['Targetowanie: stackowanie zainteresowań, lookalike 1/2/5%,\npsychodemografia. Osobny zestaw na każdy pomysł.',
     'Targetowanie: kraj + język + system. W kampanii Advantage+ App\nreszty NIE MA — Meta ją usunęła. [T1]'],
    ['10–30 zestawów, 1–2 kreacje w każdym — żeby „czysto zmierzyć"\npojedynczy wariant.',
     '1 kampania, 1 zestaw, 10–20+ kreacji naraz. Meta: do 50 zasobów\njednorazowo, bez limitu reklam. [T1]'],
    ['Budżet ABO — ręcznie na każdy zestaw, ręczne przesuwanie\nmiędzy zestawami.',
     'Advantage+ campaign budget — domyślnie włączony dla App\nPromotion. Wyniki czytasz na poziomie kampanii. [T1]'],
    ['Dźwignia = TARGETOWANIE. Kto lepiej pokroił publiczność,\nten wygrywał aukcję.',
     'Dźwignia = KREACJA. Andromeda spłaszczyła hierarchię:\nnowi startują bliżej środka stawki. [T2]'],
  ]
  cmp.forEach(([l, r], i) => {
    const y = 316 + i * 92
    T(125, y, l, 520, 12)
    T(705, y, r, 520, 12)
  })

  /* ─────────── 2 · ANATOMIA KONTA ─────────── */
  s.zone(1340, 200, 1000, 500, '2 · TRZY PIĘTRA — co ustawiasz gdzie', { accent: 'blue' })
  const kamp = s.node(1380, 240, 920, 84, 'KAMPANIA', {
    accent: 'blue', fill: 'tint', size: 16,
    sub: 'cel (App Promotion) · budżet Advantage+ · ile łącznie wydajesz' })
  const zest = s.node(1380, 364, 920, 84, 'ZESTAW REKLAM  (ad set)', {
    accent: 'blue', fill: 'tint', size: 16,
    sub: 'kraj · język · system · zdarzenie optymalizacji · TU MIESZKA FAZA UCZENIA' })
  const rekl = s.node(1380, 488, 920, 84, 'REKLAMA  (ad)', {
    accent: 'green', fill: 'tint', size: 16,
    sub: 'kreacja · tekst · nagłówek · CTA — tutaj wygrywasz albo przegrywasz' })
  s.arrow(kamp, zest)
  s.arrow(zest, rekl)
  T(1380, 600, 'Kiedyś dzieliłeś na piętrze ZESTAWU: wiele zestawów = wiele testów.\nDziś dzielisz na piętrze REKLAMY: jeden zestaw, wiele kreacji — bo faza uczenia liczy się NA ZESTAW.',
    920, 12, R)

  /* ─────────── 3 · ARYTMETYKA ─────────── */
  s.zone(2420, 200, 1180, 500, '3 · ARYTMETYKA, KTÓRA DECYDUJE ZA CIEBIE', { accent: 'red' })
  s.node(2460, 238, 1100, 62, 'ILE MUSISZ WYDAWAĆ DZIENNIE NA REKLAMĘ  =  50 × koszt zdarzenia ÷ 7', {
    accent: 'red', fill: 'tint', size: 15 })
  T(2460, 318, 'Zestaw musi zebrać ~50 zdarzeń tygodniowo, żeby wyjść z fazy uczenia. [T1]', 1100, 12, G)

  const mat = [
    ['TAK', 'Instalacja, CEE   (CPI ~$1,85)', '$13 / dzień', 'domyka się z dużym zapasem', 'green'],
    ['LEDWO', 'Instalacja, USA   (CPI ~$5,28)', '$38 / dzień', 'przy $50/dzień bez zapasu', 'yellow'],
    ['NIE', 'Start triala   (~$8,40)', '$60 / dzień', 'nie domykasz nauki', 'red'],
    ['NIE', 'Zakup   (~$8,40+)', '$60+ / dzień', 'nie domykasz nauki', 'red'],
  ]
  mat.forEach(([ic, what, need, note, col], i) => {
    const y = 358 + i * 46
    T(2460, y, ic, 90, 13, PALETTE[col].stroke)
    T(2570, y, what, 340, 13)
    T(2930, y, need, 200, 14, PALETTE[col].stroke)
    T(3140, y, note, 420, 12, G)
  })
  T(2460, 560, 'Wniosek wbrew radzie powtarzanej wszędzie: przy Twoim budżecie optymalizuj pod\nINSTALACJĘ, nie pod zakup. Meta sama to zaleca jako lek na „Learning Limited". [T1]',
    1100, 12, R)

  /* ─────────── 4 · TRZY STRATEGIE STARTOWE ─────────── */
  s.zone(80, 780, 2260, 320, '4 · TRZY STRATEGIE NA START — różni je to, CZEGO SIĘ NAUCZYSZ', { accent: 'teal' })
  const strat = [
    [120, 'A  ·  UK', 'CPM $11,81 · odbiorca anglojęzyczny',
     'Kompromis. Taniej niż USA, a język i kultura wizualna bliskie\nrynkowi docelowemu. Przy $50/dzień domykasz naukę na instalacji.\n\nDomyślny wybór, jeśli ma być jeden wariant.', 'green'],
    [855, 'B  ·  USA', 'CPM $16,08 · właściwy rynek od razu',
     'Zero kompromisu co do rynku. Każda złotówka uczy algorytm\nwłaściwej rzeczy. Ale przy $50/dzień ledwo zbierasz 50 instalacji.\n\nWymaga ~$40+/dzień, inaczej utkniesz w fazie uczenia.', 'yellow'],
    [1590, 'C  ·  CEE jako poligon', 'CPM $5,55 · najtańsza nauka',
     'Najszybsza i najtańsza nauka OBSŁUGI systemu: panel, metryki,\nrytm pracy.\n\nNie wyciągaj stąd wniosków o odbiorcy, kreacji ani ekonomice —\nWinkyPie jest anglojęzyczna i celuje w USA.', 'red'],
  ]
  strat.forEach(([x, title, sub, body, col]) => {
    s.node(x, 812, 690, 74, title, { accent: col, fill: 'tint', size: 17, sub })
    T(x, 906, body, 690, 12)
  })
  T(120, 1040, 'To jest decyzja produktowa, nie techniczna. Wszystkie trzy są uczciwe — nie ma tu wariantu głupiego.',
    2160, 13, PALETTE.teal.stroke)

  /* ─────────── 5 · WALUTA ─────────── */
  s.zone(2420, 780, 1180, 320, '5 · PLN CZY USD — o co właściwie chodzi', { accent: 'yellow' })
  T(2460, 812, 'Waluty ani strefy czasowej konta reklamowego NIE DA SIĘ zmienić po założeniu.\nJedyna droga to nowe konto. Dlatego warto przemyśleć to teraz, raz.',
    1100, 13, R)
  T(2460, 866, 'Co PLN realnie psuje:', 1100, 13)
  T(2470, 888, '— wszystkie benchmarki branżowe są w USD, więc przeliczasz w kółko. To tarcie\n   poznawcze przy każdym odczycie, nie strata pieniędzy\n— progi rozliczeniowe i minimalny budżet dzienny są w walucie konta',
    1090, 12)
  T(2460, 950, 'Czego PLN NIE psuje:', 1100, 13)
  T(2470, 972, '— płatności: jeśli karta jest w PLN, płacenie w PLN jest TAŃSZE, bo nie ma\n   przewalutowania po stronie banku\n— aukcji: Meta i tak licytuje w walucie rynku, na którym się wyświetlasz',
    1090, 12)
  T(2460, 1034, 'Werdykt: PLN to nie problem finansowy, tylko tarcie w czytaniu liczb. Nie zakładaj\nnowego konta wyłącznie dla waluty. Ale jeśli i tak je zakładasz — ustaw USD i strefę\nczasową rynku. Strefa jest ważniejsza: wyznacza dobę rozliczeniową i raportową.',
    1120, 12, PALETTE.yellow.stroke)

  /* ─────────── 6 · OŚ CZASU ─────────── */
  s.zone(80, 1180, 3520, 300, '6 · OSIEM TYGODNI — co robisz, a czego NIE robisz', { accent: 'green' })
  const weeks = [
    [120, 'TYDZIEŃ 0', 'zanim klikniesz publikuj',
     '— atrybucja i zdarzenia: ZROBIONE i przetestowane\n   (potwierdzone 22.09) — bramka zdjęta\n— 10–15 kreacji GOTOWYCH. Dorzucenie później\n   resetuje fazę uczenia\n— metoda płatności, waluta, strefa czasowa\n— wybór geo: A, B czy C\n— budżet: $100/dzień (uzasadnienie w strefie 9)', 'green'],
    [700, 'TYDZIEŃ 1', 'zero edycji',
     '— 1 kampania App Promotion, 1 zestaw,\n   wszystkie kreacje wgrane naraz\n— optymalizacja pod INSTALACJĘ\n— lowest cost, BEZ bid cap [T1]\n— dodaj kolumny: Last significant edit,\n   Results, 3 rankingi trafności\n— wyniki w fazie uczenia NIC nie znaczą', 'orange'],
    [1280, 'TYDZIEŃ 2', 'pierwszy uczciwy odczyt',
     '— wyszedł z fazy uczenia? (~50 wyników)\n— „Learning Limited" → podnieś budżet\n   ALBO spłyć zdarzenie\n— czytaj drabinę: 1. klatka → hook →\n   hold → CTR → instalacja\n— rankingi trafności (od 500 wyświetleń)\n— wyłącz tylko jawnie martwe kreacje', 'yellow'],
    [1860, 'TYDZIEŃ 3–4', 'powstaje TWOJA baza',
     '— 60–70% nowych kreacji = warianty tego,\n   co zadziałało\n— 30–40% = nowe koncepty,\n   podobieństwo poniżej 40% [T2]\n— zapisz MEDIANĘ CPM/CTR/hook z 30 dni.\n   To jest Twój prawdziwy benchmark\n— frequency ponad 2,0 → zmęczenie', 'blue'],
    [2440, 'TYDZIEŃ 5–6', 'moment prawdy',
     '— znasz CPI, więc policz:\n   CPI ÷ konwersja na płacącego = CPA\n— CPA < LTV → skaluj budżet\n   o mniej niż 20% na raz\n— CPA > LTV → to NIE jest problem\n   kampanii, tylko ekonomiki. Stop.\n— dopiero teraz głębsze zdarzenie', 'violet'],
    [3020, 'TYDZIEŃ 7–8', 'werdykt liczbowy',
     '— masz własne liczby zamiast cudzych\n— konektor Meta da benchmark branżowy\n   i diagnozę nakładania się aukcji\n— wpis do 04-eksperymenty/ z wynikiem\n— decyzja: skalować / przejść na\n   Partnership Ads z twórcami / stop', 'teal'],
  ]
  const wNodes = weeks.map(([x, title, sub, body, col]) => {
    const n = s.node(x, 1214, 540, 80, title, { accent: col, fill: 'tint', size: 18, sub })
    T(x, 1312, body, 540, 11)
    return n
  })
  for (let i = 0; i < wNodes.length - 1; i++) s.arrow(wNodes[i], wNodes[i + 1])

  /* ─────────── 7 · TABLICA DIAGNOSTYCZNA ─────────── */
  s.zone(80, 1560, 2260, 680, '7 · TABLICA DIAGNOSTYCZNA — liczba sama w sobie nic nie znaczy', { accent: 'violet' })
  s.node(120, 1596, 620, 46, 'CO WIDZISZ', { accent: 'violet', fill: 'tint', size: 14 })
  s.node(760, 1596, 680, 46, 'CO TO ZNACZY', { accent: 'violet', fill: 'tint', size: 14 })
  s.node(1460, 1596, 840, 46, 'CO ROBISZ', { accent: 'violet', fill: 'tint', size: 14 })

  const diag = [
    ['CPM ponad 2× Twojej bazy', 'drogie geo ALBO słaba kreacja — Meta\nwycenia jakość reklamy w aukcji', 'breakdown Country, potem 3 rankingi trafności.\nNie ruszaj budżetu, zanim nie wiesz, który to przypadek'],
    ['Quality / Engagement ranking:\n„below average"', 'masz odpowiedź: to kreacja, nie budżet', 'wymień kreację. Ruch z „low" na „average" daje\nwięcej niż z „average" na „above average" [T1]'],
    ['1. klatka OK, ale hook rate niski', 'pierwsze 3 sekundy nie zatrzymują kciuka', 'przemontuj samo otwarcie. ZOSTAW resztę materiału'],
    ['hook OK, hold się zapada', 'hook przeobiecuje, treść nie dowozi', 'dopasuj obietnicę do zawartości, nie odwrotnie'],
    ['hook i hold OK, CTR niski', 'problem jest w ofercie albo CTA', 'zmień propozycję wartości, nie montaż'],
    ['CTR rośnie, a instalacje płaskie', 'kreacja wypisuje czek, którego karta\nw App Store nie realizuje', 'screeny, opis, onboarding. Reklama jest OK —\nnie poprawiaj jej'],
    ['frequency ponad 2,0 (prospecting)', 'zmęczenie kreacji', 'odśwież kreacje. Sygnał wyprzedzający: CTR −20%\nutrzymujące się przez 3 dni'],
    ['„Learning Limited"', 'zestaw nie zbierze 50 zdarzeń\nw tygodniu', 'podnieś budżet LUB spłyć zdarzenie\nLUB połącz zestawy [T1]'],
  ]
  diag.forEach(([a, b, c], i) => {
    const y = 1666 + i * 70
    T(130, y, a, 600, 12)
    T(770, y, b, 660, 12)
    T(1470, y, c, 820, 12, PALETTE.green.stroke)
  })

  /* ─────────── 8 · CZEGO NIE RUSZAĆ ─────────── */
  s.zone(2420, 1560, 1180, 680, '8 · CO RESETUJE FAZĘ UCZENIA [T1]', { accent: 'red' })
  T(2460, 1596, 'Każda z tych zmian cofa zestaw do nauki i kasuje to, co algorytm już wiedział:',
    1100, 12, G)
  const reset = [
    'zmiana targetowania',
    'zmiana kreacji',
    'zmiana zdarzenia optymalizacji',
    'DODANIE NOWEJ REKLAMY do zestawu   ← to zaskakuje wszystkich',
    'pauza zestawu na 7 dni lub dłużej',
    'zmiana strategii stawek',
  ]
  reset.forEach((r, i) => T(2470, 1640 + i * 34, 'X   ' + r, 1080, 13,
    i === 3 ? R : '#1e1e1e'))

  T(2460, 1860, 'Budżet zależy od skali zmiany. Meta podaje własny przykład:\n$100 → $101 raczej nie zresetuje, $100 → $1000 może. [T1]', 1100, 12)
  T(2460, 1918, 'Zmieniaj budżet o mniej niż 20% na raz i rzadko.', 1100, 13, R)

  s.node(2460, 1960, 1100, 54, 'ZŁOTA ZASADA', { accent: 'ink', fill: 'tint', size: 16 })
  T(2470, 2030, 'Hook rate i hold rate to sygnały diagnostyczne, nie cele. Skalujesz po koszcie\npłacącego. Warstw uwagi używasz tylko po to, żeby WYJAŚNIĆ, dlaczego ten\nkoszt wygląda tak, a nie inaczej.', 1080, 12)

  T(2460, 2110, 'Reguła, którą masz już spełnioną — zostaw ją tu na przyszłość:', 1100, 13, G)
  T(2460, 2136, 'Bez SDK atrybucji i zdarzeń Meta nie dostaje sygnału instalacji. Kampania się\nNIE zatrzymuje — po cichu zaczyna kupować kliknięcia. [T1]\nU Ciebie to zrobione i przetestowane, więc ta bramka jest zdjęta.',
    1100, 13, PALETTE.green.stroke)

  /* ─────────── 9 · SŁOWNIK — dopisane 22.09 ─────────── */
  const O = PALETTE.orange.stroke
  s.zone(80, 2320, 3520, 780, '9 · SŁOWNIK POJĘĆ — dopisane 22.09, odpowiedzi na pytania z czatu', { accent: 'orange' })

  const faq1 = [
    [100, '„CPM ponad 2× Twojej bazy"',
     'Baza = mediana CPM z Twoich ostatnich 30 dni, na Twoim koncie.\nNie benchmark z internetu.\n\nPrzykład: zwykle masz $12, nagle zestaw pokazuje $26 — to sygnał.\n\nDlaczego względnie, a nie na sztywno: CPM zależy od geo, sezonu,\nmiejsca wyświetlania i branży. „$45 to dużo" nic nie znaczy, dopóki\nnie wiesz, CZYJE to $45.\n\nMotion — największy publiczny zbiór danych o kreacjach — celowo\nNIE podaje progów bezwzględnych. To nie ostrożność, to metodologia.'],
    [980, '„lowest cost" i jak działa aukcja',
     'To NIE jest przycisk „zrób taniej". To instrukcja dla aukcji: wydaj cały\nbudżet i przynieś tyle wyników, ile się da — po cenie, jaka wyjdzie.\n\nWarianty stawkowania:\n— lowest cost — bez ograniczeń, maksymalny wolumen\n— cost per result goal — trzymaj średnio $X za wynik\n— bid cap — nigdy nie licytuj powyżej $X w jednej aukcji\n\nAukcja liczy dla każdego wyświetlenia:\n   wartość = stawka × szansa na akcję + jakość reklamy\nWygrywa najwyższa WARTOŚĆ, nie najwyższa stawka. Dlatego lepsza\nkreacja dosłownie kosztuje mniej — podnosi dwa z trzech składników.'],
    [1860, '„frequency ponad 2,0"',
     'Frequency = ile razy TEN SAM człowiek zobaczył Twoją reklamę.\nWyświetlenia ÷ zasięg (zasięg = unikalni ludzie).\n\n2,0 przez 7 dni = przeciętny odbiorca widział reklamę dwa razy\nw tym tygodniu.\n\nPowyżej 2,0 na zimnym ruchu płacisz za pokazywanie reklamy komuś,\nkto już raz powiedział „nie". To jest zmęczenie kreacji.\n\nNa retargetingu 4–6 jest normalne — tam powtórzenie JEST celem,\nbo mówisz do kogoś, kto Cię już zna.'],
    [2740, '„prospecting"',
     'Prospecting = ruch zimny. Ludzie, którzy nigdy nie mieli z Tobą\nżadnego kontaktu.\n\nPrzeciwieństwo: retargeting — ci, którzy już weszli, obejrzeli\nalbo zainstalowali.\n\nRozróżnienie ma znaczenie, bo progi frequency i oczekiwany koszt\nsą dla obu grup zupełnie inne.\n\nNa starcie robisz wyłącznie prospecting — nie masz jeszcze z czego\nzbudować grupy retargetingowej.'],
  ]
  faq1.forEach(([x, title, body]) => {
    s.node(x, 2356, 840, 44, title, { accent: 'orange', fill: 'tint', size: 14 })
    T(x, 2416, body, 840, 11)
  })

  const faq2 = [
    [100, '„1. klatka OK, ale hook rate niski"',
     'To dwie różne metryki i ŻADNA nie jest miniaturką.\n\n1. klatka (retencja) = u ilu osób wideo w ogóle RUSZYŁO.\nNiska → problem techniczny: zły plik, złe proporcje, nie wyrenderowało\nsię. Jedyny twardy próg, jaki podaje Motion: powyżej 90%.\n\nhook rate = 3-sekundowe odtworzenia ÷ wyświetlenia. Z tych, u których\nruszyło — ilu zostało trzy sekundy.\n\n„1. klatka OK, hook niski" = plik jest dobry, ale otwarcie nie zatrzymuje\nkciuka. To problem TREŚCI pierwszych 3 sekund, nie pliku.\n\nW feedzie wideo startuje samo — pierwsze klatki SĄ miniaturką.'],
    [980, 'Jaki budżet na start',
     '$100/dzień przez 2 tygodnie. Jedna kampania, jeden zestaw,\noptymalizacja pod instalację.\n\nDlaczego nie $50: przy CPI ~$5,28 w USA sam próg 50 zdarzeń\nwymaga $38/dzień. $50 to zero zapasu — jeden gorszy tydzień\ni stoisz w „Learning Limited".\n\nDlaczego nie $150: przy $100 masz już ~2,5× zapasu nad progiem.\n$150 nie kupuje proporcjonalnie więcej NAUKI, tylko więcej wydatku\nna kreacje, których jeszcze nie sprawdziłeś.\n\n$700/tydz. × 2 = $1400 — mieści się w ~$1500, które repo już\nzaplanowało jako koszt wejścia w ten kanał.'],
    [1860, 'Sprzeczność: „nie zmieniaj kreacji" vs „odświeżaj kreacje"',
     'Masz rację, że to wygląda na sprzeczność. Rozwiązanie ma cztery piętra.\n\n1. W PIERWSZEJ fazie uczenia nie dokładasz nic. Dlatego 10–15 kreacji\n   ma być gotowych PRZED startem.\n\n2. Wyłączenie słabej reklamy to nie to samo co dodanie nowej. Meta na\n   liście istotnych zmian wymienia „dodanie nowej reklamy" — pauzy\n   pojedynczej reklamy tam NIE MA. Zabijanie martwych kreacji jest tanie,\n   dokładanie drogie.\n\n3. Reset po wyjściu z nauki kosztuje mniej, niż brzmi. Zestaw z historią\n   uczy się szybciej niż zimny — tracisz kilka dni mniej stabilnej dostawy,\n   nie wszystko.\n\n4. Twój pomysł z nowym zestawem jest jedną z dwóch realnych dróg —\n   ale nie przy tym budżecie. Patrz obok.'],
    [2740, 'Dwie drogi odświeżania — i dlaczego wybierasz A',
     'A · KONSOLIDACJA  (dla Ciebie)\nJeden zestaw, odświeżanie PARTIAMI co ~2 tygodnie. Dokładasz\n5 kreacji naraz = JEDEN reset zamiast pięciu. Reset planujesz\nw kalendarzu, zamiast wpadać na niego przypadkiem.\n\nB · OSOBNY ZESTAW TESTOWY\nNowe koncepty walczą obok, zwycięzcy wędrują do głównego zestawu.\nKosztuje drugi budżet i grozi licytowaniem przeciwko samemu sobie —\nMeta wprost ostrzega przed nakładaniem się kampanii na tę samą\npubliczność. [T1]\n\nPrzy $100/dzień droga B dzieli Twoje 50 zdarzeń na dwa zestawy\ni ŻADEN się nie nauczy.\n\n→ Reguła brzmi więc nie „nie dodawaj kreacji", tylko:\n   nie dodawaj PO JEDNEJ i nie w trakcie aktywnej nauki.'],
  ]
  faq2.forEach(([x, title, body]) => {
    s.node(x, 2690, 840, 44, title, { accent: 'orange', fill: 'tint', size: 13 })
    T(x, 2750, body, 840, 11)
  })

  T(100, 3054, 'Wszystko w tej strefie dotyczy zestawu reklam, nie kampanii — faza uczenia liczy się NA ZESTAW. To jedno zdanie tłumaczy większość powyższych reguł.',
    3480, 12, O)

  /* ─────────── SŁOWNICZEK ───────────
   * Doklejony na końcu: najpierw zjeżdża cała gotowa scena, potem rysuję pasek
   * w zwolnionym miejscu. Próg 170 px omija blok tytułowy, łapie wszystko niżej.
   */
  const SHIFT = 260
  for (const el of s.elements) if (el.y >= 150) el.y += SHIFT

  s.zone(80, 190, 3520, 190, 'SŁOWNICZEK — każdy skrót i każde obce słowo użyte na tym rysunku', { accent: 'grey' })

  const slownik = [
    ['CPM', 'cost per mille — ile płacisz za tysiąc wyświetleń reklamy'],
    ['CTR', 'click-through rate — jaki procent oglądających kliknął'],
    ['CPI', 'cost per install — ile płacisz za jedną instalację aplikacji'],
    ['CPA', 'cost per action — ile płacisz za jedno zdarzenie docelowe (u nas: za płacącego)'],
    ['LTV', 'lifetime value — ile klient zapłaci przez cały czas życia'],
    ['CTA', 'call to action — przycisk akcji w reklamie: „Zainstaluj"'],
    ['ABO', 'ad set budget optimization — osobny budżet na każdym zestawie'],
    ['SDK', 'software development kit — biblioteka Mety wszyta w kod aplikacji'],
    ['hook', 'pierwsze 1–2 sekundy reklamy — one decydują, czy ktoś się zatrzyma'],
    ['hook rate', 'jaki procent widzów obejrzał pierwsze ~3 sekundy filmu'],
    ['hold rate', 'jaki procent dotrwał do końca'],
    ['bid cap', 'sufit na pojedynczą stawkę w aukcji'],
    ['lookalike', 'grupa podobnych — Meta szuka ludzi podobnych do Twojej listy'],
    ['faza uczenia', 'okres, w którym algorytm zbiera ~50 zdarzeń TYGODNIOWO na zestaw reklam'],
    ['Learning Limited', 'stan trwały: zestaw nie zbierze tych 50 zdarzeń. Sam nie minie'],
    ['atrybucja', 'przypisanie sprzedaży do reklamy, która ją wywołała'],
  ]
  slownik.forEach(([skrot, opis], i) => {
    const x = 110 + (i % 3) * 1170
    const y = 228 + Math.floor(i / 3) * 24
    T(x, y, skrot, 150, 12, PALETTE.blue.stroke)
    T(x + 156, y, opis, 990, 12, G)
  })

  return s
}
