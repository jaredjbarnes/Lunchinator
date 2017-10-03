import React, { Component } from "react";
import "./Navigation.css";
import NavigationSceneContainer from "./NavigationSceneContainer";

export default class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stack: [],
            optionsStack: [],
            action: "idle",
            ...props
        };

        this.isAnimating = false;
        this._onPushingAnimationEnd = this._onPushingAnimationEnd.bind(this);
        this._onPoppingAnimationEnd = this._onPoppingAnimationEnd.bind(this);

        this.navigationDelegate = {
            push: (name, options) => {
                return this.push(name, options);
            },
            pop: (options) => {
                return this.pop(options);
            }
        };
    }

    _getScene(name) {
        let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];

        return children.find((scene) => {
            return scene.props.name === name;
        });
    }

    _getCurrentSceneName() {
        return this.state.stack[this.state.stack.length - 1] || null;
    }

    _onPushingAnimationEnd() {
        this.isAnimating = false;
        this.setState({
            action: "idle"
        });
    }

    _onPoppingAnimationEnd() {
        this.isAnimating = false;
        let stack = this.state.stack.slice();
        let optionsStack = this.state.optionsStack.slice();

        stack.pop(optionsStack.pop());

        this.setState({
            action: "idle",
            stack: stack
        });
    }

    _shouldPushToState(name) {
        return !this.isAnimating && this._getCurrentSceneName() !== name;
    }

    _shouldPopState() {
        return !this.isAnimating && this.state.stack.length > 1;
    }

    push(name, options = {}) {
        if (this._shouldPushToState(name)) {

            let stack = this.state.stack.slice();
            let optionsStack = this.state.optionsStack.slice();

            stack.push(name);
            optionsStack.push(options);

            if (stack.length > 1) {
                this.isAnimating = true;
                this.setState({
                    stack: stack,
                    optionsStack: optionsStack,
                    action: "pushing",
                    options: options
                });
            } else {
                this.setState({
                    stack: stack,
                    action: "idle",
                    options: options,
                    optionsStack: optionsStack
                });
            }


        }
    }

    pop() {
        if (this._shouldPopState()) {
            this.isAnimating = true;

            this.setState({
                action: "popping",
                options: this.state.optionsStack[this.state.optionsStack.length - 1],
            });
        }
    }

    idleRender() {
        let currentScene = this._getScene(this.state.stack[this.state.stack.length - 1]) || (<div></div>);

        return (
            <div className={"navigation"} style={{ ...this.props.style }}>
                <NavigationSceneContainer className={"navigation-scene-container"}>
                    {React.cloneElement(currentScene, {
                        navigation: this.navigationDelegate,
                        options: this.state.options
                    })}
                </NavigationSceneContainer>
            </div>
        );
    }

    poppingRender() {
        let from = this._getScene(this.state.stack[this.state.stack.length - 1]) || (<div></div>);
        let to = this._getScene(this.state.stack[this.state.stack.length - 2]) || (<div></div>);

        return (
            <div className={"navigation"} style={{ ...this.props.style }}>
                <NavigationSceneContainer className={"navigation-scene-container pop-in"} onAnimationEnd={this._onPoppingAnimationEnd}>
                    {React.cloneElement(to, {
                        navigation: this.navigationDelegate,
                        options: this.state.options
                    })}
                </NavigationSceneContainer>
                <NavigationSceneContainer className={"navigation-scene-container pop-out"}>
                    {React.cloneElement(from, {
                        navigation: this.navigationDelegate,
                        options: this.state.options
                    })}
                </NavigationSceneContainer>
            </div>
        );
    }

    pushingRender() {
        let from = this._getScene(this.state.stack[this.state.stack.length - 2]) || (<div></div>);
        let to = this._getScene(this.state.stack[this.state.stack.length - 1]) || (<div></div>);

        return (
            <div className={"navigation"} style={{ ...this.props.style }}>
                <NavigationSceneContainer className={"navigation-scene-container push-in"} onAnimationEnd={this._onPushingAnimationEnd}>
                    {React.cloneElement(to, {
                        navigation: this.navigationDelegate,
                        options: this.state.options
                    })}
                </NavigationSceneContainer>
                <NavigationSceneContainer className={"navigation-scene-container push-out"}>
                    {React.cloneElement(from, {
                        navigation: this.navigationDelegate,
                        options: this.state.options
                    })}
                </NavigationSceneContainer>
            </div>
        );
    }

    render() {
        return this[`${this.state.action}Render`].apply(this, arguments);
    }
}