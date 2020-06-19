const afYoutube = require("./tools/afYoutube");
const config = require("./project.config.json");

let downloader = new afYoutube(config['binary-path']);
downloader.on('data', function(data) {
    console.log('DATA RECEIVED 1');
    console.log(data.toString());
});

downloader.on('error', function(data) {
    console.log('ERROR RECEIVED');
    console.log(data.toString());
});

downloader.on('exit', function(data) {
    console.log('PROCESS EXITED');
});

downloader.download('https://www.facebook.com/101905088169812/videos/252683839329202');
