/**
 * 这里是书籍列表模块
 * @type {angular.IModule}
 */
angular.module("myControllerModule", [])
    .controller('BlogListController', ['$scope', '$location', 'getBlogListService', 'addBlogService', 'getTagListService', function ($scope, $location, getBlogListService, addBlogService, getTagListService) {
            $scope.blogs = {};
            $scope.commonInfo = {};
            $scope.commonInfo.msg = "欢迎来到博客列表页！！";
            $scope.blogs.tagIds = [];
            /* ===========================================================我是分割线===========================================================================*/
            /**
             * 默认载入博客信息
             */
            var promise = getBlogListService.getBlogInfo($scope.currentPage);
            promise.then(function (data) {
                $scope.blogs = data.blogs;
                $scope.pageCount = $scope.blogs.totalPages;
                console.log($scope.blogs);
            });
            /**
             * 默认载入标签信息
             */
            var tagPromise = getTagListService.getTagInfo();
            tagPromise.then(function (data) {
                $scope.tags = data.tags;
                console.log($scope.tags);
            });
            /* ===========================================================我是分割线===========================================================================*/
            /**
             * 翻页
             */
            $scope.onPageChange = function () {
                var promise = getBlogListService.getBlogInfo($scope.currentPage);
                promise.then(function (data) {
                    $scope.blogs = data.blogs;
                    $scope.pageCount = $scope.blogs.totalPages;
                    console.log(console.log($scope.currentPage));
                    console.log($scope.blogs);
                });
            };
            /* ===========================================================我是分割线===========================================================================*/
            /**
             * 添加博客
             */
            $scope.addBlog = function () {
                $scope.blog.tagIds = [1, 2];
                $scope.blog.blogType = 1;
                console.log($scope.blog);
                addBlogService.addBlog($scope.blog);
                $scope.addClasss = true;
                $location.path('/main');
            };
            /* ===========================================================我是分割线===========================================================================*/
            /**
             * 处理标签
             */
            $scope.operateTag = function (tid, currentTag) {
                //该博客中己经有这个标签就把从数组中拿掉，没有就添加到数组中
                for (var tagId in $scope.blogs.content.tagIds) {
                    if (tid == tagId) {
                        $scope.blog.content.tagIds.splice(tid);
                    } else {
                        $scope.blog.content.tagIds.push(tid);
                    }
                }
                // 同步样式
                $scope.currentTag = !currentTag;
            };
        $scope.showBlogList=function () {
            $location.path('/main');
        };
            /* ===========================================================我是分割线===========================================================================*/
            /* ===========================================================我是分割线===========================================================================*/
            /* ===========================================================我是分割线===========================================================================*/
            /* ===========================================================我是分割线===========================================================================*/
            /* ===========================================================我是分割线===========================================================================*/
            /* ===========================================================我是分割线===========================================================================*/
            console.log($scope);
        }]
    ).controller('BlogDetailController', ["$scope", "$http", "getBlogListService", function ($scope, $http, getBlogListService) {
        $scope.result = getBlogListService.test;
        console.log($scope.result);
    }]
);
