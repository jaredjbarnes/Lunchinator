import React, { Component } from "react";

const starUrl = "url(https://interview-project-17987.herokuapp.com/images/Stars.png)";

export default class Stars extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
        window.star = this;
    }

    _calculateYPositionForRating() {
        return `${this.state.rating * 27.5}px`;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rating > 0 && nextProps.rating < 6) {
            this.setState(nextProps);
        }
    }

    render() {
        return (
            <div style={{
                backgroundImage: starUrl,
                backgroundPosition: `0px ${this._calculateYPositionForRating()}`,
                backgroundSize: "130px 138px",
                height: "27px",
                width: "130px"
            }}></div>
        );
    }
}

Stars.defaultProps = {
    rating: 1
}