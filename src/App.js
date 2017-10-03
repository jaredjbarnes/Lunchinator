import React, { Component } from "react";
import Home from "./scenes/Home";
import BrowseRestaurants from "./scenes/BrowseRestaurants";
import Navigation from "./layouts/Navigation";
import Tabs from "./layouts/Tabs";
import Stars from "./layouts/Stars";
import Rating from "./layouts/Rating";
import LoadingContent from "./layouts/LoadingContent";
import Restaurant from "./scenes/Restaurant";
import store from "./services/singletonStore";

window.store = store;

class App extends Component {

  constructor(props) {
    super(props);
    this.navigation = null;
  }

  componentDidMount() {
    if (this.navigation != null) {
      window.nav = this.navigation;

      this.navigation.push("Home");
    }
  }

  render() {
    return (
      <Navigation style={{ width: "100%", height: "100%" }} ref={nav => this.navigation = nav}>
        <Home name="Home" />
        <BrowseRestaurants name="BrowseRestaurants" />
        <Tabs name="Tabs" >
          <div name={"One"}>One</div>
          <div name={"Two"}>Two</div>
        </Tabs>
        <Stars name={"Stars"} rating={5} />
        <Rating name={"Rating"} />
        <Restaurant name={"Restaurant"} />
        <LoadingContent name={"LoadingContent"} isLoading={true} />
      </Navigation >
    );
  }
}

export default App;
