import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/style.scss';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppController',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppController', AppCtrl);

export default MODULE_NAME;