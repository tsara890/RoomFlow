
# ADR-0003: Uporaba podatkovne baze PostgreSQL

- Status: Sprejeto
- Datum: 2026-10-25

## Kontekst in problem

Aplikacija RoomFlow potrebuje podatkovno bazo za shranjevanje uporabnikov, konferenčnih sob, rezervacij in drugih povezanih podatkov.

Podatkovni model vsebuje več medsebojno povezanih entitet. Vsaka rezervacija je povezana z določeno sobo in uporabnikom, zato je pomembno zagotavljanje referenčne integritete podatkov.

Sistem mora omogočati tudi zanesljivo preverjanje razpoložljivosti sob in preprečevanje konfliktnih rezervacij, tudi kadar več uporabnikov poskuša istočasno rezervirati isto sobo.

## Obravnavane alternative

- **SQLite:** lightweight relacijska podatkovna baza, ki ne potrebuje ločenega podatkovnega strežnika. Primerna je za manjše aplikacije, vendar ima omejitve pri sočasnem zapisovanju več uporabnikov; več uporabnikov lahko hkrati bere podatke, ampak naenkrat lahko v isto podatkovno bazo zapisuje samo 1 uporabnik

- **MongoDB:** dokumentna NoSQL podatkovna baza, ki omogoča prilagodljivo strukturo podatkov. Shranjevanje rezervacije kot dokument bi bilo bolj težavno, saj brez FOREIGN KEY ne moremo preverjati obstoj rezervacije ali sobe, ki ne obstajata

- **PostgreSQL:** omogoča uporabo EXCLUDE omejitev, s katerimi lahko na ravni podatkovne baze preprečimo prekrivanje rezervacij iste sobe, možen je sočasen dostop večih zapisovalcev.s

## Sprejeta odločitev

Za podatkovno bazo aplikacije RoomFlow je izbran **PostgreSQL**.

Relacijski podatkovni model je primeren za povezave med uporabniki, sobami in rezervacijami.

PostgreSQL omogoča uporabo primarnih in tujih ključev za zagotavljanje referenčne integritete ter transakcij za zanesljivo izvajanje podatkovnih operacij.

Pri ustvarjanju rezervacij je pomembno preprečiti, da bi dva uporabnika istočasno rezervirala isto sobo za prekrivajoč se časovni interval.

V primerjavi s SQLite je PostgreSQL primernejši za predvideno večuporabniško uporabo sistema. MongoDB pa za trenutni pretežno relacijski podatkovni model ne prinaša pomembnih prednosti.

## Posledice

### Pozitivne

- Podpora relacijam med povezanimi entitetami.
- Zagotavljanje referenčne integritete s tujimi ključi.
- Podpora transakcijam in sočasnemu dostopu več uporabnikov.
- Možnost implementacije podatkovnih omejitev za preprečevanje konfliktnih rezervacij.
- Podpora kompleksnejšim SQL poizvedbam za statistiko in zgodovino rezervacij.
- Primerna osnova za nadaljnjo širitev aplikacije.

### Negativne

- PostgreSQL zahteva nastavitev in vzdrževanje podatkovnega strežnika.
- Za lokalni razvoj je potrebna ustrezna konfiguracija povezave s podatkovno bazo.
- Spremembe strukture podatkovne baze zahtevajo upravljanje migracij.
- Pravilno preprečevanje sočasnih konfliktnih rezervacij zahteva dodatno načrtovanje transakcij oziroma podatkovnih omejitev.