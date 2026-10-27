
# Uporabniške zgodbe – RoomFlow

## US-01: Prijava v aplikacijo

**Povezana funkcionalnost:** Prijava uporabnikov (MVP)

**Uporabniška vloga:** Uporabnik, skrbnik, administrator

**Uporabniška zgodba:** Kot uporabnik želim prijaviti se v aplikacijo s svojim uporabniškim računom, da lahko dostopam do funkcionalnosti glede na svojo vlogo.

**Acceptance criteria:**
- Uporabnik se lahko prijavi z veljavnim e-poštnim naslovom in geslom prek sistema Keycloak.
- Ob uspešni prijavi je uporabnik preusmerjen na začetno stran aplikacije.
- Ob napačnih prijavnih podatkih sistem prikaže sporočilo o neuspešni prijavi.
- Neprijavljen uporabnik ne more dostopati do strani za rezervacije.

## US-02: Pregled konferenčnih sob

**Povezana funkcionalnost:** Pregled konferenčnih sob (MVP)

**Uporabniška vloga:** Uporabnik, skrbnik, administrator

**Uporabniška zgodba:** Kot uporabnik želim pregledati seznam konferenčnih sob, da lahko izberem prostor, ki ustreza potrebam sestanka.

**Acceptance criteria:**
- Sistem prikaže seznam vseh aktivnih konferenčnih sob.
- Za vsako sobo so prikazani ime, stavba, nadstropje in kapaciteta.
- Ob izbiri sobe sistem prikaže tudi seznam razpoložljive opreme.
- Deaktivirane sobe niso prikazane med sobami, ki jih je mogoče rezervirati.

## US-03: Filtriranje konferenčnih sob

**Povezana funkcionalnost:** Filtriranje konferenčnih sob (MVP)

**Uporabniška vloga:** Uporabnik, skrbnik, administrator

**Uporabniška zgodba:** Kot uporabnik želim filtrirati konferenčne sobe glede na lokacijo, kapaciteto in opremo, da hitreje najdem ustrezen prostor.

**Acceptance criteria:**
- Uporabnik lahko filtrira sobe glede na stavbo oziroma lokacijo.
- Uporabnik lahko določi najmanjšo zahtevano kapaciteto sobe.
- Uporabnik lahko izbere zahtevano opremo, sistem pa prikaže samo sobe, ki jo vsebujejo.
- Ob kombinaciji več filtrov sistem prikaže samo sobe, ki ustrezajo vsem izbranim pogojem.
- Če nobena soba ne ustreza filtrom, sistem prikaže sporočilo, da ni ustreznih rezultatov.

## US-04: Preverjanje razpoložljivosti sobe

**Povezana funkcionalnost:** Preverjanje razpoložljivosti (MVP)

**Uporabniška vloga:** Uporabnik, skrbnik, administrator

**Uporabniška zgodba:** Kot uporabnik želim preveriti razpoložljivost sobe za izbran datum in čas, da se izognem rezervaciji že zasedenega prostora.

**Acceptance criteria:**
- Uporabnik lahko izbere datum, začetni in končni čas.
- Sistem preveri, ali se zahtevani termin prekriva z obstoječimi potrjenimi rezervacijami.
- Sistem upošteva tudi blokirane termine sobe.
- Če je soba prosta, sistem omogoči nadaljevanje rezervacije.
- Če je soba zasedena, sistem prikaže sporočilo, da termin ni na voljo.

## US-05: Ustvarjanje rezervacije

**Povezana funkcionalnost:** Rezervacija prostora (MVP)

**Uporabniška vloga:** Uporabnik, skrbnik, administrator

**Uporabniška zgodba:** Kot uporabnik želim rezervirati konferenčno sobo za določen termin, da si zagotovim prostor za sestanek.

