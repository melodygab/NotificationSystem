var cfg = {};

//Twilio Credentials
cfg.accountSid = 'ACb240eea77705027c434c3d52f60a2de1'; //Twilio Account SID
cfg.authToken = '41c8c12299333a9a908b35add6245600'; //Twilio Token
cfg.twilioNumber = '9206447038'; //Phone Number to Send Messages With

//Paths
cfg.alerts = "./resources/alerts.csv"; //File Path for General Alert CSV
cfg.missed = "./resources/missed.csv"; //File Path for Missed Court CSSV

module.exports = cfg;
