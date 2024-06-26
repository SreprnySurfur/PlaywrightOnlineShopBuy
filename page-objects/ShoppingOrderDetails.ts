import { Page, expect } from "@playwright/test";
import { CommonPage } from "./Common";

declare module "../my-fixtures" {
  interface MyFixtures {
    shoppingOrderDetailsPage: ShoppingOrderDetailsPage;
  }
}

export const injectShoppingOrderDetailsPage = async ({ page }, use) =>
  await use(new ShoppingOrderDetailsPage(page));

class ShoppingOrderDetailsPage extends CommonPage {
  private readonly selectors = {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    continueButton: "Continue",
    address: "Address",
    city: "City",
    state: "State",
    postalCode: "Zip/Postal Code",
    forDeliveryInfo: "If you would like to add a",
    errors: {
      postCode: "Invalid postcode - should",
    },
  };

  //

  public constructor(page: Page) {
    super(page);
  }

  public async setUpFirstName(firstName: string) {
    await super
      .frameLocator()
      .getByLabel(this.selectors.firstName)
      .fill(firstName);
  }

  public async setUpLastName(lastName: string) {
    await super
      .frameLocator()
      .getByLabel(this.selectors.lastName)
      .fill(lastName);
  }

  public async setEmail(email: string) {
    await super.frameLocator().getByLabel(this.selectors.email).fill(email);
  }

  public async checkTermsAndConditions() {
    await super.frameLocator().getByText("I agree to the terms and").check();
  }

  public async checkPersonalData() {
    await super
      .frameLocator()
      .getByText("The personal data you provide")
      .check();
  }

  public async clickContinueButton() {
    await super
      .frameLocator()
      .getByRole("button", { name: this.selectors.continueButton })
      .click();
  }

  public async setAddress(address: string) {
    await super
      .frameLocator()
      .getByLabel(this.selectors.address, { exact: true })
      .fill(address);
  }

  public async setCity(city: string) {
    await super.frameLocator().getByLabel(this.selectors.city).fill(city);
  }

  public async setState(state: string) {
    await super
      .frameLocator()
      .getByLabel(this.selectors.state)
      .selectOption(state);
  }

  public async setPostalCode(postalCode: string) {
    await super
      .frameLocator()
      .getByLabel(this.selectors.postalCode)
      .fill(postalCode);
  }

  public async checkTermsAndConditionDelivery() {
    await super.frameLocator().getByText("I agree to the terms of").check();
  }

  public async fillInfoForDelivery(deliveryInfo: string) {
    await super
      .frameLocator()
      .getByLabel(this.selectors.forDeliveryInfo)
      .fill(deliveryInfo);
  }

  public async zipCodeErrorVerification() {
    const locator = super.frameLocator().getByText("Invalid postcode - should");
    await expect(locator).toHaveText(
      'Invalid postcode - should look like "NNNNN"'
    );
  }
}
