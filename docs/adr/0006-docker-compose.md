
# ADR-0006: Uporaba Docker Compose za lokalni razvoj

- Status: Sprejeto
- Datum: 2026-10-27

## Kontekst in problem

Aplikacija RoomFlow za delovanje potrebuje več komponent, med drugim backend, podatkovno bazo PostgreSQL in sistem za avtentikacijo Keycloak.

Pri lokalnem razvoju je treba zagotoviti, da lahko razvijalci te storitve enostavno zaženejo in uporabljajo v primerljivem okolju.

Ročna namestitev in konfiguracija posameznih storitev na vsakem računalniku lahko povzročita razlike med razvojnimi okolji in otežita pripravo projekta.

## Obravnavane alternative

- **Lokalna namestitev vseh storitev:** PostgreSQL in Keycloak se namestita neposredno na računalnik. To ne zahteva Dockerja, vendar je treba storitve ročno namestiti in konfigurirati.

- **Posamezni Docker vsebniki:** vsako storitev zaženemo z ločenim ukazom `docker run`. Storitve so izolirane, vendar je treba ročno upravljati njihove nastavitve, omrežja in povezave.

- **Docker Compose:** storitve in njihove nastavitve definiramo v skupni konfiguracijski datoteki, kar omogoča njihov usklajen zagon in upravljanje.

## Sprejeta odločitev

Za vzpostavitev lokalnega razvojnega okolja aplikacije RoomFlow je izbran **Docker Compose**.

Z Docker Compose bomo definirali in zaganjali potrebne infrastrukturne storitve, predvsem PostgreSQL in Keycloak.

Njihove nastavitve, omrežne povezave in podatkovne volumne bomo določili v konfiguracijski datoteki `compose.yaml`.

Takšen pristop poenostavi pripravo razvojnega okolja in zmanjša razlike med računalniki razvijalcev.

Frontend in backend se lahko med razvojem izvajata lokalno, brez obvezne uporabe Docker vsebnikov.

## Posledice

### Pozitivne

- Enostavnejši zagon več storitev z enim ukazom.
- Manj ročne namestitve in konfiguracije posameznih storitev.
- Primerljivejše razvojno okolje na različnih računalnikih.
- Izolacija infrastrukturnih storitev od lokalnega operacijskega sistema.
- Možnost trajnega shranjevanja podatkov z Docker volumni.
- Centralizirana konfiguracija storitev in njihovih povezav.

### Negativne

- Razvijalci morajo imeti nameščen Docker z Docker Compose.
- Docker vsebniki porabljajo dodatne sistemske vire.
- Potrebno je osnovno poznavanje Dockerja in omrežnih nastavitev.
- Napačna konfiguracija volumnov lahko povzroči izgubo razvojnih podatkov.
- Docker Compose sam po sebi ne zagotavlja enake konfiguracije kot produkcijsko okolje.