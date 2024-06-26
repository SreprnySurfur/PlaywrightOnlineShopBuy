import { Locator, Page, expect } from "@playwright/test";
import { UrlValues } from "../models/Assertions";

export abstract class CommonPage {
  public constructor(public page: Page) {}

  protected async visitUrl(url: string) {
    await this.page.goto(url);
  }

  protected getByText(text: RegExp | string) {
    return this.page.getByText(text);
  }

  protected getByTestId(id: RegExp | string) {
    return this.page.getByTestId(id);
  }

  protected clickByTestId(id: RegExp | string) {
    return this.getByTestId(id).click();
  }

  protected getLocator(id: string) {
    return this.page.locator(id);
  }

  protected clickLocator(id: string) {
    return this.getLocator(id).click();
  }

  public async verifyCurrentUrl(assertion: UrlValues, value: RegExp | string) {
    switch (assertion) {
      case "contain":
        return expect(this.page).toHaveURL(new RegExp(value));
      case "eq":
        return expect(this.page).toHaveURL(value);
      default:
        throw new Error(`Invalid assertion type: ${assertion}`);
    }
  }

  protected getByLabel(id: string) {
    return this.page.getByLabel(id);
  }

  protected frameLocator() {
    return this.page.frameLocator('iframe[name="framelive"]');
  }

  protected proceedCheckout() {
    return this.frameLocator()
      .getByRole("link", { name: "Proceed to checkout" })
      .click();
  }
}
