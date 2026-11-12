# Sistem za rezervacijo sob (RoomFlow)

## Opis projekta

Projekt predstavlja spletno aplikacijo za pregledovanje razpoložljivosti sob in upravljanje njihovih rezervacij. Namen sistema je poenostaviti postopek rezervacije ter omogočiti pregled nad uporabo prostorov.

## Glavne funkcionalnosti

Trenutno implementirane funkcionalnosti:
- Pregled aktivnih konferenčnih sob.
- Filtriranje sob po stavbi, kapaciteti in opremi.
- Preverjanje razpoložljivosti sob.
- Ustvarjanje rezervacij.
- Pregled lastnih rezervacij.
- Spreminjanje in preklic rezervacij.

Načrtovane funkcionalnosti vključujejo avtentikacijo uporabnikov, odobravanje posebnih rezervacij, koledarski prikaz rezervacij ter statistiko uporabe sob.

## Tehnološki sklad

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Podatkovna baza:** PostgreSQL
- **ORM:** Prisma
- **Kontejnerizacija:** Docker

Podrobnejši opis je v dokumentu [Arhitektura in tehnološki sklad](docs/04-arhitektura-in-tehnoloski-sklad.md).

## Dokumentacija

- [Zasnova rešitve](docs/01-zasnova-resitve.md)
- [Funkcionalnosti in obseg](docs/02-funkcionalnosti-in-obseg.md)
- [Podatkovni model](docs/03-podatkovni-model.md)
- [Arhitektura in tehnološki sklad](docs/04-arhitektura-in-tehnoloski-sklad.md)
- [Uporabniške zgodbe](docs/05-uporabniske-zgodbe.md)
- [Wireframes](docs/06-wireframes.md)
- [Arhitekturne odločitve](docs/adr/)

## Struktura projekta

- `frontend/` – uporabniški vmesnik v Reactu.
- `backend/` – strežniški del aplikacije in Prisma.
- `docs/` – projektna dokumentacija, wireframe-i in arhitekturne odločitve.
- `docker-compose.yml` – konfiguracija PostgreSQL podatkovne baze.

## Lokalni zagon projekta

### 1. Predpogoji

Za lokalni zagon morajo biti nameščeni:

- Node.js in npm
- Docker Desktop
- Git (za kloniranje repozitorija)

### 2. Prenos projekta

Projekt prenesemo z GitHuba:

```bash
git clone https://github.com/tsara890/RoomFlow.git
cd RoomFlow
```

Projekt lahko prenesemo tudi kot ZIP arhiv in ga razširimo v poljubno mapo. V nadaljevanju ukaze izvajamo v glavnem direktoriju `RoomFlow`, razen kjer je navedeno drugače.

### 3. Zagon PostgreSQL

Zaženemo Docker Desktop in v glavnem direktoriju projekta izvedemo:

```bash
docker compose up -d
```

Preverimo delovanje:

```bash
docker compose ps
```

Podatkovna baza PostgreSQL se izvaja na vratih `5432`.

### 4. Namestitev backend odvisnosti

Premaknemo se v mapo `backend`:

```bash
cd backend
npm install
```

V mapi `backend` ustvarimo datoteko `.env` z naslednjo vsebino:

```env
DATABASE_URL="postgresql://roomflow:roomflow@localhost:5432/roomflow?schema=public"
```

Podatki ustrezajo lokalni razvojni podatkovni bazi iz `docker-compose.yml`.

### 5. Inicializacija podatkovne baze

V mapi `backend` izvedemo:

```bash
npx prisma migrate deploy
npx prisma generate
```

Prvi ukaz ustvari potrebne tabele z uporabo obstoječih migracij, drugi pa generira Prisma Client.

### 6. Priprava testnih podatkov

Nova podatkovna baza je sprva prazna. Za preizkus aplikacije potrebujemo vsaj enega uporabnika in konferenčne sobe.

V glavnem direktoriju projekta zaženemo:

```bash
docker exec -it roomflow-db psql -U roomflow -d roomflow
```

Ustvarimo testnega uporabnika:

```sql
INSERT INTO "User" ("id", "name", "email", "role")
VALUES (
  gen_random_uuid()::text,
  'Testni uporabnik',
  'test@roomflow.local',
  'USER'
)
ON CONFLICT ("email") DO NOTHING;
```

Dodamo tri testne konferenčne sobe:

```sql
INSERT INTO "Room"
  ("id", "name", "building", "floor", "capacity", "equipment", "isActive")
VALUES
  (gen_random_uuid()::text, 'Soba A', 'Stavba A', 1, 6, 'Projektor, TV', true),
  (gen_random_uuid()::text, 'Soba B', 'Stavba A', 2, 12, 'TV', true),
  (gen_random_uuid()::text, 'Soba C', 'Stavba B', 1, 20, 'Projektor, Tabla', false);
```

*Opomba: Vnos sob izvedemo samo enkrat, saj ponovna izvedba ustvari dodatne zapise.*

ID testnega uporabnika pridobimo z:

```sql
SELECT id, email FROM "User";
```

ID si shranimo za naslednji korak in zapustimo PostgreSQL z ukazom `\q`.

### 7. Namestitev frontend odvisnosti

V glavnem direktoriju projekta izvedemo:

```bash
cd frontend
npm install
```

V mapi `frontend` ustvarimo datoteko `.env.local`:

```env
VITE_TEST_USER_ID=UUID_TESTNEGA_UPORABNIKA
```

Vrednost `UUID_TESTNEGA_UPORABNIKA` zamenjamo z ID-jem, pridobljenim v prejšnjem koraku.

### 8. Zagon aplikacije

Za delovanje aplikacije morajo biti zagnani PostgreSQL, backend in frontend.

**Terminal 1 – PostgreSQL:**

V glavnem direktoriju:

```bash
docker compose up -d
```

**Terminal 2 – Backend:**

```bash
cd backend
npm run dev
```

Backend je dostopen na:

`http://localhost:3000`

Preverjanje povezave s podatkovno bazo:

`http://localhost:3000/health`

**Terminal 3 – Frontend:**

```bash
cd frontend
npm run dev
```

Aplikacija je običajno dostopna na:

`http://localhost:5173`

Če Vite izpiše drugačen naslov, uporabimo naslov iz terminala.

### 9. Ustavitev aplikacije

Backend in frontend ustavimo s `Ctrl + C` v pripadajočih terminalih.

PostgreSQL ustavimo z ukazom v glavnem direktoriju:

```bash
docker compose down
```

Podatki ostanejo shranjeni v Dockerjevem podatkovnem volumnu.

## Status projekta

Projekt je v fazi implementacije MVP. Osnovne funkcionalnosti pregleda sob, rezervacij in njihovega upravljanja so implementirane. Razvojne naloge in napredek se spremljajo z GitHub Issues, Pull Requesti in GitHub Projects.