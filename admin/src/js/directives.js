angular.module("myDirectiveModule", [])
    .constant('baseUrlConfig', {
        baseUrl: 'http://api.xiaomo.info:8889'
    })
    .constant('ngPaginationConfig', {
        visiblePageCount: 10,
        firstText: 'First',
        lastText: 'Last',
        prevText: 'Prev',
        nextText: 'Next',
        showIfOnePage: false,
        showFirstLastText: true,
        gotoText: 'Goto Page',
        showGoto: false
    })
    .directive("pager", ['ngPaginationConfig', function (ngPaginationConfig) {
        return {
            link: function (scope, element, attrs) {
                var visiblePageCount = angular.isDefined(attrs.visiblePageCount) ? attrs.visiblePageCount : ngPaginationConfig.visiblePageCount;
                scope.firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : ngPaginationConfig.firstText;
                scope.lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : ngPaginationConfig.lastText;
                scope.prevText = angular.isDefined(attrs.prevText) ? attrs.prevText : ngPaginationConfig.prevText;
                scope.nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : ngPaginationConfig.nextText;
                scope.showFirstLastText = angular.isDefined(attrs.showFirstLastText) ? attrs.showFirstLastText : ngPaginationConfig.showFirstLastText;
                scope.showIfOnePage = angular.isDefined(attrs.showIfOnePage) ? attrs.showIfOnePage : ngPaginationConfig.showIfOnePage;
                scope.gotoText = angular.isDefined(attrs.gotoText) ? attrs.gotoText : ngPaginationConfig.gotoText;
                scope.showGoto = angular.isDefined(attrs.showGoto) ? attrs.showGoto : ngPaginationConfig.showGoto;
                scope.currentPage = 1;

                scope.pageChange = function (page) {
                    if (page >= 1 && page <= scope.pageCount) {
                        scope.currentPage = page;
                    } else {
                        scope.currentPage = 1;
                    }
                };

                scope.keyUpHandler = function (e) {
                    var value = e.target.value;
                    var parsedValue = parseInt(value, 10);
                    if (!Number.isNaN(parsedValue)) {
                        if (parsedValue >= 1 && parsedValue <= scope.pageCount) {

                        } else if (parsedValue < 1) {
                            e.target.value = 1;
                        } else {
                            e.target.value = scope.pageCount;
                        }
                        if (e.keyCode === 13) {
                            // pressed enter
                            scope.currentPage = parsedValue;
                        }
                    } else {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            return false;
                        }
                    }
                };

                function build() {
                    var low,
                        high,
                        v;

                    scope.pageNums = [];

                    if (scope.pageCount === 0) {
                        return;
                    }
                    if (scope.currentPage > scope.pageCount) {
                        scope.currentPage = 1;
                    }

                    if (scope.pageCount <= visiblePageCount) {
                        low = 1;
                        high = scope.pageCount;
                    } else {
                        v = Math.ceil(visiblePageCount / 2);
                        low = Math.max(scope.currentPage - v, 1);
                        high = Math.min(low + visiblePageCount - 1, scope.pageCount);

                        if (scope.pageCount - high < v) {
                            low = high - visiblePageCount + 1;
                        }
                    }

                    for (; low <= high; low++) {
                        scope.pageNums.push(low);
                    }
                }

                scope.$watch('currentPage', function (a, b) {
                    if (a !== b) {
                        build();
                        scope.onPageChange();
                    }
                });

                scope.$watch('pageCount', function (a, b) {
                    if (!!a) {
                        build();
                    }
                });

            },
            replace: true,
            restrict: "E",
            scope: {
                pageCount: '=',
                currentPage: '=',
                onPageChange: '&'
            },
            template: '<div class="ng-pagination"><ul ng-if="pageCount>1 || showIfOnePage"><li ng-click="pageChange(1)" ng-if="showFirstLastText">{{firstText}}</li>' +
            '<li ng-click="pageChange(currentPage-1>0?currentPage-1:1)">{{prevText}}</li>' +
            '<li ng-repeat="pageNum in pageNums track by pageNum" ng-click="pageChange(pageNum)" ng-class="{active:currentPage===pageNum}">{{pageNum}}</li>' +
            '<li ng-click="pageChange(currentPage+1<=pageCount?currentPage+1:pageCount)">{{nextText}}</li>' +
            '<li ng-click="pageChange(pageCount)" ng-if="showFirstLastText">{{lastText}}</li></ul>' +
            '<lable ng-if="showGoto">{{gotoText}}<input type="text" ng-keyup="keyUpHandler($event)"></label></div>'
        }
    }])
    .directive('ensureUnique',
        [
            '$http',
            '$timeout',
            'baseUrlConfig',
            function ($http, $timeout, baseUrlConfig) {
                return {
                    require: 'ngModel',
                    link: function (scope, ele, attrs, c) {
                        scope.$watch(attrs.ngModel, function (title) {
                            $timeout(function () {
                                if (!title) {
                                    return;
                                }
                                console.log(scope.blog.title);
                                $http({
                                    method: 'GET',
                                    url: baseUrlConfig.baseUrl + '/admin/blog/findByTitle',
                                    params: {
                                        title: title
                                    }
                                }).success(function (data) {
                                    if (data.status != 200) {//不重复
                                        console.log("当前状态:" + data.status);
                                        c.$setValidity('unique', true);
                                    } else {
                                        c.$setValidity('unique', false);
                                    }
                                }).error(function () {
                                    alert("error");
                                })
                            }, 1000)
                        });

                    }
                }
            }])
    .directive('ensureAdminUserUnique',
        [
            '$http',
            '$timeout',
            'baseUrlConfig',
            function ($http, $timeout, baseUrlConfig) {
                return {
                    require: 'ngModel',
                    link: function (scope, ele, attrs, c) {
                        scope.$watch(attrs.ngModel, function (userName) {
                            $timeout(function () {
                                if (!userName) {
                                    return;
                                }
                                console.log(scope.adminUser.userName);
                                $http({
                                    method: 'GET',
                                    url: baseUrlConfig.baseUrl + '/admin/adminUser/findByName',
                                    params: {
                                        userName: userName
                                    }
                                }).success(function (data) {
                                    if (data.status != 200) {//不重复
                                        console.log("当前状态:" + data.status);
                                        c.$setValidity('unique', true);
                                    } else {
                                        c.$setValidity('unique', false);
                                    }
                                }).error(function () {
                                    alert("error");
                                })
                            }, 1000)
                        });

                    }
                }
            }])
    .directive('ensureTagUnique',
        [
            '$http',
            '$timeout',
            'baseUrlConfig',
            function ($http, $timeout, baseUrlConfig) {
                return {
                    require: 'ngModel',
                    link: function (scope, ele, attrs, c) {
                        scope.$watch(attrs.ngModel, function (name) {
                            $timeout(function () {
                                if (!name) {
                                    return;
                                }
                                console.log(scope.tag.name);
                                $http({
                                    method: 'GET',
                                    url: baseUrlConfig.baseUrl + '/admin/tag/findByName',
                                    params: {
                                        name: name
                                    }
                                }).success(function (data) {
                                    if (data.status != 200) {//不重复
                                        console.log("当前状态:" + data.status);
                                        c.$setValidity('unique', true);
                                    } else {
                                        c.$setValidity('unique', false);
                                    }
                                }).error(function () {
                                    alert("error");
                                })
                            }, 1000)
                        });

                    }
                }
            }])
    .directive('ngFocus', function () {
        var FOCUS_CLASS = "ng-focused";
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$focused = false;
                element.bind('focus', function (evt) {
                    element.addClass(FOCUS_CLASS);
                    scope.$apply(function () {
                        ctrl.$focused = true;
                    });
                }).bind('blur', function (evt) {
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function () {
                        ctrl.$focused = false;
                    });
                });
            }
        };
    })
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
