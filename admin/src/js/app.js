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
        //如果想把一个界面分成左中右这种的几块，需要用多视图
        .state('main', {
            url: '/main',
           views:{
               '':{
                   templateUrl: 'tpls/home.html'
               },
               'content@main':{
                   templateUrl: 'tpls/blog/blogList.html',
                   controller:'BlogListController'
               }
           }
        })
});
