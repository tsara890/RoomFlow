# RoomFlow - spletni sistem za rezervacijo konferenčnih sob

## Namen rešitve in problem
RoomFlow je spletna aplikacija, namenjena rezervaciji in uporavljanju konferenčnih sob v podjetjih. Omogoča iskanje in rezervacijo prostorov za sestanke, predstavitve, delavnice, klice in druge dogodke.

V večjih podjetjih, kjer je na voljo več konferenčnih sob v različnih nadstropjih ali celo stavbah, je organizacija sestankov lahko težka. Zaposleni nimajo pregleda nad razpoložljivostjo sob, kapaciteto ali opremo.

## Cilji uporabniki
Rešitev je namenjena 3 vrstam uporabnikov:
- Zaposleni; iščejo proste sobe, preverjajo njihovo opremo in kapacitete, ustvarjajo rezervacije
- Skrbniki prostorov; spremljajo rezervacije, odobrijo posebne zahteve, upravljajo dostopnost sob v primeru vzdrževanja
- Administratorji; upravljajo uporabniške račune, vloge, sobe in nastavitve sistema

## Opis delovanja
Zaposleni se v aplikacijo prijavi s svojim uporabniškim računom. Po prijavi lahko pregleda seznam konferenčnih sob, njihove lokacije, kapacitete, razpoložljivo opremo in proste termine.

Pri ustvarjanju rezervacije uporabnik izbere konferenčno sobo, datum, začetni in končni čas ter navede namen sestanka. Sistem preveri razpoložljivost sobe in prepreči rezervacijo termina, ki se prekriva z že potrjeno rezervacijo.

Običajne rezervacije se samodejno potrdijo. Posebne rezervacije, na primer rezervacije zunaj delovnega časa, pa zahtevajo odobritev skrbnika prostorov.

Zaposleni lahko spremlja status svojih rezervacij in jih po potrebi prekliče. Skrbnik lahko odobri ali zavrne posebne rezervacije ter blokira termine, ko konferenčna soba ni na voljo.

Podatki o uporabnikih, konferenčnih sobah, rezervacijah in blokiranih terminih se shranjujejo v relacijsko podatkovno bazo.