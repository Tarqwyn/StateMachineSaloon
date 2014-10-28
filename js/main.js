var fs = require('fs'),
startScreen = require('startScreen'),
errorScreen = require('errorScreen'),
checkShortHandDirectory = require('checkShortHandDirectory'),
chooseOutputDir = require('chooseOutputFolder'),
copyInputIntoOutput = require('copyInputIntoOutput'),
setableOptions = require('setableOptions'),
processArticle = require('processArticle'),
removeGoogleAnalyticsTask = require('removeGoogleAnalyticsTask'),
addiStatsTask = require('addiStatsTask'),
addChartbeatTask = require('addChartbeatTask'),
addOrbScrollTask = require('addOrbScrollTask'),
bbcFooterTask = require('bbcFooterTask'),
addShareToolsTask = require('addShareToolsTask'),
createHeaderIncludeTask = require('createHeaderIncludeTask'),
model = require('model');

/*------------------------------------------------------------------
* VARIABLES
------------------------------------------------------------------*/
var model = require('model');
model.$ = $;
model.Mustache = Mustache;

/*------------------------------------------------------------------
* LISTENERS
------------------------------------------------------------------*/
model.eventEmitter.addListener(model.emitterEvents.ERROR, throwError);

/*------------------------------------------------------------------
* STATE MACHINE TRANSITIONS
------------------------------------------------------------------*/
model.stateMachine.addTransition(model.appStates.ERROR_STATE,					['*'],											errorScreen.displayWhoops);
model.stateMachine.addTransition(model.appStates.START,							[model.appStates.IDLE,
																					model.appStates.ERROR_STATE],				startScreen.promptUserForShortHandDir);
model.stateMachine.addTransition(model.appStates.CHECK_SHORTHAND_FOLDER,		[model.appStates.START],						checkShortHandDirectory.sanityCheckDirectoryandContents);
model.stateMachine.addTransition(model.appStates.CHOOSE_OUTPUT_DIRECTORY,		[model.appStates.CHECK_SHORTHAND_FOLDER,
																					model.appStates.COPY_INPUT_INTO_OUTPUT],	chooseOutputDir.promptUserForOutputDir);
model.stateMachine.addTransition(model.appStates.COPY_INPUT_INTO_OUTPUT,		[model.appStates.CHOOSE_OUTPUT_DIRECTORY],		copyInputIntoOutput.go);
model.stateMachine.addTransition(model.appStates.DISPLAY_CHANGE_OPTIONS,		[model.appStates.COPY_INPUT_INTO_OUTPUT],		setableOptions.promptUserForOptions);
model.stateMachine.addTransition(model.appStates.PROCESS_ARTICLE,				[model.appStates.DISPLAY_CHANGE_OPTIONS],		processArticle.go);

//add the process tasks states from the model
var a, arrLength = model.processTasks.length;
for (a = 0; a < arrLength; a++) {
	var taskObj = model.processTasks[a];
	model.stateMachine.addTransition(taskObj.stateName, taskObj.acceptableStates, taskObj.stateMethod);
}

/*------------------------------------------------------------------
* ACTIONS
------------------------------------------------------------------*/
function throwError(msg) {
	console.log("ERROR: ", msg);
}

/*------------------------------------------------------------------
* LET'S GET STARTED!
------------------------------------------------------------------*/
model.stateMachine.publishStateChange(model.appStates.START);