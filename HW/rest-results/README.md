# Rest Results

Készíts egy alkalmazást, ami egy service-n keresztül képes hallgatók eredményeinek eltárolására, módosítására, töltésére.

A szerver alap URL-je `http://localhost:3030`. A feladat megoldásához szükséges végpontok beimportálhatók Postmanbe `results.postman_collection.json` fájlból. Ezek a következők:

- `GET /results` - összes adat lekérdezése
- `GET /results/:id` - adott id-jú elem lekérdezése
- `POST /results` - új elem létrehozása

```json
{
  "name": "new name",
  "result": 5
}
```

- `PATCH /results/:id` - adott id-jú elem módosítása

```json
{
  "name": "modified name",
  "result": 4
}

{
  "result": 3
}
```

- `DELETE /results/:id` - adott id-jú elem törlése

## Feladatok

a. (2 pont) A hallgatók eredményei lekérésre kerülnek.
b. (1 pont) A hallgatók eredményei megjelenítésre kerülnek.
c. (1 pont) "Új eredmény" gombra kattintáskor egy üres form megjelenik.
d. (2 pont) Lehetőség van új eredmény létrehozására a szolgáltatáson keresztül.
e. (1 pont) Módosítás gombra kattintva megjelennek egy form-ban a kiválasztott eredmény adatai.
f. (2 pont) Lehetőség van az adatok módosítására a szolgáltatáson keresztül.
g. (1 pont) Lehetőség van az adatok törlésére a szolgáltatáson keresztül.
