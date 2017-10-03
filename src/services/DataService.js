import restaurants from "./restaurants";
import reviews from "./reviews";

// const defaultOptions = {
//     headers: { Accept: "application/json" },
//     mode: "cors"
// }

export default class DataService {

    constructor() {
        this.restaurantsEndPoint = "https://interview-project-17987.herokuapp.com/api/restaurants";
        this.reviewsEndPoint = "https://interview-project-17987.herokuapp.com/api/reviews";
    }

    getRestaurantsAsync() {
        // return fetch(this.restaurantsEndPoint, defaultOptions).then((response) => {
        //     return response.json();
        // });

        return Promise.resolve(restaurants);
    }

    getRestaurantAsync(name) {
        // return fetch(`${this.restaurantsEndPoint}/${name}`, defaultOptions).then((response) => {
        //     return response.json();
        // });

        return Promise.resolve(restaurants.find((restaurant) => {
            return restaurant.name === name;
        }));
    }

    getRestaurantReviewsAsync(name) {
        // return fetch(`${this.reviewsEndPoint}/${name}`, defaultOptions).then((response) => {
        //     return response.json();
        // });

        return Promise.resolve(reviews.filter((review) => {
            return review.restaurant === name;
        }));
    }

    getRestaurantRatingAsync(restaurantName) {
        // return fetch(this.reviewsEndPoint, defaultOptions).then((response) => {
        //     return response.json();
        // });

        return this.getRestaurantReviewsAsync(restaurantName).then((reviews) => {
            let ratingTotal = reviews.reduce((total, review) => {
                return parseInt(review.rating, 10) + total;
            }, 0);

            let average = ratingTotal / reviews.length;

            return average;
        });

    }

}