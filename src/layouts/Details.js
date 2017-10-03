import React, { Component } from "react";
import Rating from "./Rating";
import "./Details.css";

export default class Details extends Component {
    render() {
        return (
            <div className={"details"} style={this.props.style}>
                <Rating
                    image={`https://interview-project-17987.herokuapp.com/images/${this.props.image}`}
                    label={this.props.name}
                    rating={this.props.rating}
                ></Rating>
                <div className={"details-wait-time"}>
                    <b>Wait Time</b>{`: ${this.props.waitTimeMinutes || 0} Minutes`}
                </div>
                <div className={"defails-description"}>
                    {this.props.description}
                </div>
            </div>
        );
    }
}