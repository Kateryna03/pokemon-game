import { useHistory } from "react-router";

const AboutPage = ({ onChangePage }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <>
      {/* <MenuHeader></MenuHeader> */}

      <h1>THIS IS ABOUT PAGE!!!</h1>
      <button onClick={handleClick}>Go Home</button>
    </>
  );
};
export default AboutPage;
