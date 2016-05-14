var csv = require('fast-csv');
var fs = require('fs');
var config = require('../resources/config');
var client = require('twilio')(config.accountSid, config.authToken);

module.exports = {
    run: function(path){
	if(path == 'alert'){
		var stream = fs.createReadStream(config.alerts);
	}else{
		var stream = fs.createReadStream(config.missed);
	}

	csv
	.fromStream(stream, {headers : ["Name", "Phone", "Case", "Date", "Time", "Location"]})
	.on("data", function(data){
		if(path == 'alert'){
			var body = data.Name + ', You have a hearing for case ' + data.Case + ' at ' + data.Location + ' on ' + data.Date + ' at ' + data.Time
		    var update = 'sent';
            dataDB.run("insert into datadb (null, " + new Date().getDate() + "-" + new Date().getMonth+1 + ", 0, 0, 0)");
        }else{
			var body = data.Name + ', You missed your hearing for case ' + data.Case + ' at ' + data.Location + '. Please call the court at your earliest availability.'
            var update = 'missed';
		}		
		var options = {
			to: data.Phone,
			from: config.twilioNumber,
			body: body
		}

		client.sendMessage(options, function(err, res){
			var date = new Date();
            var day = date.getDate() + '-' + date.getMonth()+1;
            if(err){
                dataDB.run("update datadb set err = 1 + err where date = " + day);
				console.log(err);
			}else{
                dataDB.run("update datadb set " + update + " = 1 + " + update + " where date = " + day);
                console.log('Message Sent To ' + data.Phone);
			}
		});
	})
	.on("end", function(){
		console.log(path + ' batch executed');
	});
    }
}
