# GY2

A házi leírását és a kezdőcsomagot Teamsen az Általánosban találjátok!

## Osztályok - JavaScript

A JS is lehetőséget biztosít objektumoritentált programozásra, így tudunk **osztályokat** definiálni, ez egészen hasonlóan működik, mint a többi nyelvben. JS-ben a classok tulajdonképpen "special function"-ök, így rájuk is működik, hogy:

```js
class FileReader {
  constructor(file) {
    this.file = file;
  }
}

// vagy
const FileReader = class {
  constructor(file) {
    this.file = file;
  }
};
```

Tudunk definiálni itt is gettereket, metódusokat, statikus metódusokat, statikus adattagokat, adattagokat default értékkel. Ezekre néhány példa:

```js
class Person {
  // a fieldek lényegében object property-k, így nem használunk pl const meg hasonló keywordoket velük
  static welcomeMessage = "";
  age; // default value nélkül by default undefined
  name;
  // fieldek esetén nem használjuk a private vagy a public keywordoket. Private field:
  #sex; // private fieldeket mindenképp előre kell deklarálni

  constructor(age, name) {
    this.age = age;
    this.name = name;
  }

  get name() {
    return this.name;
  }

  static printMessage(message) {
    console.log(message);
  }
}
```

Nyilván az öröklődés is hasonlóan működik JS-ben, mint a többi nyelvben. Itt azonban fontos kiemelni, hogy a leszármazott osztály konstruktorában **muszáj először meghívni a super()-t**, és csak azután csinálni bármi mást.

```js
class Printer {
  constructor(fileSource) {
    this.fileSource = fileSource;
  }

  print() {
    console.log(`Printing a Printerből: ${this.fileSource}`);
  }
}

class DatabasePrinter extends Printer {
  constructor(fileSource) {
    super(fileSource);
  }

  print() {
    console.log(`Printing a DatabasePrinterből: ${this.fileSource}`);
  }
}

const printer = new DatabasePrinter("HM");
printer.print(); // "Printing a DatabasePrinterből: HM"
```

## Web komponensek - custom elements

Óra végén erről volt szó, igazából egy custom elementet hoztunk létre, ez lett a **sortable-table**. Ez egy olyan HTML element volt, aminek a működését mi magunk szabtuk meg, figyelve arra, hogy továbbra is összhangban maradjunk a progresszív fejlesztéssel, és csak okosítsuk a funkcionalitást, ha van JS. Egy ilyen custom element lérehozása a következőképpen nézett ki:

```js
class SortableTable extends HTMLElement {
  constructor() {
    super();

    // egyéb dolgok
  }

  // funkcionalitás, egyébb logika
}

// definiáljuk a custom elementet: megmondjuk, hogy milyen taggel akarunk rá referálni, illetve, hogy melyik class biztosítja számára a funkcionalitást:
customElements.define("sortable-table", SortableTable);
// itt megadhatunk egy harmadik, "options" paramétert is, erről majd következő gyakorlaton
```

A custom elementek rendelkeznek úgynevezett "lifecycle callback"-ekkel, ezekről is beszélünk majd a következő órán részletesebben. (Akik esetleg jártasabbak Angularban, hasonló concept, mint ott a "lifecycle hook"-ok, pl. **ngOnInit**)
Innen amit szeretnék most kiemelni, és lehet vele kísérletezni: **connectedCallback()** (de mivel hétfőn erre nem jutott idő, háziban nem baj, ha nem...). Ez minden egyes alkalom meghívódik, amikor az elementünk hozzáadódik a dokumentumhoz. Ezt nyilván úgy kell elképzelni, hogy minden létrehozott sortable-table tag-hez példányosodik egy SortableTable, így minden sortable-table esetén saját belső állapot van, nincsenek kihatással egymásra. Ha pl. hozzáadok egy darab sortable-table-t HTML-hez, amikor az bekerül a dokumentumba, az ő SortableTable példányában ekkor fut le a **connectedCallback()**. És így tovább minden további hozzáadott esetén.

Alapvetően az az ajánlott, hogy a custom element "setupját" ebben és ne a konstruktorban oldjuk meg.

```js
class SortableTable extends HTMLElement {
  constructor() {
    super();

    // egyéb dolgok
  }

  connectedCallback() {
    console.log("Hozzá lettem adva a DOM-hoz!");
  }
}
```

HTML-en belül pedig:

```HTML
<sortable-table>
    <table>
        ...
    </table>
<sortable-table>
```

Ekkor ugye a SortableTableön belül a **this** maga a sortable-table lesz, így például ha szükségem van a table-re:

```js
class SortableTable extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const table = this.querySelector("table");
  }
}
```

Az órán megoldott feladatot részletesebb magyarázattal és kommentekkel kiegészítve a **script.js**-ben találjátok.

## Még egy egyszerű példa: char-counter-input

Gyakorlásként/segítségként/kiegészítésként, hogy érthetőbb legyen a koncepció, vegyünk végig egy egyszerű custom elementet. A cél most az, hogy egy input fieldet okosítsunk fel úgy, hogy a field alatt jelezzük, hogy a beállított maximum karakterszámból jelenleg mennyinél tartunk. Így például, ha 100 karakter a limit, beírtunk 20 karaktert, azt szeretnénk látni, hogy **20 / 100**

![image](https://github.com/user-attachments/assets/f58f7d88-9922-4e6d-8c93-1b3e5e6eb2c4)

Ennek a HTML része:

```HTML
<char-counter-input>
    <input type="text" maxlength="100" placeholder="Type something...">
</char-counter-input>
```

Első lépés az lenne, hogy hozzuk létre az osztályt, ami majd a mögöttes funkcionalitásért felel. Ennek a skeletonja valahogy így nézne ki:

```js
class CharCounterInput extends HTMLElement {
  constructor() {
    super();

    // ...
  }

  connectedCallback() {
    // ...
  }
}
```

Következő lépésként a **connectedCallback**-en belül adjuk hozzá a megfelelő funkcionalitást:

- vegyük be az input elementet
- szedjük ki, hogy mennyi a beállított maximum karakterszám, ha nincs, használjunk valami defaultot
- generáljuk le az extra HTML-t, amiben majd megjelenítjük, amit szeretnénk
- használjuk az input eventet, ebben rakjuk össze mindig az aktuális megjelenítendő értéket
- ne felejtsük el befűzni az elemet (és azt sem, hogy itt most a this az a char-counter-input lesz, így a this.appendChild() értelemszerűen hozzá fűzi majd)

```js
class CharCounterInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const input = this.querySelector("input");

    if (!input) {
      return;
    }

    const maxLength = input.getAttribute("maxlength") || 100;

    const charCounter = document.createElement("div");
    charCounter.classList.add("char-counter");
    charCounter.innerText = `0 / ${maxLength}`;

    input.addEventListener("input", () => {
      const currentLength = input.value.length;
      charCounter.innerText = `${currentLength} / ${maxLength}`;
    });

    this.appendChild(charCounter);
  }
}
```

Végezetül pedig nyilván definiálnunk is kell a custom elementünket:

```js
customElements.define("char-counter-input", CharCounterInput);
```

Ennek a megoldását találjátok a char-counter-input mappában.
