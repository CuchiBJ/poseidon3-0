import {Variant} from './variant.js'

export class Product {

  constructor(id, description, brand, name, supplier, sizes, colors, categories, price){
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

}