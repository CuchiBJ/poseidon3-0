<template>
  <v-container :fluid="true" class="fill-height py-3">
    <v-row class="fill-height">
      <v-col cols="3 op">
          <h1 class="display-1">Filtros</h1>
          <filtros></filtros>
      </v-col>
      <v-col cols="9">
        <h1 class="display-1">Catálogo</h1> 
        <ProductSlider :products="auxproducts" :lastFirst="last" :query="query" sliderName="Las ofertas" />
        <ProductSlider :products="auxproducts" :lastFirst="last" :query="query" sliderName="Las nuevas del invierno" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { productsCollection } from '@/services/firebase.js'
import {Product} from '@/model/product.js'
import {Variant} from '@/model/variant.js'

import ProductSlider from '@/components/productSlider'
import filtros from '@/components/Filtros'
export default {
  name: "catalogue",
  data() {
    return {
      
    };
  },
  components: { ProductSlider, filtros},
  async asyncData ({ app, store }) {
    const query = productsCollection.limit(2)
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
.op{
  background-color: rgba(0, 0, 0, 0.2);;
}
</style>