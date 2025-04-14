# Haiku szerkesztő

Készíts egy haiku szerkesztő alkalmazást! A haiku egy japán versforma: három sorból áll, soronként 5-7-5 szótagot tartalmaz. Egy többsoros szöveges beviteli mezőben legyen lehetőség begépelni a verset. Ha a vers jó formátumú, akkor alkalmazzuk a `good` stílusosztályt a mezőn, ha nem, akkor a `wrong`-ot! Legyen lehetőség a verseinket egy listába gyűjteni és megjeleníteni, a lista egy adott elemére kattintva betölteni a szerkesztőbe, majd azt visszamenteni, végül a lista elemét törölni!

A feladat többféle módon is megoldható:

- React és `useState` használatával
- React és Redux használatával

## React és Redux

1. Telepítsd a függőségeket az `npm install` paranccsal! Ez hozzáadja a redux-toolkitet, a react-redux könyvtárat.
2. Elemezd a keretprogram komponenseit, és gondold át, milyen adatokra lehet szükséged!
3. Tervezd meg az alkalmazásod állapotterét! Sokféleképpen lehet az adatokat tárolni, például így:
   ```js
   {
     editor: "",
     selectedIndex: null,
     haikus: [
       `Téged vártalak
   Mint hajnali fényt éjjel
   Félve-remélve`,
     ],
   }
   ```
   _Megjegyzés: kérdés egyáltalán, hogy a szerkesztő tartalmát kell-e tárolni globálisan? Ha nem, akkor elég lokális állapotváltozóként felvenni az `editor`-t. Akkor kell az állapottérbe is felvenni, ha pl. egy mentés után a szerkesztő tartalmát is vissza szeretnénk állítani._
4. Tervezd meg, milyen akciókat küldenél be, milyen adattartalommal, és ezek milyen változást okoznának az állapottérben! Például szükség lehet az alábbi akciókra:
   - `CHANGE_TEXT`: a szöveg módosításakor (ha egyáltaláb szeretnénk globálisan tárolni)
   - `ADD_HAIKU`: új haiku mentésekor - params: `haiku`
   - `SELECT_HAIKU`: egy haiku szerkesztésre megjelöléséhez - params: `idx`
   - `MODIFY_HAIKU`: a kiválasztott haiku módosításához - params: `editor`
   - `REMOVE_HAIKU`: egy haiku törléséhez - `splice(selectedIndex, 1)`
5. Ezek alapján készítsd el a Redux store-odat (pl. `state/store.js`)! Itt is több lehetőség van:
   1. Natív [Redux](https://redux.js.org/) elemekkel (alacsony szint):
      - akció konstansok
      - akció generátorok
      - reducerek
      - store létrehozása és konfigurálása
   2. [Redux Toolkit](https://redux-toolkit.js.org/) használatával (közepes szint):
      - `configureStore`
      - `createAction`
      - `createReducer`
   3. [Redux Toolkit](https://redux-toolkit.js.org/) használatával (magas szint):
      - `configureStore`
      - `createSlice`
6. Próbáld ki a store-odat még React nélkül:
   - kódból beküldve akciókat és figyelve a változásokat;
   - [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) használatával.
7. Írjál szelektorokat az állapottérhez és próbáld is ki őket kódban! Például:
   - ami visszaadja a szerkesztéshez szükséges információkat: szöveg, magánhangzók száma soronként, jó haiku-e
   - a haikuk listáját és a kiválasztottadik indexét
8. react-redux használatával kösd jelenítsd meg az adatokat a komponensekben! (`Provider`, `useSelector`)
9. react-redux használatával a felületi eseményekre reagálva küldd be a megfelelő akciókat a store-ba! (`useDispatch`)
