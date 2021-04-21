import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import SiteBg from "./components/siteBg/SiteBg";
import NavBar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";

// pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyPosts from "./pages/myPosts/MyPosts";

function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <SiteBg />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/posts" component={MyPosts} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
