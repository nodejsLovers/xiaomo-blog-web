/**
 * 这里是书籍列表模块
 * @type {angular.IModule}
 */
angular.module("myControllerModule", [])
    .controller('AdminController',//后台用户
        [
            '$scope',
            '$location',
            'deleteAdminService',
            'adminLoginService',
            'getAdminUserService',
            'addAdminService',
            function ($scope,
                      $location,
                      deleteAdminService,
                      adminLoginService,
                      getAdminUserService,
                      addAdminService) {
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
                /**
                 * 增加后台用户
                 */
                $scope.addAdminUser = function (userName,password,authLevel) {
                    console.log(authLevel);
                    var addPromise = addAdminService.operate(userName,password,authLevel);
                    addPromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = getAdminUserService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.adminUsers = data.adminUsers;
                                $scope.pageCount = $scope.adminUsers.totalPages;
                            });
                        }
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 删除后台用户
                 */
                $scope.deleteAdmin = function (adminUserId) {
                    var deletePromise = deleteAdminService.operate(adminUserId);
                    deletePromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = getAdminUserService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.adminUsers = data.adminUsers;
                                $scope.pageCount = $scope.adminUsers.totalPages;
                            });
                        }
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 处理跳转
                 */
                $scope.showAdminUserList = function () {
                    $location.path('/main/authority');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('UserController',//用户
        [
            '$scope',
            '$location',
            'userService',
            function ($scope,
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
                /**
                 * 处理跳转
                 */
                $scope.showUserList = function () {
                    $location.path('/main/user');
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
                    $location.path('/main/blog');
                };
                /* ===========================================================我是分割线===========================================================================*/
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
                    $location.path('/main/blog');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('TagController',
        [
            '$scope',
            '$location',
            'deleteTagService',
            'getTagListService',
            function ($scope,
                      $location,
                      deleteTagService,
                      getTagListService) {
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
                        $scope.pageCount = $scope.tags.totalPages;
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 删除标签
                 */
                $scope.deleteTag = function (tagId) {
                    var deletePromise = deleteTagService.operate(tagId);
                    deletePromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = getTagListService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.tags = data.tags;
                                $scope.pageCount = $scope.tags.totalPages;
                            });
                        }
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 处理跳转
                 */
                $scope.showTagList = function () {
                    $location.path('/main/blog');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('LinkController',
        [
            '$scope',
            '$location',
            'deleteLinkService',
            'linkListService',
            function ($scope,
                      $location,
                      deleteLinkService,
                      linkListService) {
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
                    $scope.pageCount = $scope.links.totalPages;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 友情链接标签信息翻页
                 */
                $scope.onTagPageChange = function () {
                    var promise = linkListService.operate($scope.currentPage);
                    promise.then(function (data) {
                        $scope.links = data.links;
                        $scope.pageCount = $scope.links.totalPages;
                    });
                };
                $scope.deleteLink = function (linkId) {
                    var deletePromise = deleteLinkService.operate(linkId);
                    deletePromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = linkListService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.links = data.links;
                                $scope.pageCount = $scope.links.totalPages;
                            });
                        }
                    })
                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 处理跳转
                 */
                $scope.showLinkList = function () {
                    $location.path('/main/link');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('ChangeLogController',
        [
            '$scope',
            '$location',
            'deleteChangeLogService',
            'changeLogListService',
            function ($scope,
                      $location,
                      deleteChangeLogService,
                      changeLogListService) {
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
                    $scope.pageCount = $scope.changeLogs.totalPages;
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 更新日志翻页
                 */
                $scope.onTagPageChange = function () {
                    var promise = changeLogListService.operate($scope.currentPage);
                    promise.then(function (data) {
                        $scope.changeLogs = data.changeLogs;
                        $scope.pageCount = $scope.changeLogs.totalPages;
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
                $scope.deleteChangeLog = function (changeLogId) {
                    var deletePromise = deleteChangeLogService.operate(changeLogId);
                    deletePromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = changeLogListService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.changeLogs = data.changeLogs;
                                $scope.pageCount = $scope.changeLogs.totalPages;
                            });
                        }
                    })
                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 处理跳转
                 */
                $scope.showChangeLogList = function () {
                    $location.path('/main/changeLog');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('BasicInfoController',
        [
            '$scope',
            '$location',
            'basicInfoService',
            function ($scope,
                      $location,
                      basicInfoService) {
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
