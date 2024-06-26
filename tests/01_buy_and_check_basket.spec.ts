import { test as base } from "@playwright/test";
import { MyFixtures } from "../my-fixtures";
import { injectDashboardPage } from "../page-objects/Dashboard";
import { injectItemDetailsPage } from "../page-objects/ItemDetails";
import { injectShoppingCartPage } from "../page-objects/ShoppingCartPage";
import { injectShoppingOrderDetailsPage } from "../page-objects/ShoppingOrderDetails";

const test = base.extend<MyFixtures>({
  dashboardPage: injectDashboardPage,
  itemDetailsPage: injectItemDetailsPage,
  shoppingCartPage: injectShoppingCartPage,
  shoppingOrderDetailsPage: injectShoppingOrderDetailsPage,
});

test.describe("01 Shopping basic flow", () => {
  test("Go to URL, search item, add to cart, fill order info and finish shopping", async ({
    dashboardPage,
    itemDetailsPage,
    shoppingCartPage,
    shoppingOrderDetailsPage,
    page,
  }) => {
    const itemName = "Hummingbird printed sweater";
    await dashboardPage.visit();
    await dashboardPage.verifyCurrentUrl(
      "eq",
      "https://demo.prestashop.com/#/en/front"
    );

    await dashboardPage.searchValue(itemName);
    await dashboardPage.clickSearchedElement(itemName);
    await itemDetailsPage.addToCartClick();
    await itemDetailsPage.checkProductName(itemName);
    await itemDetailsPage.clickProceedToCheckout();
    await page.waitForTimeout(1000);
    await shoppingCartPage.proceedCheckoutClick();
    await shoppingOrderDetailsPage.setUpFirstName("test");
    await shoppingOrderDetailsPage.setUpLastName("test");
    await shoppingOrderDetailsPage.setEmail("te@st.er");
    await shoppingOrderDetailsPage.checkTermsAndConditions();
    await shoppingOrderDetailsPage.checkPersonalData();
    await shoppingOrderDetailsPage.clickContinueButton();
    await shoppingOrderDetailsPage.setAddress("test");
    await shoppingOrderDetailsPage.setCity("test");
    await shoppingOrderDetailsPage.setPostalCode("12345");
    await shoppingOrderDetailsPage.setState("Florida");
    await shoppingOrderDetailsPage.clickContinueButton();
    await shoppingOrderDetailsPage.fillInfoForDelivery("test");
    await shoppingOrderDetailsPage.clickContinueButton();
    await shoppingOrderDetailsPage.checkTermsAndConditionDelivery();
  });

  test("Go to URL, search item, add to cart, don't fill order info and check validation errors", async ({
    dashboardPage,
    itemDetailsPage,
    shoppingCartPage,
    shoppingOrderDetailsPage,
    page,
  }) => {
    const itemName = "Hummingbird printed sweater";
    await dashboardPage.visit();
    await dashboardPage.verifyCurrentUrl(
      "eq",
      "https://demo.prestashop.com/#/en/front"
    );

    await dashboardPage.searchValue(itemName);
    await dashboardPage.clickSearchedElement(itemName);
    await itemDetailsPage.addToCartClick();
    await itemDetailsPage.checkProductName(itemName);
    await itemDetailsPage.clickProceedToCheckout();
    await page.waitForTimeout(1000);
    await shoppingCartPage.proceedCheckoutClick();
    await shoppingOrderDetailsPage.setUpFirstName("test");
    await shoppingOrderDetailsPage.setUpLastName("test");
    await shoppingOrderDetailsPage.setEmail("te@st.er");
    await shoppingOrderDetailsPage.checkTermsAndConditions();
    await shoppingOrderDetailsPage.checkPersonalData();
    await shoppingOrderDetailsPage.clickContinueButton();
    await shoppingOrderDetailsPage.setAddress("test");
    await shoppingOrderDetailsPage.setCity("test");
    await shoppingOrderDetailsPage.setPostalCode("test");
    await shoppingOrderDetailsPage.setState("Florida");
    await shoppingOrderDetailsPage.clickContinueButton();
    await shoppingOrderDetailsPage.zipCodeErrorVerification();
  });
});
