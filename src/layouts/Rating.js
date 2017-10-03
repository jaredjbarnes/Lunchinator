import React, { Component } from "react";
import Stars from "./Stars";
import "./Rating.css";

export default class Rating extends Component {
    render() {
        return (
            <div className={"rating"}>
                <div className={"rating-image-container"}>
                    <img alt="" className={"rating-image"} src={this.props.image || "https://interview-project-17987.herokuapp.com/images/JimmyJohns.jpeg"} />
                </div>
                <div className={"rating-info"}>
                    <div className={"rating-label"}>{this.props.label || "Heather"}</div>
                    <Stars rating={this.props.rating}></Stars>
                </div>
            </div>
        );
    }
}