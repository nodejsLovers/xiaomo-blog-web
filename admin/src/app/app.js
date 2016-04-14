import angular from "angular";
import "../style/app.css";
import AppCtrl from "./controllers/AppCtrl";
import {MODULE_NAME} from "./constants/module";
import app from "./directives/AppDirective";

angular.module(MODULE_NAME, [])
    .directive('app', app)
    .controller('AppCtrl', AppCtrl);

/**
 * 我在module里面己经 export 出来一个 MODULE_NAME
 * 但是如果这里去掉默认导出的话 test就跑不通.没太明白原因
 */
export default MODULE_NAME;