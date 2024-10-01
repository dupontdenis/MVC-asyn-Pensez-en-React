export default class Model {
  constructor() {
    this.apiEndpoint = "data.json"; // Update this to your actual API endpoint
    this.filterText = "";
    this.inStockOnly = false;
    this.products = [];
  }

  async fetchContent() {
    try {
      console.log("Model: Fetching content from API");
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(this.apiEndpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.products = await response.json();
      console.log("Model: Content fetched successfully");
      return this.products;
    } catch (error) {
      console.error("Model: Failed to fetch content:", error);
      throw error;
    }
  }

  async setFilterText(filterText) {
    this.filterText = filterText;
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve();
  }

  async setInStockOnly(inStockOnly) {
    this.inStockOnly = inStockOnly;
    console.log(`Model: In-stock only set to "${inStockOnly}"`);
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return Promise.resolve();
  }

  async getFilteredProducts() {
    console.log("Model: Filtering products");
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return this.products.filter((product) => {
      const matchesFilterText = this.filterText
        ? product.name.toLowerCase().startsWith(this.filterText.toLowerCase())
        : true;
      const matchesStock = this.inStockOnly ? product.stocked : true;
      return matchesFilterText && matchesStock;
    });
  }
}
