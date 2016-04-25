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
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'tpls/login.html'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'tpls/home.html'
        })
        .state('main.user', {
            url: '/user',
            templateUrl: 'tpls/user/userList.html',
            controller:'BlogListController'
        })
        .state('main.goods', {
            url: '/goods',
            templateUrl: 'tpls/goods/goods.html'
        })
        .state('main.blog', {
            url: '/blog',
            templateUrl: 'tpls/blog/blogList.html',
            controller:'BlogListController'
        })
        .state('main.addBlog', {
            url: '/addBlog',
            templateUrl: 'tpls/blog/addBlog.html',
            controller: 'BlogListController'
        })
});
