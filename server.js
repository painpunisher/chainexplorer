// server.js
// load the things we need
var express = require('express');
var app = express();
var mysql = require('mysql');
var url = require("url");
app.set('view engine', 'ejs');
var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password: '',
	  database: 'coinexplorer',
	  dateStrings: 'date'
	});

// index page 
app.get('/', function(req, res) {
	console.log("index requested");
	var urlObj = url.parse(req.url, true);
	var resultset = '';
	var sql = 'SELECT * FROM blocks order by blockno desc limit 10';
	if(urlObj['query']['hash']=="ALL"){
		sql ='SELECT * FROM blocks order by blockno desc limit 10';
	}
	connection.query(sql, function (error, resql, fields) {
		  if (error) throw error;
		  // connected!
		  res.render('pages/index', {data: resql}); 
	    	res.end();
	});
	console.log(resultset);
});

//hash page 
app.get('/hash', function(req, res) {
	var hash = req.param('hash');
	console.log("hash requested");
	console.log(hash);
	var urlObj = url.parse(req.url, true);
	var resultset = '';
	
	var sql = 'select * from blocks where hash = "'+hash+'"';
	if(urlObj['query']['hash']=="ALL"){
		sql ='SELECT * FROM blocks order by blockno desc limit 10';
	}
	
	connection.query(sql, function (error, resql, fields) {
		  if (error) throw error;
		  // connected!
	    	res.render('pages/hash', {data: resql}); 
	    	res.end();
	});
});


// about page 
app.get('/about', function(req, res) {
	console.log("about requested");
    res.render('pages/about');
    res.end();
//    res.header("Access-Control-Allow-Origin", "*").sendStatus(200);
});

app.listen(3000);
console.log('3000 is the magic port');
