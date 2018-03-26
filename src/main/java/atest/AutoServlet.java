package atest;

import atest.actions.ActionFactory;
import com.google.common.base.Strings;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Scanner;

import static javax.servlet.http.HttpServletResponse.SC_OK;

public class AutoServlet extends HttpServlet {

    protected void doPost (HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String content = getRequestContent(request);

        if (Strings.isNullOrEmpty(content)){
            returnError(response, "Request is null or empty");
            return;
        }
        JsonParser jsonParser = new JsonParser();
        JsonElement commands = jsonParser.parse(content);
        if (commands.isJsonArray()){
            for (JsonElement command : commands.getAsJsonArray()) {
                ActionFactory.getAction(command.toString()).deal();
            }
        } else {
            ActionFactory.getAction(commands.toString()).deal();
        }

        returnOK(response);
    }

    private void returnStatus(HttpServletResponse response, int status, String message) throws IOException {
        response.setContentType("application/json");
        response.setStatus(status);
        response.getWriter().println("{\"status\":\""+ String.valueOf(status)+"\", \"message\":\""+ message +"\"}");
    }

    private void returnOK(HttpServletResponse response) throws IOException {
        returnStatus(response, SC_OK, "OK");
    }

    private void returnError(HttpServletResponse response, String message) throws IOException {
        returnStatus(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, message);
    }

    String getRequestContent(HttpServletRequest request) throws IOException {
        Scanner s = null;

        s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");

        if (s.hasNext())
            return s.next();
        return null;
    }
}
