window.ga = {};
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