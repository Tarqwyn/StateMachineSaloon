var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    path = 'requests.txt',
    logline;


if (system.args.length === 1) {
    console.log('Usage: security.js <some URL>');
    phantom.exit(1);
} else {

	page.viewportSize = {
		width: 1600,
		height: 1080
	};

    page.address = system.args[1];
    page.resources = [];
    fs.write(path, '\n', 'w');

	page.onResourceRequested = function(request) {
	  logline = JSON.stringify(request.url, undefined, 4) + '\n';
	  fs.write(path, logline, 'a');
	};

    page.open(page.address, function (status) {
        if (status !== 'success') {
            fs.write('FAIL to load the address', 'a');
            phantom.exit(1);
        } else {
        	window.scrollTo(0,document.body.scrollHeight);
        	fs.write(path, '**Scrolled to bottom of page***', 'a');
        	fs.write(path, '**Has Document got  dodgy links that have been injected***', 'a');
        	var js = page.evaluate(function () {
        		return document;
    		});
    		fs.write(path, JSON.stringify(js), 'a');
            phantom.exit();
        }
    });
}