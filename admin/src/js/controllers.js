/**
 * 这里是书籍列表模块
 * @type {angular.IModule}
 */
angular.module("myControllerModule", [])
    .controller('BlogListController', ['$scope', 'getBlogListService', 'addBlogService', function ($scope, getBlogListService, addBlogService) {
            var promise = getBlogListService.getUserInfo();
            promise.then(function (data) {
                $scope.blogs = data.blogs;
                console.log($scope.blogs);
            });
            $scope.addBlog = function () {
                $scope.blog.tagIds = [1, 2];
                $scope.blog.blogType = 1;
                console.log($scope.blog);
                addBlogService.addBlog($scope.blog);
            }
        }]
    ).controller('BlogDetailController', ["$scope", "$http", "getBlogListService", function ($scope, $http, getBlogListService) {
        $scope.result = getBlogListService.test;
        console.log($scope.result);
    }]
);
