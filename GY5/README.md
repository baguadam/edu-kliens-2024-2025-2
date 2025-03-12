## Babel, Webpack, ESBuild

Két fontos fogalom, amiről érdemes, ha tudtuk: `transpiling` és `bundling`

A `transpilingnak` kettős célja van:

- Egy adott JS verziót átforgat egy korábbi verzióra. Amikor megjelentek új nyelvi elemek, de még éltek a régi böngészők, át kellett fordítani őket a régivel kompatibilissé. Sokszor ezek szintaktikai cukorkák
- Nemlétező nyelvi elemeket tudunk létrehozni, azt pedig át tudja fordítani

Viszont ma már inkább: `ESBuild`. Ha `Vite` segítségével hoztok létre React projektet, automatikusan az ESBuildet használ. ESBuild a `transpiling` mellett a `bundlingot` is elvégzi, azaz több JS vagy CSS vagy egyéb webes fájlt összekombinál egy vagy több kisebb fájlba. Például:

Kód bundling ELŐTT:

```js
// utils.js
export function greet(name) {
  return `Hello, ${name}`;
}

// main.js
import { greet } from "./utils.js";
console.log(greet("John"));
```

Kód bundling UTÁN:

```js
function greet(name) {
  return `Hello, ${name}`;
}
console.log(greet("John"));
```

## Első React alkalmazás létrehozása

Korábban jó opció volt a `Create-React-App` használata, azonban ez már deprecatednek számít, úgyhogy célszerű a `Vite`-et használni, ami egy nagyon gyors build tool. Setítségével el tudunk készíteni egy sablon React projektet, feltelepíti a kezdeti szükséges dependency-ket, inicializál szükséges dolgokat, így nem kell manuálisan, kézzel összepakolni mindent:

```sh
npm create vite@latest
```

