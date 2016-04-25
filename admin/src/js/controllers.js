/**
 * 这里是书籍列表模块
 * @type {angular.IModule}
 */
angular.module("myControllerModule", [])
    .controller('BlogListController',
        [
            '$scope',
            '$location',
            'getBlogListService',
            'addBlogService',
            'getTagListService',
            function ($scope,
                      $location,
                      getBlogListService,
                      addBlogService,
                      getTagListService) {
                $scope.blog = {};
                $scope.tags = {};
                $scope.tags.content = {};
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到博客列表页！！";
                $scope.blog.tagIds = [];
                $scope.tags.content.currentTag = false;
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 默认载入博客信息
                 */
                var promise = getBlogListService.getBlogInfo($scope.currentPage);
                promise.then(function (data) {
                    $scope.blogs = data.blogs;
                    $scope.pageCount = $scope.blogs.totalPages;
                });
                /**
                 * 默认载入标签信息
                 */
                var tagPromise = getTagListService.getTagInfo();
                tagPromise.then(function (data) {
                    $scope.tags = data.tags.content;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 翻页
                 */
                $scope.onPageChange = function () {
                    var promise = getBlogListService.getBlogInfo($scope.currentPage);
                    promise.then(function (data) {
                        $scope.blogs = data.blogs;
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 添加博客
                 */
                $scope.addBlog = function () {
                    $scope.blog.tagIds = [1, 2];
                    $scope.blog.blogType = 1;
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
                    for (var tag in $scope.tags) {
                        for (var tagId in $scope.blog.tagIds) {
                            if (tagId == tid) {
                                $scope.blog.tagIds.splice(tid);
                            } else {
                                $scope.blog.tagIds.push(tid);
                            }
                            $scope.tags.currentTag = !currentTag;
                        }
                    }
                };
                $scope.showBlogList = function () {
                    $location.path('/main');
                };
                /* ===========================================================我是分割线===========================================================================*/
                /* ===========================================================我是分割线===========================================================================*/
                /* ===========================================================我是分割线===========================================================================*/
                /* ===========================================================我是分割线===========================================================================*/
                /* ===========================================================我是分割线===========================================================================*/
                /* ===========================================================我是分割线===========================================================================*/
                console.log($scope);
            }
        ]
    );
