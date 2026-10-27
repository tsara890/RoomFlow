
# ADR-0001: Uporaba trinivojske arhitekture

- Status: Sprejeto
- Datum: 2026-10-25

## Kontekst in problem

RoomFlow je spletna aplikacija za rezervacijo konferenčnih sob v podjetjih. Sistem mora omogočati pregled sob, preverjanje razpoložljivosti, upravljanje rezervacij in nadzor dostopa glede na uporabniške vloge.

Pri zasnovi je treba določiti, kako ločiti uporabniški vmesnik, poslovno logiko in shranjevanje podatkov, da bo sistem pregleden in primeren za nadaljnji razvoj.

## Obravnavane alternative

- **Enotna aplikacija:** frontend, backend in dostop do podatkov so izvedeni znotraj enega projekta. Omogoča enostaven začetek, ampak poveča odvisnost posameznih delov sistema.
- **Trinivojska arhitektura:** UI je samostojna aplikacija, ki z backendom komunicira prek REST API-ja, backend dostopa do podatkovne baze.
- **Mikrostoritvena arhitektura:** sistem je razdeljen na več neodvisnih storitev. Omogoča večjo neodvisnost komponent, ampak poveča zahtevnost razvoja in vzdrževanja.

## Sprejeta odločitev

Za aplikacijo RoomFlow je izbrana trinivojska arhitektura.

Frontend bo skrbel za prikaz podatkov in interakcijo z uporabnikom, backend za izvajanje poslovnih pravil ter preverjanje rezervacij, podatkovna baza pa za trajno shranjevanje podatkov.

Trinivojska arhitektura omogoča ustrezno ločitev odgovornosti brez dodatne kompleksnosti, ki bi jo prinesla mikrostoritvena arhitektura.

## Posledice

### Pozitivne
- Jasna ločitev odgovornosti med komponentami.
- Lažje vzdrževanje in nadgrajevanje aplikacije.
- Centralizirano izvajanje pravil rezerviranja.
- Možnost ločenega testiranja posameznih delov sistema.

### Negativne
- Potrebna je komunikacija med frontendom in backendom.
- Razvoj zahteva usklajevanje več komponent.
- Lokalno razvojno okolje je zahtevnejše od enostavne enotne aplikacije.
