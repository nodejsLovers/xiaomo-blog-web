var myApp = angular.module('myApp', ['ui.router', 'myControllerModule', 'myServiceModule', 'myDirectiveModule', 'myFilterModule']);
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
            controller:'AdminController'
        })
        .state('main', {//主界面
            url: '/main',
            templateUrl: './src/tpls/common/home.html'
        })

        .state('main.blog', {//博客
            url: '/blog',
            templateUrl: './src/tpls/blog/blogList.html',
            controller: 'BlogListController'
        })
        .state('main.authority', {//权限
            url: '/authority',
            templateUrl: './src/tpls/authority/authorityList.html',
            controller:'AdminController'
        })
        .state('main.addAuthority', {//权限
            url: '/authority',
            templateUrl: './src/tpls/authority/AddAuthority.html',
            controller:'AdminController'
        })
        .state('main.user', {//用户
            url: '/user',
            templateUrl: './src/tpls/user/userList.html',
            controller: 'BlogListController'
        })
        .state('main.addUser', {//用户
            url: '/user',
            templateUrl: './src/tpls/user/addUser.html',
            controller: 'BlogListController'
        })
        .state('main.addBlog', {//添加博客
            url: '/addBlog',
            templateUrl: './src/tpls/blog/addBlog.html',
            controller: 'BlogListController'
        })
        .state('main.tag', {//标签
            url: '/tag',
            templateUrl: './src/tpls/tag/tagList.html',
            controller: 'BlogListController'
        })
        .state('main.addTag', {//标签
            url: '/tag',
            templateUrl: './src/tpls/tag/addTag.html',
            controller: 'BlogListController'
        })
        .state('main.changeLog', {//更新日志
            url: '/changeLog',
            templateUrl: './src/tpls/changeLog/changeLog.html',
            controller: 'BlogListController'
        })
        .state('main.addChangeLog', {//更新日志
            url: '/changeLog',
            templateUrl: './src/tpls/changeLog/addChangeLog.html',
            controller: 'BlogListController'
        })
        .state('main.links', {//友情链接
            url: '/links',
            templateUrl: './src/tpls/links/linkList.html',
            controller: 'BlogListController'
        })
        .state('main.addLink', {//友情链接
            url: '/links',
            templateUrl: './src/tpls/links/addLink.html',
            controller: 'BlogListController'
        })
        .state('main.systemSet', {//系统设置
            url: '/systemSet',
            templateUrl: './src/tpls/systemSet/systemSet.html'
        })
});
