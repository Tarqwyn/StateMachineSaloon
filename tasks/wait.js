var model;
var util = require('util');

function wait() {

	process.stdin.on('data', cleanText);

	function go(text) {
		model = require('../model/model');
		model.stateMachine.publishStateChange(text);
	}

	function whatnext() {
		console.log('What next? : ');
		process.stdin.resume();
		process.stdin.setEncoding('utf8');
	}

	function cleanText (text) {
		text = text.slice(0, text.length - 1);
		console.log('I\'m going to attempt to :', util.inspect(text));
		go(text);
	}

	this.whatnext = whatnext;
}

module.exports = new wait();