
# ADR-0002: Uporaba React in TypeScript za frontend

- Status: Sprejeto
- Datum: 2026-10-25

## Kontekst in problem

Aplikacija RoomFlow potrebuje interaktiven uporabniški vmesnik za pregled konferenčnih sob, ustvarjanje rezervacij, koledarski prikaz in pregled zgodovine rezervacij.

Uporabniški vmesnik mora omogočati dinamično posodabljanje podatkov in pregledno organizacijo kode.

Izbrati je treba tehnologijo, ki omogoča učinkovito implementacijo teh funkcionalnosti.

## Obravnavane alternative

- **React z JavaScriptom:** omogoča komponentni razvoj uporabniškega vmesnika, vendar nima statičnega preverjanja tipov.
- **React s TypeScriptom:** združuje komponentni pristop Reacta s statičnim preverjanjem tipov.
- **Vue s TypeScriptom:** omogoča reaktiven uporabniški vmesnik in komponentni razvoj, vendar bi zahteval uporabo drugega ogrodja.

## Sprejeta odločitev

Za razvoj uporabniškega vmesnika aplikacije RoomFlow sta izbrana **React in TypeScript**.

React omogoča razdelitev uporabniškega vmesnika na komponente, kot so prikaz sobe, obrazec za rezervacijo in koledar rezervacij.

TypeScript omogoča statično preverjanje tipov, kar pomaga pri odkrivanju napak med razvojem in olajša delo s podatkovnimi strukturami, ki jih frontend prejema iz backenda.

Izbrana kombinacija omogoča pregledno organizacijo kode.

## Posledice

### Pozitivne

- Ponovna uporaba komponent zmanjša podvajanje kode.
- Statično preverjanje tipov pomaga odkrivati napake med razvojem.
- Komponentna zasnova olajša vzdrževanje uporabniškega vmesnika.
- React omogoča učinkovito posodabljanje posameznih delov prikaza brez ponovnega nalaganja celotne strani.
- Širok ekosistem knjižnic omogoča lažjo implementacijo dodatnih funkcionalnosti.

### Negativne

- TypeScript zahteva dodatno definiranje in vzdrževanje tipov.
- Upravljanje stanja in komunikacija z backendom lahko povečata kompleksnost aplikacije.
- Odvisnost od zunanjih knjižnic lahko zahteva posodobitve in prilagoditve kode.
