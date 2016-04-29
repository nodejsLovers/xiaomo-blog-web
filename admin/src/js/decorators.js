/**
 * 把今天最好的表现当作明天最新的起点．．～
 * いま 最高の表現 として 明日最新の始発．．～
 * Today the best performance  as tomorrow newest starter!
 * Created by IntelliJ IDEA.
 *
 * @author: xiaomo
 * @github: https://github.com/qq83387856
 * @email: hupengbest@163.com
 * @QQ_NO: 83387856
 * @Date: 2016/4/2915:23
 * @Description:
 * @Copyright(©) 2015 by xiaomo.
 **/
var githubDecorator = function ($delegate, $log) {
    var events = function (path) {
        var startedAt = new Date();
        var events = $delegate.events(path);
        // 事件是一个promise
        events.finally(function () {
            $log.info("Fetching events" +
                " took " +
                (new Date() - startedAt) + "ms");
        });
        return events;
    };
    return {
        events: events
    };
};