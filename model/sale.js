export class Sale {

  constructor(id, client, date,subtotal, total, products, pay, typepay, quantity){
    this.id = id;
    this.date = date;
    this.subtotal= subtotal;
    this.total = total;
    this.client = client;
    this.products = products;
    this.pay = pay;
    this.typepay = typepay;
    this.quantity = quantity;
  }

}