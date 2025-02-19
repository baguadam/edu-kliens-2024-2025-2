# GY2

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
        this.file = file
    }
}
```

Tudunk definiálni itt is gettereket, metódusokat, statikus metódusokat, statikus adattagokat, adattagokat default értékkel. Ezekre néhány példa:

```js
class Person {
    // a fieldek lényegében object property-k, így nem használunk pl const meg hasonló keywordoket velük
    static welcomeMessage = ""
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

Nyilván az öröklődés is hasonlóan működik JS-ben, mint a többi nyelvben. Itt azonban fontos kiemelni, hogy a leszármazott osztály konstruktorában **muszáj először meghívni a super()-t**. 

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
Innen amit szeretnék most kiemelni, és lehet vele kísérletezni: **connectedCallback()**. Ez minden egyes alkalom meghívódik, amikor az elementünk hozzáadódik a dokumentumhoz. Alapvetően az az ajánlott, hogy a custom element "setupját" ebben és ne a konstruktorban oldjuk meg. 

```js
class SortableTable extends HTMLElement {
    constructor() {
        super();

        // egyéb dolgok
    }

    connectedCallback() {
        console.log("Mostantól létezem");
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