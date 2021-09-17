//import { useState } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";
import s from "./App.module.css";
import cn from "classnames";
import AboutPage from "./routes/About/AboutPage";
import NotFoundPage from "./routes/NotFound/NotFoundPage";
import ContactPage from "./routes/Contact/ContactPage";

export default function App() {
  const match = useRouteMatch("/");
  console.log("match", match);
  return (
    <Switch>
      <Route path="/404">
        <NotFoundPage />{" "}
      </Route>
      <Route>
        <>
          <MenuHeader bgActive={!match.isExact} />
          <div className={cn(s.wrap, { [s.isHomePage]: match.isExact })}>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/home">
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
