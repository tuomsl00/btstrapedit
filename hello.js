var MongoClient = require('mongodb').MongoClient;
const { parse } = require('querystring');
const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var exec = require("child_process").exec;
var url = "mongodb://localhost:27017/";

		const app = express();
		
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		// Save to the MongoDB
		app.post('/save', function(req, res) {
			MongoClient.connect(url, function(err, db) {
			//	console.log(req.body.name);
			
				if (err) throw err;
				var dbo = db.db("mydb");
				var myquery = req.body.name;
				var data = req.body.data;
				console.log(req.body.data[0]);
				var bulk = dbo.collection("contents").initializeOrderedBulkOp();
				
				bulk.insert({name: 'Unnamed'});
				bulk.find({name: 'Unnamed'}).remove();
				bulk.find({type: 'div'}).remove();
				
				for (var a = 0; a < data.length; a++) {
					for (var b = 0; b < data[a].length; b++) {
						bulk.insert(req.body.data[a][b]);
					}
				}
				bulk.execute(function(err) {
					if (err) throw err;
					db.close();
				});
			
			});
		});
		
		// Load from the MongoDB
		app.get('/load', function(req, res) {
			MongoClient.connect(url, function(err, db) {
							if (err) throw err;
				var dbo = db.db("mydb");
				dbo.collection("contents").find({type: 'div'}).toArray(function(err, result) {
					if (err) throw err;
					console.log(result);
					db.close();
					res.end(JSON.stringify(result));
				});
			});
		});
		/* TODO */
		app.post('/saveposttype', function(req, res) {
			// Save as posttype for WordPress
		});
		// Save contents for boottsrap
		app.post('/saveXML', function(req, res) {
			var lines = [];
			var c = 1;
			var data = req.body.data;
			lines[0] = '<div class="container">\r\n';
			for (var a = 0; a < data.length; a++) {
				lines[c++] = '\t<div class="row">\r\n';	
				for (var b = 0; b < data[a].length; b++) {
					lines[c++] = '\t\t<div class="col">'+req.body.data[a][b].child+'</div>\r\n';
				}
				lines[c++] = '\t</div>\r\n';
			}
			lines[c] = '</div>';
			var contents = "";
			for (a = 0; a < lines.length; a++) {
			contents = contents+lines[a];
			}
			fs.writeFile('Unnamed.xml', contents, function (err) {
				if (err) throw err;
					console.log('Saved!');
			});
			res.end();
		});
		
		
		app.all('*', function(request, response) {
			response.sendFile(__dirname+request.path);
		});


app.listen(80, () => console.info('Application running on port 80'));