**Acceptance criteria:**
- Uporabnik lahko izbere konferenčno sobo, datum, začetni in končni čas ter vnese namen sestanka.
- Sistem ne dovoli rezervacije, če je končni čas enak ali zgodnejši od začetnega časa.
- Sistem pred shranjevanjem ponovno preveri razpoložljivost izbranega termina.
- Če je termin prost in rezervacija ne zahteva posebne odobritve, sistem rezervacijo shrani s statusom CONFIRMED.
- Ob uspešni rezervaciji sistem prikaže potrditev in podatke o ustvarjeni rezervaciji.

## US-06: Pregled lastnih rezervacij

**Povezana funkcionalnost:** Upravljanje rezervacij (MVP)

**Uporabniška vloga:** Uporabnik

**Uporabniška zgodba:** Kot uporabnik želim pregledati svoje rezervacije, da imam pregled nad načrtovanimi sestanki in njihovimi statusi.

**Acceptance criteria:**
- Sistem prikaže seznam rezervacij prijavljenega uporabnika.
- Vsaka rezervacija vsebuje ime sobe, datum, začetni in končni čas ter status.
- Rezervacije so privzeto razvrščene po datumu začetka, od najbližjega termina naprej.
- Uporabnik ne more videti rezervacij drugih uporabnikov v svojem osebnem pregledu.

## US-07: Spreminjanje rezervacije

**Povezana funkcionalnost:** Upravljanje rezervacij (MVP)

**Uporabniška vloga:** Uporabnik

**Uporabniška zgodba:** Kot uporabnik želim spremeniti sobo ali termin svoje rezervacije, da lahko rezervacijo prilagodim spremembam načrta sestanka.

**Acceptance criteria:**
- Uporabnik lahko spremeni sobo, datum, začetni ali končni čas svoje prihodnje rezervacije.
- Sistem pred shranjevanjem sprememb preveri razpoložljivost novega termina.
- Če je novi termin zaseden, sistem zavrne spremembo in ohrani prvotno rezervacijo.
- Če sprememba zahteva posebno odobritev, sistem rezervaciji nastavi status PENDING.
- Uporabnik ne more urejati rezervacij drugih uporabnikov.

## US-08: Preklic rezervacije

**Povezana funkcionalnost:** Upravljanje rezervacij (MVP)

**Uporabniška vloga:** Uporabnik

**Uporabniška zgodba:** Kot uporabnik želim preklicati svojo rezervacijo, da sprostim konferenčno sobo, kadar je ne potrebujem več.

**Acceptance criteria:**
- Uporabnik lahko prekliče svojo prihodnjo rezervacijo, ki še ni preklicana ali zavrnjena.
- Pred preklicem sistem zahteva potrditev uporabnika.
- Po potrditvi sistem spremeni status rezervacije v CANCELLED.
- Preklicana rezervacija ne zaseda več termina in je še vedno vidna v zgodovini.
- Uporabnik ne more preklicati rezervacije drugega uporabnika.

## US-09: Oddaja posebne rezervacije

**Povezana funkcionalnost:** Odobravanje posebnih rezervacij (MVP)

**Uporabniška vloga:** Uporabnik

**Uporabniška zgodba:** Kot uporabnik želim oddati rezervacijo, ki zahteva dodatno odobritev, da lahko zaprosim za uporabo sobe zunaj običajnih pogojev rezerviranja.

**Acceptance criteria:**
- Sistem prepozna rezervacijo zunaj nastavljenega delovnega časa kot posebno rezervacijo.
- Posebna rezervacija se shrani z oznako is_special = true in statusom PENDING.
- Uporabniku se prikaže obvestilo, da rezervacija čaka na odobritev.
- Dokler posebna rezervacija ni odobrena, ni prikazana kot potrjena rezervacija.

## US-10: Odobritev ali zavrnitev posebne rezervacije

**Povezana funkcionalnost:** Odobravanje posebnih rezervacij (MVP)

**Uporabniška vloga:** Skrbnik, administrator

**Uporabniška zgodba:** Kot skrbnik želim odobriti ali zavrniti posebne rezervacije, da lahko nadzorujem uporabo konferenčnih sob v posebnih okoliščinah.

