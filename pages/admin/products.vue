<template>
  <v-container :fluid="true" class="fill-height">
    <v-row class="fill-height">
      <v-col cols="2">
        <Filtros />
      </v-col>
      <v-divider inset vertical> </v-divider>
      <v-col cols="8">
        <v-data-table 
          v-model="selected"
          :headers="headers" :items="products"
          sort-by="name" 
          class="elevation-1" 
          show-select 
          dark
          :options.sync="pagination"
          v-on:pagination="handlePagination()"
          v-on:item-selected="handleSelection()"
          v-on:toggle-select-all="handleSelection()">
          <template v-slot:top>
            <v-toolbar flat class="tenloFondo">
              <v-toolbar-title class="text--primary font-weight-medium">Productos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog dark v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="orange" class="mb-2" v-on="on"><v-icon color="black">mdi-plus</v-icon></v-btn>
                </template>
                <v-card>
                  <v-card-title class="justify-space-around">
                    <span> Producto </span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form ref="form" v-model="valid">
                        <v-row>
                          <v-col>
                            <v-text-field v-model="editedItem.name" label="Producto" :rules="rules" required></v-text-field>
                            <v-text-field v-model="editedItem.brand" label="Marca" :rules="rules" required></v-text-field>
                            <v-text-field v-model="editedItem.description" label="Descripcion" :rules="rules" required></v-text-field>
                            <v-text-field v-model="editedItem.price" label="Precio" :rules="rules" required></v-text-field>
                            <v-text-field v-model="editedItem.supplier" label="proveedor" :rules="rules" required></v-text-field>
                            
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn :disabled="!valid" color="blue darken-1" text @click="save">Cargar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="ver(item)" class="mr-4" dark>mdi-eye</v-icon>
            <v-icon small @click="editItem(item)" class="mr-4" dark>mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)" class="mr-4" dark>mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="2">
        otra fila
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { productsCollection } from '@/services/firebase.js'
import {Product} from '../../model/product.js'
import {Variant} from '../../model/variant.js'

import Filtros from '@/components/Filtros.vue'

export default {
  name: "AdminProducts",
  data() {
    return {
      headers: [
        {text: "Producto", align: "start", value: "name"},
        {text: "Marca", align: "start", value: "brand"},
        {text: "Descripcion", align: "start", value: "description"},
        {text: "Precio", align: "start", value: "price"},
        {text: "Proveedro", align: "start", value: "supplier"},
        {text: "Acciones", value: "actions", sortable: false}
      ],
      selected:[],
      page:2,
      pagination:{
        page: 1,
        itemsPerPage: 10
      },
      rules: [(v) => !!v || "campo es requerido"],
      editedIndex: -1,
      editedItem: new Product({}),
      defaultItem: new Product({}),
      valid: false,
      dialog: false
    };
  },
  components: {
    Filtros
  },
  async asyncData ({ app, store }) {
    return await Product.getProducts({limit: 20})
  },
  methods:{
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign(new Product({}), item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign(new Product({}), this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      this.$nuxt.$loading.start()
      if (this.editedIndex > -1) {
        await Product.updateProduct(this.editedItem)
        .then(() => {
          Object.assign(this.products[this.editedIndex], this.editedItem);
          this.$store.commit('activeSnack', 'El producto se actualizo correctamente')
        })
        .catch(() => {
          this.$store.commit('activeSnack', 'Se produjo un error al actualizar el producto, Intente nuevamente')
        });
      } else { 
        await Product.addProduct(this.editedItem)
        .then((product) => {
          this.products.push(product);
          this.$store.commit('activeSnack', 'El producto se registro correctamente')
        })
        .catch(() => {
          this.$store.commit('activeSnack', 'Se produjo un error al cargar el producto, Intente nuevamente')
        });
      }
      this.$nuxt.$loading.finish()
      this.close();
    },
    async deleteItem(item) {
      const index = this.products.indexOf(item); // Se queda con el index para luego, en caso de desearlo, eliminar el producto de la tabla.
      let result = confirm(`Seguro que quiere Eliminar el producto ${item.name} ?`);
      if (result == true) {
        await Product.deleteProduct(item)
        .then(() => {
          this.products.splice(index, 1);
          this.$store.commit('activeSnack', 'El producto se elimino correctamente')
        })
        .catch(() => {
          this.$store.commit('activeSnack', 'Se produjo un error al eliminar el producto, Intente nuevamente')
        });
      }
    },
    async next(){
      let auxproducts = await Product.getNext({limit: 10})

      if(!auxproducts) return

      auxproducts.forEach((prod) => {
        this.products.push(prod); 
      })
    },
    handlePagination(){
      if (this.pagination.page == this.page) {
        this.next()
        this.page = this.pagination.page + 1  
      }
    },
    handleSelection(){
      this.$nextTick(() => {
        console.log(this.selected)
      })
    }
  }
};
</script>

<style scoped>
.search {
  max-width: 60%;
}
</style>