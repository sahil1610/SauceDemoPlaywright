import { Page } from "playwright";

export default class Inventory {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get productTiles() {
    return this.page.locator(".inventory_item");
  }
  get addRemoveItemFromCartButtons() {
    return this.page.locator(".inventory_item button");
  }
  get productTitle() {
    return this.page.locator(".inventory_item_name");
  }
  get productDesc() {
    return this.page.locator(".inventory_item_desc");
  }
  get productPrice() {
    return this.page.locator(".inventory_item_price");
  }
  get productSortSelectBox() {
    return this.page.locator("[data-test='product_sort_container']");
  }

  sortProductsZtoA = async (): Promise<void> => {
    await this.productSortSelectBox.selectOption("za");
  };
  /**
   * Get number of items in Inventory
   *
   * @memberof Inventory
   */
  getTotalItemsInInventory = async (): Promise<number> => {
    return await this.productTiles.count();
  };

  /**
   * Add a Product to cart based on product index
   *
   * @param {number} productIndex
   * @memberof Inventory
   */
  addRemoveProductToCartBasedOnIndex = async (
    productIndex: number
  ): Promise<void> => {
    await this.addRemoveItemFromCartButtons.nth(productIndex).click();
  };

  addProductToCartByName = async (productName: string) => {
    await this.page
      .locator(".inventory_item_name", { hasText: productName })
      .click();
  };

  isProductsSorted = async (isDescending?: boolean): Promise<boolean> => {
    const productTitles = await this.productTitle.allInnerTexts();
    const productTitlesCopy = productTitles.slice();

    if (isDescending) {
      return productTitles.join() === productTitlesCopy.sort().reverse().join();
    }
    return productTitles.join() === productTitlesCopy.sort().join();
  };

  /**
   * Get the product title based on product index
   *
   * @param {number} productIndex
   * @memberof Inventory
   */
  getProducTitleByIndex = async (
    productIndex: number
  ): Promise<string | null> => {
    return await this.productTitle.nth(productIndex).textContent();
  };

  /**
   * Get the product Description based on product index
   *
   * @param {number} productIndex
   * @memberof Inventory
   */
  getProducDescByIndex = async (
    productIndex: number
  ): Promise<string | null> => {
    return await this.productDesc.nth(productIndex).textContent();
  };

  /**
   * Get the product Price based on product index
   *
   * @param {number} productIndex
   * @memberof Inventory
   */
  getProducPriceByIndex = async (
    productIndex: number
  ): Promise<string | null> => {
    return await this.productPrice.nth(productIndex).textContent();
  };

  getProductInfoByIndex = async (productIndex: number): Promise<object> => {
    return {
      title: await this.getProducTitleByIndex(productIndex),
      desc: await this.getProducDescByIndex(productIndex),
      price: await this.getProducPriceByIndex(productIndex),
    };
  };
}
