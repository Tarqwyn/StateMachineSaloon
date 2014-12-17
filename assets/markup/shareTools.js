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
    message: "Arms wide open: The story behind Rio's Christ the Redeemer statue, via @BBCNewsMagazine",
    desc: "Shared via BBC News Magazine",
    image: "http://www.bbc.co.uk/news/special/2014/newsspec_6954/static/img/mbaye225.jpg"
});
model.storyPageUrl = window.document.location.href;
view = new NSShareView('#ns_share_module');
news.pubsub.addListener('ns:module:ready', _initialiseModule);
news.pubsub.emitEvent('ns:request:personalshare', [model]);