1. Módosítsuk, okosítsuk fel az alkalmazásunkat úgy, hogy RTK Query-t használjunk. Kezeljük a szerverről érkező adatokat! `createApi`-val hozzunk létre egy külön slice-ot, és azt használjuk az előző listakezelő slice helyett! Írjuk meg a `getPuzzles` query-t, exportáljuk megfelelően a hozzá tartozó `hookot`, illetve a slive `reducer`-ét is. Adjuk hozzá a reducer-t a store-hoz, illetve a hozzá tartozó `middleware`-t is. Használjuk a `transformResponse`-t, hogy megfelelő formátumban adjuk vissza az adatunkat.
   A `middleware` fontos, hiszen ez működteti lényegében a:

- automatikus cachelést,
- refetchelést,
- cache invalidációt,
  A `defaultMiddleware` által pedig néhány alap reduxos extra ellenőrzést kapunk, mint például hogy tartalmaz a state-ünk olyan adatokat, amiket nem lehet szerializálni, ellenőrzi a véletlen mutációkat a state-ben, stb

2. Egészítsük ki az alkalmazást hitelesítéssel. Egyelőre oldjuk meg úgy ezt, hogy az egész lista és megfejtés csak hitelesített felhasználók számára legyen elérhető. (Később lehet ezt majd úgy variálni, hogy a lista mindenki számára elérhető, sőt a játék is, de belépett felhasználóval el lehet menteni a megfejtéseket.)

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

FROM HERE:

7. Készítsünk egy `AuthStatus` komponenst, ami a belépés állapotát jelzi: ha nincs belépve felhasználó, akkor ezt írja ki, ha be van lépve, akkor egy kijelentkező gombot jelenít meg, amire kattintva hívjuk meg a `logout` akciót! Az 8. Végezzük el a hitelesítést szerver segítségével! Ehhez készítsünk RTK Query-vel egy API slice-ot, benne egyetlen mutációval (`login`), ami a hitelesítési végpontra küld POST üzenetet a szükséges tartalommal. Használjuk az így kapott mutációt a bejelentkezésre!

8. Tegyük a bejelentkezést és a játékot külön végpontra, azaz készítsük elő az alkalmazásunkat több oldal megjelenítésére! Ehhez telepítsük a react-routert! Alakítsunk ki ehhez hasonló route-struktúrát:

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

```jsx
export const Layout = () => {
  return (
    <>
      <h1>GraphiLogics</h1>
      <AuthStatus />
      <Outlet />
    </>
  );
};
```

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

Amennyiben bejelentkezés során hiba lépett fel, jelenítsük meg az alábbi mezőben a hiba üzenetét a formon belül:

```jsx
<div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded">
  {errors.auth}
</div>
```

4. Legyen a rejtvénylista egy külön oldalon. Itt egy rejtvényt választva kerüljünk a rejtvénymegoldó oldalra. Sikeres megoldás esetén kerüljünk vissza a listaoldalra, és jelöljük, mely rejtvényeket oldottuk már meg!

5. Legyen lehetőség új rejtvényt javasolni.

   - Legegyszerűbb, ha egy textarea-ban megadjuk a felküldeni kívánt szövegtömböt.
   - De lehet csak szöveget is megadni, ebben az esetben kell egy kis transzformáció előtte!
   - Vagy egy kattintgatós táblázatban adunk szerkesztőfelületet.

   ```js
   await addPuzzle({ title, puzzle: JSON.stringify(puzzle.split("\n")) });
   ```

Siker esetén jelenítsük meg az alábbi üzenetet a formon:

```js
<div className="mb-4 p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded">
  Sikeresen hozzáadva!
</div>
```
