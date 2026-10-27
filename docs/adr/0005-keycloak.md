
# ADR-0005: Uporaba Keycloak in OpenID Connect za avtentikacijo

- Status: Sprejeto
- Datum: 2026-10-25

## Kontekst in problem

Aplikacija RoomFlow potrebuje sistem za prijavo uporabnikov in preverjanje njihove identitete.

Uporabniki morajo imeti dostop do funkcionalnosti glede na svojo vlogo, na primer ustvarjanje rezervacij ali upravljanje konferenčnih sob.

Pri zasnovi sistema je treba določiti, kako varno izvajati prijavo uporabnikov, upravljati njihove identitete in preverjati njihove pravice.

Lastna implementacija celotnega sistema prijave bi zahtevala dodatno razvojno delo ter skrb za varno hranjenje gesel, upravljanje sej in druge varnostne mehanizme.

## Obravnavane alternative

- **Lastna implementacija prijave:** backend sam preverja gesla, upravlja uporabniške seje in izdaja prijavne žetone. Omogoča popoln nadzor, vendar zahteva več razvoja in vzdrževanja varnostnih funkcionalnosti.

- **Firebase Authentication:** zunanja storitev za prijavo uporabnikov, ki podpira različne načine avtentikacije. Poenostavi implementacijo, vendar poveča odvisnost od zunanjega ponudnika.

- **Keycloak z OpenID Connect:** samostojen sistem za upravljanje identitet in prijave uporabnikov. Omogoča uporabo standardnega protokola OIDC ter centralizirano upravljanje uporabnikov in njihovih vlog.

## Sprejeta odločitev

Za avtentikacijo uporabnikov aplikacije RoomFlow je izbran **Keycloak z uporabo protokola OpenID Connect (OIDC)**.

Keycloak bo skrbel za preverjanje identitete uporabnikov in upravljanje njihove prijave.

Aplikacija bo uporabljala standardni prijavni postopek OIDC, pri katerem se uporabnik prijavi prek Keycloaka, RoomFlow pa preveri pridobljene prijavne podatke oziroma žetone.

Takšna rešitev zmanjša potrebo po lastni implementaciji varnostno občutljivih funkcionalnosti, kot sta preverjanje gesel in upravljanje prijavnih sej.

Keycloak omogoča tudi centralizirano upravljanje uporabnikov in vlog, medtem ko bo backend aplikacije preverjal pravice za izvajanje posameznih operacij.

V primerjavi z lastno implementacijo prijave je izbrana rešitev manj zahtevna z vidika razvoja avtentikacijskih mehanizmov. V primerjavi s Firebase Authentication pa omogoča večji nadzor nad lastno infrastrukturo za upravljanje identitet.

## Posledice

### Pozitivne

- Ni potrebe po lastni implementaciji preverjanja in shranjevanja uporabniških gesel.
- Uporaba standardnega protokola OpenID Connect.
- Centralizirano upravljanje uporabnikov in njihovih vlog.
- Možnost uporabe dodatnih varnostnih funkcionalnosti, kot je večfaktorska avtentikacija.
- Lažje povezovanje z drugimi sistemi, ki podpirajo OIDC.
- Ločitev upravljanja identitet od poslovne logike aplikacije.

### Negativne

- Za delovanje aplikacije je potrebna dodatna storitev Keycloak.
- Potrebna je pravilna konfiguracija OIDC odjemalca, preusmeritev in prijavnih žetonov.
- Nedosegljivost Keycloaka lahko prepreči nove prijave uporabnikov.
- Razvijalci morajo razumeti osnovno delovanje OIDC in preverjanja žetonov.
- Keycloak zahteva vzdrževanje, posodobitve in ustrezno varnostno konfiguracijo.
