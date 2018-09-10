import { Route, Switch } from "react-router-dom";
import React from "react";
import DetailsPage from "./components/DetailsPage";
//impoting Screen pages

//Home screen
import Home from "./screens/Home";

//Blank Screen when no route matches

import Blank from "./screens/Blank";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/detailspage" component={DetailsPage} />
        {/* when none of the above match, <NoMatch> will be rendered */}
        <Route component={Blank} />
      </Switch>
    );
  }
}
