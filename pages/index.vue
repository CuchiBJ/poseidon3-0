<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h1>index</h1>
    </v-col>
  </v-row>
</template>

<script>
import Cookie from "js-cookie";
import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";
import { usersCollection } from '@/services/firebase.js'
import { User } from '../model/user.js'

export default {
  components: {
    
  },
  async beforeCreate(){
      const cookie = Cookie.get("access_token")
      console.log(cookie)
      if (cookie) {
        const decoded = JWTDecode(cookie);

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
          this.$store.commit("users/SET_USER", currentUser);
        }
        this.$router.push("/admin");
      }
    
  },
  created(){
    
  }
}
</script>
