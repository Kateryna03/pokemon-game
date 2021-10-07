//import { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";
import AboutPage from "./routes/About/AboutPage";
import NotFoundPage from "./routes/NotFound/NotFoundPage";
import ContactPage from "./routes/Contact/ContactPage";
import UserPage from "./routes/Login/Login";
import { FirebaseContext } from "./context/FirebaseContext";
import {
  NotificationContainer,
  NatificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import s from "./App.module.css";
import cn from "classnames";
import FirebaseClass from "./components/servise/firebase";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { getUserAsync, selectUserLoading } from "./components/store/user";
import NavBar from "./components/NavBar/NavBar";

export default function App() {
  const isUserLoading = useSelector(selectUserLoading);
  const location = useLocation();
  const isPadding =
    location.pathname === "/" || location.pathname === "/game/board";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  if (isUserLoading) {
    return "Loading....";
  }
  return (
    <FirebaseContext.Provider value={FirebaseClass}>
      <Switch>
        <Route path="/404">
          <NotFoundPage />
        </Route>
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(s.wrap, { [s.isHomePage]: isPadding })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <Route path="/contact">
                  <ContactPage />
                </Route>
                <PrivateRoute path="/login" component={UserPage} />

                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </FirebaseContext.Provider>
  );
}
