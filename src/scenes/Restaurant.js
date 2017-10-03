import React, { Component } from "react";
import HeaderContent from "./../layouts/HeaderContent";
import Tabs from "./../layouts/Tabs";
import Details from "./../layouts/Details";
import Review from "./../layouts/Review";
import LoadingContent from "./../layouts/LoadingContent";
import store from "./../services/singletonStore";

export default class Resturaunt extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props, isLoading: false };
        this.navigation = props.navigation;
        this._onBackClick = this._onBackClick.bind(this);
        this.getObserver = null;
        this.receivedObserver = null;
    }

    _getRating() {
        if (Array.isArray(this.state.reviews)) {
            let total = this.state.reviews.reduce((accumulator, review) => {
                return accumulator += parseInt(review.rating, 10);
            }, 0);

            return parseInt(total / this.state.reviews.length, 10);
        }

        return 1;
    }

    _getReviews() {
        if (Array.isArray(this.state.reviews)) {
            return this.state.reviews.map((review, index) => {
                return (<Review
                    key={index}
                    name={review.reviewer}
                    rating={parseInt(review.rating, 10)}
                    review={review.review}
                    image={review.reviewerImage}
                />)
            });
        }
        return [];
    }

    _onBackClick() {
        this.navigation.pop();
    }

    componentWillMount() {
        this.getObserver = store.observe("GET_RESTAURANT_REVIEWS", (event) => {
            this.setState({
                isLoading: true
            });
        });

        this.receivedObserver = store.observe("RECEIVED_RESTAURANT_REVIEWS", (event) => {
            this.setState({
                isLoading: false,
                reviews: event.reviews
            });
        });

        store.getRestaurantReviews(this.props.options.restaurant.name);
    }

    componentWillUnmount() {
        this.getObserver.dispose();
        this.receivedObserver.dispose();
    }

    render() {
        let restaurant = this.props.options.restaurant;
        let rating = this._getRating();

        return (
            <HeaderContent title={restaurant.name} onBackClick={this._onBackClick}>
                <LoadingContent style={{ width: "100%", height: "100%" }} isLoading={this.state.isLoading}>
                    <Tabs style={{ width: "100%", height: "100%" }}>
                        <div name="Details" style={{ padding: "10px" }}>
                            <Details
                                name={restaurant.name}
                                image={restaurant.image}
                                description={restaurant.description}
                                rating={rating}
                                waitTimeMinutes={restaurant.waitTimeMinutes}
                            ></Details>
                        </div>
                        <div name="Reviews" style={{ padding: "10px", boxSizing: "border-box" }}>
                            {this._getReviews()}
                        </div>
                    </Tabs>
                </LoadingContent>
            </HeaderContent>
        )
    }
}