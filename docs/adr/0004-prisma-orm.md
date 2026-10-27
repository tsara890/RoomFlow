
# ADR-0004: Uporaba Prisma ORM

- Status: Sprejeto
- Datum: 2026-10-25

## Kontekst in problem

Backend aplikacije RoomFlow mora omogočati dostop do podatkovne baze PostgreSQL za pridobivanje in shranjevanje podatkov o uporabnikih, sobah in rezervacijah.

Pri razvoju je treba zagotoviti pregledno izvajanje podatkovnih poizvedb, zmanjšati možnost napak pri delu s podatki in omogočiti upravljanje sprememb podatkovne sheme.

## Obravnavane alternative

- **Neposredne SQL poizvedbe (npr. knjižnica pg):** omogočajo popoln nadzor nad poizvedbami, vendar zahtevajo več ročnega pisanja SQL stavkov in upravljanja podatkovnih struktur.

- **TypeORM:** omogoča objektno-relacijsko preslikavo podatkov, delo z entitetami in upravljanje migracij. Zahteva uporabo lastnega pristopa k definiranju entitet in konfiguraciji ORM.

- **Prisma ORM:** omogoča opis podatkovnega modela v shemi Prisma, generiranje tipiziranega odjemalca za dostop do baze in upravljanje migracij.

## Sprejeta odločitev

Za dostop do podatkovne baze PostgreSQL je izbran **Prisma ORM**.

Prisma omogoča definiranje podatkovnih modelov in njihovih relacij na enem mestu ter generiranje TypeScript odjemalca za izvajanje poizvedb.

To olajša delo s povezanimi podatki o sobah, uporabnikih in rezervacijah ter omogoča preverjanje tipov med razvojem.

Prisma Migrate bomo uporabili za spremljanje in izvajanje sprememb podatkovne sheme.

V primerjavi z neposrednimi SQL poizvedbami Prisma zmanjša količino rutinske kode. V primerjavi s TypeORM je izbrana zaradi pristopa z osrednjo shemo in generiranja tipiziranega odjemalca.

## Posledice

### Pozitivne

- Manj ročnega pisanja običajnih SQL poizvedb.
- Statično preverjanje tipov pri delu s podatkovno bazo.
- Pregledno definiranje podatkovnih modelov in relacij.
- Upravljanje sprememb podatkovne sheme z migracijami.
- Boljše samodejno dopolnjevanje kode v razvojnem okolju.

### Negativne

- Projekt postane odvisen od orodja Prisma in njegovih različic.
- Razvijalci se morajo seznaniti s sintakso in načinom delovanja Prisma ORM.
- Kompleksne ali posebej optimizirane poizvedbe lahko še vedno zahtevajo uporabo SQL.
- Napredne funkcionalnosti PostgreSQL niso nujno neposredno podprte v shemi Prisma.
- Spremembe podatkovnega modela zahtevajo usklajevanje Prisma sheme in podatkovne baze.