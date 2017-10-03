import React from "react";
import "./HeaderContent.css";
import TextButton from "./../controls/TextButton";

export default (props) => {
    return (
        <div className={"header-content-container"}>
            <div className={"header-content-header"}>
                <div className={"header-title"}>
                    {props.label || props.title}
                </div>
                <TextButton className={"header-back-button"} onClick={props.onBackClick}>
                    {<i style={{ fontSize: "30px" }} className={"ion-ios-arrow-left"}></i>}
                </TextButton>
            </div>
            <div className={"header-content-content"}>{props.children}</div>
        </div>
    )
}
