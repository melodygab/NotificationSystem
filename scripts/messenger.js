var config = require('../resources/config');
var client = require('twilio')(config.accountSid, confid.authToken);


module.exports = {
	run : function(to, body){
    		var options = {
        		to: to
        		from: config.twilioNumber,
        		body: body
    		};
		client.sendMessage(options, function(err, response){
        		if(err){
            			console.log(err);
        		}else{	
            			var masked = to.substr(5, to.length);
            			console.log('Message Sent To ' + masked);
        		}
		}
	}
}
