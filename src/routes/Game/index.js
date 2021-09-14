const GamePage = ({ onChangePage }) => {
  const handleClick = () => {
    onChangePage && onChangePage("app");
  };
  return (
    <div>
      <h1>THIS IS GAME PAGE!!!</h1>
      <button onClick={handleClick}>Go Home</button>
    </div>
  );
};
export default GamePage;
