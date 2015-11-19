window.ga = {};


/*
(function () {
    'use strict';
    $(function () {
        var sections = [];
        var currentSectionNumber;
        $.each($('.section-navigator'), 
            function (i, value) {
                $('div[id$=' + ($(value).attr('href').split('-')[1]) + ']').scrollWatch().on('scrollin', function (e) {
                    if (Math.abs(e.visibility) > .8) {
                        if (currentSectionNumber !== i) {
                        currentSectionNumber = i;
                            try {
                                if (typeof istatsGlobal !== 'undefined') {
                                    if (sections.indexOf(i + 1) === -1) {
                                    istatsGlobal.log(
                                        'section-view',
                                        'newsspec-nonuser',
                                        {
                                            'time':Date.now(),
                                            'section': i + 1
                                        }
                                    );
                                    sections.push(i + 1)
                                    }
                                }
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
*/
require(["static/build/js/underscore-1.8.3"], function (a) {
    require(["jquery-1.9", "underscore"], function ($, _) {
        var jQuery = $;
        !function(a,b){"use strict";var c=["fixed","relative","absolute"],d="mousewheel resize",e=a(b),f=function(c,d){_.bindAll(this,"handleScroll","onScroll"),this.$el=a(c),this.el=this.$el[0],this.options=_.defaults(d||{},{watchOn:b}),this.$watchOn=a(this.options.watchOn),this._prepareContainer(),this.inViewport=!1,this.callbacks={scrollin:a.Callbacks(),scrollout:a.Callbacks(),scroll:a.Callbacks()},this.listen()};f.prototype={_prepareContainer:function(){if(this.$watchOn[0]!==b){var a=this.$watchOn.css("position"),d=_.contains(c,a);d||this.$watchOn.css("position","relative")}},listen:function(){this.$watchOn.on("scroll",this.onScroll),e.on(d,this.onScroll)},destroy:function(){this.$watchOn.off("scroll",this.onScroll),e.off(d,this.onScroll),this.$el.data("scrollWatch",null)},on:function(a,b,c,d){return _.isFunction(b)&&(d=c,c=b,b={}),b=_.extend({},this.options,b),c=_.bind(c,d||this.$el),b.delay&&(c=this._createDelayedCallback(a,c,b)),this.callbacks[a].add(c),this.$watchOn.scroll(),this},_createDelayedCallback:function(a,b,c){return function(){var a=arguments;_.delay(function(){b.apply(this,a)},c.delay)}},handleScroll:function(a){var b=this.visibility,c=this.isInViewport(),d=this.$watchOn.scrollTop();return this.direction=this.lastOffset===!1?!1:d>this.lastOffset?"down":"up",this.lastOffset=d,this.visibility=c,this.inViewport||1!==c?this.inViewport&&0===c&&(this.inViewport=!1,this.dfd?this.dfd.done(_.bind(this.trigger,this,"scrollout")):this.trigger("scrollout")):(this.inViewport=!0,this.trigger("scrollin")),(c!==b||a)&&this.trigger("scroll"),this},onScroll:function(a){this.running||(this.running=!0,this.originalEvent=a,this.handleScroll(),this.running=!1)},trigger:function(a){return"scroll"!==a&&a===this.lastTriggered?!1:(this.lastTriggered=a,void this.callbacks[a].fire({direction:this.direction,visibility:this.visibility,originalEvent:this.originalEvent}))},_getOffsetTop:function(){if(this.$watchOn[0]===b)return this.$el.offset().top;var a=this.el,c=0;do c+=a.offsetTop,a=a.offsetParent;while(a&&a!==this.$watchOn[0]);return c},isInViewport:function(){var a=this.$watchOn.scrollTop(),b=this.$watchOn.height(),c=a+b,d=this._getOffsetTop(),e=this.el.offsetHeight,f=d+e,g=e>=b;return g&&a>=d&&f>=c?1:!g&&d>=a&&c>=f?1:d>a&&c>d&&f>c?(c-d)/e:f>a&&c>f?(a-f)/e:0}},b.ScrollWatch=f,a.fn.scrollWatch=function(c){var d=a(this),e=d.data("scrollWatch");return e||d.data("scrollWatch",e=new b.ScrollWatch(this,c)),e}}(jQuery,window);

        /* FAKE SCROLLMATION */
        window.SectionScrollmation = {'ImageScrollmation': function() {}};

        {{ STORY.MIN.JS }}
    });
});