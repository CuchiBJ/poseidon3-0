<template>
  <v-app class="back">
    <Nav></Nav>
    <v-main>
      <v-container :fluid="true">
        <nuxt />
        
      </v-container>
    </v-main>
    <v-snackbar v-model="snackActivator" timeout="4000" top>
      {{ $store.state.snackText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Nav from "@/components/Navigation";
export default {
  data() {
    return {
      snackVal: false
    };
  },
  components: {
    Nav,
  },
  computed:{
    snackActivator:{
      get: function () {
        return this.$store.state.snackBar
      },
      set: function () {
        this.$store.commit("deactiveSnack")
      }
      
    }
  },
  watch:{

  }

};
</script>

<style scoped>
.back {
  background-color: #4158d0;
  background-image: linear-gradient(
    31deg,
    #4158d0 0%,
    #c850c0 54%,
    #ffcc70 100%
  );
}
</style>