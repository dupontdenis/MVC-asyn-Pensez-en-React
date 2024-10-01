/**
 * Creates a table header element with the given headers.
 * @param {Array} headers - The list of headers to display.
 * @returns {HTMLElement} The table header element.
 */
export function createTableHeader(headers) {
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    th.classList.add("text-center"); // Add Bootstrap class for center alignment
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  return thead;
}

/**
 * Creates a category row element with the given category.
 * @param {string} category - The category name.
 * @returns {HTMLElement} The category row element.
 */
export function createCategoryRow(category) {
  return createElementFromHTML(`
    <tr class="table-secondary"> <!-- Add Bootstrap class for styling -->
      <td colspan="2" class="category text-center">${category}</td>
    </tr>
  `);
}

/**
 * Creates a product row element with the given product.
 * @param {Object} product - The product object.
 * @returns {HTMLElement} The product row element.
 */
export function createProductRow(product) {
  const stockedClass = product.stocked ? "" : "text-danger"; // Use Bootstrap class for out-of-stock items
  return createElementFromHTML(`
    <tr>
      <td class="${stockedClass}">${product.name}</td>
      <td>${product.price}</td>
    </tr>
  `);
}

/**
 * Creates an element from an HTML string.
 * @param {string} htmlString - The HTML string.
 * @returns {HTMLElement} The created element.
 */
export function createElementFromHTML(htmlString) {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
}