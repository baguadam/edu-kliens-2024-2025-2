// const cardTemplate = document.querySelector("#card-template");
// const body = document.querySelector("body");

// body.appendChild(cardTemplate.content.cloneNode(true));

class CustomCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.generateCardTemplateWithStyle();
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  generateCardTemplateWithStyle() {
    this.template = document.createElement("template");
    this.template.innerHTML = `
        <style>
            .card {
                background-color: #ddd;
                width: 100%;
                border-radius: 3px;
                box-shadow: 3px 6px 5px black;
                padding: 20px;
                margin: 20px;
            }
        </style>

        <div class="card">
            <h2><slot name="title-slot">Default Title</slot></h2>
            <p><slot name="desc-slot">Default description</slot></p>
        </div>
    `;
  }
}

customElements.define("custom-card", CustomCard);
