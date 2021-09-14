import { useState } from "react";
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";

export default function App() {
  const [page, setPage] = useState("app");

  const handleChangePage = (page) => {
    console.log("MAIN PAGE");
    setPage(page);
  };
  switch (page) {
    case "app":
      return <HomePage onChangePage={handleChangePage}></HomePage>;
    case "game":
      return <GamePage onChangePage={handleChangePage}></GamePage>;
    default:
      return <HomePage></HomePage>;
  }
}
