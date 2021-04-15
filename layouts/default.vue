<template>
  <v-app class="back">
    <Nav></Nav>
    <v-main>
      <v-container :fluid="true">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Nav from "@/components/Navigation";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  components: {
    Nav,
  },
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