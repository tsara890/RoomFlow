# Funkcionalnosti in obseg

## Uporabniške vloge

**Uporabnik / zaposlen**: upravlja izključno svoje rezervacije.

**Skrbnik**: upravlja rezervacije in razpoložljivost konferenčnih sob, za katere je odgovoren.

**Administrator**: upravlja celoten sistem, uporabniške račune, pravice in konfiguracijo ter ima po potrebi tudi pravice skrbnika.

### Uporabnik / zaposlen
#### Pravice
- Pregled konferenčnih sob, njihovih lokacij, kapacitet in opreme.
- Preverjanje razpoložljivosti sob za izbrani termin.
- Ustvarjanje rezervacij konferenčnih sob.
- Pregled in preklic lastnih rezervacij.
- Oddaja posebnih rezervacij, ki zahtevajo odobritev.

#### Omejitve
- Ne more urejati podatkov o konferenčnih sobah.
- Ne more spreminjati ali preklicati rezervacij drugih zaposlenih.
- Ne more odobravati posebnih rezervacij.
- Ne more upravljati uporabniških računov in vlog.

### Skrbnik prostorov
#### Pravice
- Pregled rezervacij vseh zaposlenih.
- Odobravanje in zavračanje posebnih rezervacij.
- Blokiranje terminov zaradi vzdrževanja ali drugih razlogov.
- Preklic rezervacij ob upravičenih razlogih.
- Pregled zasedenosti konferenčnih sob.

#### Omejitve
- Ne more upravljati uporabniških računov in vlog.
- Ne more dodajati ali odstranjevati konferenčnih sob.
- Ne more spreminjati sistemskih nastavitev.

### Administrator
#### Pravice
- Upravljanje uporabniških računov in vlog.
- Dodajanje, urejanje in deaktiviranje konferenčnih sob.
- Upravljanje pravil rezerviranja.
- Pregled vseh rezervacij.
- Vse pravice skrbnika prostorov.

#### Omejitve
- Nima dostopa do gesel uporabnikov.

## Predvidene funkcionalnosti
- **Uporabnik, skrbnik, administrator**
Prijava uporabnikov; prijava uporabnikov z e-poštnim naslovom in geslom, s kasnejšo razširitvijo potencialno tudi preko "third party" avtentikacije *MVP*
- **Uporabnik, skrbnik, administrator**
Pregled konferenčnih sob; prikaz sob z lokacijo, kapaciteto in opremo *MVP*
- **Uporabnik, skrbnik, administrator** 
Preverjanje razpoložljivosti; preprečevanje prekrivanja rezervacij in preverjanje prostih terminov *MVP* *domensko specifična f.*
- **Uporabnik, skrbnik, administrator** 
Rezervacija prostora; ustvarjanje rezervacije za izbrano sobo, datum in čas z upoštevanjem konfliktov *MVP* *domensko specifična f.*
- **Uporabnik, skrbnik, administrator**
Upravljanje rezervacij (sprememba časovnega termina, sprememba lokacije, prostora); uporabnik ureja svoje rezervacije, skrbnik in administrator lahko urejata tudi druge *MVP*
- **Skrbnik, administrator**
Odobravanje posebnih rezervacij; skrbnik oz. administrator lahko odobri ali zavrne rezervacijo, ki zahteva dodatno dovoljenje (izven delovnega časa, sobe s posebnim statusom itd.) *MVP* *domensko specifična f.*
- **Uporabnik, skrbnik, administrator** 
Filtriranje konferenčnih sob; iskanje sob glede na lokacijo, kapaciteto, opremo *MVP*
- **Uporabnik, skrbnik, administrator** 
Zgodovina rezervacij; zaposleni ima pregled nad svojo zgodovino rezervacij, skrbnik nad zgodovino prostorov, ki jih upravlja, administrator ima pregled nad zgodovinami vseh uporabnikov
- **Skrbnik, administrator**
Blokiranje konferenčnih sob; lahko se določi časovna obdobja, v katerih prostor ni na voljo (vzdrževanje, čiščenje itd.)
- **Uporabnik, skrbnik, administrator**
Predlaganje alternativnih konferenčnih sob, ki tudi ustrezajo zahtevanim kriterijem oz. so predlagane po vrstnem redu glede na odstopanje od zahtevanih kriterijev (tiste z najmanjšim odstopanjem so predlagane prve)
- **Uporabnik, skrbnik, administrator**
Koledarski prikaz: dnevni in tedenski pregled rezervacij konferenčnih sob.
- **Skrbnik, administrator**
Statistika zasedenosti: analiza uporabe konferenčnih sob in najbolj zasedenih terminov.


## Nadgradnje
- Integracija z Microsoft Outlook in Teams: povezava rezervacije sobe s koledarskim dogodkom in sestankom.
- E-poštna obvestila: obveščanje zaposlenih o potrditvah, zavrnitvah in preklicih.
- QR-prijava ob prihodu: potrditev dejanske uporabe sobe s skeniranjem QR-kode.
- Ponavljajoče se rezervacije: možnost rezervacije sobe za tedenske ali mesečne sestanke.

## Out-of-Scope funkcionalnosti
- Upravljanje fizičnih ključavnic in dostopa do konferenčnih sob.
- Samodejno upravljanje videokonferenčne opreme.
- Integracija z obstoječimi sistemi podjetja, kot sta Microsoft Entra ID ali SAP.