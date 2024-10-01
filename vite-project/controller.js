import Model from "./model.js";
import View from "./view.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind event handlers
    this.view.bindFilterInput(this.handleFilterInput);
    this.view.bindStockCheckbox(this.handleStockCheckbox);

    // Initialize the content
    this.showContent();
  }

  async showContent() {
    try {
      console.log("Controller: Showing content");
      this.view.showSpinner();
      await this.model.fetchContent();
      const filteredProducts = await this.model.getFilteredProducts();
      await this.view.updateContent(filteredProducts);
    } catch (error) {
      console.error("Controller: Failed to show content:", error);
    } finally {
      this.view.hideSpinner();
    }
  }

  handleFilterInput = async () => {
    const filterText = this.view.filterInput.value;
    console.log(`Controller: Filter input changed to "${filterText}"`);
    try {
      this.view.showSpinner();
      await this.model.setFilterText(filterText);
      console.log("Controller: Filter text set in model");
      const filteredProducts = await this.model.getFilteredProducts();
      await this.view.updateContent(filteredProducts);
      console.log("Controller: View updated with filtered products");
    } catch (error) {
      console.error("Controller: Failed to handle filter input:", error);
    } finally {
      this.view.hideSpinner();
    }
  };

  handleStockCheckbox = async () => {
    const inStockOnly = this.view.stockCheckbox.checked;
    console.log(`Controller: Stock checkbox changed to "${inStockOnly}"`);
    try {
      this.view.showSpinner();
      await this.model.setInStockOnly(inStockOnly);
      console.log("Controller: In-stock only set in model");
      const filteredProducts = await this.model.getFilteredProducts();
      await this.view.updateContent(filteredProducts);
      console.log("Controller: View updated with filtered products");
    } catch (error) {
      console.error("Controller: Failed to handle stock checkbox:", error);
    } finally {
      this.view.hideSpinner();
    }
  };
}

// Instantiate the MVC components
const model = new Model();
const view = new View();
const controller = new Controller(model, view);