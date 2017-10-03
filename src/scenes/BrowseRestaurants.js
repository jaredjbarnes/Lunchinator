import React, { Component } from "react";
import HeaderContent from "./../layouts/HeaderContent";
import ListItem from "./../controls/ListItem";
import store from "./../services/singletonStore";
import LoadingContent from "./../layouts/LoadingContent";

export default class BrowseRestaurants extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props, restaurants: store.restaurants || [] };

        this.navigation = props.navigation;
        this._onBackClick = this._onBackClick.bind(this);
        this.getObserver = null;
        this.receivedObserver = null;
        this._onScroll = this._onScroll.bind(this);
        this.loadingContentElement = null;
    }

    _createRestaurantList(restaurants) {
        return restaurants.map((restaurant, index) => {

            let onClick = () => {
                this.navigation.push("Restaurant", {
                    restaurant: restaurant
                });
            };

            return (
                <ListItem key={index} label={restaurant.name} onClick={onClick} />
            );
        });
    }

    _onBackClick() {
        this.navigation.pop();
    }

    _onScroll(event) {
        store.state.restaurantListScrollTop = event.currentTarget.scrollTop;
    }

    componentWillMount() {
        this.getObserver = store.observe("GET_RESTAURANTS", (event) => {

            if (store.restaurants == null) {
                this.setState({
                    isLoading: true,
                    restaurants: []
                });
            }

        });

        this.receivedObserver = store.observe("RECEIVED_RESTAURANTS", (event) => {
            this.setState({
                isLoading: false,
                restaurants: event.restaurants
            });
        });

        store.getRestuarants();
    }

    componentDidMount() {
        this.loadingContentElement.scrollTo(0, store.state.restaurantListScrollTop);
    }

    componentWillUnmount() {
        this.getObserver.dispose();
        this.receivedObserver.dispose();
    }

    render() {
        return (
            <HeaderContent title={"Browse Restaurants"} onBackClick={this._onBackClick}>
                <LoadingContent ref={elem => this.loadingContentElement = elem} onScroll={this._onScroll} isLoading={this.state.isLoading}>
                    {this._createRestaurantList(this.state.restaurants)}
                </LoadingContent>
            </HeaderContent>
        )
    }

    shouldComponentUpdate() {
        return this.state.restaurants.length === 0;
    }
}
