import React, {Component} from "react";
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import App from "./../app";
import indexChangeLog from "../components/changeLog/IndexChangeLogComponent";
import IndexBlog from "../components/blog/IndexBlogComponent";
import indexAbout from "../components/about/IndexAboutComponent";
import IndexComponent from "../components/index/IndexComponent";
import NotMatch from "../components/common/NotMatchComponent";
import DevTools from "./DevTools";

export default class Root extends Component {

    render() {
        var components = (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={IndexComponent}/>
                    <Route path='/blog' component={IndexBlog}/>
                    <Route path='/changeLog' component={indexChangeLog}/>
                    <Route path='/about' component={indexAbout}/>
                    <Route path='/login' component={indexChangeLog}/>
                    <Route path='/register' component={IndexComponent}/>
                    <Route path="*" component={NotMatch}/>
                </Route>
            </Router>
        );

        const {store} = this.props;
        return (
            <Provider store={store}>
                <div>
                    {components}
                    <DevTools />
                </div>
            </Provider>
        );
    }
}
