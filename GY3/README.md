# GY3

Infókat a következő órai zh-ról Teamsen találtok az **Általánosban**

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

Hasonlóképpen kellene eljárnunk akkor is, ha az lenne a feladat, hogy okosítsunk fel egy linket, ami kattintáskor nem navigál automatikus a megadott oldalra, hanem egy pop-upban megkérdezi, hogy biztosak vagyunk-e benne. Gondoljuk végig! Megint csak arról van szó, hogy egy meglévő elemet kell felokosítani. Nem akarunk új dolgot hozzáadni, semmi extrát csinálni. Csak az adott elem default viselkedésére van szükségünk, amit majd mi kibővítunk.

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
[Még több a Shadow DOM-ról (innen van a kép is)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

A webkomponensek témakör alapvetően három nagy részre bomlik:

1. Custom Elements
2. Shadow DOM
3. Templates, Slots

A célunk most az, hogy modulárissá tegyük a web komponensünket úgy, hogy nem csak JS szintjén, de DOM szintjén is alkalmazunk rá valamilyen egységbe zárást. Ezt Shadow DOM segítségével tudjuk megoldani. Azt tudjuk mondani, hogy a komponens egy saját DOM-mal tud rendelkezni, el van zárva a szülő DOM-jától, így van egy black-box a kezemben, ami a külső világtól függetlenül mindig ugyanúgy fog kinézni, bármikor be tudom rakni az oldalra. Ezáltal kapok egy magasabb szintű szeparációt.

- **Encapsulation**: a stílusok és a scriptek a Shadow DOM-ban nincsenek hatással az outside world-re
- **Scoped Styling**: a bent definiált stílusok elkülönülnek

Az ábra egész jól reprezentálja a koncepciót. A következőket érdemes megérteni/megjegyezni:

![image](https://github.com/user-attachments/assets/88c12877-f83c-4a59-bfcf-3e67dd02dde3)

- **Shadow host**: az a node a Light DOM-ban, amihez a Shadow DOM-ot "attach"-oljuk.
- **Shadow tree**: a DOM tree a Shadow DOM-ban
- **Shadow root**: a Shadow DOM root node-ja

Teljesen általánosan kód szintjén:

```js
// 1. bevesszük a hostot
const host = document.querySelector("#host");

// 2. hozzakapcsoljuk a Shadow DOM-ot
const shadow = host.attachShadow({ mode: "open" }); // FONTOS: a mode-ot hagyjuk MINDIG open-en!

// 3. legyártjuk az elemet
const span = document.createElement("span");
span.textContent = "HELLÓ A SHADOW DOM-BÓL";

// 4. befűzzük a shadow root alá
shadow.appendChild(span);
```

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

    // teljesen ugyanaz, mintha egy standard DOM-beli elemhez csatolnám hozzá
    this.shadowRoot.appendChild(shadowButton);
  }
}

customElements.define("shadow-button", ShadowButton);
```

Most ha ezen a ponton megállunk, még mielőtt bármi további stílust alkalmaznánk az így létrehozott gombunkra, akkor a következőt látjuk:

![image](https://github.com/user-attachments/assets/4e70c64f-6bf0-465e-816f-f79149df8a8d)

És ponotsan ez az elvárt viselkedés: a Light DOM-ra definiált stílusok nem "másznak be" a Shadow DOM-ba. Most adjunk valamilyen stílust a Shadow DOM-ban létrehozott gombhoz. Ezt a legegyszerűen úgy tehetjük meg, ha az előbbi kódot kiegészítjuk egy létrehozott style-taggel, benne a kívánt stílussal. Ekkor az alkalmazott stílus a teljes Shadow DOM-ban érvényes lesz:

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

![image](https://github.com/user-attachments/assets/b7476d30-6521-4cb2-aeff-96a79e58d977)

Ha pedig a szerkezetét is megvizsgáljuk:

![image](https://github.com/user-attachments/assets/b026de9e-d7c2-483b-9053-943ad9fb82f1)

Láthatjuk, hogy a shadow-buttonön belül létrejött egy shadow root, ami alatt helyezkedik el a létrehozott style és button. Nyilván, hiszen pont ezt akartuk, amikor a shadow root-hoz ezeket appendeltük.

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

## Templates, Slots

A template-ek segítségével újrahasznosítható HTML struktúrákat tudunk létrehozni, ezzel elkerülve azt, hogy ismételni kelljen nagyon sokszor önmagunkat. Ha van egy card például, amit többször szeretnénk megjeleníteni, készíthetünk számára egy template-et, így ezt kell csak mindig klózoznunk és befűznünk a megfelelő helyre.

Alapvetően template-et az azonos nevű tag segítségével hozunk létre. Az így létrehozott rész nem fog megejelnni az oldalon, amíg annak a contentje nem fűződött be a DOM-ba.

```HTML
<template>
  <div class="card">
    <h2>Default title</h2>
    <p>Default paragparh</p>
  </div>
