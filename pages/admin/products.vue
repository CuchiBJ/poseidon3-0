<template>
  <v-container :fluid="true" class="fill-height">
    <v-row class="fill-height">
      <v-col cols="2">
        <Filtros />
      </v-col>
      <v-divider inset vertical> </v-divider>
      <v-col cols="8">
        <v-data-table 
          :headers="headers" :items="products"
          sort-by="name" 
          class="elevation-1" 
          show-select 
          dark>
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
      <v-col>
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
      rules: [(v) => !!v || "campo es requerido"],
      editedIndex: -1,
      editedItem: {id: -1, name: "", description: "", precio: 0, brand: ""},
      defaultItem: {id: -1, name: "", description: "", precio: 0, brand: ""},
      valid: false,
      dialog: false
    };
  },
  components: {Filtros},
  async asyncData ({ app, store }) {
    const query = productsCollection.limit(10)
    try {
      let products = await query
      .get()
      .then((querySnapshot) => {
        let products = []
        querySnapshot.forEach((doc) => {
          products.push(new Product(
            doc.id, doc.data().description, doc.data().brand, doc.data().name, doc.data().supplier, doc.data().sizes, doc.data().colors, doc.data().categories
          ));
        });
        let last = querySnapshot.docs[querySnapshot.docs.length - 1]
        return { products,  last, query}
      })
      return products       
    } catch (error) {
      return {error}
    } 
  },
  methods:{
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      this.$nuxt.$loading.start()
      if (this.editedIndex > -1) {
        await productsCollection.doc(this.editedItem.id).update({
          name: this.editedItem.name,
          brand: this.editedItem.brand,
          description: this.editedItem.description,
          price: this.editedItem.precio,
          supplier: this.editedItem.supplier
        })
        .then(() => {
          Object.assign(this.products[this.editedIndex], this.editedItem);
          this.$store.commit('activeSnack', 'El producto se actualizo correctamente')
        })
        .catch(() => {
          this.$store.commit('activeSnack', 'Se produjo un error al actualizar el producto, Intente nuevamente')
        });
      } else { 
          await productsCollection.add(this.editedItem)
          .then((data) => {
            this.editedItem.docId = data.id
            this.products.push(this.editedItem);
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
      this.$store.commit('activateLoading')
      const index = this.products.indexOf(item); // Se queda con el index para luego, en caso de desearlo, eliminar el producto de la tabla.
      var result = confirm(`Seguro que quiere Eliminar el producto ${item.nombre} de ${item.marca} ${item.modelo} ?`);
      if (result == true) {
        await productSer.deleteProducto(item)
        .then(() => {
          this.products.splice(index, 1);
          this.$store.commit('activeSnack', 'El producto se elimino correctamente')
        })
        .catch(() => {
          this.$store.commit('activeSnack', 'Se produjo un error al eliminar el producto, Intente nuevamente')
        });
      }
      this.$store.commit('deactivateLoading')
    }
  }
};
</script>

<style scoped>
.search {
  max-width: 60%;
}
</style>