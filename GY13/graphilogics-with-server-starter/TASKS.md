1. Készítsünk egy `selectSolutionObject` selectort, aminek a segíségével származtatva vissza tudjuk adni, hogy mik a számok, amik megjelennek felül: `upperNumbers`, illetve bal oldalon: `leftNumbers`. A selector adja vissza a tábla tartalmát is.

```jsx
["# #", " # ", "# #"];

// leftNumbers:
// [1, 1, 2, 1] => 1121 => [1,1], [1] => [2, 1]

// upperNumbers:
const upperNumbers = solution[0]?.map((e, i) =>
  solution
    .map((row) => row[i])
    .join("")
    .split("2")
    .filter((e) => e !== "")
    .map((e) => e.length)
);
```

2. Használd a selectort `Graphologics.jsx`-en belül, a segítségével rajzold ki a számokat fentre, lentre, illetve készítsd el a kezdeti táblát. Ügyelj arra, hogy ha még nincs megadva feladvány, ne errorok, hanem a `Game is loading....` felirat jelenjen meg a tábla helyett. A tábla esetén az adott mező értékétől függően (`COLORS.GRAY`, `COLORS.WHITE`, ˛`COLORS.BLACK`) rendeld a megfelelő stílusosztályt a `td`-hez.

3. Tároljuk el a state-ben, hogy éppen ellerőizzük-e a megoldásunkat: `isSolutionChecked = false`, majd készítsünk két actiont ennek megfelelően: `startSolutionCheck`, `stopSolutionCheck`. A `main.jsx`-ben küldjünk meg egy `startSolutionCheck` actiont, majd 3 másodperc elteltével egy `stopSolutionCheck` action. Először oldjuk meg a feladatot natív módszer segítségével, aztán készítsünk egy `async thunk`-ot hozzá, legyen a neve `checkSolution`

```jsx
store.dispatch(checkSolution());

// következőképpen értelmezzük a kibontott async thunkot:
function checkSolution() {
  return function (dispatch) {};
}
```

4. Írjuk meg a `clickCell` actiont, ami az adott sorhoz, oszlophoz hozzárendeli a paraméterül kapott "színt"

5. Használjuk a `clickCell` actiont a `GraphiLogics` komponensünkben:
   - Bal kattintás segítségével tudjunk feketere színezni egy mezőt, illetve ha fekete, akkor vissza fehérre
   - Jobb kattintás segítségével tudjunk szürkére színezni egy mezőt, illetve ha szürke, vissza fehérre

```jsx
const handleLeftClick = (row, col, actualColor) => {};
const handleRightClick = (row, col, actualColor) => {};
```

6. Készítsünk egy `custom middleware`-t. A Redux Middleware-ek feladata, hogy értelmezze a beérkező action-öket azután, hogy meghívódott a `dispatch()`, de még mielőtt az action beérkezne a reducerbe.

```jsx
const solutionCheckMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const state = getState();

    if (state.nonogram.isSolutionChecked && action.type === "game/clickCell") {
      return;
    }

    next(action);
  };

// majd pedig:
// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(solutionCheckMiddleware),
```

7. Készítsük fel a store-t a rejtvénylisták tárolására! Ehhez hozzunk létre egy külön slice-t: `listSlice`, ahove a `setList` action segítségével tudjuk beküldeni rejtvények tömbjét. Adjuk hozzá az újonnan létrehozott slice reducer-ét a store-hoz. Mi változik azáltal, hogy most már nem csupán egy, alapértelmezett reducer van, hanem egy objectként felsorolva "alterekben" adtuk meg őket? Hol kell módosítani a meglévő kódot?

```jsx
const initialState = [{ id: 1, puzzle: ["###", " # "] }];
```

8. Kérjük le az adatokat szerverről! Ehhez indítsuk el a szervert a `restapi` könyvtárban:

```sh
   cd restapi
   npm install
   npm start
```

9. Készítsünk egy aszinkron thunk-ot [a rejtvények lekérésére](http://localhost:3030/puzzles), ennek a törzse hasonló lesz, mint a korábban írt thunk. A belsején a `fetch-api` segítségével lekérjük a végpontról az adatokat, majd `dispatch`-eljük azt

10. A natív megoldás helyett használjuk a [`createAsyncThunk` akciógenerátort](https://redux-toolkit.js.org/api/createAsyncThunk) a lekérdezésre! Ezzel okosabb eszközt kapunk a kezükben, aminek segítségével tudjuk azt, hogy éppen milyen állapotban van a kérésünk. Erre realáva hozzuk létre `extra reducer`-t, lekezelve, hogy mi történjen, ha teljesült a kérés, stb

11. Módosítsuk, okosítsuk fel az alkalmazásunkat úgy, hogy RTK Query-t használjunk. Kezeljük a szerverről érkező adatokat! `createApi`-val hozzunk létre egy külön slice-ot, és azt használjuk az előző listakezelő slice helyett! Írjuk meg a `getPuzzles` query-t, exportáljuk megfelelően a hozzá tartozó `hookot`, illetve a slive `reducer`-ét is. Adjuk hozzá a reducer-t a store-hoz, illetve a hozzá tartozó `middleware`-t is. Használjuk a `transformResponse`-t, hogy megfelelő formátumban adjuk vissza az adatunkat.
