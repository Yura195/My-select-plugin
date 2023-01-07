const layout = (data = [], placeholder, selected) => {
  let text = placeholder ?? "Default placeholder";
  const selectList = data.map((selectItem) => {
    let style = "";
    if (selectItem.id === selected) {
      text = selectItem.value;
      style = "selected";
    }
    if (selectItem.path === undefined) {
      return `
      <li class="select__item ${style}" data-type="item" data-id="${selectItem.id}">
          <span  class="item-text">${selectItem.value}</span>
      </li>`;
    } else {
      return `
      <li class="select__item" data-type="item" data-id="${selectItem.id}">
          <img class="item-ico" src=${selectItem.path}> 
          <span  class="item-text">${selectItem.value}</span>
      </li>
      `;
    }
  });

  return `
    <div class="select__input" data-type="input">
            <span data-type="selected-value">${text}</span>
            <img class="select__arrow" src="down-arrow.svg" data-type="arrow">
        </div>
        <div class="select__dropdown">
            <ul class="select__list">
              ${selectList.join("")}
            </ul>
        </div>
    `;
};

class Select {
  constructor(selector, options) {
    this.selector = document.querySelector(selector);
    this.options = options;
    this.selected = options.selected;
    this.toHTML();
    this.handlers();
  }

  toHTML() {
    const { placeholder, data } = this.options;
    this.selector.insertAdjacentHTML(
      "afterbegin",
      layout(data, placeholder, this.selected)
    );
  }

  open() {
    this.selector.classList.add("open");
    this.arrow.classList.add("rotate");
  }

  close() {
    this.selector.classList.remove("open");
    this.arrow.classList.remove("rotate");
  }

  handlers() {
    this.clickHandler = this.clickHandler.bind(this);
    this.selector.addEventListener("click", this.clickHandler);
    this.arrow = this.selector.querySelector('[data-type="arrow"]');
    this.selectedValue = this.selector.querySelector(
      '[data-type="selected-value"]'
    );
  }

  clickHandler(event) {
    const { type } = event.target.dataset;

    if (type === "input") {
      this.selector.classList.contains("open") ? this.close() : this.open();
    } else if (type === "item") {
      const id = event.target.dataset.id;
      this.select(id);
    }
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selected);
  }

  select(id) {
    this.selected = id;
    this.selectedValue.textContent = this.current.value;
    this.selector.querySelectorAll('[data-type="item"').forEach((element) => {
      element.classList.remove("selected");
    });
    this.selector.querySelector(`[data-id="${id}"]`).classList.add("selected");
    this.close();
  }
}

const select = new Select("#select", {
  // placeholder: "Please,select some element",
  selected: "1",
  data: [
    { /*path:'./down-arrow.svg',*/ value: "Tomsk", id: "1" },
    { value: "Saransk", id: "2" },
    { value: "Novosibirsk", id: "3" },
    { value: "Volgograd", id: "4" },
    { value: "Samara", id: "5" },
    { value: "Moscow", id: "6" },
  ],
});

console.log('console')