<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="elevation-12" dark>
        <v-toolbar flat>
          <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
          <v-spacer/> 
        </v-toolbar>
        <v-card-text align="center" justify="center">
          <NuxtLink to="/">
            <v-img class="mb-2"  max-height="300" max-width="200" ></v-img>
          </NuxtLink>
          <v-form @submit.prevent="login()" v-model="valid">
            <v-text-field label="E-mail" name="login" type="email" :rules="emailRules" v-model="account.email" />
            <v-text-field label="Contraseña" name="password" type="password" :rules="passwordRules" v-model="account.password" />
            <div class="d-flex flex-row-reverse">
              <v-btn class="tenloFondo" type="submit">Login</v-btn>
            </div>
            <div v-if="isError" class="alert alert-danger">
              <p class="mb-0">{{ errMsg }}</p>
            </div>
          </v-form>
          <v-divider></v-divider>
          <NuxtLink to="/"><span>Tengo una invitacion</span></NuxtLink>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'


export default {
  name: "Login",
  data() {
    return {
      account:{
        email: "",
        password: "",
      },
      emailRules: [
        v => !!v || "E-mail es requerido",
        v => /.+@.+\..+/.test(v) || "E-mail debe ser valido"
      ],
      passwordRules: [
        v => !!v || "contraseña es requerida",
        v => (v && v.length >= 4) || 'La contraseña debe tener al menos 8 caracteres'],
      valid: false,
      isError: false,
      errMsg: ""
    };
  },
  methods: {
    login() {
      // TODO: add parsing of data.
      this.$store
        .dispatch("users/login", this.account)
        .then(() => {
          this.$router.push("/admin");
        })
        .catch(error => {
          this.isError = true;
          this.errMsg = error.code;
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        });
    }
  },
  components: {
    Logo,
    VuetifyLogo
  },
  created(){

  }
}
</script>