import React, {Component, PropTypes} from "react";
import {Progress} from "antd";

export default class Counter extends Component {
    static propTypes = {
        counter: PropTypes.number.isRequired,
        actions: PropTypes.object.isRequired
    };

    render() {
        const { increment, incrementIfOdd, decrement } = this.props.actions;
        const { counter } = this.props;
        return (
            <div>
                <Progress type="line" percent={counter} status="active"/>
                <hr/>
                <button onClick={increment} className="btn btn-success">加</button>
                {' '}
                <button onClick={decrement} className="btn btn-info">减</button>
            </div>
        );
    }
}
