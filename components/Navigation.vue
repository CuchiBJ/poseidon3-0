<template>
  <div>
    <v-toolbar class="menu"
      dense
      flat
      prominent
    >
      <v-toolbar-items v-show='!isLogedIn'>
        <v-list-item
          v-for="route in public_list"
          :key="route.route">
          <NuxtLink class="white--text no-deco" :to="route.route"> {{route.name}} </NuxtLink>
        </v-list-item>
      </v-toolbar-items>

      <v-toolbar-items v-show='isAdmin'>
        <v-list-item
          v-for="route in admin_list"
          :key="route.route">
          <NuxtLink class="white--text no-deco" :to="route.route"> {{route.name}} </NuxtLink>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-btn v-show="isLogedIn" icon @click="logout()">
          Logout
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-show='isLogedIn && !isAdmin'>
        <v-list-item
          v-for="route in client_list"
          :key="route.route">
          <NuxtLink class="white--text no-deco" :to="route.route"> {{route.name}} </NuxtLink>
        </v-list-item>
        <v-btn v-show="isLogedIn" icon @click="logout()">
            Logout
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template> 

<script>
import Cookie from "js-cookie";
import { auth } from '@/services/firebase.js'
export default {
  name: "NavBar",
  data() {
    return {
      admin_list:[
        {name:"Inicio", route: "/admin"},
        {name:"Productos", route: "/admin/products"},
        {name:"Ventas", route: "/admin/sales"},
        {name:"Compras", route: "/admin/buys"},
        {name:"Clientes", route: "/admin/clients"},
        {name:"Proveedores", route: "/admin/suppliers"}
      ],
      client_list:[
        {name:"inicio", route: "/"},
        {name:"Nosotros", route: "/about"},
        {name:"Catalogo", route: "/catalogue"},
        {name:"Mis compras", route: "/client/buy"},
        {name:"Carrito", route: "/client/cart"}
      ],
      public_list:[
        {name:"inicio", route: "/"},
        {name:"Nosotros", route: "/about"},
        {name:"Catalogo", route: "/catalogue"},
        {name:"Iniciar sesion", route: "/login"}
      ],
      user: {
        rol:''
      },
    }
  },
  components: {
  },
  computed:{
    isLogedIn(){
      if (this.$store.state.users.user == null) {
        return false
      } else {
        return true;
      }
    },
    isAdmin(){
      if (this.$store.state.users.user == null) {
        return false
      } else {
        return this.$store.state.users.user.rol == "admin";
      }    
    }
  },
  methods: {
    async logout() {
      await auth.signOut();
      await Cookie.remove("access_token");
      location.href = "/";
    }
  }
};
</script>

<style>
  .no-deco{
    text-decoration: none;
  }
  .menu{
    background-image: linear-gradient(to right,#4158D0 0%,#C850C0 50%, #FFCC70 100%);
  }
</style>