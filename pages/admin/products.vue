<template>
  <v-container :fluid="true" class="fill-height">
    <v-row class="fill-height">
      <v-col cols="3">
          <v-text-field
            @focus="searchClosed = false"
            @blur="searchClosed = true"
            class="search"
            :class="{ closed: searchClosed }"
            filled
            dense
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
          >
          </v-text-field>
          <v-btn elevation="2" large>Filtrar
            <v-icon>mdi-filter</v-icon>
          </v-btn>
          <v-checkbox v-model="checkbox1" :label="`Oferta`"></v-checkbox>
          <v-checkbox v-model="checkbox2" :label="`Colores`"></v-checkbox>
        
      </v-col>
      <v-divider inset vertical> </v-divider>
      <v-col cols="9">
        Productos
        <div style="position: absolute; right: 4%; top: 13%; display: block">
          <router-link to="/addProducto"> Agregar producto </router-link>
        </div>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
import { productsCollection } from '@/services/firebase.js'
import {Product} from '../../model/product.js'
import {Variant} from '../../model/variant.js'

import ProductSlider from '@/components/productSlider'

export default {
  name: "products",
  data() {
    return {
      model: null,
      searchClosed: true,
      user: null,
      checkbox1: false,
      checkbox2: false
    };
  },
  components: { ProductSlider },
  async asyncData ({ app, store }) {
    const query = productsCollection.limit(10)
    try {
      let products = await query
      .get()
      .then((querySnapshot) => {
        let auxproducts = []
        querySnapshot.forEach((doc) => {
          auxproducts.push(new Product(
            doc.id, doc.data().description, doc.data().brand, doc.data().name, doc.data().supplier, doc.data().sizes, doc.data().colors, doc.data().categories
          ));
        });
        let last = querySnapshot.docs[querySnapshot.docs.length - 1]
        return { auxproducts,  last, query}
      })
      return products       
    } catch (error) {
      return {error}
    } 
  },
  methods:{
  }
};
</script>

<style scoped>
.search {
  max-width: 60%;
}
</style>