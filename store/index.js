import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";
import { usersCollection } from '@/services/firebase.js'
import { User } from '../model/user.js'


export const state = () => ({
  snackBar: false,
  snackText: "",
});

export const mutations = {
  activeSnack: (state, text) =>{
    state.snackBar = true,
    state.snackText = text
  },
  deactiveSnack: (state) =>{
    state.snackBar = false,
    state.snackText = ""
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;
    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;

    if (!accessTokenCookie) return;
    const decoded = JWTDecode(accessTokenCookie);


    let currentUser = await usersCollection
        .doc(decoded.user_id)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            let aux = doc.data();
            let user = new User(decoded.user_id ,aux.nick, decoded.email, aux.rol, aux.lastname, aux.firstname, aux.address, aux.phone);
            return user;
          } 
        })
        .catch(function (error) {
          console.log("error:", error)
        });


    if (decoded) {
      commit("users/SET_USER", currentUser);
    }
  }
};