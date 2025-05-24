# Redux Toolkit

A félév második felében a `Redux`-szal ismerkedtünk meg, ami egy állapotkezelő könyvtár főként React alkalmazásokhoz. Az alapgondolat az, hogy az alkalmazás állapotát ne szétszórva, különböző komponensekben tartsuk, hanem egy **központi "tárhelyen" (store)**.

## Miért használjuk a Reduxot?

A Redux célja, hogy:

- **Központosítsa** az állapotkezelés logikáját (`slice`, `reducer`, `action`)
- **Átláthatóvá** tegye az adatfolyamot az alkalmazásban
- **Könnyen integrálhatóvá** tegye az aszinkron műveleteket (`thunk`, `middleware`)
- **Hatékonyabbá** tegye nagy, komplex alkalmazások fejlesztését

Ez különösen akkor hasznos, ha:

- Több komponens osztozik ugyanazon állapoton
- Már nem elegendő a `prop drilling`
- A `Context API` nem ad elég rugalmasságot a bonyolult adatkezeléshez

## Mit ad hozzá a Redux Toolkit?

A `Redux Toolkit` a Redux hivatalos ajánlott eszköztára, amely leegyszerűsíti az állapotkezelés implementálását:

- Csökkenti a boilerplate kódot
- Automatikusan generál `action creator`-okat és `reducer`-eket a `createSlice` segítségével
- Egyszerűsíti a store konfigurálását (`configureStore`)

## Folyamatábra, fontosabb elemek

Az ábra vizuálisan bemutatja, hogyan működik a Redux alapú állapotkezelés. Nézzük, hogy melyik elem mit jelent, milyen szerepet tölt be. Ebben a részben leginkább a mögöttes működés és a "mi történik a háttérben" dolgok vannak összegyűjtve, nem pedig az "így érdemes/ajánlott megírni". Ma már nem írunk nulláról reducer függvényeket, és nem használunk kézzel írt action objektumokat – ezek helyett használjuk a `Redux Toolkit` eszközeit. Itt célja, hogy segítsen megérteni, mi történik a "motorháztető" alatt, amikor az RTK-t használjuk.

### Store

A `Store` a Redux "szívében" található. Ez tárolja az alkalmazás globális állapotát (state), valamint a reducereket, amik felelősek az állapot frissítéséért.

### Action, Action Creator

Az ` action` valójában egy egyszerű JavaScript objektum, ami azt írja le, hogy mi történt az alkalmazásban. Ezek igazából az alkalmazás reakciói valamilyen eseményre, mint például egy gomnyomásra. Ilyenkor az action beérkezik a `store`-ba, ott megkapja a `Reducer`, ami eldönti, hogy az érkezett objektum alapján hogyan cselekedjen, milyen változásra van szükség az állapottérben.

```js
// action például:
{
  type: 'counter/increment',
  payload: 1
}

```

Az `action creator` egy függvény, ami visszaad egy action objektumot:

```js
// egyszerű, natív példa egy action creatorra
const increment = () => ({
  type: "counter/increment",
  payload: 1,
});
```

### Middleware

A `middleware` egy köztes réteg az `action` és a `reducer` között, amely lehetőséget ad pl. aszinkron műveletek (API hívások) kezelésére. A Redux Toolkit beépítve tartalmazza a `redux-thunk` middleware-t, ami lehetővé teszi, hogy `action` helyett függvényt dispatch-eljünk.

### Reducer

A `reducer` egy tiszta függvény, ami megkapja a jelenlegi állapotot (`state`) és egy `action`t, majd a beérkezett action objectnek megfelelően "szétswitchel", és visszaad egy új, frissített `state`et. Például:

```js
// egyszerű, natív példa a recurre: ha "increment" típisú action érkezett be, akkor a value értéket megnöveljük,
// by default pedig visszaadjuk az eredeti state-et
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/increment":
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
}
```

### Selector

A `selector` egy egyszerű függvény, amely a globális állapotból egy adott részt kér le, miközben:

- elkülíti a megjelenítési logikát az állapotkezeléstől
- hatékonyabbá teszi a komponens újrarendelését

```js
export const selectCounterValue = (state) => state.counter.value;
```

### View (Komponensek)

A `View` a React komponenseket jelenti, amelyek megjelenítik az adatokat és reagálnak a felhasználói interakciókra. A Redux állapotát a `useSelector()` segítségével olvassuk, míg a `useDispatch()`-al küldünk `action`-öket.

## Naprakész megoldások RTK-val

No, és akkor nézzük meg, hogyan tudjuk mindezt implementálni az `RTK` segítségével. Megnézzük, mik a követendő lépések, találtok rá példát, hogyan:

1. hozzunk létre egy `store`-t
2. kössük be a `store`-t a React alkalmazásba
3. készítsünk egy `slice`-ot (benne `reducer`rel és `action`ökkel)
4. használunk `selector`okat
5. küldünk be `action`öket a komponensekből

### Store létrehozása

