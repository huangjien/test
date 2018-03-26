package atest.actions;

import atest.Config;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class Action {
    Logger logger = LoggerFactory.getLogger("Action");
    public String data;
    public String action;
    public UI ui;

    public abstract WebElement findTestObject();

    public WebElement findOneTestObject() {
        return Browser.findTestObject(this.ui.toJson(), Long.parseLong(Config.getInstance().get("search.timeout", 5).toString()));
    }

    public void deal(){
        WebElement testObject = findTestObject();
        handle(testObject);
    }

    protected abstract void handle (WebElement testObject);

    public void clear() {
    }
}