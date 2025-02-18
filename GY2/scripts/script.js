// a feladat megoldás során fokozatosan haladtunk az egységbezárás felé: kezdetben hasonló módszereket alkalmaztunk, mint
// az előző gyakorlatokon, globálisan definiáltunk függvényeket, vettünk be elemeket. Ez jól működött egy konkrét táblázat
// esetén, azonban amint általánosítani akartuk a megoldást, korlátokba ütköztünk. A cél az volt, hogy zárjuk egységbe a
// sortable table funkcionalitását. Itt jött képbe az osztályok alkalmazása. Kezdetben csak "becsomagoltuk" a korábbi
// megoldásunkat egy osztályba, ami paraméterként várta, hogy melyik táblázattal szeretnénk, hogy dolgozzon:

class SimpleSortableTable {
  constructor(table) {
    this.tbody = table.querySelector("tbody");

    // hasonlóképpen a többit
  }
}

// majd példányosítuttok az osztályt, paraméterként megkapta a táblázatot:
new SimpleSortableTable(document.querySelector("#table-characters"));

// ez így működik, egészen magába foglalja a funkcionalitást. Viszont továbbgondolva a feladatot, a cél az lenne, hogy kapjunk
// valamilyen custom componentet, például egy <sortable-table></sortable-table> - t, amit tudunk HTML szintjén használni,
// mondjuk úgy, hogy körbewrappeljük vele a table-t, amit szeretnék felokosítani. Itt jöttek képbe a web komponensek, azon belül
// pedig a custom elementek.

// a custom elementek, classok részletesebb leírását, illetve még egy kidolgozott feladatot a markdownban találtok.

// ÓRAI VÉGSŐ KÓD
class SortableTable extends HTMLElement {
  constructor() {
    super();
    this.tbody = this.querySelector("tbody");
    this.thead = this.querySelector("thead");
    this.trs = this.tbody.querySelectorAll("tr");

    this.thead.addEventListener("click", this.onHeaderClick);

    this.tableData = [...this.trs].map((tr) =>
      [...tr.cells].map((td) => td.innerHTML)
    );
  }

  // HANDLERS
  // érdemes így definiálni a handlert, ha azt szeretnénk, hogy azon belül a "this" az osztályra vonatkozzon. Ha hagyományos
  // függvényként hoznánk létre, akkor a "this" azon belül nem a osztály, hanem az eventet kiváltó objektum lenne, így
  // adott esetben a "thead". Ezt tudnánk úgy kezelni, hogy a wrappeljük egy arrow functionnel:
  // this.thead.addEventListener("click", () => this.onHeaderClickTraditional());
  // Azonban ennél talán szebb megoldást ebben a formátumban létrehozni a függvényt, így ő a "this"-t kontextusból fogja venni,
  // ez pedig maga a class lesz.
  onHeaderClick = (e) => {
    if (e.target.matches("th")) {
      const cellIndex = e.target.cellIndex;
      this.tableData.sort((a, b) => (a[cellIndex] < b[cellIndex] ? -1 : 1));
      this.tbody.innerHTML = this.generateTbody(this.tableData);
    }
  };

  // HELPERS
  generateTableCell(data) {
    return `<td>${data}</td>`;
  }

  generateTableRow(row) {
    return `<tr>${row
      .map((data) => this.generateTableCell(data))
      .join("")}</tr>`;
  }

  generateTbody(data) {
    return data.map((row) => this.generateTableRow(row)).join("");
  }
}

customElements.define("sortable-table", SortableTable);
