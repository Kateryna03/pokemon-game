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

class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSocket = (cb) => {
    this.database.ref("pokemons").on("value", (snapshot) => {
      cb(snapshot.val());
    });
  };

  offPokemonSocket = () => {
    this.database.ref("pokemons").off();
  };
  getPokemonsOnce = async () => {
    return await this.database
      .ref("pokemons")
      .once("value")
      .then((snapshot) => snapshot.val());
  };

  setPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };

  addPokemon = (data, cb) => {
    const newKey = this.database.ref().child("pokemons").push().key;
    this.database
      .ref("pokemons/" + newKey)
      .set(data)
      .then(() => cb());
  };
}

export default Firebase;
