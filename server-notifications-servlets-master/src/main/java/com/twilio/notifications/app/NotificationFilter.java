package com.twilio.notifications.filter;

import com.twilio.notifications.models.Clients;
import com.twilio.notifications.utils.Client;
import com.twilio.notifications.utils.Repository;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;
import java.util.ArrayList;

@WebFilter(filterName = "NotificationFilter", urlPatterns = {"/launch"})
public class NotificationFilter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String errorMessage = "Generic error message";
        try {
            chain.doFilter(request, response);
        } catch (Throwable throwable) {
            String message = customMessage(throwable.getMessage());

            // Send a message to the administrators when something went unexpectedly wrong.
            ArrayList<Clients> clients = new Repository().getClients();
            for(int i =0; i < clients.size(); i++) {
                new Client().sendMessage(clients.get(i).getPhoneNumber(), message);
            }
        }

        Object error = errorMessage;
        request.setAttribute("error", error);
        request.getRequestDispatcher("error.jsp").forward(request, response);
    }

    public void destroy() {
    }

    private String customMessage(String exceptionMessage) {
        return String.format("Notification Test", exceptionMessage);
    }
}
