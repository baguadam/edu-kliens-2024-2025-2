class ShadowButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.generateButton();
    this.generateStyle();
    this.shadowRoot.append(this.styleTag, this.button);
  }

  generateButton() {
    this.button = document.createElement("button");
    this.button.innerHTML = "SHADOW DOM BUTTON";
  }

  generateStyle() {
    this.styleTag = document.createElement("style");
    this.styleTag.innerHTML = `
        button {
            background-color: blue;
            border-radius: 5px;
            border: 1px solid black;
        }
    `;
  }
}

customElements.define("shadow-button", ShadowButton);

window.onload = () => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((b) => console.log(`BUTTON: ${b.textContent}`));

  const shadowButton = document
    .querySelector("shadow-button")
    .shadowRoot.querySelector("button");
  console.log(`BUTTON: ${shadowButton.textContent}`);
};
