//import { usersCollection, auth } from "@/services/firebase";
import { User } from '../model/user.js'

export default {
  async getUser(){
    console.log("atroden")
    console.log(this.$firebase.auth())
    if (this.$firebase.auth().currentUser) { 
      
      let user = await this.$firebase.db.collection('users') 
        .doc(this.$firebase.auth().currentUser.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            let aux = doc.data();
            let user = new User(this.$firebase.auth().currentUser.uid ,aux.nick, this.$firebase.auth().currentUser.email, aux.rol, aux.lastname, aux.firstname, aux.address, aux.phone);
            console.log(user)
            return user;
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      return user
    } else {
      return {nombre: null}
    }
  },
  async getUsers() {
    let usersData = [];
    let users = await this.$firebase.db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          usersData.push({
            docId: doc.id, // Se crea a mano el objeto para poder guardar tambien docId, para cuando se quiera editar/eliminar. Caso contrario solo guardar doc.data()
            nickname: doc.data().nick,
            rol: doc.data().rol
          });
        });
        return usersData;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        return [];
      });
    return users;
  }
}