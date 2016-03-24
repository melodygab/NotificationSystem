package com.twilio.notifications.utils;

import com.twilio.notifications.models.Clients;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class Repository{
    private String filePath;

    public Repository(){
        this.filePath = getClass().getClassLoader().getResource("clients.csv").getPath();
    }

    public ArrayList<Clients> getClients() {
	BufferedReader buffer = null;
        ArrayList<Clients> clients = new ArrayList<Clients>();

	try {
		String line = "";
		buffer = new BufferedReader(new FileReader(filePath));
		while((line = buffer.readLine()) != null){
			String[] split = line.split("\\s*,\\s*");
			clients.add(new Clients(split[0], split[1], split[2], split[3]));
		}	            
        }catch(FileNotFoundException e){
            e.printStackTrace();
            return clients;
        }finally{
		try{
			if(buffer != null){
				buffer.close();
			}			
			return clients;
		}catch(IOException e){
			e.printStackTrace();
			return clients;
		}
	}
    }
}