**Acceptance criteria:**
- Skrbnik lahko pregleda posebne rezervacije s statusom PENDING za sobe, za katere je odgovoren.
- Skrbnik lahko posamezno rezervacijo odobri ali zavrne.
- Ob odobritvi sistem ponovno preveri razpoložljivost sobe in rezervaciji nastavi status CONFIRMED samo, če ni konflikta.
- Ob zavrnitvi sistem rezervaciji nastavi status REJECTED.
- Uporabnik brez skrbniških ali administratorskih pravic ne more odobriti ali zavrniti rezervacije.

## US-11: Blokiranje konferenčne sobe

**Povezana funkcionalnost:** Blokiranje konferenčnih sob

**Uporabniška vloga:** Skrbnik, administrator

**Uporabniška zgodba:** Kot skrbnik želim blokirati konferenčno sobo za določeno časovno obdobje, da preprečim rezervacije med vzdrževanjem ali čiščenjem.

**Acceptance criteria:**
- Skrbnik lahko izbere sobo, začetni in končni čas blokade ter vnese razlog.
- Sistem zavrne blokado, če je končni čas enak ali zgodnejši od začetnega časa.
- Če blokada sovpada s potrjeno rezervacijo, sistem prikaže opozorilo in ne ustvari blokade.
- Sistem prepreči ustvarjanje novih rezervacij, ki se prekrivajo z blokiranim obdobjem.
- Skrbnik lahko odstrani obstoječo blokado sobe, za katero je odgovoren.

## US-12: Predlaganje alternativnih sob

**Povezana funkcionalnost:** Predlaganje alternativnih konferenčnih sob

**Uporabniška vloga:** Uporabnik, skrbnik, administrator

**Uporabniška zgodba:** Kot uporabnik želim prejeti predloge alternativnih konferenčnih sob, kadar želena soba ni na voljo, da lahko hitreje najdem ustrezen nadomestni prostor.

**Acceptance criteria:**
- Če izbrana soba ni na voljo, sistem omogoči prikaz alternativnih sob za isti termin.
- Sistem med alternativami prikaže samo aktivne sobe, ki so v zahtevanem terminu razpoložljive.
- Sistem daje prednost sobam, ki ustrezajo zahtevani kapaciteti, lokaciji in opremi.
- Če popolnoma ustreznih sob ni, sistem preostale možnosti razvrsti glede na število kriterijev, ki jim ustrezajo.
- Če ni razpoložljivih alternativ, sistem prikaže ustrezno sporočilo.

## US-13: Pregled zgodovine rezervacij

**Povezana funkcionalnost:** Zgodovina rezervacij

**Uporabniška vloga:** Uporabnik, skrbnik, administrator

**Uporabniška zgodba:** Kot uporabnik želim pregledati zgodovino svojih rezervacij, da lahko preverim preteklo uporabo konferenčnih sob.

**Acceptance criteria:**
- Uporabnik lahko pregleda svoje rezervacije, katerih končni čas je že potekel, in preklicane ali zavrnjene rezervacije.
- Za vsako rezervacijo so prikazani soba, datum, čas in končni status.
- Zgodovina je razvrščena od najnovejše rezervacije do najstarejše.
- Skrbnik lahko pregleduje zgodovino sob, za katere je odgovoren, administrator pa zgodovino vseh rezervacij.
- Ob prazni zgodovini sistem prikaže sporočilo, da ni preteklih rezervacij.

## US-14: Upravljanje uporabniških vlog

**Povezana funkcionalnost:** Upravljanje uporabniških računov in vlog

**Uporabniška vloga:** Administrator

**Uporabniška zgodba:** Kot administrator želim upravljati uporabniške vloge, da lahko zaposlenim dodelim ustrezne pravice za uporabo aplikacije.

