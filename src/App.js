import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./Menu/Menu";
import Hero from "./Hero/Hero";
import HomePage from "./HomePage/HomePage";
import ChartJS from "./Charts/Chart";
import PieClass from "./Charts/d3";
import AboutPage from "./AboutPage/AboutPage";
import Footer from "./Footer/Footer";
import LoginPage from "./LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <HomePage />
            <ChartJS />
            <PieClass
              width={1200}
              height={1200}
              innerRadius={150}
              outerRadius={300}
            />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
