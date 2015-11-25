var   instance = null;
var   EventEmitter = require('../utils/eventEmitter');
var wait = require('../tasks/wait');
var util = require('util')


function Model(){
	if(instance !== null){
		throw new Error("Cannot instantiate more than one Model, use Model.getInstance()");
	}
}

Model.prototype = {
	eventEmitter: new EventEmitter(),
	appStates: {
		'IDLE': 'idle',
		'ORDER': 'order',
		'PAY': 'pay',
		'FOOD': 'food',		
		'DRINK': 'drink',
		'BOTH': 'both',
		'SERVE': 'serve'
	},
	emitterEvents: {
		ERROR:"error"
	},

	stateMachine: (function() {
		this.readyState = {
			'food': 'drink',
			'drink': 'food'
		}

		this.addTransition = function(targetState, passableStates, targetFunction) {
			this.stateMap = this.stateMap || {};
			this.stateMap[targetState] = {
				passableStates:passableStates,
				targetFunction:targetFunction
			};
		};

		this.publishStateChange = function(stateName, args) {
			
			//model instance
			var model = Model.getInstance();
			//check to see if we can go to the propsed state
			var stateMapTransitionObj = this.stateMap[stateName];
			if (stateMapTransitionObj) {
				var statePass = false, a, arrLength = stateMapTransitionObj.passableStates.length;
				for (a = 0; a < arrLength; a++) {
					if (this.currentState === stateMapTransitionObj.passableStates[a] || stateMapTransitionObj.passableStates[a] == "*") {
						statePass = true;
						stateMapTransitionObj.targetFunction(args);
						break;
					}
				}
				if (!statePass) {
					model.eventEmitter.emitEvent(model.emitterEvents.ERROR, ["You can't transition to state " + stateName + " from state " + this.currentState]);
				} else {
					stateUpdated(stateName);
				}
			}
			else {
				// this.throwError("AHHH! can't find the state that you are trying to transition to");
				model.eventEmitter.emitEvent(model.emitterEvents.ERROR, ["AHHH! can't find the state that you are trying to transition to"]);
			}
		};

		this.stateUpdated = function(newStateName) {
			if(this.readyState[this.currentState] == newStateName) {
				this.currentState = 'both'
			} else {
				this.currentState = newStateName;
			}
			console.log('The barkeep is :', this.currentState);
		};

		stateUpdated('idle');

		return this;
	})(),
};
	
Model.getInstance = function(){
	//Gets an instance of the singleton. It is better to use 
	if(instance === null){
		instance = new Model();
	}
	return instance;
};

module.exports = Model.getInstance();