#Client Court - Notification System

##Description
Part of NJIT's Senior Capstone (2016), this web application sends daily notifications and records analytics on the messages sent. 

##Technologies and Tools

- [Node.JS](https://nodejs.org): Server Language
- [Express.js](http://expressjs.com/): Web Server Framework
- [Twilio](https://www.twilio.com/): SMS API
- [NodeScheduler]: CRON-like Scheduling API
- [Bootstrap](https://www.getbootstrap.com/): Front-End Framework
- [Charts](https://developers.google.com/chart/): Chart/Analytics API

##Installation Instructions
1. [Download](https://nodejs.org/en/download/) and Install Node.JS for the Server/Machine (follow the wizard).
2. Open Command Line in the project folder.
3. Run `npm start` in the command line.
4. Done! (Note : Command Line window must remain open on windows machines for automatic reminders to occur)

-On your machine, you can access the dashboard by typing localhost:3005 into your browser. With windows sharing, other people on your local network will be able to access it with "computer name":3005, where "computer name" is your machine's name (found in Windows System Information).

##Twilio Instructions
1. [Register](https://www.twilio.com/try-twilio) for a Twilio Account. 
2. Navigate to project/resources folder, and edit the config.js file.
3. Enter your account's SID, AUTH TOKEN, and Phone Number (found on twilio's website under your account information).

##Changing CSV Paths
2. Navigate to project/resources folder, and edit the config.js file.
2. Change the value of the "Alerts" path to the path of where your "morning" reminder csv will be.
3. Change the value of the "Missed" path to the path of where your "nightly" missed trial csv will be.

##CSV FORMATS
- Reminders : Name, Phone, Trial Number, Date, Time, Location
- Batch Sender : Name, Phone, Message 



