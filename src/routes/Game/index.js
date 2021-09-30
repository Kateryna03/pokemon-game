import { Switch, Route, useRouteMatch } from "react-router-dom";
import StartPage from "./routes/Start/Start";
import BoardPage from "./routes/Board/Board";
import FinishPage from "./routes/Finish/Finish";

const GamePage = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/`} exact component={StartPage} />
      <Route path={`${match.path}/board`} component={BoardPage} />
      <Route path={`${match.path}/finish`} component={FinishPage} />
    </Switch>
  );
};
export default GamePage;
