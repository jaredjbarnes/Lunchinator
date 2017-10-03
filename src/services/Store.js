import DataService from "./DataService";
import Observable from "./Observable";

export default class Store extends Observable {
    constructor() {
        super();
        this.state = {
            restaurants: null,
            reviews: null,
            restaurantListScrollTop: 0
        };
        this.dataService = new DataService();
    }

    getRestuarants(refresh) {
        if (this.state.restaurants != null && !refresh) {

            this.notify({
                type: "GET_RESTAURANTS"
            });

            this.notify({
                type: "RECEIVED_RESTAURANTS",
                restaurants: this.state.restaurants
            });

            return;
        }

        this.notify({
            type: "GET_RESTAURANTS"
        });

        this.dataService.getRestaurantsAsync().then((restaurants) => {
            this.state.restaurants = restaurants;

            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        }).then(() => {
            this.notify({
                type: "RECEIVED_RESTAURANTS",
                restaurants: this.state.restaurants
            });
        });
    }

    getRestaurantReviews(name) {
        this.notify({
            type: "GET_RESTAURANT_REVIEWS"
        });

        this.dataService.getRestaurantReviewsAsync(name).then((reviews) => {
            this.state.reviews = reviews;

            this.notify({
                type: "RECEIVED_RESTAURANT_REVIEWS",
                reviews: reviews
            });
        });
    }

}