**Acceptance criteria:**
- Administrator lahko pregleda seznam uporabnikov z njihovimi imeni, e-poštnimi naslovi in vlogami.
- Administrator lahko uporabniku dodeli vlogo USER, MANAGER ali ADMIN.
- Sistem po spremembi vloge shrani novo vrednost in jo upošteva pri naslednjem preverjanju uporabnikovih pravic.
- Uporabnik brez administratorske vloge ne more spreminjati uporabniških vlog.
- Administrator nima dostopa do gesel uporabnikov, saj avtentikacijo upravlja Keycloak.

## US-15: Upravljanje konferenčnih sob

**Povezana funkcionalnost:** Upravljanje konferenčnih sob

**Uporabniška vloga:** Administrator

**Uporabniška zgodba:** Kot administrator želim dodajati, urejati in deaktivirati konferenčne sobe, da lahko vzdržujem ažuren seznam razpoložljivih prostorov.

**Acceptance criteria:**
- Administrator lahko doda novo sobo z imenom, stavbo, nadstropjem, kapaciteto in opremo.
- Sistem ne dovoli shranjevanja sobe brez imena, stavbe ali kapacitete oziroma s kapaciteto, manjšo od ena.
- Administrator lahko spremeni podatke obstoječe sobe.
- Administrator lahko deaktivira sobo, s čimer prepreči ustvarjanje novih rezervacij zanjo, obstoječi podatki pa ostanejo shranjeni.
- Uporabnik ali skrbnik brez administratorskih pravic ne more dodajati, urejati ali deaktivirati sob.

## US-16: Koledarski prikaz rezervacij

**Povezana funkcionalnost:** Koledarski prikaz rezervacij (nadgradnja)

**Uporabniška vloga:** Uporabnik, skrbnik, administrator

**Uporabniška zgodba:** Kot uporabnik želim pregledovati rezervacije konferenčnih sob v dnevnem in tedenskem koledarskem prikazu, da lahko hitro ugotovim, kdaj so posamezne sobe zasedene oziroma razpoložljive.

**Acceptance criteria:**
- Uporabnik lahko preklaplja med dnevnim in tedenskim koledarskim prikazom rezervacij.
- Sistem za izbrano sobo prikazuje potrjene rezervacije z datumom, začetnim in končnim časom ter blokirane termine.
- Uporabnik lahko z navigacijskimi gumbi prehaja med dnevi oziroma tedni in izbere določen datum.
- Ob kliku na rezervacijo sistem prikaže podrobnosti rezervacije, pri čemer uporabnik vidi samo podatke, do katerih ima ustrezne pravice.
- Koledarski prikaz se po ustvarjanju, spremembi ali preklicu rezervacije ob osvežitvi posodobi in prikaže trenutno zasedenost sobe.

## US-17: Statistika zasedenosti konferenčnih sob

**Povezana funkcionalnost:** Statistika zasedenosti in analiza zgodovine rezervacij (nadgradnja)

**Uporabniška vloga:** Skrbnik, administrator

**Uporabniška zgodba:** Kot skrbnik želim pregledovati statistiko zasedenosti konferenčnih sob na podlagi zgodovine rezervacij, da lahko analiziram uporabo prostorov, prepoznam najbolj zasedene termine in izboljšam razporejanje konferenčnih sob.

**Acceptance criteria:**
- Sistem omogoča pregled statistike rezervacij za izbrano konferenčno sobo ali skupino sob glede na uporabnikove pravice.
- Skrbnik lahko statistiko filtrira po izbranem časovnem obdobju, pri čemer določi začetni in končni datum.
- Sistem prikaže skupno število potrjenih rezervacij in skupno število rezerviranih ur za izbrano obdobje, pri čemer preklicane in zavrnjene rezervacije niso vključene v izračun.
- Sistem prikaže grafični prikaz števila rezervacij po dnevih v tednu oziroma urah dneva, da so razvidni najbolj zasedeni termini.
- Skrbnik lahko pregleduje statistiko samo za sobe, za katere je odgovoren, administrator pa za vse konferenčne sobe.
