import com.microsoft.playwright.*;

public class ParaBankTest{
    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create()) {
            // Launch browser
            Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
                    .setHeadless(false)); // set true for headless mode
            Page page = browser.newPage();

            // Base URL
            String baseUrl = "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC";

            long ts = System.currentTimeMillis();
            String username = "seleniumUser" + ts;
            String password = "Password@" + (ts % 1000);

            // Navigate to ParaBank
            page.navigate(baseUrl);

            // Click Register
            page.locator("text=Register").waitFor(new Locator.WaitForOptions()
                    .setState(WaitForSelectorState.VISIBLE));
            page.locator("text=Register").click();

            // Fill registration form
            page.locator("#customer\\.firstName").fill("TestFirst");
            page.locator("#customer\\.lastName").fill("TestLast");
            page.locator("#customer\\.address\\.street").fill("1 Test Street");
            page.locator("#customer\\.address\\.city").fill("TestCity");
            page.locator("#customer\\.address\\.state").fill("TS");
            page.locator("#customer\\.address\\.zipCode").fill("12345");
            page.locator("#customer\\.phoneNumber").fill("9876543210");
            page.locator("#customer\\.ssn").fill("123456789"); // 9-digit SSN
            page.locator("#customer\\.username").fill(username);
            page.locator("#customer\\.password").fill(password);
            page.locator("#repeatedPassword").fill(password);

            // Submit registration
            page.locator("input[value='Register']").click();

            // Navigate to Accounts Overview
            Locator accountsOverview = page.locator("text=Accounts Overview");
            accountsOverview.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
            accountsOverview.click();

            // Fetch and print Total balance
            Locator totalLocator = page.locator("//b[text()='Total']/parent::td/following-sibling::td/b");
            totalLocator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
            String total = totalLocator.textContent();
            System.out.println("Total: " + total);

            browser.close();
        }
    }
}
