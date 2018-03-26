package atest.actions;

import com.google.gson.JsonObject;

public class UI {
    public String way;
    public String data;

    public JsonObject toJson(){
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("way", way);
        jsonObject.addProperty("data", data);
        return jsonObject;
    }
}
