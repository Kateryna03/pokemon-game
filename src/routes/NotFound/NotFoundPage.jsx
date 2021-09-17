import { useHistory } from "react-router";

export default function NotFoundPage() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <>
      <h1>404 Страница не найдена</h1>
      <button onClick={handleClick}>Go Home</button>
    </>
  );
}
