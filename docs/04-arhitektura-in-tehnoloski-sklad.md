# Arhitektura in tehnološki sklad

## Arhitektura sistema
RoomFlow bo spletna aplikacija z naslednjo arhitekturo:
- Frontend: uporabniški vmesnik v spletnem brskalniku.
- Backend: strežniška aplikacija za obdelavo zahtevkov in izvajanje poslovne logike.
- Podatkovna baza: trajno shranjevanje uporabnikov, sob, rezervacij in blokiranih terminov.

## Podatkovna baza
Uporabila bom podatkovno bazo PostgreSQL, za dostop do nje pa bom uporabila Prisma ORM.

## Avtentikacija oz. upravljanje uporabnikov
Za avtentikacijo bom uporabila sistem Keycloak, ki podpira OpenID Connect (OIDC) protokol. Keycloak bo skrbel za prijavo, upravljanje identitet in preverjanje pristnosti.

Gesla bo torej upravljal Keycloak, aplikacija pa bo hranila zgolj osnovne podatke o uporabnikih, njihove vloge in identifikatorje.

V kasnejši nadrgadnji je predvidena podpora za prijavo prek zunanjih ponudnikov identitete, npr. Microsoft Entra ID ali Google.

## Lokalni razvoj in zagon
Za lokalni zagon bodo potrebni Node.js, npm in Docker.
Postopek:
- Kloniranje repozitorija.
- Namestitev odvisnosti z npm install.
- Nastavitev okoljskih spremenljivk.
- Zagon PostgreSQL z docker compose up -d.
- Izvedba migracij z npx prisma migrate dev.
- Vnos začetnih podatkov.
- Zagon frontenda in backenda z npm run dev.

## Tehnološki sklad
![diagram arhitekture](image-1.png)

## Arhitekturne odločitve
**PostgreSQL** je primeren zaradi povezav med uporabniki, konferenčnimi sobami in rezervacijami. Omogoča transakcije pri preprečevanju dvojnih rezervacij.

**Keycloak** bom uporabila za večjo varnost in ločitev avtentikacije na bolj usposobljeno arhitekturo. Aplikacija bo tako lahko hranila zgolj osnovne podatke o uporabnikih in njihove vloge.

**React in TypeScript** bom uporabila za hiter razvoj modernega grafičnega vmesnika (z uporabo React komponent). TypeScript omogoča tipiziranje spremenljivk za bolj berljivo in varnejšo kodo.

**Prisma ORM** bom uporabila za delo s podatkovno bazo v JavaScriptu.

