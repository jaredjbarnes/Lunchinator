import React, { Component } from "react";
import Rating from "./Rating";
import "./Review.css";

export default class Review extends Component {
    render() {
        return (
            <div className={"review"}>
                <Rating
                    image={`https://interview-project-17987.herokuapp.com/images/${this.props.image}`}
                    label={this.props.name}
                    rating={this.props.rating}
                />
                <div className={"review-description"}>
                    {this.props.review}
                </div>
            </div>
        );
    }
}