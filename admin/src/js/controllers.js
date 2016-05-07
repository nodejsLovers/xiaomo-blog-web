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
                /**
                 * 默认载入后台用户管理信息
                 */
                var adminPromise = getAdminUserService.operate($scope.currentPage);
                adminPromise.then(function (data) {
                    $scope.adminUsers = data.adminUsers.content;
                    $scope.pageCount = data.adminUsers.totalPages;
                });
                /**
                 * 后台用户管理信息翻页
                 */
                $scope.onAdminUserPageChange = function () {
                    var adminOnPagePromise = getAdminUserService.operate($scope.currentPage);
                    adminOnPagePromise.then(function (data) {
                        $scope.adminUsers = data.adminUsers.content;
                        $scope.pageCount = data.adminUsers.totalPages;
                    });
                };
                /**
                 * 删除后台用户
                 */
                $scope.deleteAdmin = function ($index) {
                    var currentData = $scope.adminUsers[$index];
                    $scope.adminUsers.splice($index, 1);
                    var deletePromise = deleteAdminService.operate(currentData.id);
                    deletePromise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $scope.adminUsers.splice($index, 1);
                        }
                    });
                };

            }])
    .controller('AdminLoginController',//后台用户登录
        [
            '$scope',
            '$state',
            'adminLoginService',
            function ($scope,
                      $state,
                      adminLoginService) {
                $scope.adminUser = {};
                $scope.adminUser.authLevels = [{'id': 1, 'name': '超级管理员'}, {'id': 2, 'name': '普通管理员'}];
                /**
                 * 登录
                 */
                $scope.login = function () {
                    var promise = adminLoginService.operate($scope.userInfo.userName, $scope.userInfo.password);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
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
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            var promise = getAdminUserService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.adminUsers = data.adminUsers.content;
                                $scope.pageCount = data.adminUsers.totalPages;
                                $state.go('main.authority');
                            });
                        }
                    });
                };
                /**
                 * 处理跳转
                 */
                $scope.showAdminUserList = function () {
                    $state.go('main.authority');
                };
            }])
    .controller('AdminEditController',//编辑后台用户
        [
            '$scope',
            '$state',
            'findAdminUserService',
            'updateAdminService',
            function ($scope, $state, findAdminUserService, updateAdminService) {
                /**
                 * 编辑后台用户
                 * @param adminUserId
                 */
                $scope.adminUser = {};
                $scope.adminUser.authLevels = [{'id': 1, 'name': '超级管理员'}, {'id': 2, 'name': '普通管理员'}];
                var findAdminUserPromise = findAdminUserService.operate($state.params.id);
                findAdminUserPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    if (data.status == 200) {
                        $scope.adminUser = data.adminUser;
                    }
                });

                $scope.updateAdminUser = function (userName, authLevel) {
                    var promise = updateAdminService.operate(userName, authLevel);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $state.go('main.authority');
                        }
                    });
                };

                /**
                 * 处理跳转
                 */
                $scope.showAdminUserList = function () {
                    $state.go('main.authority');
                };
            }
        ])
    .controller('AdminChangePasswordController',//修改后台用户密码
        [
            '$scope',
            '$state',
            'findAdminUserService',
            'changePasswordAdminService',
            function ($scope, $state, findAdminUserService, changePasswordAdminService) {
                /**
                 * 编辑后台用户
                 * @param adminUserId
                 */
                var findAdminUserPromise = findAdminUserService.operate($state.params.id);
                findAdminUserPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    if (data.status == 200) {
                        $scope.adminUser = data.adminUser;
                        $scope.adminUser.password = "";
                    }
                });

                $scope.updatePassword = function (userName, password) {
                    var promise = changePasswordAdminService.operate(userName, password);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $state.go('main.authority');
                        }
                    });
                };

                /**
                 * 处理跳转
                 */
                $scope.showAdminUserList = function () {
                    $state.go('main.authority');
                };
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
                /**
                 * 默认载入博客信息
                 */
                var promise = getBlogListService.operate($scope.currentPage);
                promise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    if (data.status == 200) {
                        $scope.blogs = data.blogs.content;
                        $scope.pageCount = data.blogs.totalPages;
                    }
                });
                /**
                 * 博客翻页
                 */
                $scope.onPageChange = function () {
                    var promise = getBlogListService.operate($scope.currentPage);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $scope.blogs = data.blogs.content;
                            $scope.pageCount = data.blogs.totalPages;
                        }
                    });
                };

                /**
                 * 删除博客
                 */
                $scope.deleteBlog = function ($index) {
                    var currentData = $scope.blogs[$index];
                    var deletePromise = deleteBlogService.operate(currentData.id);
                    deletePromise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $scope.blogs.splice($index, 1);
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
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    $scope.tags = data.tags.content;
                });
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
                    var promise = addBlogService.operate($scope.blog);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $state.go('main.blog');
                        } else {
                            alert(data.status);
                        }
                    });

                };
                /**
                 * 处理跳转
                 */
                $scope.showBlogList = function () {
                    $state.go('main.blog');
                };
            }])
    .controller("BlogEditController",//编辑博客
        [
            '$scope',
            '$state',
            'findBlogService',
            'updateBlogService',
            'getTagListService',
            function ($scope, $state, findBlogService, updateBlogService, getTagListService) {
                $scope.selected = [];
                $scope.selectedTags = [];
                var findBlogPromise = findBlogService.operate($state.params.id);
                findBlogPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    if (data.status == 200) {
                        $scope.blog = data.blog;
                        $scope.selected = $scope.blog.tagIds;
                    }
                });
                var tagPromise = getTagListService.operate($scope.currentPage);
                tagPromise.then(function (data) {
                    $scope.tags = data.tags.content;
                });

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
                $scope.updateBlog = function (title, summary, content, author) {
                    var promise = updateBlogService.operate(title, summary, content, author, $scope.selected);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $state.go('main.blog');
                        }
                    });
                };
                /**
                 * 处理跳转
                 */
                $scope.showBlogList = function () {
                    $state.go('main.blog');
                };
            }])
    .controller('UserListController',//前台用户列表
        [
            '$scope',
            '$state',
            'userListService',
            'deleteUserService',
            function ($scope, $state, userListService, deleteUserService) {
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到用户列表页！！";
                /**
                 * 默认载入用户管理信息
                 */
                var userPromise = userListService.operate($scope.currentPage);
                userPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    $scope.users = data.users.content;
                    $scope.pageCount = data.users.totalPages;
                });
                /**
                 * 用户管理信息翻页
                 */
                $scope.onUserPageChange = function () {
                    var userOnPagePromise = userService.operate($scope.currentPage);
                    userOnPagePromise.then(function (data) {
                        $scope.users = data.users.content;
                    });
                };
                /**
                 * 删除用户
                 * @param $index
                 */
                $scope.deleteUser = function ($index) {
                    var currentData = $scope.users[$index];
                    var deletePromise = deleteUserService.operate(currentData.id);
                    deletePromise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $scope.users.splice($index, 1);
                        }
                    });
                };

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
                    var addPromise = addUserService.operate(email, nickName, phone, address, gender);
                    addPromise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            var promise = userListService.operate($scope.currentPage);
                            promise.then(function (data) {
                                $scope.users = data.users;
                                $scope.pageCount = data.users.totalPages;
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
            }])
    .controller("UserEditController",//编辑用户
        [
            '$scope',
            '$state',
            'findUserService',
            'updateUserService',
            function ($scope, $state, findUserService, updateUserService) {
                var findBlogPromise = findUserService.operate($state.params.id);
                findBlogPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    if (data.status == 200) {
                        $scope.user = data.user;
                    }
                });
                $scope.updateUser = function (email, nickName, phone, address, gender) {
                    var promise = updateUserService.operate(email, nickName, phone, address, gender);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了...");
                            return;
                        }
                        if (data.status == 200) {
                            $state.go('main.user');
                        }
                    })
                };
                /**
                 * 处理跳转
                 */
                $scope.showUserList = function () {
                    $state.go('main.user');
                };
            }])
    .controller('UserChangePasswordController',
        [
            '$scope',
            '$state',
            'changeUserPasswordService',
            'findUserService',
            function ($scope, $state, changeUserPasswordService, findUserService) {
                var findBlogPromise = findUserService.operate($state.params.id);
                findBlogPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    if (data.status == 200) {
                        $scope.user = data.user;
                        $scope.user.password = '';
                    }
                });
                $scope.updateUserPassword = function (email, nickName, password) {
                    var promise = changeUserPasswordService.operate(email, nickName, password);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了...");
                            return;
                        }
                        if (data.status == 200) {
                            $state.go('main.user');
                        }
                    })
                };
                /**
                 * 处理跳转
                 */
                $scope.showUserList = function () {
                    $state.go('main.user');
                };
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
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到标签列表页！！";
                /**
                 * 默认载入标签信息
                 */
                var tagPromise = getTagListService.operate($scope.currentPage);
                tagPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    $scope.tags = data.tags.content;
                    $scope.pageCount = data.tags.totalPages;
                });
                /**
                 * 标签翻页
                 */
                $scope.onTagPageChange = function () {
                    var promise = getTagListService.operate($scope.currentPage);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        $scope.tags = data.tags.content;
                        $scope.pageCount = data.tags.totalPages;
                    });
                };
                /**
                 * 删除标签
                 */
                $scope.deleteTag = function ($index) {
                    var currentData = $scope.tags[$index];
                    var deletePromise = deleteTagService.operate(currentData.id);
                    deletePromise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $scope.tags.splice($index, 1);
                        }
                    });
                };
                /**
                 * 处理跳转
                 */
                $scope.showTagList = function () {
                    $state.go('main.tag');
                };
            }
        ]
    )
    .controller('TagAddController',
        [
            '$scope',
            '$state',
            'addTagService',
            function ($scope, $state, addTagService) {
                $scope.addTag = function (tagName) {
                    var promise = addTagService.operate(tagName);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了...");
                            return;
                        }
                        if (data.status == 200) {
                            $state.go('main.tag');
                        }
                    })
                }
            }]
    )
    .controller('LinkListController',
        [
            '$scope',
            '$state',
            'deleteLinkService',
            'linkListService',
            function ($scope,
                      $state,
                      deleteLinkService,
                      linkListService) {
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到友情链接列表页！！";
                /**
                 * 默认友情链接标签信息
                 */
                var linkPromise = linkListService.operate($scope.currentPage);
                console.log($scope.currentPage);
                linkPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    $scope.links = data.links.content;
                    $scope.pageCount = data.links.totalPages;
                });
                /**
                 * 友情链接标签信息翻页
                 */
                $scope.onLinkPageChange = function () {
                    var promise = linkListService.operate($scope.currentPage);
                    console.log($scope.currentPage);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        $scope.links = data.links.content;
                        $scope.pageCount = data.links.totalPages;
                    });
                };
                $scope.deleteLink = function ($index) {
                    var currentData = $scope.links[$index];
                    var deletePromise = deleteLinkService.operate(currentData.id);
                    deletePromise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $scope.links.splice($index, 1);
                        }
                    })
                };

            }
        ]
    )
    .controller('LinkAddController',
        [
            '$scope',
            '$state',
            'addLinkService',
            function ($scope, $state, addLinkService) {
                $scope.link = {};
                $scope.link.url = 'http://';
                $scope.addLink = function (name, url, level) {
                    var promise = addLinkService.operate(name, url, level);
                    promise.then(function (data) {
                        if (data == null) {
                            alert('服务器挂B了...');
                            return;
                        }
                        if (data.status == 200) {
                            $state.go('main.links');
                        }
                    })
                };
                /**
                 * 处理跳转
                 */
                $scope.showLinkList = function () {
                    $state.go('main.links');
                };
            }])
    .controller('LinkEditController',
        [
            '$scope',
            '$state',
            'findLinkService',
            'updateLinkService',
            function ($scope, $state, findLinkService, updateLinkService) {
                var findLinkPromise = findLinkService.operate($state.params.id);
                findLinkPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    if (data.status == 200) {
                        $scope.link = data.link;
                    }
                });
                $scope.updateLink = function (name, url, level) {
                    var promise = updateLinkService.operate(name, url, level);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了...");
                            return;
                        }
                        if (data.status == 200) {
                            $state.go('main.links');
                        }
                    })
                };
                /**
                 * 处理跳转
                 */
                $scope.showLinkList = function () {
                    $state.go('main.links');
                };
            }])
    .controller('ChangeLogListController',
        [
            '$scope',
            '$state',
            'deleteChangeLogService',
            'changeLogListService',
            function ($scope,
                      $state,
                      deleteChangeLogService,
                      changeLogListService) {
                /**
                 * 默认更新日志标签信息
                 */
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "欢迎来到更新日志列表页！！";
                var linkPromise = changeLogListService.operate($scope.currentPage);
                linkPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    $scope.changeLogs = data.changeLogs.content;
                    $scope.pageCount = data.changeLogs.totalPages;
                });
                /**
                 * 更新日志翻页
                 */
                $scope.onChangeLogPageChange = function () {
                    var promise = changeLogListService.operate($scope.currentPage);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        $scope.changeLogs = data.changeLogs.content;
                        $scope.pageCount = data.changeLogs.totalPages;
                    });
                };
                $scope.deleteChangeLog = function ($index) {
                    var currentData = $scope.changeLogs[$index];
                    var deletePromise = deleteChangeLogService.operate(currentData.id);
                    deletePromise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了....");
                        }
                        if (data.status == 200) {
                            $scope.changeLogs.splice($index, 1);
                        }
                    })
                };
            }
        ]
    )
    .controller('ChangeLogAddController',
        [
            '$scope',
            '$state',
            'addChangeLogService',
            function ($scope, $state, addChangeLogService) {
                var now = new Date();
                $scope.changeLog = {};
                $scope.changeLog.onlineTime = now.getFullYear() + '.' + (now.getMonth() + 1) + '.' + now.getDate();
                $scope.addChangeLog = function (name, onlineTime) {
                    var promise = addChangeLogService.operate(name, onlineTime);
                    promise.then(function (data) {
                        if (data == null) {
                            alert('服务器挂B了...');
                            return;
                        }
                        if (data.status == 200) {
                            $state.go('main.changeLog');
                        }
                    })
                };

                /**
                 * 处理跳转
                 */
                $scope.showChangeLogList = function () {
                    $state.go('main.changeLog');
                };
            }])
    .controller('ChangeLogEditController',
        [
            '$scope',
            '$state',
            'findChangeLogService',
            'updateChangeLogService',
            function ($scope, $state, findChangeLogService, updateChangeLogService) {
                var promise = findChangeLogService.operate($state.params.id);
                promise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    if (data.status == 200) {
                        $scope.changeLog = data.changeLog;
                    }
                });
                $scope.updateChangeLog = function (name, onlineTime) {
                    var promise = updateChangeLogService.operate(name, onlineTime);
                    promise.then(function (data) {
                        if (data == null) {
                            alert("服务器挂B了...");
                            return;
                        }
                        if (data.status == 200) {
                            $state.go('main.changeLog');
                        }
                    })

                };
                /**
                 * 处理跳转
                 */
                $scope.showChangeLogList = function () {
                    $state.go('main.changeLog');
                };
            }])
    .controller('BasicInfoController',
        [
            '$rootScope',
            '$scope',
            '$state',
            'basicInfoService',
            'findWebSetService',
            function ($rootScope,
                      $scope,
                      $state,
                      basicInfoService,
                      findWebSetService) {
                $scope.commonInfo = {};
                $scope.commonInfo.msg = "服务系统信息！！";
                var systemPromise = basicInfoService.operate();
                systemPromise.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了....");
                    }
                    $scope.systems = data.systems;
                });
                var webSetPromise = findWebSetService.operate();
                webSetPromise.then(function (data) {
                    $rootScope.webSet = data.webSets[0];
                });
            }
        ]
    )
    .controller('WebSetController', [
        '$scope',
        '$state',
        'findWebSetService',
        'updateWebSetService',
        function ($scope, $state, findWebSetService, updateWebSetService) {
            $scope.commonInfo = {};
            $scope.commonInfo.msg = "欢迎来到站点信息设置页面！！";
            var promise = findWebSetService.operate();
            promise.then(function (data) {
                $scope.webSet = data.webSets[0];
            });
            $scope.updateWebSet = function (webSet) {
                var operate = updateWebSetService.operate(webSet);
                operate.then(function (data) {
                    if (data == null) {
                        alert("服务器挂B了...");
                        return;
                    }
                    if (data.status == 200) {
                        alert("更新成功！")
                    }
                })
            }
        }
    ]);
