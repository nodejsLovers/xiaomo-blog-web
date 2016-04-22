/**
 * 这里是书籍列表模块
 * @type {angular.IModule}
 */
angular.module("myControllerModule", [])
    .controller('BlogListController', ['$scope', '$location', 'getBlogListService', 'addBlogService', function ($scope, $location, getBlogListService, addBlogService) {
            $scope.msg="欢迎来到博客列表页！！";
            var promise = getBlogListService.getUserInfo($scope.currentPage);
            promise.then(function (data) {
                $scope.blogs = data.blogs;
                $scope.pageCount = $scope.blogs.totalPages;
                console.log(console.log($scope.currentPage));
                console.log($scope.blogs);
            });
            $scope.onPageChange = function () {
                var promise = getBlogListService.getUserInfo($scope.currentPage);
                promise.then(function (data) {
                    $scope.blogs = data.blogs;
                    $scope.pageCount = $scope.blogs.totalPages;
                    console.log(console.log($scope.currentPage));
                    console.log($scope.blogs);
                });
            };
            $scope.addBlog = function () {
                $scope.blog.tagIds = [1, 2];
                $scope.blog.blogType = 1;
                console.log($scope.blog);
                addBlogService.addBlog($scope.blog);
                $scope.showMsgFlag = true;
                $location.path('/main');
            };
            $scope.showMsg = function () {
                return true;
            };
        }]
    ).controller('BlogDetailController', ["$scope", "$http", "getBlogListService", function ($scope, $http, getBlogListService) {
        $scope.result = getBlogListService.test;
        console.log($scope.result);
    }]
);
