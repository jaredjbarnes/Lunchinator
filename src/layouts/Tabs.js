import React, { Component } from "react";
import "./Tabs.css";

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            selectedTabName: props.children[0].props.name
        };

        if (!Array.isArray(props.children) || props.children.length < 2) {
            throw new Error("Tabs need to have at least two tabs.");
        }


    }

    _createTabs() {
        return this.props.children.map((child, index) => {
            if (child.props.name == null) {
                throw new Error("Each tab needs to have a name.");
            }

            let onClick = () => {
                this.setState({
                    selectedTabName: child.props.name
                });
            }

            return (
                <div className={this._isSelected(child.props.name) ? "selected" : ""}
                    onClick={onClick}
                    key={index}>
                    {child.props.name}
                </div>
            )
        });
    }

    _isSelected(name) {
        return this.state.selectedTabName === name;
    }

    _getSelectedTab() {
        return this.props.children.find((child) => {
            return child.props.name === this.state.selectedTabName;
        });
    }

    render() {
        let tabs = this._createTabs();
        let selectedTab = this._getSelectedTab();

        return (
            <div className={"tabs"}>
                <div className={"tabs-header"}>
                    {tabs}
                </div>
                <div className={"tabs-content"}>
                    {selectedTab}
                </div>
            </div>
        )
    }
}   