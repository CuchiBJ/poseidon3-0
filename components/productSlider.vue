<template>
  <v-container :fluid="true" class=" py-3">
    <v-row >
      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <h1 class="display-1 text-center mt-10">{{ sliderName }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-sheet class="mx-auto" elevation="8" max-width="90%">
              <v-slide-group
                class="pa-4"
                active-class="success"
                show-arrows
                v-on:click:next="next"
              >
                <v-slide-item
                  v-for="product in products"
                  :key="product.id"
                  v-slot="{ active, toggle }"
                >
                  <nuxt-link
                    :to="{ name: 'admin-product-id', params: { id: product.id } }"
                  >
                    <v-card
                      :color="active ? undefined : 'white lighten-1'"
                      class="ma-4"
                      height="300"
                      width="200"
                      @click="toggle"
                    >
                      <v-img
                        height="150"
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                        ><v-btn class="ml-1" elevation="2" right x-small>
                          <v-icon>mdi-cart-arrow-down</v-icon>
                        </v-btn>
                      </v-img>

                      <v-card-title class="d-flex flex-column">
                        <p class="font-weight-light text-center">
                          {{ product.name }}
                        </p>
                        <p class="font-weight-light text-center">$</p>
                      </v-card-title>
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-scale-transition>
                          <v-icon
                            v-if="active"
                            color="white"
                            size="48"
                            v-text="'mdi-close-circle-outline'"
                          ></v-icon>
                        </v-scale-transition>
                      </v-row>
                    </v-card>
                  </nuxt-link>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { productsCollection } from '@/services/firebase.js'
import {Product} from '../model/product.js'
import {Variant} from '../model/variant.js'

export default {
  name: "productsSlider",
  props:{
    products: null,
    lastFirst: null,
    query: null,
    sliderName: ""
  },
  data() {
    return {
      last: null,
      first: true
    };
  },
  methods:{
    async next(){
      if (this.first) {
        this.last = this.lastFirst
        this.first = false
      }
      let auxproducts
      try {
        auxproducts = await this.query
        .startAfter(this.last)
        .get()
        .then((querySnapshot) => {
          return querySnapshot
        })      
      } catch (error) {
        console.log(error)
      }
      auxproducts.forEach((doc) => {
        this.products.push(new Product(
          doc.id, doc.data().description, doc.data().brand, doc.data().name, doc.data().supplier, doc.data().sizes, doc.data().colors, doc.data().categories
        )); 
      })
      this.last = auxproducts.docs[auxproducts.docs.length - 1]
    }
  }
};
</script>

<style scoped>
</style>