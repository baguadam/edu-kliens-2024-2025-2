# GY3

A házit leírással és néhány infót a következő órai zh-ról Teamsen találtok az **Általánosban**

## Customized built-in element

Előző alkalommal megnéztük, hogyan tudunk custom elementeket létrehozni úgy, hogy kibővítjuk a **HTMLElementet**, majd pedig definiáljuk a saját elementünket: milyen taggel hivatkozunk rá, mi biztosítja a funckionalitását. Ez volt a **sortable-table**

```js
class SortableTable extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // beveszünk elemeket
    // feliratkozunk eventekre
  }

  disconnectedCallback() {
    // leiratkozunk eventekről
  }
}

customElements.define("sortable-table", SortableTable);
```

Ennek a segítségével definiáltunk egy saját taget, amit tulajdonképpen wrapperként tudtunk használni a HTML-ben:

```HTML
<sortable-table>
    <table>
        ...
    </table>
</sortable-table>
```

Ebben az implementációban mivel a **HTMLElement**-et bővítettük ki, a **table**-re vonatkozó default viselkedést, funcionalitást nem kaptuk meg. Ha végiggondoljátok a feladatot, tulajdonképpen itt csak egy alap táblázatot okosítottunk fel. Nem adtunk hozzá semmi extra UI elemet, mint például a **char-counter-input**nál. Ezzel szemben létrehoztunk egy adott esetben fölöslegesnek gondolható wrapper taget.

Jó lenne, ha meg tudnánk tenni azt, hogy ilyenkor, amikor csak egy meglévő elemet akarunk felokosítani, ki tudjuk bővíteni az adott elem viselkedését és el tudjuk kerülni a wrappert. Erre valók a **custom built-in element**ek

1. Ilyenkor nem a **HTMLElement**et bővítjuk ki, hanem a konkrét elemet, amivel dolgozni akarunk.
2. Amikor definiáljuk a custom elementet, megadunk egy harmadik paramétert is, amiben definiáljuk, hogy mit extendelünk.
3. HTML-ben nem lesz wrapper tag, az adott, kibővített elementet látjuk el egy **is="custom-name"** attribútummal.

Így a módosított kódunk:

```js
// JS szintjén most:
class SortableTable extends HTMLTableElement {
  cosntructor() {
    console.log(this);
    // ebben az esetben a this maga a table lesz, a korábbi implementációban nyilván ez a sortable-table volt
  }
}

// harmadik paraméter: extends: "table"
customElements.define("sortable-table", SortableTable, { extends: "table" });

// HTML szintjén:
<table is="sortable-table">// ....</table>;
```

### Confirm Link - még egy példa

Hasonlóképpen kellene eljárnunk akkor is, ha az lenne a feladat, hogy okosítsunk fel egy linket, ami kattintáskor nem navigál automatikus a megadott oldalra, hanem egy pop-upban megkérdezni, hogy biztosak vagyunk-e benne. Gondoljuk végig! Megint csak arról van szó, hogy egy meglévő elemet kell felokosítani. Nem akarunk új dolgot hozzáadni, semmi extrát csinálni. Csak az adott elem default viselkedésére van szükségünk, amit majd mi kibővítunk.

```js
class ConfirmLink extends HTMLAnchorElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // feliratkozás a click eventre
  }

  disconnectedCallback() {
    // leiratkozás a click eventről
  }

  onClick = (e) => {
    // logika
  };
}

// itt pedig azt kell mondanunk, hogy extends: "a"
customElements.define("confirm-link", ConfirmLink, { extends: "a" });

// HTML-ben pedig:
<a is="confirm-link" href=""></a>;
```

> Remélem, érezhető a különbség az előző órai, illetve az ezórai built-in element között. Sokadszor is hangúlyozva: célszerű ezt csinálni, ha csupán egy meglévő elementnek szeretnék egy plusz funkcionalitást adni, pl: legyen a táblázat rendezhető, a linknél kérdezze meg kattintásra, hogy biztos-e, stb.

## Shadow DOM

A webkomponensek témakör alapvetően három nagy részre bomlik:

1. Custom Elements
2. Shadow DOM
3. Templates, Slots

A célunk most az, hogy modulárissá tegyük a web komponensünket úgy, hogy nem csak JS szintjén, de DOM szintjén is alkalmazunk rá valamilyen egységbe zárást. Ezt Shadow DOM segítségével tudjuk megoldani. Azt tudjuk mondani, hogy a komponens egy saját DOM-mal tud rendelkezni, el van zárva a szülő DOM-jától, így van egy black-box a kezemben, ami a külső világtól függetlenül mindig ugyanúgy fog kinézni, bármikor be tudom rakni az oldalra. Ezáltal kapok egy magasabb szintű szeparációt.

