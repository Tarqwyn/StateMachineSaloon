var fs = require('fs'),
startScreen = require('startScreen'),
errorScreen = require('errorScreen'),
checkShortHandDirectory = require('checkShortHandDirectory'),
chooseOutputDir = require('chooseOutputFolder'),
copyInputIntoOutput = require('copyInputIntoOutput'),
setableOptions = require('setableOptions'),
processArticle = require('processArticle'),
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
model.stateMachine.addTransition(model.appStates.ERROR_STATE,					['*'],										errorScreen.displayWhoops);
model.stateMachine.addTransition(model.appStates.START,							[model.appStates.IDLE,
																				model.appStates.ERROR_STATE],				startScreen.promptUserForShortHandDir);
model.stateMachine.addTransition(model.appStates.CHECK_SHORTHAND_FOLDER,		[model.appStates.START],					checkShortHandDirectory.sanityCheckDirectoryandContents);
model.stateMachine.addTransition(model.appStates.CHOOSE_OUTPUT_DIRECTORY,		[model.appStates.CHECK_SHORTHAND_FOLDER,
																				model.appStates.COPY_INPUT_INTO_OUTPUT],	chooseOutputDir.promptUserForOutputDir);
model.stateMachine.addTransition(model.appStates.COPY_INPUT_INTO_OUTPUT,		[model.appStates.CHOOSE_OUTPUT_DIRECTORY],	copyInputIntoOutput.go);
model.stateMachine.addTransition(model.appStates.DISPLAY_CHANGE_OPTIONS,		[model.appStates.COPY_INPUT_INTO_OUTPUT],	setableOptions.promptUserForOptions);
model.stateMachine.addTransition(model.appStates.PROCESS_ARTICLE,				[model.appStates.DISPLAY_CHANGE_OPTIONS],	processArticle.go);

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

///Users/bangar01/Desktop/story-118-20140110200113


/*------------------------------------------------------------------
* GENERAL CSS CHANGES:
	* chnage the font face settings to this:
		font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
		font-weight: 300;
------------------------------------------------------------------*/