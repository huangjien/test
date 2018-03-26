package atest.actions;

import com.google.common.base.Strings;
import com.google.gson.JsonObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;


import java.util.List;
import java.util.function.Function;

/**
 * Created by jien.huang on 20/10/2016.
 */
public class Browser {
    public static WebElement findTestObject(JsonObject ui, long timeOut) {
        return findTestObject(ui, 0, timeOut);
    }

    private static WebElement findTestObject(JsonObject ui, int i, long timeOut) {
        List<WebElement> found = find(ui, timeOut);
        if (found == null)
            return null;
        if (found.size() == 0)
            return null;
        if (found.size() <= i)
            return null;
        return found.get(i);
    }

    private static List<WebElement> find(JsonObject ui, long timeOut) {
        List<WebElement> found = null;

        final By way = findBy(ui);
        if (way != null) {

            WebDriver driver = BrowserInstance.getInstance().get();
            WebDriverWait wait = new WebDriverWait(driver, timeOut * 1000);
            wait.until(new Function<WebDriver, WebElement>() {
                public WebElement apply(WebDriver driver) {
                    return driver.findElement(way);
                }
            });

            found = driver.findElements(way);
        }

        return found;
    }

    private static By findBy(JsonObject ui) {
        String way = ui.get("way").getAsString();
        if (Strings.isNullOrEmpty(way))
            return null;
        String search = ui.get("data").getAsString();
        if (Strings.isNullOrEmpty(search))
            return null;
        return findBy(way, search);

    }

    private static By findBy(String way, String search) {
        assert (!Strings.isNullOrEmpty(way));
        assert (!Strings.isNullOrEmpty(search));

        if (way.equalsIgnoreCase("id"))
            return By.id(search);
        if (way.equalsIgnoreCase("tagname"))
            return By.tagName(search);
        if (way.equalsIgnoreCase("xpath"))
            return By.xpath(search);
        if (way.equalsIgnoreCase("classname"))
            return By.className(search);
        if (way.equalsIgnoreCase("cssselector"))
            return By.cssSelector(search);
        if (way.equalsIgnoreCase("linktext"))
            return By.linkText(search);
        if (way.equalsIgnoreCase("name"))
            return By.name(search);
        if (way.equalsIgnoreCase("partialLinkText"))
            return By.partialLinkText(search);
        return By.xpath("//*[@" + way + "='" + search + "']");

    }


}
