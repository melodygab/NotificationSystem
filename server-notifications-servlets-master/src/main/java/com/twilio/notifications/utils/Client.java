package com.twilio.notifications.utils;

import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.List;

public class Client {
    private Credentials credentials;
    private TwilioRestClient client;

    public Client() {
        this.credentials = new Credentials();
        String accountSid = "ACb240eea77705027c434c3d52f60a2de1";
        String authToken = "41c8c12299333a9a908b35add6245600";
        this.client = new TwilioRestClient(accountSid, authToken);
    }

    public Client(TwilioRestClient client, Credentials credentials) {
        this.credentials = credentials;
        this.client = client;
    }

    public void sendMessage(String to, String message) {
        List<NameValuePair> params = getParams(to, message);

        try {
            this.client.getAccount().getMessageFactory().create(params);
        } catch (TwilioRestException exception) {
            exception.printStackTrace();
        }
    }

    private List<NameValuePair> getParams(String to, String message) {
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("Body", message));
        params.add(new BasicNameValuePair("To", to));
        params.add(new BasicNameValuePair("From", "+19206447038"));

        return params;
    }
}

