import {Variant} from './variant.js'
import { productsCollection } from '@/services/firebase.js'

export class Product {


  static last = null

  constructor({id= -1, description= "", brand= "", name= "", supplier= "", sizes= [], colors= [], categories= [], price= 0}){
    this.id = id;
    this.description = description;
    this.brand = brand;
    this.name = name;
    this.supplier = supplier;
    this.sizes = sizes;
    this.colors = colors;
    this.price = price;
    this.categories = categories;
    this.variants = [{
      id: "",
      price: "",
      buyPrice: "",
      color: "",
      size: "",
      quantity: ""
    }]
  }

  setVariant(variant){
    this.variants.push(variant);
  }

  createVariant(id,price,buyPrice,color,size,quantity){
    let variant = new Variant(id,price,buyPrice,color,size,quantity);
    this.setVariant(variant); 
  }

  makeVariants(){
    this.variants = [];
    let cont = 1;
    this.sizes.forEach(size => {
      this.colors.forEach(color => {
        this.createVariant("var"+cont, 0, 0, color, size, 0);
        cont++;
      });
    });
  }

  haveColor(color){
    this.colors.includes(color);
  }

  deleteColor(color){
    this.colors.splice(this.colors.indexOf(color));
  } 

  addColor(color){
    this.colors.push(color);
  }

  static async getProducts({limit = 10}){
    const query = productsCollection.limit(limit)
    try {
      let products = await query
      .get()
      .then((querySnapshot) => {
        let products = []
        querySnapshot.forEach((doc) => {
          products.push(new Product(
            { id: doc.id, description: doc.data().description, brand: doc.data().brand, name: doc.data().name, supplier: doc.data().supplier, sizes: doc.data().sizes, colors: doc.data().colors, categories: doc.data().categories, price: doc.data().price}
          ));
        });
        this.last = querySnapshot.docs[querySnapshot.docs.length - 1]
        return { products }
      })
      return products       
    } catch (error) {
      return {error}
    } 
  }

  static async getNext({limit = 10}){
    if (!this.last) return
    try {
      let products = await productsCollection
      .limit(limit)
      .startAfter(this.last)
      .get()
      .then((querySnapshot) => {
        let products = []
        querySnapshot.forEach((doc) => {
          products.push(new Product(
            {id: doc.id, description: doc.data().description, brand: doc.data().brand, name: doc.data().name, supplier: doc.data().supplier, sizes: doc.data().sizes, colors: doc.data().colors, categories: doc.data().categories, price: doc.data().price}
          ));
        });
        this.last = querySnapshot.docs[querySnapshot.docs.length - 1]
        return products
      }) 
      return products      
    } catch (error) {
      console.log(error)
    }
  }

  static async addProduct(product){
    product = await productsCollection.add(product)
    .then((data) => {
      product.id = data.id
      return product
    })
    .catch((error) => {
      throw error
    });
    return product
  }

  static async updateProduct(product){
    await productsCollection.doc(product.id).update({
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      supplier: product.supplier,
      categories: [],
      sizes:[],
      colors:[]
    })
    .then(() => {
      return product
    })
    .catch((error) => {
      throw error
    });
  }

  static async deleteProduct(product){
    await productsCollection.doc(product.id)
    .delete()
    .then(() => {
      return 1
    })
    .catch((error) => {
      throw error
    });
  }

}