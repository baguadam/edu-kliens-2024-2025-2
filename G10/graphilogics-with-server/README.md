# Grafilogika

Népszerű logikai rejtvény a grafilogika.

> A rejtvény egy téglalap alakú négyzetrácsos hálóból áll, amelynek az egyik vízszintes és az egyik függőleges oldala mellett számok állnak, amelyek azt jelzik, hogy az adott sorban vagy oszlopban mekkora méretű sötét blokkok követik egymást. Minden beszínezett blokkot tetszőleges számú (legalább egy) üres hely választ el egymástól. A játék célja, hogy minden négyzetrácsról eldöntsük, be van-e színezve vagy nem. ([Wikipedia](https://hu.wikipedia.org/wiki/Grafilogika))

A rácsban egy cella háromféle értékű (színű) lehet:

- fehér: még nem tudjuk, hogy blokk vagy üres kerül oda
- fekete: blokk
- szürke: üres

A cellákra kattintva ez a három állapot követi egymást ciklikusan. A játék akkor ér véget, ha a megoldásban és a rácsban pontosan ugyanott vannak fekete cellák.

Készíts webes alkalmazást egy ilyen grafilogikai rejtvény megoldására!

- React + `useState`
- React + Redux
- React + `useReducer`

## React + Redux

1. Telepítsd a szükséges függőségeket (`npm install`) és elemezd a kapott keretprogramot! Ebben a stílusok és egy alap táblázatos elrendezés van megadva!
2. Tervezd meg az alkalmazás állapotterét! Egyelőre csak a játék funkciót készítsük el! Ehhez elegendő tárolni a megoldást és a játéktáblát:
   ```js
   {
     solution: [],
     table: [],
   }
   ```
3. Gondold át a lehetséges akciókat! Például:

   - `START_GAME`: megad egy megoldást valamilyen formátumban, például:

     ```js
     ["# #", " # ", "# #"];

     // SOLUTION map: szétspliteljük "," szerint, majd minden karakterhez - map: hozzámappelünk egy színt

     // TABLE map: szétspliteljük "," szerint, majd minden karakterhez "FEHÉR"

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

   - `CLICK_CELL`: egy cellára kattintunk, megadjuk a cella x-y koordinátáját

4. Ezek alapján készítsd el a Redux store-odat (pl. `state/store.js`)! Itt is több lehetőség van:
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
5. Próbáld ki a store-odat még React nélkül:
   - kódból beküldve akciókat és figyelve a változásokat;
   - [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) használatával.
6. Írjál szelektorokat az állapottérhez és próbáld is ki őket kódban! Például:
   - táblainformáció: bal, felső számok, a tábla celláiról tudnivaló
7. react-redux használatával jelenítsd meg az adatokat a komponensekben! (`Provider`, `useSelector`)
8. react-redux használatával a felületi eseményekre reagálva küldd be a megfelelő akciókat a store-ba! (`useDispatch`)
9. A játékfelületen legyen lehetőség ellenőrizni az eddigi rajzunkat! Egy gombra kattintva a hibás fekete és szürke cellák pirossal jelennek meg pár másodpercig.
   - Egészítsd ki az állapotteret egy `isSolutionChecked` adattaggal, majd a `startSolutionCheck`, `stopSolutionCheck` akciókkal legyen lehetőség ennek értékét változtatni.
   - Küldjünk be a store-ba egy `startSolutionCheck`, majd 3 másodperc múlva egy `stopSolutionCheck` akciót!
   - Szervezzük ki ezt a viselkedést egy aszinkron thunkba (`checkSolution`), és használjuk ezt!
10. Rejtvénylista: jelenítsünk meg egy rejtvénylistát!
    1. Készítsük fel a store-unkat a rejtvénylista tárolására! Ezt pl. tegyük meg egy külön slice-ban, ahova egy `setList` akcióval tudjuk beküldeni rejtvények tömbjét:
       ```js
       const initialState = [{ id: 1, puzzle: ["###", " # "] }];
       ```
    2. Kérjük le az adatokat szerverről! Ehhez indítsuk el a szervert a `restapi` könyvtárban:
       ```
       cd restapi
       npm install
       npm start
       ```
       Ha Postman klienst használsz, akkor ezeket a gyűjteményeket be tudod importálni, és ki tudod őket próbálni:
       - [auth](https://www.getpostman.com/collections/c5105b1b03067fc471ca)
       - [puzzles](https://www.getpostman.com/collections/416cb5f1dfd0cc84a933)
       - [solutions](https://www.getpostman.com/collections/79f5c29291445e796db4)
    3. Készítsünk egy aszinkron thunk-ot [a rejtvények lekérésére](http://localhost:3030/puzzles)!
       ```
       http://localhost:3030/puzzles
       ```
    4. Használjuk a [`createAsyncThunk` akciógenerátort](https://redux-toolkit.js.org/api/createAsyncThunk) a lekérdezésre!
    5. Alakítsuk át a kódot, hogy RTK Query-vel kezeljük a szerverről érkező adatokat! `createApi`-val hozz létre egy külön slice-ot, és azt használjuk az előző listakezelő slice helyett!
11. Egészítsük ki az alkalmazást hitelesítéssel. Egyelőre oldjuk meg úgy ezt, hogy az egész lista és megfejtés csak hitelesített felhasználók számára legyen elérhető. (Később lehet ezt majd úgy variálni, hogy a lista mindenki számára elérhető, sőt a játék is, de belépett felhasználóval el lehet menteni a megfejtéseket.)

    1. Készítsük elő az állapotterünket a hitelesítésre! Ez gyakorlatban egy `user` objektum ürességét, illetve tárolását jelenti. Mivel a szerver JWT-t használ hitelesítésre, ezért azt is eltároljuk:
       ```js
       const initialState = { user: null, token: null };
       ```
    2. Készítsünk egy hitelesítő slice-ot (`authSlice`), aminek két akciója és reducere van:
       - `login`: beállítja a `user` és `token` értékeket
       - `logout`: törli a `user` és `token` értékeket
    3. Legyenek szelektorok a `user` és a `token` lekérdezésére (`selectLoggedInUser`, `selectAuthToken`)
    4. Készítsük elő a `Login` komponenst! Legyen benne egy email és egy jelszó mező! Ehhez lehet használni az ebben a feladattárban szereplő `mini-login` feladat `Login` komponensét!
    5. Használjunk feltételes renderelést a beléptető komponens megjelenítésére! Ha nincs bejelentkezett felhasználó (`selectLoggedInUser`), akkor a `Login` komponens jelenjen meg, különben a grafilogikai lista vagy feladat!
    6. A `Login` komponensben egyelőre ne hívjuk meg a szervert, hanem csak hívjuk meg a `login` akciót valamilyen fake user objektummal és tokennel! Ennek hatására be kell tudnunk lépni!
    7. Készítsünk egy `AuthStatus` komponenst, ami a belépés állapotát jelzi: ha nincs belépve felhasználó, akkor ezt írja ki, ha be van lépve, akkor egy kijelentkező gombot jelenít meg, amire kattintva hívjuk meg a `logout` akciót! Az
    8. Végezzük el a hitelesítést szerver segítségével! Ehhez készítsünk RTK Query-vel egy API slice-ot, benne egyetlen mutációval (`login`), ami a hitelesítési végpontra küld POST üzenetet a szükséges tartalommal. Használjuk az így kapott mutációt a bejelentkezésre!

12. Tegyük a bejelentkezést és a játékot külön végpontra, azaz készítsük elő az alkalmazásunkat több oldal megjelenítésére! Ehhez telepítsük a react-routert! Alakítsunk ki ehhez hasonló route-struktúrát:

    ```jsx
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <GraphiLogics />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
    ```

    - A `Layout` komponens az oldal alap elrendezéséért felel, pl navigációs sávot vagy az `AuthStatus` komponenst tartalmazza, no meg egy `Outlet` komponenst a gyerekroute-ok megjelenítésére.
    - A `RequireAuth` komponens azért felel, hogy ne engedje a `GraphiLogics` komponenst megjelenni bejelentkezés nélkül:

      ```js
      export const RequireAuth = ({ children }) => {
        let user = useSelector(selectLoggedInUser);

        if (!user) {
          return <Navigate to="/login" replace />;
        }

        return children;
      };
      ```

    - A `Login` komponensben siker esetén navigáljunk át a főoldalra:
      ```js
      const navigate = useNavigate();
      navigate("/", { replace: true });
      ```

13. Legyen a rejtvénylista egy külön oldalon. Itt egy rejtvényt választva kerüljünk a rejtvénymegoldó oldalra. Sikeres megoldás esetén kerüljünk vissza a listaoldalra, és jelöljük, mely rejtvényeket oldottuk már meg!
14. Legyen lehetőség új rejtvényt javasolni.
    - Legegyszerűbb, ha egy textarea-ban megadjuk a felküldeni kívánt szövegtömböt.
    - De lehet csak szöveget is megadni, ebben az esetben kell egy kis transzformáció előtte!
    - Vagy egy kattintgatós táblázatban adunk szerkesztőfelületet.