Itt majd a React-et kell választani, miután megadjuk a projektünk nevét. Célnak most megfelelel a sima `JavaScript` projekt is. Az `SWC`-től itt olvashattok részletesebben, akit érdekel a dolog: [ITT](https://swc.rs/)

### A projekt felépítése

- public/ -> olyan statikus assetek találhatók itt, amiket nem dolgoz fel a Vite

- srs/**main.jsx** -> a belépítési pontja az alkalmazásnak a React számára
- src/**App.jsx** -> ez a main React component
- src/**assets** -> képeket, hasonló dolgokat tárol
- src/**index.css** -> az alkalmazás globális stílusa

- **index.html** -> ez a main HTML file, itt a `root` div-en belülre jön majd az app, module-ként használja a `main.jsx`-et

```jsx
// ####################################
// main.jsx
// ####################################
createRoot(document.getElementById("root")).render(
  // A StrictMode egy "development mode tool", nincs hatással az appra productionben, segít fejlesztés során
  // mindenféle problémák beazonosítani az alkalmazásban
  <StrictMode>
    <App />
  </StrictMode>
);
```

## hello-world

Függvénykomponenst fogunk létrehozni, ennek a függvénynek kell visszatérnia tulajdonképpen azzal a HTML-lel, amit szeretnénk megjeleníteni. React világában `jsx` - megengedi, hogy HTML-szerű "dolgokat" tudjak csinálni. Például valid React kód lesz, ha azt mondom:

```jsx
return <h1>Hello Világ</h1>;
```

> ### 💡 FONTOS
>
> A komponensek nevei MINDIG nagybetűvel kezdődnek, így magának a fájlnak is `KomponensNeve.jsx` a konvencionális elnevezése, illetve a függvény nevénél is hasonlóan járjunk el

```jsx
export default function App() {
  return <h1>Hello, jó, hogy itt vagy!</h1>;
}
```

Kérdés, hogy hogyan tudok React-ben megjeleníteni változókat. Például, ha eltárolnám egy konstans `name`-ben, hogy kit kell üdvözölni? Erre szolgál a `{}`.

```jsx
export default function App() {
  const name = "Ádám";

  return <h1>Hello, jó, hogy itt vagy, {name}!</h1>; // "behelyettesíti" a megadott nevet
}
```

Aztán például el tudjuk érni azt, hogy ha van értéke a name-nek más jelenjen meg, mintha nincs, ezt nevezzük `conditional rendering`nek:

```jsx
export default function App() {
  const name = "Ádám";
  if (name === "") {
    return <h1>Nincs kit üdvözölni</h1>;
  }

  return <h1>Hello, jó, hogy itt vagy, {name}</h1>;
}

// VAGY
export default function App() {
  const name = "Ádám";
  return name === "" ? <h1>Nincs kit üdvözölni</h1> : <h1>Hello, jó, hogy itt vagy, {name}</h1>;
}
```

### Kívülről érkező adatok

A kívülrő érkező adatokat `props`nak nevezzük. Ez egy object lesz ilyenkor. Ha például úgy használom a komponensem, hogy:

```jsx
<Hello name="Ádám" />;

// akkor:
export default function Hello(props) {
  const name = props.name;
  return <h1>{name}</h1>;
}
```

Érdemes és célszerű **objektum destrukturálást haszálni**, ennek a szintaxisa:

```js
const obj = {
  name: "Sanyi",
  age: 18,
};

const { name } = obj;
console.log(name); // Sanyi

// ugyanígy elkérhetném akár mindkettőt:
const { name, age } = obj;

// vagy csak az age-et:
const { age } = obj;
```

Tehát a komponensünkben:

```jsx
export default function Hello({ name }) {
  return <h1>{name}</h1>;
}
```

> ### 💡 MEGJEGYZÉS
>
> Ahogy azt tapasztaltátok, az ESLin ezen a ponton panaszkodik, hogy nem csináltunk type validálást rájuk. Erről részletesebben itt tudtok olvasni, illetve órán is beszéltünk: [Props](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md). Egyelőre csináljuk azt ezen a ponton, hogy kikapcsoljuk az ESLintnek ezt a fajta problémáját a propsra.

Reactben fontos, hogy egy komponens egy szülőelemet rendereljen ki, vagyis egy csomópontot adjon vissza. Így például ha azt mondanám, hogy:

```jsx
return <h1></h1><p></p> // akkor ez nem működne
```

Ezt meg tudjuk oldani a `fragment`tel, ami egy plusz elemet nem jelent (mint például jelentene az, ha `div`be wrappelnénk), de a Reactnek a kezeléséhez szükség lesz, hogy ne testvérként jelenjenek meg ilyenkor az elemek.

```jsx
return (
  <>
    <h1>Title</h1>
    <p>Desc</p>
  </>
);
```

Mi van akkor, ha úgy szeretném használni a komponensemet, hogy "benne" még szeretnék megjeleníteni dolgokat, például:

```jsx
<Hello name="Ádám">
  <p>Üdv itt!</p>
</Hello>
```

Ha megnézitek, hogy mit logol ki a props, akkor neki van egy `children`je. Így igazából ebben az esetben az a teendőnk, hogy elkérjük nemcsak a `name`-et, de a `children`t is, és azt megjelenítjük a h1 után (vagy előtt (vagy ahol szeretnénk)) a már korábban látott szintaxissal.

```jsx
return (
  <>
    <h1>Hello, jó, hogy itt vagy, {name}</h1>
    {children}
  </>
);
```

### Listák renderelése

Hogyan tudjuk azt megoldani, ha mondjuk érkezik az adatbázisból nagyon sok objektum egy tömbben, ahol minden objektum egy usert írt le az alábbi formában, mi pedig egységes megjelenésben (például kártya formátum) szeretnénk megjeleníteni ezeket?

```js
const users = [
  {id: 1, name: "Barna", sex="male"},
  {id: 2, name: "Matyi", sex="male"},
  {id: 3, name: "Petra", sex="female"},
]
```

Reactben erre a `map` segítségével találunk megoldást: végigmegyünk az összes elemen, és mindegyikhez hozzárendeljük a kívánt megjelenést:

```jsx
//...
const listElems = users.map((user) => <li key={user.id}>{user.name}</li>);
return <ul>{listElems}</ul>;
// ...
// VAGY:
return (
  <ul>
    {users.map((user) => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);

// VIGYÁZZATOK, ilyenkor viszont kell a return a végén, míg (user) => () esetén nem
users.map((user) => {
  // itt csinálhatsz dolgokat, változók létrehozása stb.

  // végén a return:
  return <li key={user.id}>{user.name}</li>;
});
```

> ### 💡 FONTOS
>
> Megbeszéltük, itt is láthatjátok, hogy ilyenkor szükség van egy úgynevezett `key` attribútumra a parent elemnél. Erre szüksége van a Reactnek ahhoz, hogy tudja azonosítani, hogy melyik adathoz melyik element tartozik, így megfelelően tudja frissíteni a node-okat, ha változik, módosul az adat. Ez MINDENKÉPP unique. Mi van akkor, ha nincs id? Ilyenkor el tudom kérni a map-en belül az indexet is: `map(item, index)`. De ezzel óvóatosan, ha read-only dolgokat jelenítünk meg, akkor okés, viszont ha szúrhatunk be, törölhetünk dolgokat, akkor összeakadhat. Használhatunk valami külső package-et is, mint pl a `uuid`, ha nagyon szükséges az id, de nincs.

## myplaylist-sitebuild-components

Telepítsd először a szükséges dependency-ket a projekthez:

```sh
cd myplaylist-sitebuild-components
npm i
```

Sitebuild mappa egy statikus prototípust tartalmaz az oldalhoz, nem különösebben tudunk vele interaktálni, csak HTML-t meg CSS-t tartalmaz. Arra jó, hogy lássuk, hogyan szeretnénk, hogy kinézzen az oldalt. Ezek alapján fogunk komponenseket létrehozni, illetve hozzáadni a mögöttes funkcionalitást. Az elsődleges cél most, hogy `komponenseket` hozzunk létre.

> ### 📝 1. feladat
>
> Telepítsd a fomantic-ui-t:

```sh
npm i fomantic-ui
```

VAGY ha így nem működik, akkor használd a jsdelivr-t és a CDN-t: [fomantic-ui](https://www.jsdelivr.com/package/npm/fomantic-ui)

> ### 📝 2. feladat
>
> Másoljuk át a `playlist.html`ből a **ui container** div tartalmat (29-143) az App.jsx-be:

```jsx
function App() {
  return <div class="ui container">...</div>;
}

export default App;
```

Láthatjuk, hogy egy csomó hibát jelez kapunk ekkor. A követő lépések arra irányulnak, hogy kijavítsuk ezeket a hibákat a kódban.

> ### 💡 FONTOS
>
> Mivel nem használhatunk olyan keywordoket, amik már JS által foglaltak, így nem használhatjuk a jsx kódunkban a `class`t sem, erre errort kapunk. Helyette mindenhol, ahol class van, `className`-et fogunk használni. Cseréljük le mindenhol a komponensben!

```jsx
function App() {
  return <div className="ui container">...</div>;
}

export default App;
```

- ESLint szabály: meggátol abban, hogy olyan karakterek legyen a HTML-ben, amiket esetleg "véletlenül" tennénk oda, így nem biztonságosak. Ilyen pl a `'` is, ezeket cseréljük le megfelelően: [no-unescaped-entities](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md)

> ### 📝 3. feladat
>
> Jelenítsük meg a képet: ehhez másoljuk át az `assets` foldert a `src`be, így már tudom használni a React projektben. Viszont ez még mindig nem lesz elegendő. Ennek az az oka, hogy Reactben be kell importálni a képeket, hogy használni tudjuk őket. Majd ezt követően be kell állítani a megfelelő `src`-nél, hogy ott az importáltak közül melyiket szeretnénk megjeleníteni. Ezt a következőképpen tudjuk megtenni:

```jsx
import BonJovi from "./assets/bonjovi.jpg";

// majd pedig hasonlóan, mint amikor az eltárolt nevet jelenítettük meg a Hello komponensben:
<img src={BonJovi} />;
```

Vagy hivatkozhatnánk rá elérési útvonnal is, de akkor a `public` folderbe kellene elhelyezni a képet, onnan tudnánk hivatkozni.

> ### 📝 4. feladat
>
> Oldjuk meg azt, hogy ne minden egyszerűen csak az `App` komponsbe legyen bezúdítva. Hozzunk létre egy `Playlist` komponenst, amit megjelenítünk az `App`on belül. Hozzunk létre egy `pages` foldert, amiben elkészítjük a komponensünket. Átmásolunk mindent, amit korábban az `App`ba tettünk, figyelve arra, hogy az `assets` elérési útvonala innen megváltozik:

```jsx
// ####################################
// PlayLists.jsx
// ####################################
import BonJovi from "../assets/bonjovi.jpg";

const PlayLists = () => {
  return <div className="ui container">...</div>;
};

export default PlayLists;
```

```jsx
// ####################################
// App.jsx
// ####################################
import Playlists from "./pages/Playlists";

function App() {
  return <Playlists />;
}

export default App;
```

Hasonlóképpen készítsünk egy `Navbar` komponenst a `pages` folderben, ennek tartalma legyen `playlists.html` nav eleme (13-28). Javítsuk ki a korábbiakhoz hasonlóan a hibákat a komponensben: class -> className, importáljuk megfelelően a képet. Majd pedig jelenítsük meg a komponenst az `App`ban. Figyeljün arra, hogy most már több dolgot akarunk visszadni az Appban, így `fragment`et kell használunk!

```jsx
// ####################################
// Navbar.jsx
// ####################################
import Logo from "../assets/logo.png";

const Navbar = () => {
  return <nav className="ui secondary menu">...</nav>;
};

export default Navbar;
```

```jsx
// ####################################
// App.jsx
// ####################################
import Navbar from "./pages/Navbar";
import Playlists from "./pages/Playlists";

function App() {
  return (
    <>
      <Navbar />;
      <Playlists />;
    </>
  );
}

export default App;
```

> ### 📝 5. feladat
>
> Menjünk tovább a megoldásban! Ha most megnézzük a `Playlists` komponensünket, akkor egyelőre ez egy borzasztóan nagy komponens, ami elég sokmindenért felel. Nyilván a Reactnek meg az egész komponensalapú fejlesztésnek a lényege az lenne, hogy modulárisabban szét tudjuk szedni az oldalunkat, egy-egy komponens egy önálló egység legyen. Próbáljuk meg szétszedni ezt a nagy komponenst kisebb komponensekre!

Szervezzük ki első körben az `src/component` folderbe `TrackDetails` komponens néven az alsó részét.

!!!KÉP

Használjuk ezt a létrehozott komponst a `Playlists`ben. Ezt követően bontsuk további részre a `TrackDetails`t, hozzunk létre külön komponens a gomboknak: `TrackDetailButton`. Gondoljuk végig, hogy mi változik a gombok esetén:

- a linkek
- a gomb háttérszíne
- az ikon
- a gomb szövege

Ezeket a `props`ból szedjük ki, alkalmazzuk a komponensen. Ezzel gyakorlatilag létrehozunk egy gömb template-et, amivel bármivel ki tudunk tölteni egy másik komponsensen keresztül:

```jsx
const TrackDetailButton = ({ url, bgColor, icon, label }) => {
  return (
    <a
      href={url}
      className={`ui button tiny ${bgColor} button`}
      target="_blank"
    >
      <i className={`${icon} icon`}></i>
      {label}
    </a>
  );
};

export default TrackDetailButton;
```

Illetve ezt követően a használata a `TrackDetails`ben:

```jsx
<TrackDetailsButton
  url="https://open.spotify.com/track/0v1XpBHnsbkCn7iJ9Ucr1l"
  bgColor="green"
  icon="spotify"
  label="Listen on Spotify"
/>
```

Hozzunk létre egy `PlaylistList` komponenst, ami a playlisteket tartalmazza az oldalról (8-40)!

!!!KÉP

Ezt követően ezt még tudjuk további részekre bontani, így például létrehozhatunk egy `PlaylistItem` komponenst, ami azért felel majd, hogy egy-egy playlist hogyan jelenjen meg. Célszerű ezt is kiszervezni külön, hiszen egész sok információt foglal egységbe, szebbé, átláthatóbbá, modulárisabbá teszi az elkülönítése. A feltöltött kódban ezeknek az implementációját megtaláljátok!
