(function () {
	'use strict';
	$(function () {
		var currentSectionNumber;
		$('.section').each(function (i) {
			$(this).scrollWatch().on('scroll', function (e) {
				if (Math.abs(e.visibility) > .8) {
					if (currentSectionNumber !== i) {
					currentSectionNumber = i;
						try {
							istatsGlobal.log(
								'section-view',
								'newsspec-nonuser',
								{
									'time':Date.now(),
									'section': i
								}
							);
						}
						catch(e) {
							console.log('istats error, error:', e);
						}
					}
				}
			})
		})
	})
})();