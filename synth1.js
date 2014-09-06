var T = require('timbre');
var midi = require('midi');

var input = new midi.input();
input.openPort(0);

var synth = T("SynthDef").play();

synth.def = function(opts) {
  var osc1, osc2, env;
  osc1 = T("saw", {freq:opts.freq         , mul:0.25});
  osc2 = T("saw", {freq:opts.freq * 1.0045, mul:0.20});
  env  = T("adsr", {a:100,d:250,s:0.6,r:500}, osc1, osc2);
  return env.on("ended", opts.doneAction).bang();
};

input.on('message', function(deltaTime, message) {
	var note = message[1];
	if (message[2] == 0) {
		synth.noteOff(message[1]);
	} else {
		synth.noteOn(message[1], message[2]);
	}
});
