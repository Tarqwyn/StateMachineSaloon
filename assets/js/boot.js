var istatsGlobal;

define(
['../../lib/istats'],
function (istats) {

	'use strict';

	istatsGlobal = istats;

	istats.log(
		"pageView",
		"shorthand.initPageView",
		{
			"time":Date.now()
		}
	);

	console.log("************* istats loaded *************");

});