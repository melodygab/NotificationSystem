package com.twilio.notifications.models;

public class Clients {
    private String name;
    private String phoneNumber;
    private String code;
    private String courtDate;

    public Clients(String name, String phoneNumber, String code, String courtDate) {
	this.name = name;
	this.phoneNumber = phoneNumber;
	this.code = code;
	this.courtDate = courtDate;
}
    
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }    
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setCode(String code) {
        this.code = code;
    }
   
    public String getCode() {
        return code;
    }

    public void setCourtDate(String courtDate) {
        this.courtDate = courtDate;
    }    

    public String courtDate() {
        return courtDate;
    }
}
