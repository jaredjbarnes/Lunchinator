import React, { Component } from "react";
import "./ListItem.css";

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
        this._activate = this._activate.bind(this);
        this._deactivate = this._deactivate.bind(this);
    }

    _activate() {
        this.setState({
            isActive: true
        });
    }

    _deactivate() {
        this.setState({
            isActive: false
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }


    render() {
        let styles = {};

        if (this.state.isActive) {
            styles.backgroundColor = "#ccc";
        }

        return (
            <div style={styles} className={"list-item"}
                onMouseDown={this._activate}
                onMouseUp={this._deactivate}
                onMouseLeave={this._deactivate}
                onTouchStart={this._activate}
                onTouchEnd={this._deactivate}
                onTouchCancel={this._deactivate}
                onClick={this.props.onClick}>
                <div className={"list-item-label"}>
                    {this.props.label}
                </div>
                <div className={"list-item-arrow"}>
                    <i className={"ion-ios-arrow-right"}></i>
                </div>
            </div>
        );
    }
}

ListItem.defaultProps = {
    isActive: false
}