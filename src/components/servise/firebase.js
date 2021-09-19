import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAn6AxHzZETX-VNHw_xIsnPY268d-RD4N8",
  authDomain: "pokemon-game-e6401.firebaseapp.com",
  databaseURL: "https://pokemon-game-e6401-default-rtdb.firebaseio.com",
  projectId: "pokemon-game-e6401",
  storageBucket: "pokemon-game-e6401.appspot.com",
  messagingSenderId: "559708775573",
  appId: "1:559708775573:web:8d594decb2f080459a679c",
};

firebase.initializeApp(firebaseConfig);
export const fire = firebase;
export const database = fire.database();

export default database;
