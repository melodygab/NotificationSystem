package com.twilio.notifications.filter;

import com.twilio.notifications.models.Clients;
import com.twilio.notifications.utils.Client;
import com.twilio.notifications.utils.Repository;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;
import java.text.ParseException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;

@WebFilter(filterName = "NotificationFilter", urlPatterns = {"/launch"})
public class NotificationFilter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException{
        String errorMessage = "Generic error message";
        try {
            chain.doFilter(request, response);
        } catch (Throwable throwable) {
            ArrayList<Clients> clients = new Repository().getClients();
            for(int i =0; i < clients.size(); i++) {
                try{
			String message = customMessage(clients.get(i).getCourtDate(), throwable.getMessage());
			new Client().sendMessage(clients.get(i).getPhoneNumber(), message);
		}catch (ParseException e){
			
		}
            }
        }
    }

    public void destroy() {
    }

    private String customMessage(String date, String exceptionMessage) throws ParseException{
	DateFormat format = new SimpleDateFormat("dd-mm-yyyy");
	Date day = format.parse(date);
		if((day.getTime() - System.currentTimeMillis())/1000 <= 86400){
			return String.format("This is an alert from the Hoover Foundation : You have a court date tomorrow.", exceptionMessage);
		}else if((day.getTime() - System.currentTimeMillis())/1000 <= 172800){
			return String.format("This is an alert from the Hoover Foundation : You have a court date in (2) days.", exceptionMessage);
		}else{
			return String.format("Notification Test", exceptionMessage);
		}
    }
}
