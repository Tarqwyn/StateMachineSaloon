var model, view;

var _callFaceBook = function () {
    news.pubsub.emitEvent('ns:request:launchshare', [model.fbShareTarget()]);
};

var _callTwitter = function () {
    news.pubsub.emitEvent('ns:request:launchshare', [model.twitterShareTarget()]);
};

var _callEmail = function () {
    news.pubsub.emitEvent('ns:request:launchshare', [model.emailShareTarget()]);
};

var _updateMessage = function (ev) {
    model.setShareMessage(ev);
};

var _initialiseModule = function () {
    news.pubsub.addListener('ns:share:message', function (target) { _updateMessage(target); });
    news.pubsub.addListener('ns:share:call:facebook', _callFaceBook);
    news.pubsub.addListener('ns:share:call:twitter', _callTwitter);
    news.pubsub.addListener('ns:share:call:email', _callEmail);
    news.pubsub.addListener('ns:update:header', function () {view.updateHeader(model.getHeader()); });
};

model = new NSShareModel({
    message: "Panorama's Clive Myrie looks at 'What Britain Wants' http://www.bbc.co.uk/news/magazine-31817307",
    desc: "A decent job with prospects",
    image: "http://news.bbcimg.co.uk/news/special/2015/newsspec_10423/media/si_panorama.jpg"
});
model.storyPageUrl = window.document.location.href;
view = new NSShareView('#ns_share_module');
news.pubsub.addListener('ns:module:ready', _initialiseModule);
news.pubsub.emitEvent('ns:request:personalshare', [model]);