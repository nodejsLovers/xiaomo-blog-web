var myApp = angular.module('myApp', ['ui.router', 'ngAnimate', 'myControllerModule', 'myServiceModule', 'myDirectiveModule', 'myFilterModule', 'myAnimateModule']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
myApp.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$baseUrl = "http://api.xiaomo.info:8080";
});


/**
 * 配置拦截器
 */
myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
});

/**
 * 装饰器(类似于Spring的aop)
 */
// myApp.config(function ($provide) {
//     $provide.decorator('adminLoginService', githubDecorator);
// });

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * 说明：state对应的是ui-view的值
 *      url对应的是ui-serf的值
 *      多视图用@
 *      嵌套用parent.child
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {//登录
            url: '/login',
            templateUrl: './login.html',
            controller: 'AdminLoginController'
        })
        .state('main', {//主界面
            url: '/main',
            templateUrl: './src/tpls/common/home.html',
            controller: 'BasicInfoController'
        })
        .state('main.blog', {//博客列表
            url: '/blog',
            templateUrl: './src/tpls/blog/blogList.html',
            controller: 'BlogListController'
        })
        .state('main.addBlog', {//添加博客
            url: '/addBlog',
            templateUrl: './src/tpls/blog/addBlog.html',
            controller: 'BlogAddController'
        })
        .state('main.editBlog', {//添加博客
            url: '/editBlog',
            templateUrl: './src/tpls/blog/editBlog.html',
            controller: 'BlogEditController'
        })
        .state('main.authority', {//权限列表
            url: '/authority',
            templateUrl: './src/tpls/authority/authorityList.html',
            controller: 'AdminListController'
        })
        .state('main.addAuthority', {//添加权限
            url: '/addAuthority',
            templateUrl: './src/tpls/authority/AddAuthority.html',
            controller: 'AdminAddController'
        })
        .state('main.editAuthority', {//编辑权限
            url: '/editAuthority/:id',
            templateUrl: './src/tpls/authority/authorityEdit.html',
            controller: 'AdminEditController'
        })
        .state('main.user', {//用户列表
            url: '/user',
            templateUrl: './src/tpls/user/userList.html',
            controller: 'UserController'
        })
        .state('main.addUser', {//添加用户
            url: '/addUser',
            templateUrl: './src/tpls/user/addUser.html',
            controller: 'UserController'
        })
        .state('main.tag', {//标签列表
            url: '/tag',
            templateUrl: './src/tpls/tag/tagList.html',
            controller: 'TagController'
        })
        .state('main.addTag', {//添加标签
            url: '/addTag',
            templateUrl: './src/tpls/tag/addTag.html',
            controller: 'TagController'
        })
        .state('main.changeLog', {//更新日志列表
            url: '/changeLog',
            templateUrl: './src/tpls/changeLog/changeLog.html',
            controller: 'ChangeLogController'
        })
        .state('main.addChangeLog', {//添加更新日志
            url: '/addChangeLog',
            templateUrl: './src/tpls/changeLog/addChangeLog.html',
            controller: 'ChangeLogController'
        })
        .state('main.links', {//友情链接列表
            url: '/links',
            templateUrl: './src/tpls/links/linkList.html',
            controller: 'LinkController'
        })
        .state('main.addLink', {//添加友情链接
            url: '/addLink',
            templateUrl: './src/tpls/links/addLink.html',
            controller: 'LinkController'
        })
        .state('main.systemSet', {//系统设置
            url: '/systemSet',
            templateUrl: './src/tpls/systemSet/systemSet.html'
        })
});
