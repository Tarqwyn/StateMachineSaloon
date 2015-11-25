var model = require('./model/model');
var wait = require('./tasks/wait');

model.eventEmitter.addListener(model.emitterEvents.ERROR, throwError);

model.stateMachine.addTransition(
	model.appStates.IDLE, 
	[model.appStates.ORDER], 
	wait.whatnext
	);
model.stateMachine.addTransition(
	model.appStates.ORDER, 
	[model.appStates.IDLE], 
	wait.whatnext
	);
model.stateMachine.addTransition(
	model.appStates.PAY, 
	[model.appStates.ORDER], 
	wait.whatnext
	);
model.stateMachine.addTransition(
	model.appStates.FOOD, 
	[model.appStates.PAY, model.appStates.DRINK], 
	wait.whatnext
	);
model.stateMachine.addTransition(
	model.appStates.DRINK, 
	[model.appStates.PAY, model.appStates.FOOD], 
	wait.whatnext
	);
model.stateMachine.addTransition(
	model.appStates.SERVE, 
	[model.appStates.BOTH], 
	wait.whatnext
	);

function throwError(msg) {
	console.log("ERROR: ", msg);
}

wait.whatnext();