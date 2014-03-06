(function() {
    (function () {
        "use strict";
        var TextAnchoringScrollmation = window.SectionScrollmation.TextAnchoringscrollmation = window.SectionScrollmation.ImageScrollmation.extend({
			initialize: function (options) {
				window.SectionScrollmation.TextAnchoringscrollmation.__super__.initialize.apply(this, arguments);
            },
			getContainer: function() {
				return this.ui.container;
			},
            _refresh: function () {
                this.ui.slidesContainer.height(window.innerHeight);
				this.running = false;
				var slideToActivate = this.getSlideToActive();
				if (slideToActivate) {
					var reactivate = true;
					if (this.activeSlide) {
						if (this.activeSlide == slideToActivate) {
							reactivate = false;
						}
					}
					if (reactivate) {
						this.appVent.trigger("scrollmation:slide:activate", slideToActivate);
						this.activeSlide = slideToActivate;
					}
				}
            },
			getSlideToActive: function() {
				return this.getSlideLinkToParagraphAtMiddleOfScreen();
			},
			getSlideLinkToParagraphAtMiddleOfScreen: function () {
                var absoluteScrollTop = this.ui.window.scrollTop();
				var viewportHeight = this.ui.window.height();
				// show image if the paragraph at middle of the screen
				var showingPoint = viewportHeight / 2;
				var section = this.getContainer();
				var points = section.find(".bookmark");
				var offset = -999999999;
				var index;
				_.find(points, function (p, i) {
					var paragraphOffset = $(p).offset().top;
					var distanceToShowingPoint = (paragraphOffset - absoluteScrollTop - showingPoint);
					if (distanceToShowingPoint < 0) {
						// paragraph passed showing image point
						if (distanceToShowingPoint > offset) {
							offset = distanceToShowingPoint;
							index = i;
						}
					}
				});
				if (index !== undefined) {
					return this.slides[index];
				}
				if (this.activeSlide) {
					return this.activeSlide;
				}
				return this.slides[0];
            }
        });
    })();
})();
(function () {
    (function () {
        "use strict";
        $(function () {
            var running = false;
            var $window = $(window);
            var _refresh = function () {
            	/* anchoring text version */
                $("[data-text-anchoring-scrollmation]").each(function (i, elem) {
                    $(this).removeAttr("data-text-anchoring-scrollmation");
                    new window.SectionScrollmation.TextAnchoringscrollmation({
                        el: $(this)
                    });
                });
                /* anchoring text version */
            };
            var tick = function () {
                if (!running) {
                    window.requestAnimationFrame(_refresh);
                }
                running = true;
            };
            _refresh();
            $window.on("resize", tick);
            $window.scroll();
        });
    })();
}).call(this);