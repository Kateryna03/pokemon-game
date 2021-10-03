//import { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";
import AboutPage from "./routes/About/AboutPage";
import NotFoundPage from "./routes/NotFound/NotFoundPage";
import ContactPage from "./routes/Contact/ContactPage";
import { FirebaseContext } from "./context/FirebaseContext";

import s from "./App.module.css";
import cn from "classnames";
import FirebaseClass from "./components/servise/firebase";

export default function App() {
  const location = useLocation();
  const isPadding =
    location.pathname === "/" || location.pathname === "/game/board";
  // const match = useRouteMatch("/");
  // console.log("match", match);
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
                <Route path="/" exact>
                  <HomePage />
                </Route>

                <Route path="/game">
                  <GamePage />
                </Route>
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/contact">
                  <ContactPage />
                </Route>

                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
    </FirebaseContext.Provider>
  );
}
