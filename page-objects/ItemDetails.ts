import { Locator, Page, expect } from "@playwright/test";
import { CommonPage } from "./Common";

declare module "../my-fixtures" {
  interface MyFixtures {
    itemDetailsPage: ItemDetailsPage;
  }
}

export const injectItemDetailsPage = async ({ page }, use) =>
  await use(new ItemDetailsPage(page));

class ItemDetailsPage extends CommonPage {
  private readonly selectors = {
    addToCartButton: "Add to cart",
    proceedToCheckoutButton: "Proceed to checkout",
  };

  public constructor(page: Page) {
    super(page);
  }

  public async addToCartClick() {
    await super
      .frameLocator()
      .getByRole("button", { name: this.selectors.addToCartButton })
      .click();
  }

  public async checkProductName(productName: string) {
    const locator = this.getModal().getByRole("heading", { name: productName });
    await expect(locator).toHaveText(productName);
  }

  public async clickProceedToCheckout() {
    await this.proceedCheckout();
  }

  private getModal(): Locator {
    return super.frameLocator().getByLabel("Product successfully added");
  }
}
