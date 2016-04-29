/**
 * Created by Administrator on 2016/4/28.
 */
angular.module("myAnimateModule", [])
    .animation('.view-slide-in', function () {
        return {
            enter: function (element, done) {
                element.css({
                        opacity: 0.4,
                        position: "relative",
                        // top: "1px",
                        // left: "1px"
                    })
                    .animate({
                        top: 0,
                        left: 0,
                        opacity: 1
                    }, 1000, done);
            }
        };
    })
    .animation('.repeat-animation', function () {
        return {
            enter: function (element, done) {
                console.log("entering...");
                var width = element.width();
                element.css({
                    position: 'relative',
                    left: -10,
                    opacity: 0
                });
                element.animate({
                    left: 0,
                    opacity: 1
                }, done);
            },
            leave: function (element, done) {
                element.css({
                    position: 'relative',
                    left: 0,
                    opacity: 1
                });
                element.animate({
                    left: -10,
                    opacity: 0
                }, done);
            },
            move: function (element, done) {
                element.css({
                    left: "2px",
                    opacity: 0.5
                });
                element.animate({
                    left: "0px",
                    opacity: 1
                }, done);
            }
        };
    })
    .animation('.hide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                if (className === 'ng-hide') {
                    element.animate({
                        opacity: 0
                    }, 500, done);
                } else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                if (className === 'ng-hide') {
                    element.css('opacity', 0);
                    element.animate({
                        opacity: 1
                    }, 500, done);
                } else {
                    done();
                }
            }
        };
    });