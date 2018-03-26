package atest.actions;

import com.google.gson.Gson;
import com.google.gson.JsonParser;

public class ActionFactory {
    private static JsonParser parser = new JsonParser();
    private static Gson gson = new Gson();

    public static Action getAction(String message) {

        System.out.println(message);
        String actionName = parser.parse(message).getAsJsonObject().get("action").getAsString();

        Class<Action> c = null;
        try {
            c = (Class<Action>) Class.forName("atest.actions."+actionName);
            Action action = gson.fromJson(message, c);
            return action;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;

    }
}

