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
 * @Date: 2016/5/16 10:07
 * @Description:
 * @Copyright(©) 2015 by xiaomo.
 **/
//  要编译bundle.js才会生效  大家可以使用 实时编译 加上 --watch   我这里没有实时编译 实时开发的时候可以开上实时编译  刚刚测试说明己经生效 
// 在博客内容中说明  webpack 不仅可以打包js 还可以打包其他文件 不过要使用对应的loader
// style-loader css-loader
require('./src/style/main.scss');//再次提醒 要加上当前路径./  不然会找不到
var hello = (name)=> {
    return 'Hello webpack,我是' + name;
};

document.write(hello('小莫'));
document.write('<i class="glyphicon glyphicon-gift" style="font-size: 30px"></i>');