import React, { Component } from "react";
import Loading from "./Loading";
import "./LoadingContent.css"

export default class LoadingContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
        this.contentElement = null;
        this._handleScrollTop = this._handleScrollTop.bind(this);
        this.contentElement = null;
    }

    _handleScrollTop(elem) {
        this.contentElement = elem;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {

        if (this.state.isLoading) {
            return (
                <div style={this.props.style} className={"loading-content"}>
                    <div onScroll={this.props.onScroll} ref={this._handleScrollTop} className={"loading-content-loading"}>
                        <Loading className={"loading-content-loader"} />
                    </div>
                </div>
            )
        } else {
            return (
                <div style={this.props.style} className={"loading-content"}>
                    <div onScroll={this.props.onScroll} ref={this._handleScrollTop} className={"loading-content-content"}>
                        {this.props.children}
                    </div>
                </div >
            )
        }

    }

    scrollTo(left, top) {
        this.contentElement.scrollLeft = left;
        this.contentElement.scrollTop = top;
    }
}

LoadingContent.defaultProps = {
    isLoading: false
}