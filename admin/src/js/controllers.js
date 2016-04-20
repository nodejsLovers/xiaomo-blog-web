/**
 * 这里是书籍列表模块
 * @type {angular.IModule}
 */
angular.module("myControllerModule", [])
    .controller('BlogListController', ["$scope", "getBlogListService", function ($scope, getBlogListService) {
            var promise = getBlogListService.getUserInfo();
            promise.then(function (data) {
                $scope.result = data;
                console.log($scope.result);
            });
        }]
    ).controller('BlogDetailController', ["$scope", "$http", "getBlogListService", function ($scope, $http, getBlogListService) {
        $scope.result = getBlogListService.test;
        console.log($scope.result);
    }]
);
