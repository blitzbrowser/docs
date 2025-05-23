import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class Application {

    public static void main(String[] args) {
        String blitzBrowserAccesskey = "...";

        try (
                Playwright playwright = Playwright.create();
                Browser browser = playwright.chromium().connectOverCDP("wss://cdp.blitzbrowser.com?accessKey=" + blitzBrowserAccesskey)
        ) {
            Page page = browser.newPage();
        }
    }

}