```js
// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

A `configureStore`automatikusan beállítja az alap `thunk middleware`-t, a `reducer` kulcs alatt pedig több `slice` is kombinálható. Itt jelenleg egy slice-t hoztunk létre, ez a `counter`. Erre tekinthettek úgy, mintha a `state`-et kisebb alterekre bontanánk, jelenleg ez azt jelenti, hogy létrehoztunk benne egy `counter` alteret. Innentől kezdve nem egy globális állapotunk van, és ezen keresztül kérünk le dolgokat, például: `state.value`, hanem az altéren keresztül érjük ezeket el, például: `state.counter.value`. Ha vizuális szeretnénk látni, hogy mi történik ilyenkor, valahogy így képzelhetjük el:
**ábra**

### Store "provide-olása" a React számára

```jsx
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

A `Provider` komponens teszi elérhetővé a Redux állapotot a komponensfán belül

### Slice létrehozása

```jsx
// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

A `createSlice` automatikusan legenerálja az `action creator`okat és a `reducer`t is a fenti szintaxist követve. Így ötvözve a kettőt nem kell nekünk manuálisan megírni az actionöket, illetve arra sincs szükség, hogy létrehozzunk egy reducert akár egyszerű függvény módjára, akár használva a RTK által kezünkbe adott eszközöket. A fenti kód által kapunk három `action`t a kezünkbe, olyan, mintha azt mondanának pl, hogy:

```js
{
  type: 'counter/incrementByAmount',
  payload: 5
}
```

Illetve, mintha megírnánk manuálisan a hozzá tartozó `reducer`t is:

```js
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/increment":
      return { ...state, value: state.value + 1 };
    case "counter/decrement":
      return { ...state, value: state.value - 1 };
    case "counter/incrementByAmount":
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
}
```

Ahhoz, hogy használni tudjuk ezeket az actionöket, fontos, hogy exportáljuk őket, illetve szintén fontos, hogy a reducert-t is exportáljuk, hiszen másképp nem tudjuk bekötni a store-ba, ahogy azt tettük kicsit feljebb.

### Selectorok írása

Ahhoz, hogy le tudjuk kérdezni az állapottér bizonyos részeit, `selector`okat írunk. Ennek egészen egyszerű a szintaxisa:

```js
// features/counter/counterSlice.js
export const selectCounterValue = (state) => state.counter.value;
```

Gyakran előfordul, hogy nem csak az állapot egy részére van szükségünk, hanem valamilyen `származtatott értékre` – például kétszerezzük meg egy számot, számoljuk össze egy tömb hosszát, stb.

Ha ezt egy sima selectorral csináljuk, akkor felesleges újraszámolások és ezáltal újrarenderelések történhetnek, még akkor is, ha a számítás bemenete nem változott, csak más részletei az állapotnak. Ez rontja a teljesítményt.

`createSelector – Memoizált selectorok`

A reselect könyvtár `createSelector` függvényével `memorizált selectorokat` hozhatunk létre. Ez azt jelenti, hogy ha a bemeneti értékek nem változnak, a selector nem számolja újra az eredményt, hanem visszaadja a korábban eltárolt értéket.

```js
import { createSelector } from "reselect";

export const selectDoubleCounter = createSelector(
  [selectCounterValue],
  (value) => value * 2
);
```

Itt a createSelector első paramétere egy tömb, amiben felsoroljuk a `base selectorokat` (egyszerű állapotlekérő függvények), a második paraméter pedig egy függvény, ami megkapja ezek kimeneteit, és visszaadja a számított értéket.

```js
// VIGYÁZZ, ez a példa ugye azt feltételi, hogy nincs több slice-unk, hiszen nem valami
// "altéren" keresztül kérjük la az állapotot, hanem közvetlenül a state-en keresztül tesszük azt.
const selectA = (state) => state.a;
const selectB = (state) => state.b;
const selectC = (state) => state.c;

export const selectABC = createSelector(
  [selectA, selectB, selectC],
  (a, b, c) => {
    return a + b + c;
  }
);
```

Ez a selector csak akkor fut újra, ha `state.a`, `state.b` vagy `state.c` változik.

### Használat a komponensekből

A megírt `selector`okat egyszerűen a `useSelector` hook segítségével tudjuk használni, átadva neki paraméterül magát a selectort. Erre egy egyszerű példa:

```jsx
import { useSelector } from "react-redux";
import { selectCounterValue } from "./counterSelectors";

const CounterValue = () => {
  const count = useSelector(selectCounterValue);

  return <p>Aktuális érték: {count}</p>;
};

export default CounterValue;
```

Itt a következő történik:

- a `useSelector` figyeli a `store`-t, ha változik a `counter.value` értéke, akkor a komponens újrarenderelődik

Ha pedig `action`t szeretné beküldeni a store-ba, ehhez először is szükségünk lesz a `useDispatch` hook használatára, ezzel kezünkbe kapunk egy `dispatch()`-et, ami meghívja az action creatorokat. Az action általa bekerül a store-ba, a reducer pedig megfelelően módosítja az állapotot:

```jsx
import { useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

const CounterButtons = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>–</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
};

export default CounterButtons;
```
