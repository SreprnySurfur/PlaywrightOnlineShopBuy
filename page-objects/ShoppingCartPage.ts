import { Page } from "@playwright/test";
import { CommonPage } from "./Common";

declare module "../my-fixtures" {
  interface MyFixtures {
    shoppingCartPage: ShoppingCartPage;
  }
}

export const injectShoppingCartPage = async ({ page }, use) =>
  await use(new ShoppingCartPage(page));

class ShoppingCartPage extends CommonPage {
  public constructor(page: Page) {
    super(page);
  }

  public async proceedCheckoutClick() {
    await super.proceedCheckout();
  }
}
