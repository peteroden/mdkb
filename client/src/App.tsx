import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LandingPage } from "./components/LandingPage";
import { SearchNavigator } from "./components/SearchNavigator";
import { Crud } from "./components/Crud";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/search" component={SearchNavigator} />
		  <Route exact path="/item" component={Crud} />
          <Route path="/item/:id" component={Crud} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
