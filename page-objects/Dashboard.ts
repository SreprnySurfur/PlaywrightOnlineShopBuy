import { Locator, Page, expect } from "@playwright/test";
import { CommonPage } from "./Common";

declare module "../my-fixtures" {
  interface MyFixtures {
    dashboardPage: DashboardPage;
  }
}

export const injectDashboardPage = async ({ page }, use) =>
  await use(new DashboardPage(page));

class DashboardPage extends CommonPage {
  private readonly selectors = {
    text: {
      over18Text: " Yes, discover more ",
      shopMenubarText: " Shop ",
    },
    searchBar: "Search our catalog",
  };

  private readonly testIds = {
    button: "customButton",
    menubarShop: {
      header: "headerItem-1",
    },
  };

  public constructor(page: Page) {
    super(page);
  }

  public async visit() {
    await this.page.goto("");
  }

  public async searchValue(searchValue: string) {
    await super
      .frameLocator()
      .getByPlaceholder(this.selectors.searchBar)
      .fill(searchValue);
    await this.page.keyboard.press("Enter");
  }

  public async clickSearchedElement(itemName: string) {
    await this.getSearchedElement(itemName).first().click();
  }

  public async clickShopMenubar() {
    await super
      .getByTestId(this.testIds.menubarShop.header)
      .getByText(this.selectors.text.shopMenubarText)
      .click();
  }

  private getSearchedElement(itemName: string): Locator {
    return super.frameLocator().getByRole("link", { name: itemName });
  }
}
