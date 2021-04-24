import Cookie from "js-cookie";
import { User } from '../../model/user.js'
import { auth, usersCollection } from '@/services/firebase.js'

export const state = () => ({
  user: null
}); 

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  }
};

export const actions = {
  async login({ commit }, account) {
    try {
      // Login the user
      await auth.signInWithEmailAndPassword(account.email, account.password);
      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken();
      const { email, uid } = auth.currentUser;

      // Set JWT to the cookie
      Cookie.set("access_token", token);

      // Set the user locally
      let currentUser = await usersCollection
        .doc(auth.currentUser.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            let aux = doc.data();
            let user = new User(auth.currentUser.uid ,aux.nick, auth.currentUser.email, aux.rol, aux.lastname, aux.firstname, aux.address, aux.phone);
            return user;
          } 
        })
        .catch(function (error) {
          throw error;
        });
      commit("SET_USER", currentUser);
    } catch (error) {
      throw error;
    }
  }
};