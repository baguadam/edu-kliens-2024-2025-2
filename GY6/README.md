# 6. gyakorlat - állapotkezelés, routing

## React Hooks

Reactben a `Hook`ok segítségével tudunk használni különböző React feature-öket a komponenseinkben. Segítségükkel tudjuk a komponenseink állapotát kezelni, szinkronizálni külső rendszerekkel, stb. Fontos, hogy ezek mindig a a komponens legfelső szintjén hívódnak meg. Sosem hívjuk őket feltételtől függően, például:

```jsx
// NE CSINÁLD ÍGY!
if (hasHook) {
  const [data, useData] = useState();
}
```

A hookok igazából speciális függvények, amik neve `use`-zal kezdődik. Létre tudunk hozni saját, custom hookokat is, ezzel majd az anyag későbbi részében fogunk foglalkozni. Részetesebben róluk: [React Hooks](https://react.dev/reference/react/hooks)

## useState - [még több róla itt](https://react.dev/reference/react/useState)

Az első hook, amivel megismerkedünk a `useState`, aminek a segítségével a komponensünk állapotát tudjuk kezelni. Ilyenkor "at top level" egy állapotot vezetünk be az alábbi szintaxissal visszakapva egy tömböt, ami tartalmazza az `állapotváltozó`t és a hozzá tartozó `setter`t

```jsx
const [something, setSomething] = useState(defaultValue);
```

> ### 💡 KONVENCIÓ
>
> A konvenció azt kívánja meg, hogyha az állapotváltozó neve `valami`, akkor a hozzá tartozó setter függvény neve `setValami` legyen!

A settert használva tudjuk változtatni a változó értéket, ezzel re-redert triggerelve a komponensünkben. A setter függvénynek megadhatunk egy konkrét új értéket, vagy akár egy függvényt is, ami segítségével kalkuláljuk a következő állapotot. Ilyenkor ezt a függvényt `updater`nek nevezzük, fontos, hogy "pure" legyen, ne végezzen semmi extra műveletet, egyetlen paramétere a korábbi állapot legyen, és adja vissza a következő állapotot

```jsx
// minden egyes kattintásra meghívja a settert, beállítja 15-re az állapotváltozó értéket, triggerelődik egy re-render
const handleClick = () => {
  setSomething(15);
};

// updater segítségével számoljuk a következő állapotot az előzőből
const handleClickWithUpdater = () => {
  setSomething((s) => s + 12);
};
```

> ### 💡 FONTOS - re-render
>
> Arra vigyázzatok, hogy a setter által beállított érték csak a következő re-render után kerül be ténylegesen a változóba, így például:
>
> ```jsx
> const handleClick = (e) => {
>   setSomething(15);
>   console.log(something); // ezen a ponton a "something" értéke még a korábbi érték, nem pedig a beállított 15
> };
> ```

> ### 💡 FONTOS - updater
>
> Ebből a viselkedésből következik az, hogy az alábbi implementációban bárhányszor kattintok a gombra, amihez hozzá van rendelve a `handleClick`, a something értéke minden egyes kattintással csak EGGYEL fog nőni, nem pedig hárommal, hiszen a végrehajtás során a something végig 1 marad, nem kapja meg a megnövelt értéket a set hívások után.
>
> ```jsx
> const handleClick = (e) => {
>   setSomething(something + 1);
>   setSomething(something + 1);
>   setSomething(something + 1);
> };
> ```
>
> Erre megoldást nyújt, ha a fentebb látott `updater`t használjuk, ugyanis ilyenkor ezek bekerülnek e a queue-ba, a következő re-render alkalmával pedig a React kiszámolja ezek alapján a következő állapotot, úgy, hogy mindig az előző állapotra alkalmazza az updatert:
>
> ```jsx
> const handleClick = (e) => {
>   setSomething((s) => s + 1);
>   setSomething((s) => s + 1);
>   setSomething((s) => s + 1);
> };
> ```

> ### 💡 FONTOS - objects, arrays
>
> Nyilván `object`eket, `tömb`öket is tehetünk a state-be. Azonban nagyon vigyázzatok arra, hogy a state-ek alapvetően `read-only`-k olyan értelemben, hogy mindig új state-et kell beállítanunk, és sosem a meglévőt módosítani. Mit jelen ez a gyakorlatban?
>
> ```jsx
> const defaultObject = { name: "Aladin", vehicle: "Szőnyeg" };
> const [character, setCharacter] = useState(defaultObject);
> // NEM:
> character.name = "Csodalámpa";
>
> // HANEM:
> const handleChange = () => {
>   // ezzel létrejön egy új object, amibe spreadeljük a régit + nevet változtatjuk
>   setCharacter({ ...character, name: "Csodalámpa" });
> };
> ```

## myplayist-sitebuild-component

> ### 📝 1. feladat
>
> Vegyél fel egy konstanst, hogy melyik playlist legyen kiválasztva, és ennek megfelelően alkalmazd az `active` stlusosztályt a megfelelő elemen! Használd a `classnames` csomagot! Erről részletesebben itt olvashatsz: [classnames](https://www.npmjs.com/package/classnames)

```jsx
// használatra példa:
<div classNames={classNames("btn", { pressed: isPressed })}>
```

Adott esetben a `PlaylistsList` komponensen belül kellene felvennünk a konstanst, hogy melyik itemet szeretnénk aktívnak, majd ezt lecsorgat a `PlaylistItem` komponensnek, ott pedig ennek megfelelően alkalmazni a stílusosztályt.

```jsx
const PlaylistsList = () => {
  const activeIndex = 2;

  // ...
  {
    examplePlaylists.map((playlist) => (
      <PlaylistItem
        key={playlist.id}
        title={playlist.title}
        length={playlist.tracks.length}
        isActive={activeIndex === playlist.id} // lecsorgatjuk, hogy az adott item active-e
      />
    ));
  }
  // ...
};
```

```jsx
// importáljuk a classnames csomagot
import classNames from "classnames";

// megfelelően feltételesen alkalmazzuk az active stílust
const PlaylistItem = ({ title, length, isActive }) => {
  return <div className={classNames("item", { active: isActive })}>...</div>;
};
```

> ### 📝 2. feladat
>
> Oldjuk meg azt, hogy változzon meg az adott **playlist itemre** történő kattintáskor, hogy éppen melyik osztály van aktívra állítva (nyilván éppen az legyen, amelyikre kattintok)

Ezzel a feladattal vezetjük meg az állapotkezelést Reactben. Ehhez a `useState`-et fogom használni.
Amikor az állapot megváltozik, triggerelődik a komponens, hogy töltsön be még egyszer -> az állapotváltozás leköveti, amit látunk, emiatt például

```jsx
const [active, setActive] = useState(2); // default érték a belső állapotra
setActive(4); // generálunk egy végtelen loopot ezzel, így lehal a komponens, mert folyamatosan triggerelődik a rerender
```

Érdemes használni a `React Dev Tools` a böngészőben, ennek segítségével meg tudjuk nézni, hogy éppen mi a komponensünk állapota, milyen `hook`okat használ, milyen `props`okat kap.

A feladat megoldása szempontjából most nyilván a `PlaylistsList` komponensben kellene eltárolnunk state-ként, hogy melyik az aktív itemünk, ennek a setterét lecsorgatni a `PlaylistItem` komponensnek, ahol egy `handleItemClick` methodban ha kattintás történt, beállítjuk a setter segítségével a parent komponensben az active-ot.

> ### 💡 MEGJEGYZÉS
>
> Nem működne az a megközelítés, hogy a gyerek komponensben tárolnánk el, hogy éppen közülük melyik az aktív. Ilyenkor minden létrehozott komponens rendelkezne egy saját aktív state-tel, egymástól függetlenül. Mi őket "összekapcsolva" akarjuk jelezni, hogy közülük éppen melyik van kattintva, ezért az ehhez szükséges állapotot az ő parent komponensükben kell létrehozni, tárolni, így összekapcsolva őket.

```jsx
const PlaylistsList = () => {
  const [activeIndex, setActiveIndex] = useState();

  // ...
  {
    examplePlaylists.map((playlist) => (
      <PlaylistItem
        key={playlist.id}
        playList={playlist}
        isActive={activeIndex === playlist.id}
        setActiveIndex={setActiveIndex} // lecsorgatjuk a settert
      />
    ));
  }
  // ...
};
```

```jsx
import classNames from "classnames";

const PlaylistItem = ({ playList, isActive, setActiveIndex }) => {
  // handler, amin belül meghívjuk a settert az aktuális id-val
  const handleItemClick = () => {
    setActiveIndex(playList.id);
  };

  // a divhez hozzárendeljük az onClick eseményt és a handlert
  return (
    <div
      onClick={handleItemClick}
      className={classNames("item", { active: isActive })}
    >
      ...
    </div>
  );
};

//...
```

> ### 💡 MEGJEGYZÉS
>
> Egy komponens általában négyszer renderelődik újra:
>
> 1. amikor betölt a komponens (mountol)
> 2. amikor megváltozik egy property-jének az értéke
> 3. amikor a szülője újrarenderelődik
> 4. amikor a useState-et változtatjuk

## to-do-app

A feladat semmi újat nem tartalmaz, ugyanazokat a lépéseket vesszük végig, amikkel már foglalkoztunk. A kód viszonylag rövid, könnyen értelmezhető, de a lényegi részeket kiemeli:

- hogyan tudunk adatokat lecsorgatni komponensek között
- bevezetünk egy állapotot a parent komponensben, használjuk a `useState`-et, majd ezt frissítjük attól függően, milyen változás történik valamilyen childban
- stílust alkalmazunk feltételesen
- conditional rendering

## myplaylist-layout-router

A feladatban megkapjuk a korábbi playlistes feladatunk megoldását, megfelelően komponensekre szervezve, minden lényeges funkcionalitással. Azt fogjuk megnézni, hogyan tudjuk Reactben megoldani a routingot. Ez a rész kifejezetten szorosan az első beadandóhoz nem kapcsolódik, de egyébként meg nagyon fontos és hasznos része az anyagnak.

> ### 📝 1. feladat
>
> Oldjuk meg azt, hogy változzon meg az adott **playlist itemre** történő kattintáskor, hogy éppen melyik osztály van aktívra állítva (nyilván éppen az legyen, amelyikre kattintok)

Tahát a cél az lenne, hogy hozzunk létre egy `layout` mappát, amin belül lesz egy `Layout` komponensünk. Ez a komponens foglalja magába a `Menu`t, illetve jelenítse meg az összes többi komponenst, amit `children`ként megkap. Ez eddig nagyon újat nem tartalmaz

```jsx
export function App() {
  return (
    <>
      <Layout>
        <Home />
        <Playlists />
        <Tracks />
        <Search />
      </Layout>
    </>
  );
}
```

```jsx
const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <div className="ui-container">{children}</div>
    </>
  );
};
```

> ### 📝 2. feladat
>
> `React Router` segítségével most egy `client side routing`-ot fogunk alkalmazni, egy `SPA (Single Page Application)`-t valósítunk meg. Amikor betöltjük az alkalmazást, kapunk egy HTML fájlt a hozzá tartozó CSS-sel és JS-sel, ez lesz felelős azért, hogy az oldal tartalmát az alapján változtassuk meg, hogy melyik elemre nyomunk rá. Így gyorsabb felhasználói élményben lehet részünk, hiszen nem kell újra meg újra betölteni az oldalakat, csak JS-sel módosítani, hogy éppen mi legyen renderelve.

Első körben telepítsük fel ehhez a `react-router-dom`-ot, majd oldjuk meg a feladatot

- **BrowserRouter**: felelős azért, hogy a client side routingot megoldja, eltárolja a jelenlegi locationt, segít navigálni, stb. Ebben a komponensbe csomagoljuk bele a lényegi részeket, amiket routolni szeretnék: `HOC (Higher Order Component)`
- **Routes**: ennek a segítségével szeretnénk elágazásokat létrehozni az alkalmazásban attól függően, hogy mit szeretnék megjeleníteni. Ezen belül kell specifikálni a **Route**-okat.
- **Route**: ez felel azért, hogy váltogathassunk a különböző komponensek között. Van több lényege propja is: `element`, `path`, stb.

```jsx
<BrowserRouter>
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </Layout>
</BrowserRouter>
```

> ### 📝 3. feladat
>
> Tegyük működőképessé az oldalt, ehhez a `Menu` komponsben kell a navigációt specifikálni. Használjuk először a `Link` komponenst a `react-router-dom`ból, itt a `To` attribútummal tudjuk megadni, hogy hova akarunk menni:

```jsx
import { Link } from "react-router-dom";

//...
<Link className="item" to="/playlists">
  <i className="headphones icon"></i> My Playlists
</Link>;
//...
```

> ### 💡 MEGJEGYZÉS
>
> Viszont sokkal inkább a `NavLink` komponenst fogjuk alkalmazni, ennek segítségével nyomon tudjuk követni azt, hogy éppen melyik komponens az aktív. A NavLink komponens automatikusan hozzáteszi az `active` stílusosztályt, így ehhez nekünk jelenleg semmi extra funkcionalitást nem kell definiálnunk:

```jsx
import { NavLink } from "react-router-dom";

// ...
<NavLink className="item" to="/">
  <i className="home icon"></i> Home
</NavLink>;
// ...
```

> ### 📝 4. feladat
>
> Hozzunk létre egy legfelsőbb szintű route-ot, legyen ez a...

Első körben létre kell hozni egy legfelső színtű route-ot, ebbe teszem bele az összes többit. Neki elementkét állítom be, hogy mi legyen a legmagasabb szintű route, ez nyilván a `Layout` lesz. Ebből következik, hogy így a korábbi `Layout` wrappert ki kell vennem most már a `Routes` körül. Így ebbe a magasabb szintű `Route`-ba teszem bele a többi `Route` elemet. A default útvonalat megjelölöm az `index` attribútummal:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/search" element={<Search />} />
    </Route>
  </Routes>
</BrowserRouter>
```

Ezt követően már a `Layout`ban sincs szükségem a `children`re, hiszen most már nem olyan formátumban használom. Azt teszem, hogy az `Outlet` segítségével jelenítem meg az éppen benne renderelt komponenst:

```jsx
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="ui-container">
        <Menu />
        <Outlet />
      </div>
    </>
  );
};
```

A `/*` segítségével tudok bármilyen megadott route-ra matchelni, így ennek a segítségével tudjuk azt is megoldani, hogy ha olyan route érkezik, ami nincs defininálva, akkor automatikusan dobjon vissza a `Home`ra. Ehhez a `Navigate`-et fogjuk alkalmazni:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/search" element={<Search />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
</BrowserRouter>
```

> ### 📝 4. feladat
>
> Tüntessük fel az URL-ben, hogy éppen melyik playlist van kiválasztva: `/playlists/4` pl.

Ehhez először oldjuk meg, hogy az adott elemekre változzon az URL, majd pedig a `useParams` hookot használva state helyett így jelenítsük meg, hogy éppen melyik az aktív playlist. Ehhez először a `PlaylistList` komponenst kell módosítani a következőképpen:

```jsx
<Link
  to={`/playlists/${playlist.id}`}
  className={cn("item", { active: playlist.id === selectedPlaylistId })}
  key={playlist.id}
></Link>
```

Majd pedig létre kell hoznunk egy `dynamic route`ot a `/playlists`en belül:

```jsx
<Route path="/playlists" element={<Playlists />}>
  <Route path=":id" element={<Playlists />} />
</Route>
```

Ezt követően használjük a `Playlists` komponensben a `useParams` hookot, ami egy objecttel tér vissza, ebből ki tudjuk szedni a paraméterben kapott id-t:

```jsx
const { id } = useParams();
```

majd így ezt az ID-t tudjuk továbbpasszolni, és ennek a segítségével beállítani, hogy mi legyen active. Itt vigyázzunk arra, hogy amit kapunk a `useParams`-szal, az most egy string lesz, egy szinttel lejjebb pedig egy számmal próbáljuk összehasonlítani.
