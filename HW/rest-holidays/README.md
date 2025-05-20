# Rest Holidays

A feladat során az `RTK query` használata ajánlott, szükséges megfelelően konfigurálni a `store`-t, illetve létrehozni az `api slice`-ot is, teljesen hasonlóan, mint ahogy órán tettük.

Készíts egy alkalmazást, ami lekéri a nager.date (https://date.nager.at/) szolgáltatásban elérhető országok listáját, valamint egy-egy kiválasztott ország ünnepnapjait is meg tudja jeleníteni.

A feladat megoldásához szükséges végpontok:

- [https://date.nager.at/api/v3/AvailableCountries](https://date.nager.at/api/v3/AvailableCountries): Visszaadja a szolgáltatásban elérhető országok listáját.
- [https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}](https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}): Visszaadja az ünnepnapokat egy adott ország adott évében.

Feladatok:

- a. (2 pont) A szolgáltatás által elérhető országok lekérésre kerülnek.
- b. (1 pont) A szolgáltatás által elérhető országok megjelenítésre kerülnek (ország, országkód).
- c. (2 pont) A listában megjelenő országra kattintva lekérésre kerülnek annak ünnepnapjai.
- d. (2 pont) A listában megjelenő országot kiválasztva megjelenítésre kerülnek annak ünnepnapjai.
- e. (1 pont) A listában megjelenő ország legyen egy link, mutasson az adott országkódra (pl. `/HU`)!
- f. (2 pont) A listában megjelenő ország linkjére kattintva az alsó részben routinggal jelenjenek meg az ünnepnapok!

_Megjegyzés: ha a publikus REST API mégsem lenne elérhető, akkor az `src/assets` mappában van két JSON fájl a két végpont válaszát tartalmazván. Így ezt a két lokális fájlt is lehet használni._
