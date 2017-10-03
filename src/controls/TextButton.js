import React, { Component } from "react";
import "./TextButton.css"

export default class TextButton extends Component {
    constructor(props) {
        super(props);
        this.state = { isActive: false, ...props };
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
        let className = this.props.className || "";
        let classNames = className.split(" ");

        if (this.state.isActive) {
            styles.opacity = 0.2;
        }

        classNames.push("text-button");

        return (
            <div className={classNames.join(" ")}
                style={styles}
                onMouseDown={this._activate}
                onMouseUp={this._deactivate}
                onMouseLeave={this._deactivate}
                onTouchStart={this._activate}
                onTouchEnd={this._deactivate}
                onTouchCancel={this._deactivate}
                onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

TextButton.defaultProps = {
    isActive: false
};