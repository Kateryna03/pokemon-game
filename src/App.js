//import logo from './logo.svg';
import "./App.css";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import bg1 from "../src/assets/bg1.jpeg";
import bg3 from "../src/assets/bg3.jpeg";
export default function App() {
  //const Layout1 = { backgroundImage: bg1 };
  // const Layout2 = { color: "yellow" };
  //const Layout3 = { backgroundImage: "./assets/bg3" };
  return (
    <>
      <Header title descr />
      <Layout title descr urlBg={bg1} />
      <Layout title descr colorBg="yellow" />
      <Layout title descr urlBg={bg3} />
      <Footer />
    </>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       HELLO WORLD, React.JS!
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}
