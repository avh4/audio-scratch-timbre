var midi = require('midi');

var input = new midi.input();
input.openPort(0);

input.on('message', function(deltaTime, message) {
	console.log("d:" + deltaTime.toFixed(10) + " m: " + message);
});
