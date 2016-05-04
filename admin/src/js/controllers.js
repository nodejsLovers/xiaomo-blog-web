/**
 * 这里是书籍列表模块
 * @type {angular.IModule}
 */
angular.module("myControllerModule", [])
    .controller('AdminListController',
        [
            '$scope',
            '$state',
            '$timeout',
            'getAdminUserService',
            'deleteAdminService',
            function ($scope, $state, $timeout, getAdminUserService, deleteAdminService) {
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到管理员列表页！！";
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 默认载入后台用户管理信息
                 */
                var adminPromise = getAdminUserService.operate($scope.currentPage);
                adminPromise.then(function (data) {
                    $scope.adminUsers = data.adminUsers.content;
                    $scope.pageInfo = data.adminUsers;
                    $scope.pageCount = $scope.adminUsers.totalPages;
                    console.log($scope.adminUsers);
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 后台用户管理信息翻页
                 */
                $scope.onAdminUserPageChange = function () {
                    var adminOnPagePromise = getAdminUserService.operate($scope.currentPage);
                    adminOnPagePromise.then(function (data) {
                        $scope.adminUsers = data.adminUsers.content;
                        $scope.pageInfo = data.adminUsers;
                        $scope.pageCount = $scope.adminUsers.totalPages;
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
                                $scope.adminUsers = data.adminUsers.content;
                                $scope.pageInfo = data.adminUsers;
                                $scope.pageCount = $scope.adminUsers.totalPages;
                            });
                        }
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
            }])
    .controller('AdminLoginController',//后台用户登录
        [
            '$scope',
            '$state',
            'adminLoginService',
            function ($scope,
                      $state,
                      adminLoginService) {
                /* ===========================================================我是分割线===========================================================================*/
                $scope.adminUser = {};
                $scope.adminUser.authLevels = [{'id': 1, 'name': '超级管理员'}, {'id': 2, 'name': '普通管理员'}];
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
                            $state.go('main');
                        }
                    })
                };
            }
        ]
    )
    .controller('AdminAddController',//添加后台用户
        [
            '$scope',
            '$state',
            'addAdminService',
            'getAdminUserService',
            function ($scope, $state, addAdminService, getAdminUserService) {
                /**
                 * 增加后台用户
                 */
                $scope.addAdminUser = function (userName, password, authLevel) {
                    var addPromise = addAdminService.operate(userName, password, authLevel);
                    addPromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = getAdminUserService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.adminUsers = data.adminUsers;
                                $scope.pageCount = $scope.adminUsers.totalPages;
                                $state.go('main.authority');
                            });
                        }
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 处理跳转
                 */
                $scope.showAdminUserList = function () {
                    $state.go('main.authority');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }])
    .controller('AdminEditController',//编辑后台用户
        [
            '$scope',
            '$state',
            'findAdminUserService',
            function ($scope, $state, findAdminUserService) {
                /**
                 * 编辑后台用户
                 * @param adminUserId
                 */
                $scope.adminUser = {};
                $scope.adminUser.authLevels = [{'id': 1, 'name': '超级管理员'}, {'id': 2, 'name': '普通管理员'}];
                var findAdminUserPromise = findAdminUserService.operate($state.params.id);
                findAdminUserPromise.then(function (data) {
                    if (data.status == 200) {
                        $scope.adminUser = data.adminUser;
                        console.log($scope.adminUser);
                    }
                });
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 处理跳转
                 */
                $scope.showAdminUserList = function () {
                    $state.go('main.authority');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ])
    .controller('BlogListController',
        [
            '$scope',
            'getBlogListService',
            'deleteBlogService',
            function ($scope,
                      getBlogListService,
                      deleteBlogService) {
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到博客列表页！！";
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
            }
        ]
    )
    .controller("BlogAddController",//添加博客
        [
            '$scope',
            '$state',
            'addBlogService',
            'getTagListService',
            function ($scope, $state, addBlogService, getTagListService) {
                /**
                 * 默认载入标签信息
                 */
                var tagPromise = getTagListService.operate($scope.currentPage);
                tagPromise.then(function (data) {
                    $scope.tags = data.tags;
                    console.log($scope.tags);
                });
                /* ===========================================================我是分割线===========================================================================*/
                $scope.selected = [];
                $scope.selectedTags = [];

                var updateSelected = function (action, id, name) {
                    if (action == 'add' && $scope.selected.indexOf(id) == -1) {
                        $scope.selected.push(id);
                        $scope.selectedTags.push(name);
                    }
                    if (action == 'remove' && $scope.selected.indexOf(id) != -1) {
                        var idx = $scope.selected.indexOf(id);
                        $scope.selected.splice(idx, 1);
                        $scope.selectedTags.splice(idx, 1);
                    }
                    console.log($scope.selected);
                };

                $scope.updateSelection = function ($event, id) {
                    var checkbox = $event.target;
                    var action = (checkbox.checked ? 'add' : 'remove');
                    updateSelected(action, id, checkbox.name);
                };

                $scope.isSelected = function (id) {
                    return $scope.selected.indexOf(id) >= 0;
                };
                /**
                 * 添加博客
                 */
                $scope.addBlog = function () {
                    $scope.blog.tagIds = $scope.selected;
                    console.log($scope.blog);
                    var promise = addBlogService.operate($scope.blog);
                    promise.then(function (data) {
                        if (data.status == 200) {
                            $state.go('main.blog');
                        } else {
                            alert(data.status);
                        }
                    });

                };
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 处理跳转
                 */
                $scope.showBlogList = function () {
                    $state.go('main.blog');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }])
    .controller("BlogEditController",//编辑博客
        [
            '$scope',
            '$state',
            'findBlogService',
            function ($scope, $state, findBlogService) {
                var findBlogPromise = findBlogService.operate($state.params.id);
                findBlogPromise.then(function (data) {
                    if (data.status == 200) {
                        $scope.blog = data.blog;
                        console.log($scope.blog);
                    }
                });
                /**
                 * 处理跳转
                 */
                $scope.showBlogList = function () {
                    $state.go('main.blog');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }])
    .controller('UserListController',//前台用户列表
        [
            '$scope',
            '$state',
            'userListService',
            'deleteUserService',
            function ($scope, $state, userListService, deleteUserService) {
                /* ===========================================================我是分割线===========================================================================*/
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到用户列表页！！";
                /* ===========================================================我是分割线===========================================================================*/
                /**
                 * 默认载入用户管理信息
                 */
                var userPromise = userListService.operate($scope.currentPage);
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
                /**
                 * 删除用户
                 * @param userId
                 */
                $scope.deleteUser = function (userId) {
                    var deletePromise = deleteUserService.operate(userId);
                    deletePromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = userListService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.users = data.users;
                                $scope.pageCount = $scope.users.totalPages;
                            });
                        }
                    });
                };
                /* ===========================================================我是分割线===========================================================================*/

            }
        ]
    )
    .controller("UserAddController",//新增用户
        [
            '$scope',
            '$state',
            'addUserService',
            'userListService',
            function ($scope, $state, addUserService, userListService) {
                /**
                 * 增加前台用户
                 */
                $scope.addUser = function (email, nickName, phone, address, gender) {
                    console.log(email);
                    var addPromise = addUserService.operate(email, nickName, phone, address, gender);
                    addPromise.then(function (data) {
                        if (data.status == 200) {
                            var promise = userListService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.users = data.users;
                                $scope.pageCount = $scope.users.totalPages;
                                $state.go('main.user');
                            });
                        }
                    });
                };
                /**
                 * 处理跳转
                 */
                $scope.showUserList = function () {
                    $state.go('main.user');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }])
    .controller("UserEditController",//编辑用户
        [
            '$scope',
            '$state',
            'findUserService',
            function ($scope, $state, findUserService) {
                var findBlogPromise = findUserService.operate($state.params.id);
                findBlogPromise.then(function (data) {
                    if (data.status == 200) {
                        $scope.user = data.user;
                        console.log($scope.user);
                    }
                });
                /**
                 * 处理跳转
                 */
                $scope.showUserList = function () {
                    $state.go('main.user');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }])
    .controller('TagListController',//标签列表
        [
            '$scope',
            '$state',
            'deleteTagService',
            'getTagListService',
            function ($scope,
                      $state,
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
                    $state.go('main.tag');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('LinkController',
        [
            '$scope',
            '$state',
            'deleteLinkService',
            'linkListService',
            function ($scope,
                      $state,
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
                    $state.go('main.link');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('ChangeLogController',
        [
            '$scope',
            '$state',
            'deleteChangeLogService',
            'changeLogListService',
            function ($scope,
                      $state,
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
                    $state.go('main.changeLog');
                };
                /* ===========================================================我是分割线===========================================================================*/
            }
        ]
    )
    .controller('BasicInfoController',
        [
            '$scope',
            '$state',
            'basicInfoService',
            function ($scope,
                      $state,
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
