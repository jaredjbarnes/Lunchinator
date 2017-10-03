import React, { Component } from "react";
import "./Home.css"
import TextButton from "./../controls/TextButton";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.navigation = props.navigation;
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        this.navigation.push("BrowseRestaurants");
    }

    render() {
        return (
            <div className={"home"}>
                <p>
                    <img alt="" src="./images/Lunchinator.jpg" style={{
                        width: "235px",
                        height: "144px"
                    }} />
                </p>
                <TextButton onClick={this._onClick}>Browse Restaurants</TextButton>
            </div>
        )
    }
}