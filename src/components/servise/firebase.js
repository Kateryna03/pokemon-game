//import firebase from "firebase/compat/app";
//import "firebase/compat/database";
//import { selectLocalId } from "../store/user";

// const firebaseConfig = {
//   apiKey: "AIzaSyAn6AxHzZETX-VNHw_xIsnPY268d-RD4N8",
//   authDomain: "pokemon-game-e6401.firebaseapp.com",
//   databaseURL: "https://pokemon-game-e6401-default-rtdb.firebaseio.com",
//   projectId: "pokemon-game-e6401",
//   storageBucket: "pokemon-game-e6401.appspot.com",
//   messagingSenderId: "559708775573",
//   appId: "1:559708775573:web:8d594decb2f080459a679c",
// };

//firebase.initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    //this.fire = firebase;
    //this.database = this.fire.database();
    this.host = "https://pokemon-game-e6401-default-rtdb.firebaseio.com/";
    this.localId = null;
  }

  token = () => localStorage.getItem("idToken");

  setLocalId = (localId) => {
    this.localId = localId;
  };

  checkLocalId() {
    if (!this.localId) {
      // eslint-disable-next-line no-throw-literal
      throw {
        msg: "LocalId is does not exist",
      };
    }
  }
  getPokemons = async () => {
    try {
      this.checkLocalId();
      const res = await fetch(
        `${this.host}/${this.localId}/pokemons.json?auth=${this.token()}`
      ).then((res) => res.json());

      return res;
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  // getPokemonSocket = (cb) => {
  //   this.database.ref("pokemons").on("value", (snapshot) => {
  //     cb(snapshot.val());
  //   });
  // };

  // offPokemonSocket = () => {
  //   this.database.ref("pokemons").off();
  // };
  // getPokemonsOnce = async () => {
  //   return await this.database
  //     .ref("pokemons")
  //     .once("value")
  //     .then((snapshot) => snapshot.val());
  // };

  // setPokemon = (key, pokemon) => {
  //   this.database.ref(`pokemons/${key}`).set(pokemon);
  // };

  // addPokemon = (data, localId, cb) => {
  //   const newKey = this.database.ref().child("pokemons").push().key;
  //   this.database
  //     .ref(`${localId}/pokemons/` + newKey)
  //     .set(data)
  //     .then(() => cb && cb());
  // };

  addPokemon = async (data) => {
    const res = await fetch(
      `${this.host}/${this.localId}/pokemons.json?auth=${this.token()}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

    return res;
  };
}

const FirebaseClass = new Firebase();

export default FirebaseClass;
