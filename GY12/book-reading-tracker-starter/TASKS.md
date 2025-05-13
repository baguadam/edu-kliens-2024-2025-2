# Olvasólista

A feladat során egy olvasónaplóhoz hasonló alkalmazást fogunk elkészíteni, amiben vezethetjük a könyveinket, hozzáadhatunk, törölhetünk könyvet, illetve váltzotathatjuk a státuszukat: `read` és `unread` között. Az alkalmazás állapotát `Redux Toolkit` (RTK) használatával oldjuk meg, ehhez két `sclice` létrehozása, majd `selectorok` és `action generatorok` használata lesz szükséges.

Telepítsük a `redux-toolkit`et:

```sh
npm install @reduxjs/toolkit
npm install react-redux
```

## store.js

1. Hozzuk létre az eddigieknek megfelelően a store-t a `state` mappában, legyen `store.jsx` a neve, kezdetben hagyjuk meg üresen a `reducer`t, illetve megfelelően ne felejtsük el `provide`-olni az alkalmazás számára.

## bookSlice.js

1. Gondoljuk végig, hogy mi lehetne az alkalmazásunk kezdeti állapota: miket akarunk tárolni a könyvről. Jó lenne tudni, hogy mi az `id`, `title`, `author` és hogy `isRead`, így egy lehetség state:

```js
const initialState = {
  books: [
    {
      id: 1,
      title: "Bűn és bűnhődés",
      author: "F. M. Dosztojevszkij",
      isRead: true,
    },
  ],
};
```

2. Hozzuk létre ennek megfelelően a `bookSlice`-t, állítsuk be az `initialState`-et, exportájuk ki a `reducer`t, majd a `store`-ban használjuk megfelelően. Készüljünk fel arra, hogy most nem csak egy `slice`-szal fogunk dolgozni.

3. Implementáljuk az alábbi három `action`t a nevüknek megfelelően. Ne felejtsük el exportálni őket!

```js
// hozzáadunk egy adott könyvet egy adott szerzőtől. Alapjáraton mindegyik könyv esetén false lesz az isRead,
// id generálásához használjuk a nanoid-t a Redux Toolkitből. Preprocesszáljuk az adatot, mielőtt feldolozzuk azt.
// Mindezt a prepare függvény használatával tudjuk megtenni, akkor az addBook action valahogy így nézne ki:
addbook: {
    reducer(state, action){
        // reducer logika
    },
    prepare({title, author}) {
        return {
            payload: {
                id: nanoid(),
                title,
                author,
                isRead: false
            }
        }
    }
}

// megváltoztatjuk az adott id-jú könyvnek a státuszát: ha read volt unread lesz és fordítva:
toggleReadState(state, {payload: id}) {}

// töröljük az adott id-jú könyvet:
removeBook(state, {payload: id}) {}
```

3. Készítsünk két `selector`t: `selectAllBooks` és `selectBooksByStatus`. Az előbbi szintaxisa egyértelmű, az utóbbi esetén gyakorlatilag egy query kerül be a store-ba, és ennek megfelelően adjuk vissza a kiválasztott id-val rendelkező könyveket:

```js
// használata
useSelector((state) => selectBooksByStatus(state, status));
```

## filterSlice.js

1. Hasonlóképpen döntsük el előbb, hogy mi legyen az `intialState`. Azt akarjuk itt tárolni, hogy mi az aktuálisan kiválasztott filter, ennek három lehetséges értéke van: `all`, `read` és `unread`. Ennek megfelelően a kezdeti állapot lehet valami ilyesmi:

```js
const initialState = {
  status: "all", // 'all' || 'read' || 'unread'
};
```

2. Hozzuk létre ennek megfelelően a `filterSlice`-ot, hasonlóképpen adjunk neki nevet, állítsuk be az `initialState`-et, exportáljuk a `reducer`t, majd adjuk hozzá a `store`-ban.

3. Írjuk meg a `setStatus` actiont, aminek a segítségével beállítjuk a `payload`ban kapott statust

4. Írjuk meg a `selectStatus` selectort, aminek a segítségével le tudjuk kérdezni az aktuális státuszt.

## UI-ra kötés

Kössük össze az eddig implementáltakat és a UI-t!

### Filters.jsx

1. A beégett `currentStatus` érték jöjjön a `store`-ból
2. Adjunk a gombokhoz egy `onClick` eseményt, az adott gombra kattintva küldjük be a `store`-ba egy `setStatus` actiont a gombhoz tartozó statusszal

### BookList.jsx

1. Kérjük le az aktuális `status`-t a `store`-ból: `selectStatus`
2. Kérjük le az adott státusznak megfelelő könyveket: `selectBooksByStatus`
3. Ha nincs könyv a `store`-ban, jelenítsük meg a `Még nem adtál hozzá könyvet` szöveget, különben pedig menjünk végig a könyveken, és mindhez jelenítsük meg a sablont.
4. A megfelelő gombok `onClick`-jére kössük rá a `toggleReadStatus` és `removeBook` akciókat.

### BookForm.jsx

1. Írjuk meg a `handleSubmit`ot, amit rakötünk a form `onSubmit`-jára, ebben, ha volt bevitt szerző és cím, küldjük be a megfelelő objectet a store-ba
