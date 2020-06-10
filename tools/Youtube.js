/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */


const youtubedl = require('youtube-dl');
const fs = require('fs');
const path = require('path');

module.exports = class Youtube {
	
	static download(senderPsid, url, videoname ) {
		// const customBinaryPath = path.resolve('./node_modules/youtube-dl/bin/python youtube-dl');
		// youtubedl.setYtdlBinary(customBinaryPath);
		
		console.log(youtubedl.getYtdlBinary());
		
		let cur_info = null;
		let cur_name = null;
		let video_stream_filename = videoname || 'myvideo.mp4';
		if ( ! video_stream_filename.toLowerCase().includes('.mp4') ) {
			video_stream_filename += '.mp4';
		}		

		const video = youtubedl(
			url,
			[
				"--format=18"
			],
			// Additional options can be given for calling `child_process.execFile()`.
			{ cwd: __dirname }
		);
		
		console.log( 'DIRNAME', __dirname );
		
		// Will be called when the download starts.
		video.on('info', function(info) {
			cur_name = info._filename;
			cur_info = 'filename: ' + info._filename + ' | Size ' + info.size;
			console.log( cur_info );
			console.log('Download started');
			console.log('filename: ' + info._filename);
			console.log('size: ' + info.size);
		});
		
		video.pipe(fs.createWriteStream( `./public/result/${video_stream_filename}` ));
		
		// Will be called if download was already completed and there is nothing more to download.
		video.on('complete', function complete(info) {
			console.log('filename: ' + info._filename + ' already downloaded.');
			console.log(info._filename);
			console.log('Completed !');
		});
			
		video.on('end', function() {
			console.log('finished downloading!');
			cur_name = video_stream_filename;
			console.log('Downloaded !');
		});
		
		video.on('error', function(err) {
			console.log('An error has occured :( !');
			console.log(':( '+err);
			console.log( err );
		});
	};
}
