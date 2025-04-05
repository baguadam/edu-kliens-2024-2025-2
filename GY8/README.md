# 8. gyakorlat - Még néhány Hook, Custom Hooks, Context

Kisebb összefoglalásként: eddig megismerkedtünk a React alapjaival, 5. gyakorlaton megnéztük, hogyan tudunk komponenseket létrehozni, mi a komponensalapú fejlesztés alapja, hogyan tudnak egymással a parent-child kapcsolatban lévő komponensek kommunikálni: [Itt találod ezeket](https://github.com/baguadam/edu-kliens-2024-2025-2/tree/main/GY5).

Ezt követően a 6. gyakorlaton megismerkedtünk az állapotkezeléssel és a `useState` hookkal: [Itt találod ezeket](https://github.com/baguadam/edu-kliens-2024-2025-2/tree/main/GY6).

A 7. gyakorlaton az eddigiek gyakorlása mellett a formkezeléssel foglalkoztunk, konkrétan a `controlled forms` koncepcióval: [Itt olvashatsz róla részletesebb](https://www.freecodecamp.org/news/what-are-controlled-and-uncontrolled-components-in-react/).

## Még néhány Hook

Az alábbiakban összeszedtem néhány fontosabb gondolatot, tippet azokról a hookokról, amikkel találkoztunk a gyakorlatokon egy-két példa erejéig.

## useRef

### MIRE JÓ, MIKOR HASZÁLJUK

A `useRef` hook `mutable` referenciákat ad a kezünkbe, amik állandóak maradnak a rerenderek során, illetve ha változtatjuk az értéket az adott referenciának, nem renderelődik újra a komponens. Maga a hook egy `objectet` ad vissza, ami rendelkezik egy `current` propery-vel (és csak ezzel), ezen keresztül tudjuk elérni, amire referálunk. Általában akkor használjuk, ha:

- Szeretnénk DOM elemeket elérni (hasonlóan pl. a querySelectorhoz)
- Értékeket akarunk tárolni rendereken keresztül, anélkül, hogy újrarenderelnénk a komponenst

```jsx
// gyakori use-case, amivel mi is találkoztunk a gyakorlaton

import { useRef, useEffect } from "react";

const InputFocus = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
};
```

> ### 💡 FONTOS
>
> Ne írd/olvasd a `current` értékét rendering alatt! Nyilván egy handleren vagy egy effecten belül rendben van. Mire gondolok:

```jsx
const MyComponent = () => {
  //...
  inputRef.current = 42; // ezt ne csináld!
  //...
};

// ha ilyesmit tennél, akkor már inkább:
const MyComponent = () => {
  //...
  useEffect(() => {
    inputRef.current = 42;
  }, []);
  //...
};
```

### useState vs useRef

| Tulajdonságok                        | `useRef`                               | `useState`                 |
| ------------------------------------ | -------------------------------------- | -------------------------- |
| Megmarad az értéke rerenderek között | IGEN ✅                                | IGEN ✅                    |
| Rerendert triggerel                  | NEM (`ref.current` változik) ❌        | IGEN (`state` változik) ✅ |
| Mire használjuk                      | DOM refereciák, timer, korábbi értékek | UI state                   |

---

## useEffect

### MIRE JÓ, MIKOR HASZÁLJUK

A `useEffect` hookot arra használjuk, hogy `side effect`eket hozzunk létre a komponenseinket belül. Ilyen például az, ha adatot akarunk `fetch`elni, DOM-ot frissítjük vagy feliratkozunk valamire. Az általános use-case az, hogy a komponensünket valamilyen külső "rendszerrel" szeretnénk szinkronban tartani, például a `localStorage`-ba írunk/olvasunk, egy REST API-n keresztül adatokat kérünk el, küldünk ki. Hasonlóképpen az eddigi hookokkal, itt is csak a legmagasabb szinten tudjuk hívni, így például nem köthetjük feltételhez, nem tehetjük ciklusba, stb.

Létrehozáskor kap egy függvényt, ezt hívjuk `setup`-nak, ez a függvény tartalmazza a logikát, amit szeretnénk lefuttatni. A másik (opcionális) paramétere egy `dependencies` tömb, ami azokat a reaktív értékeket tartalmazza, amiket használsz a setup függvényen belül. Ha valamelyik dependency értéke megváltozik, lefut a függvény, végrehajtódik a benne megírt logika.

```jsx
// alap szintaxis:
useEffect(() => {
  // ide jön a kód
}, [dependencies]); // dependency-k

// NINCS DEPENDENCY ARRAY
// Ilyenkor az effect minden egy render és re-render alkalával le fog futni
useEffect(() => {});

// ÜRES DEPENDENCY ARRAY
// Ilyenkor az effect csak az initial render alkalmával fut le
useEffect(() => {}, []);
```

### Dependency Array összefoglaló

| Dependency Array          | Lefut az Effect:                                |
| ------------------------- | ----------------------------------------------- |
| Nincs Dependency Array    | Minden render alkalmával                        |
| Üres Dependency Array: [] | Csak az első render alkalmával                  |
| Nem üres, pl: [value]     | Mountoláskor + amikor a `value` értéke változik |

```jsx
// Példakód: Adat fecthelés komponens mountolásakor -> tipikus példája a useEffect használatának

import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    }

    loadUsers();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### ⁉️Néhány gyakori hiba

1. Nem adsz meg Dependency Array-t (bár ilyenkor azért a linter sírni szokott):

```jsx
useEffect(() => {
  doSomething(data); // használod a data-t, de nincs felsorolva dependencyként
}, []); // ide kellene: [data]
```

2.  Effect használata egyszerű UI logika számolására - mintha a `Hangman` projektben effectben számoltunk volna bizonyos értékeket:

```jsx
useEffect(() => {
  if (count > 5) {
    setMessage("TÚL SOK!"); // ez a logika simán számolható lenne render során
  }
}, [count]);

// helyette:
const message = count > 5 ? "TÚL SOK" : "";
```

3.  Ha a setup function valamilyen külső rendszerhez kapcsolódik (például ilyennek számít az is, ha egy `setInterval`t hívsz), akkor az Effectnek vissza kell adnia egy `cleanup function`t, ami leiratkozik, elvégzi a "takarítást", különben leak lesz. Mit jelent ez a gyakorlatban:

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // valami ilyesmit, itt ez a cleanup függvény
}, []);
```

### ‼️NE használj Effectet, ha

1.  Valamilyen származtatott értéket akarsz csak kalkulálni (mint azt tettük sokszor a `Hangman`ben)
2.  Ha a `props`ok alapján akarod változtatni a state-et
3.  Event handling logika megírásához
4.  És még jópár esetben, amikről részletesebb [Itt olvashatsz](https://react.dev/learn/you-might-not-need-an-effect)

## Custom Hooks

### MI EZ, MIRE JÓ?

Reacten belül számos alap hookot kapunk, amik közül néhánnyal már megismerkedtünk. Azonban előfordulhat, hogy szeretnénk, ha lenne egy-egy hook valamilyen speciális use-case-re, viszont a beépítettek közül erre nem találunk semmit. Semmi gond, ilyenkor létre tudjuk hozni a sajátunkat! Egy `Custom Hook` igazából egy olyan függvény, aminek a neve `use`-zal kezdődik és használ önmagában valamilyen beépített React hookot, például `useState`-et, `useEffect`-et. Segítségével összetartozó logikát tudunk egységbe zárni, és ezt újrahasználni komponenseken keresztül. Így egy-egy összetettebb, összetartozó logika kiszervezésével sokkal tisztább, átláthatóbb komponenseket kapunk, illetve megvalósul egy valamilyen szintű `Separation of Concerns` is, hiszen össze tudunk fogni API logikát, local storage kezelést, form kezelést, stb.

```jsx
// egy teljesen egyszerű Custom Hook létrehozása
const useMyCustomHook = () => {
  const [value, setValue] = useState(null);

  return { value, setValue };
};
```

> ### 💡 FONTOS
>
> MINDIG `use`-zal kezdődjön a neve! Egyrészt így olvashatóbbá válik a kód, és ránézésre is meg tudjuk állapítani, hogy egy hookról van szó. Másrészt ilyenkor a linter is úgy kezeli, mintha egy tényleges hook lenne, és kikényszeríti ugyanazokat a szabályokat erre vonatkozóan is (amire nyilván szükség van, hogyha tartalmaz például egy `useState`-et, akkor nem hozhatom létre a custom hookomat sem feltételhez kötötten, ciklusban, stb).
>
> Érdemes arra is odafigyelni, hogy általában tényleg az a cél egy custom hook létrehozásánál, hogy egységbe zárjunk egy bizonyos működést, így kifelé csak azt adjuk, ami ténylegesen szükséges a működtetéshez.
>
> Hasonlóképpen, inkább érdemes több, kisebb hookot létrehozni egy hatalmas nagy hook helyett.

```jsx
// useForm.js
// Gyakori alkalmazása például a form logika egységba zárás:
import { useState } from "react";

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};

export default useForm;
```

```jsx
// SignupForm.jsx
// használata:
import useForm from "./useForm";

function SignupForm() {
  // teljesen ugyanúgy történik, mintha egy általános, beépített hookot hívnék
  const { values, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
      />

      <input
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
      />

      <label>
        <input
          name="agreeToTerms"
          type="checkbox"
          checked={values.agreeToTerms}
          onChange={handleChange}
        />
        Elfogadom a feltételeket!
      </label>

      <button type="submit">Regisztráció</button>
    </form>
  );
}
```

## Context

### MI EZ, MIRE JÓ?

Már megismerkedtünk a `prop drilling`gel, ami nem más, mint az adatok lecsorgatása több komponensen keresztül. Ha kicsit jobban belegondolunk, akkor hamar rájöhetünk, hogy ez a megközelítés tud problémás lenni, ha egy szülőkomponensből nagyon mélyre szeretnénk valamilyen információt eljuttatni egy gyerek komponens számára. Főleg abban az esetben, ha valamilyen információra szükség van a teljes alkalmazás szintjén, például: autentikálva van-e egy user, mi az alkalmazás egységes stílusa, mi az alkalmazás egységes nyelve stb. Ilyen esetekben jön képbe a `Context`. Kapunk egy built-in feature-t arra, hogy globálisan tudjunk adatot megosztani a koponensek között, a komponensfában, anélkül, hogy manuálisan le kellene csorgatnunk az információt több komponensen keresztül. Úgy kell ezt elképzelni, hogy a szülőkomponens elérhető teszi (biztosítja - `Provide`) az adatot a teljes alatta lévő részfa számára.

![image](https://github.com/user-attachments/assets/ae96a806-3e06-41ef-8a8e-081dc9069bc2)

[FORRÁS](https://react.dev/learn/passing-data-deeply-with-context)

```jsx
// 1. Létrehozzuk a Contextet:
import { createContext } from "react";

const ThemeContext = createContext(); // Vagy pedig: createContext(defaultValue)
```

```jsx
// 2. A Providerrel "becsomagoljuk" a parent componentet, ahonnan elérhető szeretnénk tenni a biztosított adatot
// Innentől kezdve a MainComponent és az ő teljes részfája számára elérhető lesz a ThemeContext
import { useState } from "react";
import ThemeContext from "./ThemeContext";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MainComponent />
    </ThemeContext.Provider>
  );
}
```

```jsx
// 3. Használjuk a Contextet a komponensben, ahol szükségünk van rá:
import { useContext } from "react";
import ThemeContext from "./ThemeContext";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext); // useContext hook + a Context neve

  return (
    <header style={{ background: theme === "dark" ? "#222" : "#fff" }}>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </header>
  );
};
```

### Legfontosabb elemek:

| Elem               | Célja                                                   |
| ------------------ | ------------------------------------------------------- |
| `createContext()`  | Létrehozza a context objektumot                         |
| `Context.Provider` | "Becsomagolja" a gyerekeket és biztosítja az adatot     |
| `useContext()`     | Általa kapjuk meg a context által biztosított értékeket |

> ### 💡 FONTOS
>
> Egyrészt ne használjuk túl, ténylegesen csak akkor, ha szükség van rá. Ha egy-két komponensen keresztül kell adatot csorgatni, tökéletes a `props`. Tartsuk meg a `Context`et globális információk megosztására. Aztán fontos azt is látni, hogy nem egy `state manager`ről beszélünk, így a fő célja sem az, hogy komplex logikát építsünk vele. Erre majd a `Redux`ot fogjuk használni (vagy alternatívaként megismerkedhettek, ha van kedvetek a `Zustand`del is!).

### ÉRDEMES LEHET...

Érdemes lehet a `useContext`et `Custom Hook`kal együtt használni, hogy egy egészen elegáns megoldást kapjunk, így:

```jsx
const useTheme = () => {
  return useContext(ThemeContext);
};

// Használva:
const { theme, setTheme } = useTheme();
```

### Context vs Props vs State

| Eset...                                              | Ajánlott... |
| ---------------------------------------------------- | ----------- |
| Egy komponensen belüli állapot                       | `useState`  |
| Adat, amire szükség van 1-2 szinttel lejjebb         | `Props`     |
| Adat, ami applikáció szintjén (globálisan) szükséges | `Context`   |
