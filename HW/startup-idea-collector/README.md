# Startup Idea Collector

Készítsünk egy React alkalmazást, amelyben lehetőségünk van az eltárolt startup ötleteinket megjeleníteni, újakat hozzáadni, illetve meglévő ötletet törölni. A szükséges komponensek elő vannak készítve, illetve a megfelelő helyeken `TODO` kommentek is találhatók, segítve az implementációt.

## App.jsx

- Töltsd be az előkészített state-be az `src/data/data.json`-ben található adatokat, azokat jelenítsd meg a `Card` komponens segítséével, a kommentnek megfelelően.
- Implementáld a `removeItem` és `addItem` függvényeket a feladatnak megfelelően: az előbbi "törli" a state-ben eltárolt, adott id-val rendelkező elemet, az utóbbi hozzáad egy újat.

## Card.jsx

- Defereráld a `prop`okból érkező `item`et és `onRemove` handlert, majd jelenítsd meg az adatokat megfelelően a kommentek helyén, illetve kösd hozzá a handlert megfelelően a `Remove` gomb `onClick`jéhez.

## AddForm.jsx

- Dereferáld a `prop`okból érkező `onAdd`ot, majd ennek segítségével implementáld a megfelelő helyen a form submission handlerjét: `handleSubmit`.
