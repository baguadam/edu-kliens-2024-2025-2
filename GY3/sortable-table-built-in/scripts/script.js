class SortableTable extends HTMLTableElement {
  constructor() {
    super();
    console.log(this);
  }

  connectedCallback() {
    this.tbody = this.querySelector("tbody");
    this.thead = this.querySelector("thead");
    this.trs = this.tbody.querySelectorAll("tr");

    this.retreieveData();

    this.thead.addEventListener("click", this.onHeaderClick);
  }

  disconnectedCallback() {
    this.thead.removeEventListener("click", this.onHeaderClick);
  }

  // HANDLERS
  onHeaderClick = (e) => {
    if (e.target.matches("th")) {
      const cellIndex = e.target.cellIndex;
      this.tableData.sort((a, b) => (a[cellIndex] < b[cellIndex] ? -1 : 1));
      this.tbody.innerHTML = this.generateTbody(this.tableData);
    }
  };

  // HELPERS
  retreieveData() {
    this.tableData = [...this.trs].map((tr) =>
      [...tr.cells].map((td) => td.innerHTML)
    );
  }

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

customElements.define("sortable-table", SortableTable, { extends: "table" });
