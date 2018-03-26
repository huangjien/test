package atest.actions;

import org.openqa.selenium.WebElement;

/**
 * Created by jien.huang on 19/10/2016.
 */
public class Enter extends Action {
    public WebElement findTestObject() {
        return findOneTestObject();
    }

    protected void handle(WebElement testObject) {
        testObject.sendKeys(this.data);
    }
}
