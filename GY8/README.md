# 8. gyakorlat - Még néhány Hook, Custom Hooks, Context

Kisebb összefoglalásként: eddig megismerkedtünk a React alapjaival, 5. gyakorlaton megnéztük, hogyan tudunk komponenseket létrehozni, mi a komponensalapú fejlesztés alapja, hogyan tudnak egymással a parent-child kapcsolatban lévő komponensek kommunikálni: [Itt találod ezeket](https://github.com/baguadam/edu-kliens-2024-2025-2/tree/main/GY5).

Ezt követően a 6. gyakorlaton megismerkedtünk az állapotkezeléssel és a `useState` hookkal: [Itt találod ezeket](https://github.com/baguadam/edu-kliens-2024-2025-2/tree/main/GY6).

A 7. gyakorlaton az eddigiek gyakorlása mellett a formkezeléssel foglalkoztunk, konkrétan a `controlled forms` koncepcióval: [Itt olvashatsz róla részletesebb](https://www.freecodecamp.org/news/what-are-controlled-and-uncontrolled-components-in-react/).

## Még néhány Hook

Az alábbiakban összeszedtem néhány fontosabb gondolatot, tippet azokról a hookokról, amikkel találkoztunk a gyakorlatokon egy-két példa erejéig.

### usRef

> ### 💡 MIRE JÓ, MIKOR HASZÁLJUK
>
> A `useRef` `mutable` referenciákat ad a kezünkbe, amik állandóak maradnak a rerenderek során, illetve ha változtatjuk az értéket az adott referenciának, nem renderelődik újra a komponens. Maga a hook egy `objectet` ad vissza, ami rendelkezik egy `current` propery-vel (és csak ezzel), ezen keresztül tudjuk elérni, amire referálunk. Általában akkor használjuk, ha:
>
> - Szeretnénk DOM elemeket elérni (hasonlóan pl. a querySelectorhoz)
> - Értékeket akarunk tárolni rendereken keresztül, anélkül, hogy újrarenderelnénk a komponenst

```jsx
// gyakori use-case, amivel mi is találkoztunk a gyakorlaton

import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); 
  }, []);

  return <input ref={inputRef} />;
}
```

> ### 💡 FONTOS
>
> Ne írd/olvasd a `current` értékét rendering alatt! Nyilván egy handleren vagy egy effecten belül rendben van. Mire gondolok: 

```jsx
const MyComponent = () => {
    //...
    inputRef.current = 42; // ezt ne csináld! 
    //...
}

// ha ilyesmit tennél, akkor már inkább:
const MyComponent = () => {
    //...
    useEffect(() => {
        inputRef.current = 42
    }, []);
    //...
}
```