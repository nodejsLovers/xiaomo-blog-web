import React, {Component} from "react";
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import DevTools from "./DevTools";
import App from "../app";

export default class Root extends Component {

    render() {
        var components = (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
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
