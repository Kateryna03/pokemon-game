import { useHistory } from "react-router";

const ContactPage = ({ onChangePage }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <>
      {/* <MenuHeader></MenuHeader> */}

      <h1> OUR CONTACTS:</h1>
      <button onClick={handleClick}>Go Home</button>
    </>
  );
};
export default ContactPage;
