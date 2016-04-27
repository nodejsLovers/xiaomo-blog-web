/**
 * 这里是书籍列表模块
 * @type {angular.IModule}
 */
angular.module("myControllerModule", [])
    .controller('AdminController',//后台用户
        [
            '$scope',
            '$http',
            '$location',
            'adminLoginService',
            'getAdminUserService',
            function ($scope,
                      $http,
                      $location,
                      adminLoginService,
                      getAdminUserService) {
                /* ===========================================================我是分割线===========================================================================*/
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到管理员列表页！！";
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 默认载入后台用户管理信息
                 */
                var adminPromise = getAdminUserService.operate($scope.currentPage);
                adminPromise.then(function (data) {
                    $scope.adminUsers = data.adminUsers;
                    $scope.pageCount = $scope.adminUsers.totalPages;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 后台用户管理信息翻页
                 */
                $scope.onAdminUserPageChange = function () {
                    var adminOnPagePromise = getAdminUserService.operate($scope.currentPage);
                    adminOnPagePromise.then(function (data) {
                        $scope.adminUsers = data.adminUsers;
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 登录
                 */
                $scope.login = function () {
                    var promise = adminLoginService.operate($scope.userInfo.userName, $scope.userInfo.password);
                    promise.then(function (data) {
                        if (data.status !== 200) {
                            alert(data.status);
                        } else {
                            $location.path('/main');
                        }
                    })
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('UserController',//用户
        [
            '$scope',
            '$http',
            '$location',
            'userService',
            function ($scope,
                      $http,
                      $location,
                      userService) {
                /* ===========================================================我是分割线===========================================================================*/
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到用户列表页！！";
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 默认载入用户管理信息
                 */
                var userPromise = userService.operate($scope.currentPage);
                userPromise.then(function (data) {
                    $scope.users = data.users;
                    $scope.pageCount = $scope.users.totalPages;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 用户管理信息翻页
                 */
                $scope.onUserPageChange = function () {
                    var userOnPagePromise = userService.operate($scope.currentPage);
                    userOnPagePromise.then(function (data) {
                        $scope.users = data.users;
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('BlogController',
        [
            '$scope',
            '$location',
            'getBlogListService',
            'addBlogService',
            'deleteBlogService',
            'getTagListService',
            function ($scope,
                      $location,
                      getBlogListService,
                      addBlogService,
                      deleteBlogService,
                      getTagListService) {
                /* ===========================================================我是分割线===========================================================================*/
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
                var promise = getBlogListService.operate($scope.currentPage);
                promise.then(function (data) {
                    $scope.blogs = data.blogs;
                    $scope.pageCount = $scope.blogs.totalPages;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 默认载入标签信息
                 */
                var tagPromise = getTagListService.operate($scope.currentPage);
                tagPromise.then(function (data) {
                    $scope.tags = data.tags;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 博客翻页
                 */
                $scope.onPageChange = function () {
                    var promise = getBlogListService.operate($scope.currentPage);
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
                /**
                 * 删除博客
                 */
                $scope.deleteBlog = function (blogId) {
                    var deletePromise = deleteBlogService.operate(blogId);
                    deletePromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = getBlogListService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.blogs = data.blogs;
                                $scope.pageCount = $scope.blogs.totalPages;
                            });
                        }
                    });
                };

                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 处理跳转
                 */
                $scope.showBlogList = function () {
                    $location.path('/main');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('TagController',
        [
            '$scope',
            'getTagListService',
            function ($scope, getTagListService) {
                /* ===========================================================我是分割线===========================================================================*/
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到标签列表页！！";
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 默认载入标签信息
                 */
                var tagPromise = getTagListService.operate($scope.currentPage);
                tagPromise.then(function (data) {
                    $scope.tags = data.tags;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 标签翻页
                 */
                $scope.onTagPageChange = function () {
                    var promise = getTagListService.operate($scope.currentPage);
                    promise.then(function (data) {
                        $scope.tags = data.tags;
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('LinkController',
        [
            '$scope',
            'linkListService',
            function ($scope, linkListService) {
                /* ===========================================================我是分割线===========================================================================*/
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到友情链接列表页！！";
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 默认友情链接标签信息
                 */
                var linkPromise = linkListService.operate($scope.currentPage);
                linkPromise.then(function (data) {
                    $scope.links = data.links;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 友情链接标签信息翻页
                 */
                $scope.onTagPageChange = function () {
                    var promise = linkListService.operate($scope.currentPage);
                    promise.then(function (data) {
                        $scope.links = data.links;
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('ChangeLogController',
        ['$scope',
            'changeLogListService',
            function ($scope, changeLogListService) {
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 默认更新日志标签信息
                 */
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到更新日志列表页！！";
                /* ===========================================================我是分割线===========================================================================*/
                var linkPromise = changeLogListService.operate($scope.currentPage);
                linkPromise.then(function (data) {
                    $scope.changeLogs = data.changeLogs;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 更新日志翻页
                 */
                $scope.onTagPageChange = function () {
                    var promise = changeLogListService.operate($scope.currentPage);
                    promise.then(function (data) {
                        $scope.changeLogs = data.changeLogs;
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('BasicInfoController',
        [
            '$scope',
            'basicInfoService',
            function ($scope, basicInfoService) {
                /* ===========================================================我是分割线===========================================================================*/
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "服务系统信息！！";
                /* ===========================================================我是分割线===========================================================================*/
                var systemPromise = basicInfoService.operate();
                systemPromise.then(function (data) {
                    $scope.systems = data.systems;
                });
            }
            /* ===========================================================我是分割线===========================================================================*/
        ]
    );
