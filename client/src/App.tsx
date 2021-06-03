import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { initializeIcons } from '@fluentui/react';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LandingPage } from "./components/LandingPage";
import { Markdown1 } from './components/Markdown1';
import { Crud } from './components/Crud';
import { SearchNavigator } from "./components/SearchNavigator";

function App() {
  initializeIcons();

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/markdown" component={ Markdown1 } />
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