</template>
```

Tehát csupán ezt hozzáadva a HTML-hez, nem fog semmi megjelenni. Készítsünk egy **custom-card** elementet, amiben egy template segítségével létrehozzunk egy cardot,adjunk neki egy megfelelő stílust. Használjunk Shadow DOM-ot!

Ebben nem sok új lesz, az custom elementet úgy hozzuk létre, ahogy eddig, a Shadow DOM esetén is mindent ugyanúgy csinálunk, mint korábban. Ami itt érdekes lehet, hogy generálunk egy template elementet, majd annak az innerHTML-jébe definiáljuk a kártyánkat. A template-nek a klónozott kontentjét fűzzük be a shadow root alá.

```js
class CustomCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    this.generateTemplate();
    // így tudjuk a template-nek a contentjét leklónozni (majd nyilván ezt appendelni a shadow roothoz.
    //  A paraméter itt, amit true-ként adunk meg arra vonatkozni, hogy a teljes subtree-t vagy csak az adott node-ot szeretnénk-e klónozni. True: subtree)
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  generateTemplate() {
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        .card {
            width: 100%;
            background-color: white;
            border-radius: 3px;
            padding: 20px;
            margin: 10px;
            box-shadow: 2px 6px 6px gray;
            border: 1px solid black;
        }
      </style>

      <div class="card">
        <h2>Default title</h2>
        <p>Default paragparh</p>
      </div>
    `;
  }
}

customElements.define("custom-card", CustomCard);
```

Hogyan tudjuk ezt a HTML-ben haszálni? Hát, nyilván ugyanúgy, mint korábban bármelyik custom elementünket:

```HTML
<custom-card></custom-card>
```

Oké, de ez ezen a ponton annyira nem izgalmas, hiszen mindig ugyanaz a tartalom lesz jelen a custom-cardunkban, méghozzá az, amit a template-ben megadtunk. Hogyan tudnánk azt megoldani, hogy adjunk a komponensnek egy kis flexibilitást? Erre adnak egy dekleratív megoldást a **SLOT**ok

A slotokra a nevűk által tudunk hivatkozni. Így például egy slot létrehozása az alábbi módon néz ki:

```HTML
<!-- FONTOS: a névnek unique-nak kell lennie az adott shadow rootra nézve. Amelyik slotnak nem adunk name attribútumot, ő lesz a deafult slot. Később azok az elemek, amiket nem látunk el slot attribútummal, ők a default slothoz rendelődnek majd. A slot tagek között meg tudok adni egy default értéket, ami akkor displayelődik, ha nem csúsztatunk be semmit a slotba. -->
<slot name="title-slot">Default value</slot>
```

Az adott slotba bedig így tudunk "becsúsztatni" elemet:

```js
...
  <p slot="title-slot">Ez a "title-slot" névvel ellátott slotba kerül</p>
...
```

Tegyük a template-es példánkat rugalmasabbá a slotok segítségével. Biztosítsuk, hogy kívülről lehessen megadni, hogy mi a:

- kártya cím: h2-tag, ez a title
- kártya leírása: p-tag, ez a description

Ehhez csupán a **generateTemplate** methodot kell módosítanunk, azon belül is csak a card belsejét:

```HTML
<!-- TEHÁT: a lényegi változás ez lesz, itt a h2 és a p-tagek belsejébe kerül a slot: -->
<div class="card">
  <h2><slot name="title-slot">Default Title</slot></h2>
  <p><slot name="desc-slot">Default Description</slot></p>
</div>
```

```js
// így egyben a változott generateTemplate method:
  generateTemplate() {
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        .card {
            width: 100%;
            background-color: white;
            border-radius: 3px;
            padding: 20px;
            margin: 10px;
            box-shadow: 2px 6px 6px gray;
            border: 1px solid black;
        }
      </style>

      <div class="card">
        <h2><slot name="title-slot">Default Title</slot></h2>
        <p><slot name="desc-slot">Default Description</slot></p>
      </div>
    `;
  }
```

HTML-ben pedig ennek a használata:

```HTML
<!-- Nem csúsztatok be semmit, csak a default értékek jelennek meg -->
<custom-card></custom-card>

<!-- Csak title-t adok meg a paragraph értéke default lesz -->
<custom-card>
  <span slot="title-slot">HALIHÓ</span>
</custom-card>

<!-- Beküldöm a címet is és a leírást is -->
<custom-card>
  <span slot="title-slot">HALIHÓ</span>
  <span slot="desc-slot">KISEBB HALIHÓ</span>
</custom-card>
```
