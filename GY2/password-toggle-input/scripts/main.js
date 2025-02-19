class PasswordToggleInput extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const input = this.querySelector('input[type="password"]');
                
        if (!input) {
            return;
        }

        const toggleButton = document.createElement('button');
        toggleButton.type = "button";
        toggleButton.innerText = 'Show';
        this.appendChild(toggleButton);

        toggleButton.addEventListener('click', () => {
            const type = input.getAttribute('type');
            if (type === 'password') {
                input.setAttribute('type', 'text');
                toggleButton.innerText = 'Hide';
            } else {
                input.setAttribute('type', 'password');
                toggleButton.innerText = 'Show';
            }
        });
    }
}