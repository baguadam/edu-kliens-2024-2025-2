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

        this.appendChild(charCounter)
    }
}

customElements.define("char-counter-input", CharCounterInput);