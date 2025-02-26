class ConfirmLink extends HTMLAnchorElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener("click", this.handleLinkClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleLinkClick);
  }

  handleLinkClick = (e) => {
    if (!confirm("Biztos?")) {
      e.preventDefault();
    }
  };
}

customElements.define("confirm-link", ConfirmLink, { extends: "a" });
