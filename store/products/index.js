import productDb from '@/db/products.js'

export const state = () => ({
  products: []
});

export const mutations = {
  saveProducts: (state, products) =>{
    state.products = products;
  },
  loadProduct: async (state, product) =>{
    let res = await productDb.createProduct(product)
    if (res != null){
      state.products.push(product)
    }
  }
}
 
export const actions = {
  

}