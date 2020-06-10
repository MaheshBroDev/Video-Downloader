'use strict';

const express = require('express'),
	  bodyParser = require('body-parser'),
	  app = express().use(bodyParser.json());
const fs = require('fs');
const port = 5000;

const afYoutube = require("./tools/afYoutube");
const config = require("./project.config.json");
let downloader = new afYoutube(config['binary-path']);

app.listen(process.env.PORT || port, () => console.log('SERVER IS RUNNING AT '+port));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// le chemin api fait reference a public
app.use('/', express.static('public'));
function errorJSON( message ) {
	return JSON.stringify({
		'status' : 'error',
		'message' : message
	});
};
function succJSON( message ) {
	return JSON.stringify({
		'status' : 'success',
		'message' : message
	});
};


// downloader options
let errors_data = "";
let status_data = "----";

downloader.on('data', function(data) {
    // console.log('DATA RECEIVED 1');
	// console.log(data.toString());
	status_data = data.toString();
});

downloader.on('error', function(data) {
    console.log('ERROR RECEIVED');
	errors_data = data.toString();
	console.log(data.toString());
});

downloader.on('exit', function(data) {
	console.log('PROCESS EXITED');
	status_data = "PROCESS EXITED";
});


// routes
app.get('/download', (req, res) => {
	res.writeHead(200, { 
        'Content-Type': 'text/json' 
	});
	
	let url = req.query.url;
	try {
		status_data = "DOWNLOADING...";
		res.end( succJSON('Download started!') );
		console.log('Download started :) ', url);
		downloader.download(url)
	} catch(e) {
		console.log(e);
		res.end( errorJSON(e + '') );
	}
});

app.get('/stop', (req, res) => {
	res.writeHead(200, { 
        'Content-Type': 'text/json' 
	});
	try {
		res.end( succJSON('Download stopped!') );
		console.log('Download stopped :) ');
		downloader.stop();
	} catch(e) {
		console.log(e);
		res.end( errorJSON(e + '') );
	}
});

app.get('/status', (req, res) => {
	res.writeHead(200, { 
        'Content-Type': 'text/json' 
	});
	try {
		if ( errors_data != "") {
			throw errors_data;
		}
		// console.log('SENDING UPDATES.... ');
		res.end( succJSON( status_data ) );
	} catch(e) {
		console.log(e);
		res.end( errorJSON(e + '') );
	}
});