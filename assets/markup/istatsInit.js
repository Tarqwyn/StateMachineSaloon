istatsGlobal = istats;
window.istats = {
	enabled: true
};
window.bbcFlagpoles_istats = 'ON';
window.istatsTrackingUrl = '//sa.bbc.co.uk/bbc/bbc/s?name=news.magazine.story.27290883&cps_asset_id=27290883&page_type=story';
istats.init();
istats.log(
	'pageView',
	'shorthand.initPageView',
	{
		'time':Date.now()
	}
);