- **Encapsulation**: a stílusok és a scriptek a Shadow DOM-ban nincsenek hatással az outside world-re
- **Scoped Styling**: a bent definiált stílusok elkülönülnek

TODO: Shadow DOM ábra, kisebb magyarázat róla

### Button szeparáció

Az alábbi példa jól demonstrálja a Shadow DOM lényegét, és annak működét.

Először is hozzunk létre egy egyszerű HTML fájlt, amiben helyezzünk el teljesen általános buttont, illetve előlegezzünk meg magunknak egy shadow-buttont is. Adjunk hozzá minimális stilizálást az oldalhoz.

```HTML
<style>
  button {
    background-color: red;
    color: white;
    padding: 10px 20px;
    width: 200px;
    height: 40px;
  }

  button:hover {
    background-color: brown;
  }
</style>

...
<button>LIGHT DOM BUTTON</button>
<shadow-button></shadow-button>
```

Ezen a ponton nyilván csak a "LIGHT DOM BUTTON" szöveget tartalmazó gomb lesz látható a megfelelő stílussal, a **shadow-button**t még nem hoztuk létre.

> Itt ugye már mindenki látja, hogy ha így akarom használni HTML-ben, akkor ez NEM egy "custom built-in element" lesz

```js
class ShadowButton extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define("shadow-button", ShadowButton);
```

A következőkben három lépést fogunk követni:

1. Hozzácsatoljuk a Shadow DOM-ot a shadow-buttonhöz.
2. Létrehozunk benne egy buttont, amit hozzácsatolunk a shadow roothoz.
3. Definiálunk benne valamilyen, a globálistól eltérő stílust a gombra.

```js
class ShadowButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 1. lépés: Shadow DOM "bekötése"
    this.attachShadow({ mode: "open" });

    // 2. lépés: Létrehoztuk a buttont, majd hozzácsatoltuk a shadow roothoz
    const shadowButton = document.createElement("button");
    shadowButton.textContent = "SHADOW DOM BUTTON";
    this.shadowRoot.appendChild(shadowButton);
  }
}

customElements.define("shadow-button", ShadowButton);
```

Most ha ezen a ponton megállunk, még mielőtt bármi további stílust alkalmaznánk az így létrehozott gombunkra, akkor a következőt látjuk:

TODO: IMG1

És ponotsan ez az elvárt viselkedés: a Light DOM-ra definiált stílusok nem "másznak be" a Shadow DOM-ba. Most adjunk valamilyen stílust a Shadow DOM-ban létrehozott gombhoz. Ezt a legegyszerűen úgy tehetjük meg, ha az előbbi kódot kiegészítjuk egy létrehozott style-taggel, benne a kívánt stílussal:

```js
class ShadowButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 1. lépés: Shadow DOM
    this.attachShadow({ mode: "open" });

    // 2. lépés: gomb
    const shadowButton = document.createElement("button");
    shadowButton.textContent = "SHADOW DOM BUTTON";

    // 3. lépés: stílus
    const style = document.createElement("style");
    style.innerHTML = `
        button {
            background-color: blue;
            color: white;
            border-radius: 5px;
            padding: 10px 20px;
        }
    `;

    this.shadowRoot.append(style, shadowButton);
  }
}

customElements.define("shadow-button", ShadowButton);
```

Ekkora az oldal a következőképpen néz ki:

TODO: img2

Ha pedig a szerkezetét is megvizsgáljuk:

TODO: img3

Láthatjuk, hogy a shadow-buttonön belül létrejött egy shadow root, ami alatt helyezkedik el a létrehozott style és button.

Ha esetleg szeretnénk elérni a a gombokat, akkor a következőket tapasztalhatjuk:

```js
// Így csupán csak a Light DOM-ban megtalálható buttonöket tudjuk elérni, így most ez pontosan 1 darab gombot fog tartalmani, azt, amelyiknek "LIGHT DOM BUTTON" a szövege.
const buttons = document.querySelectorAll("button");
buttons.forEach((b) => console.log(`BUTTONS: ${b.textContent}`));

// Ha a Shadow DOM-ban található gombot szeretnénk elérni, akkor azt a shadow rooton keresztül tudjuk megtenni. Ennek a hostja a shadow-button, így először bevesszük a shadow-buttont, majd ennek a shadow rootján keresztül egy selectorral ki tudjuk választani a benne található gombot.
const shadowButton = document
  .querySelector("shadow-button")
  .shadowRoot.querySelector("button");
console.log(`SHADOW BUTTON: ${shadowButton.textContent}`);
```
