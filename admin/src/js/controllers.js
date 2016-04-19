/**
 * 这里是书籍列表模块
 * @type {angular.IModule}
 */
angular.module("myControllerModule", [])
    .controller('BlogListController', ["$scope", function ($scope, $http, getBlogListService) {
            $scope.result = getBlogListService.test;
            console.log($scope.result);
        }]
    ).controller('BlogDetailController', ["$scope", function ($scope, $http, $state, $stateParams) {
        console.log($stateParams);
        //请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    }]
);
