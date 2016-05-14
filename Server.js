var express = require('express');
var schedule = require('node-schedule');
var config = require('./resources/config');
var batch = require('./scripts/batchNotifier.js');
var client = require('twilio')(config.accountSid, config.authToken);
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = __dirname + '/views/';
var csv = require('fast-csv');
var fs = require('fs');
var sqlite3 = require("sqlite3").verbose();
var dataDB = new sqlite3.Database(':memory:');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.use(function (req,res,next){
    console.log('/' + req.method);
    next();
});

router.get('/',function(req,res){
    res.sendFile(path + 'index.html');
});


app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));

app.use('/css', express.static(__dirname + '/views/'));

app.use('/js', express.static(__dirname + '/scripts'));

app.use('/home', express.static(__dirname));

app.use('/', router);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/sendbatch', upload.single('filem'), function(req, res){
    if('ABC' == ''){
        console.log('Error');
        res.sendFile(path + 'index.html');
    }else{
        var stream = fs.createReadStream(req.file.path);
        csv
        .fromStream(stream, {headers : ["Name", "Phone", "Message"]})
        .on("data", function(data){
            var body = data.Name + ', ' + data.Message;
            var options = {
               to: data.Phone,
               from: config.twilioNumber,
               body: body
            }
            client.sendMessage(options, function(err, res){
                if(err){
                    var d = new Date();
                    day = d.getDate() + '-' + d.getMonth()+1;
                    console.log(err);
                    dataDB.run("update datadb set missed = missed + 1 where date = " + day);
                }else{
                    console.log('Message Sent To ' + data.Phone);
                    var d = new Date();
                    day = d.getDate() + '-' + d.getMonth()+1;
                    dataDB.run("update datadb set sent = sent + 1 where date = " + day);
                }
            });
        }).on("end", function(){
            res.sendFile(path + 'index.html');
        });
    }
});

app.get('/getDaySent', function(req, res){
    dataDB.all("select sent from datadb where date = " + new Date().getDate() + '-' + new Date().getMonth() + 1, function(err,rows){
        res 
        if(rows.length < 1){
            res.send(JSON.stringify({value : 0}));
        }else{
            res.send(JSON.stringify({value: rows[0]})); 
        }
    });
});

app.get('/getDayMiss', function(req, res){
    dataDB.all("select missed from datadb where date = " + new Date().getDate() + '-' + new Date().getMonth() + 1, function(err,rows){
        if(rows.length < 1){
            res.send(JSON.stringify({value : 0}));
        }else{
            res.send(JSON.stringify({value: rows[0]})); 
        }
    });
});

app.get('/getDayErr', function(req, res){
    dataDB.all("select err from datadb where date = " + new Date().getDate() + '-' + (new Date().getMonth() + 1), function(err,rows){ 
        if(rows.length < 1){
            var response = {
                status : 200,
                errs : 0
            }
        }else{
            var response = {
                status : 200,
                errs : rows[0]
            } 
        }
        res.end(JSON.stringify(response));
    });
});

app.get('/getTrend', function(req, res){
    dataDB.all("select date, sent, missed from datadb", function(err, rows){
    if(rows.length < 1){
        var response = [
        ['Day', 'Sent', 'Missed Trail'],
        [new Date().getDate() + '-' + (new Date().getMonth()+1), 0, 0]
        ];  
    }else{
        var response = ['Day', 'Sent', 'Missed Trial'] + rows;
    }
    res.end(JSON.stringify(response));
})});
app.post('/sendmessage', function(req, res) {
    if(req.body.name == '' || req.body.number == '' || req.body.message == ''){
        console.log('Error');
    }else{
        var options = {
            to: req.body.number,
            from: config.twilioNumber,
            body: req.body.name + ', ' + req.body.message
        };

        client.sendMessage(options, function(err, response){
            if(err){
                var d = new Date();
                day = d.getDate() + '-' + d.getMonth()+1;
                console.log(err);
                dataDB.run("update datadb set err = err+1 where date = " + day);
            }else{
                console.log('Message Sent To ' + req.body.number);
                res.sendFile(path + 'index.html');
                var d = new Date();
                day = d.getDate() + '-' + d.getMonth()+1;
                dataDB.run("update datadb set sent = sent+1 where date = " + day);
            }
        });
    }
});

app.listen(3005, function(){
    dataDB.serialize(function() {
        dataDB.run("CREATE TABLE DATADB (id integer primary key, date text, sent integer, missed integer, err integer)");
    });
    
    console.log('Sender Currently Online');

    //CRON Schedule
    schedule.scheduleJob('1 30 6 * * *', function(){
        batch.run('alert');
    });

    schedule.scheduleJob('1 30 18 * * *', function(){
        batch.run('night');
    });
});
