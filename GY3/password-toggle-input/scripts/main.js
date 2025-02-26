class PasswordToggleInput extends HTMLElement {
  constructor() {
    super();
    this.passwordInput = null;
    this.toggleButton = null;
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
  }

  connectedCallback() {
    this.passwordInput = this.querySelector('input[type="password"]');

    if (!this.passwordInput) {
      return;
    }

    this.createToggleButton();
    this.toggleButton.addEventListener("click", this.handleToggleButtonClick);
  }

  disconnectedCallback() {
    if (this.toggleButton) {
      this.toggleButton.removeEventListener(
        "click",
        this.handleToggleButtonClick
      );
    }
  }

  createToggleButton() {
    if (!this.toggleButton) {
      this.toggleButton = document.createElement("button");
      this.toggleButton.type = "button";
      this.toggleButton.innerText = "Show";
      this.appendChild(this.toggleButton);
    }
  }

  handleToggleButtonClick() {
    if (!this.passwordInput) return;

    const isPasswordHidden = this.passwordInput.type === "password";
    this.passwordInput.type = isPasswordHidden ? "text" : "password";
    this.toggleButton.innerText = isPasswordHidden ? "Hide" : "Show";
  }
}

customElements.define("password-toggle-input", PasswordToggleInput);