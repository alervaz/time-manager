import { customElement } from "lit/decorators.js";
import { html } from "lit";

@customElement("custom-controls")
export class Controls extends HTMLElement {
  swapOnClick(button: HTMLButtonElement, other: HTMLButtonElement) {
    const text = button.innerText;
    button.addEventListener("click", function() {
      if (button.innerText == text) {
        button.innerText = "Stop"
        other.disabled = true;
        localStorage.setItem("current", text)
      } else {
        button.innerText = text
        other.disabled = false;
        localStorage.removeItem("current")
      }
    })
  }

  connectedCallback(): void {
    const current = localStorage.getItem("current")
    const consume = this.querySelector("#consume") as HTMLButtonElement;
    const movement = this.querySelector("#movement") as HTMLButtonElement;
    const clear = this.querySelector("#clear") as HTMLButtonElement;
    this.swapOnClick(consume, movement);
    this.swapOnClick(movement, consume);
    clear.addEventListener("click", function() {
      consume.disabled = false
      consume.innerText = "Consume"
      movement.disabled = false;
      movement.innerText = "Movement"
      localStorage.removeItem("current")
    })
    if (current != null) {
      if (current == "Consume") {
        consume.innerText = "Stop"
        movement.disabled = true
      } else {
        movement.innerText = "Stop"
        consume.disabled = true
      }
    }



    if (!consume || !movement) {
      return;
    }

  }

  protected render(): unknown {
    return html`
      <slot></slot>
    `
  }
}
