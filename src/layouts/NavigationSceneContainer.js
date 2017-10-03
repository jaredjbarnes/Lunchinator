import React from "react";

export default (props) => {
    return (
        <div className={props.className}
            style={{ width: "100%", height: "100%" }}
            onAnimationStart={props.onAnimationStart}
            onAnimationEnd={props.onAnimationEnd}
            onAnimationIteration={props.onAnimationIteration}>
            {props.children}
        </div>
    )
}