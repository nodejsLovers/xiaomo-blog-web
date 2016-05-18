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
 * @Date: 2016/5/18 11:19
 * @Description:
 * @Copyright(©) 2015 by xiaomo.
 **/
/**
 * A thing is an object which will be instantiated and returned by the ThingFactory
 */
class Thing {

    constructor() {
        var time = new Date().getTime();
        console.log(`Created a new Thing at ${time}!`);

        this.explode();
    }

    explode() {
        console.log('BOOM!');
    }

}

/**
 * The ThingFactory class creates new things
 */
class ThingFactory {

    /*@ngInject*/
    constructor($timeout) {
        this.$timeout = $timeout;
    }

    newThing() {
        console.log('Getting a new Thing...');
        return this.$timeout(() => new Thing(), 100);
    }
}

register('app').factory('thingFactory', ThingFactory);