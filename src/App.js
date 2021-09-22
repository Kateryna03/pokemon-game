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
import Firebase from "./components/servise/firebase";
import s from "./App.module.css";
import cn from "classnames";

export default function App() {
  const location = useLocation();
  const isPadding =
    location.pathname === "/" || location.pathname === "/game/board";
  // const match = useRouteMatch("/");
  // console.log("match", match);
  return (
    <FirebaseContext.Provider value={new Firebase()}>
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
  // const [page, setPage] = useState("app");
  // const handleChangePage = (page) => {
  //   console.log("MAIN PAGE");
  //   setPage(page);
  // };
  // switch (page) {
  //   case "app":
  //     return <HomePage onChangePage={handleChangePage}></HomePage>;
  //   case "game":
  //     return <GamePage onChangePage={handleChangePage}></GamePage>;
  //   default:
  //     return <HomePage onChangePage={handleChangePage}></HomePage>;
  // }
}
