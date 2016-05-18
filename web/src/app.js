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
 * @Date: 2016/5/18 16:30
 * @Description:
 * @Copyright(©) 2015 by xiaomo.
 **/

import React, {Component} from "react";
import ReactDOM from "react-dom";

import './styles/style.scss';

class MyApp extends Component {
    render() {
        return <button className="btn btn-success">So Beautiful</button>
    }
}

ReactDOM.render(<MyApp/>, document.getElementById('app'));