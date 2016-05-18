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
 * @Date: 2016/5/18 10:44
 * @Description:
 * @Copyright(©) 2015 by xiaomo.
 **/

class AppController {

    /*@ngInject*/
    constructor($scope, itemsService, thingFactory) {
        this.url = 'https://github.com/preboot/angular-webpack';
        this.items = [];
        this.selection = [];

        itemsService.getItems().then(result => this.items = result);

        $scope.$watch('vm.items', () => {
            this.selection = this.items.filter(item => item.selected);
        }, true);

        this.makeThing = () => {
            thingFactory.newThing()
        };


        this.$inject = ['$scope', 'itemService', 'Thing'];
    }

}

register('app').controller('AppController', AppController);