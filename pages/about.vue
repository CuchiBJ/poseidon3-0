<template>
  <v-container :fluid="true" class="fill-height py-3">
    <v-row>
      <v-col cols="3">
        <h1>Nosotros</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-img src="@/assets/Koala.jpg"></v-img>
      </v-col>
      <v-col cols="4">
        <p>
          What is Lorem Ipsum?
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "about",
  data() {
    return {
      
    };
  },
  components: {},
  
  methods:{
    
  }
};
</script>

<style scoped>

</style>