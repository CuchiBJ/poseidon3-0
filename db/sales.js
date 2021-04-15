//import { UsuarioCollection} from '@/firebase.js';
import {Sale} from '../model/sale.js'

export default {
  getSales(){
    let sales = [];
    sales.push(new Sale(1,"Juan Antonio Pizzi", "23/3/2021", 1800, "$1800", [{id: 1, name: "Remera", quantity: 1, price: 800}, {id: 1, name: "Jean", quantity: 2, price:1800}], "Pago total", "Efectivo"));
    sales.push(new Sale(2, "Jorgito Moliniers", "20/3/2021", 800, "$800", [{id: 1, name: "Remera", quantity: 1, price: 800}, {id: 1, name: "Jean", quantity: 2, price:1800}], "Pago parcial", "Debito"));
    return sales;
  },
  createsale(){
    
  },
  updatesale(){
    
  },
  deletesale(){
    
  }
}