import {Product} from '../model/product.js'
import {Variant} from '../model/variant.js'

export default {
  async getProducts(){ 
    let products = [];
    products = await this.$firebase.firestore().collection('products')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          products.push(new Product(
            doc.id, doc.data().description, doc.data().brand, doc.data().name, doc.data().supplier, doc.data().sizes, doc.data().colors, doc.data().categories
          ));
        });
        return products;
      })
      .catch((error) => {
        console.log("Error getting products: ", error);
        return products;
      });
    console.log(products);
    return products; 
  },
  async getVariants(prodId){
    let variants = [];
    variants = await this.$firebase.db.collection('products')
      .doc(prodId).collection("variants")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          variants.push(new Variant(doc.id, doc.data().price, doc.data().buyPrice, doc.data().color, doc.data().size, doc.data().quantity));
        });
        return variants;
      })
      .catch((error) => {
        console.log("Error getting variants: ", error);
        return variants;
      });
    return variants; 
  },
  async createProduct(product){
    await this.$firebase.db.collection('products').add({
      description : product.description,
      brand : product.brand,
      name : product.name,
      supplier : product.supplier,
      sizes : product.sizes,
      colors : product.colors,
      categories : product.categories
    })
    .then(async (docRef) => {
      /* if (producto.imagen){
        await storageRef.ref(`productos/${docRef.id}`)
        .put(producto.imagen)
        .then((response) => {
          console.log("Image successfully stored!");
          response.ref.getDownloadURL()
          .then((downloadURL) => {
            producto.imagen = downloadURL;
            })       
        }); */
        console.log("producto cargado")
        product.id = docRef.id;
      /* } */
    })
    .catch((error) => {
      console.error("no se cargo el producto: ", error);
    });
    console.log(product)
    return product
  },
  updateProduct(){
    
  },
  deleteProduct(){
    
  } 
}