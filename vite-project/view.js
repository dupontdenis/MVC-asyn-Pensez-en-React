import { qs, $on } from './helpers.js';
import { createTableHeader, createCategoryRow, createProductRow } from './tableHelper.js';

export default class View {
  constructor() {
    this.dataTable = qs("#data-table");
    this.filterInput = qs("#filter-input");
    this.stockCheckbox = qs("#stock-checkbox");
    this.spinner = qs("#spinner"); // Assuming spinner element exists in the HTML
  }

  /**
   * Updates the content of the data table with the given products.
   * @param {Array} products - The list of products to display.
   */
  updateContent(products) {
    console.log("View: Updating content");
    this.dataTable.innerHTML = "";

    const table = document.createElement("table");
    table.classList.add("table", "table-striped", "table-bordered"); // Add Bootstrap classes
    const thead = createTableHeader(["Name", "Price"]);
    const tbody = document.createElement("tbody");

    products.forEach(product => {
      const row = createProductRow(product);
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    this.dataTable.appendChild(table);
  }

  /**
   * Binds the filter input event to the given handler.
   * @param {Function} handler - The event handler for the filter input.
   */
  bindFilterInput(handler) {
    console.log("View: Binding filter input");
    $on(this.filterInput, "input", (event) => {
      console.log("View: Input changed");
      handler(event);
    });
  }

  /**
   * Binds the stock checkbox change event to the given handler.
   * @param {Function} handler - The event handler for the stock checkbox.
   */
  bindStockCheckbox(handler) {
    console.log("View: Binding stock checkbox");
    $on(this.stockCheckbox, "change", (event) => {
      console.log("View: Stock checkbox changed");
      handler(event);
    });
  }

  showSpinner() {
    this.spinner.style.display = 'block';
  }

  hideSpinner() {
    this.spinner.style.display = 'none';
  }
}