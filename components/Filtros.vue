<template>
  <div>
    <v-text-field
      label="Producto"
      placeholder="Producto"
      background-color="white"
    >
      <template v-slot:label="{ producto }">
        <h1>{{ producto }}</h1>
      </template>
    </v-text-field>
    <v-select
      v-model="select"
      :hint="`${select.state}`"
      :items="items"
      item-text="state"
      label="Marca"
      persistent-hint
      return-object
      single-line
    ></v-select>
    <v-select
      v-model="select1"
      :hint="`${select1.state}`"
      :items="items1"
      item-text="state"
      label="Categoria"
      persistent-hint
      return-object
      single-line
    ></v-select>
    <v-list
      class="list-group-item ml-1"
      v-for="color in colors"
      :key="color.color"
    >
      <v-checkbox
        :color="color.color"
        class="form-check-input me-1"
        type="checkbox"
        value=""
        :label="color.name"
        aria-label="..."
      />
    </v-list>
  </div>
</template>  


<script>
export default {
  name: "filtros",
  data() {
    return {
      producto: "productos",
      select: { state: "Marca" },
      items: [{ state: "Marca1" }, { state: "Marca2" }, { state: "Marca3" }],
      select1: { state: "Categoria" },
      items1: [{ state: "Invierno" }, { state: "Verano" }, { state: "Polar" }],
      colors:[
          {color: "green", name:"verde"}, {color:"red", name: "rojo"}
      ]
    };
  },
};
</script>