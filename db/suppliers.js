//import { UsuarioCollection} from '@/firebase.js';
import {Supplier} from '../model/supplier.js'

export default {
  getSuppliers(){
    let suppliers = [];
    suppliers.push(new Supplier(1, "firstName1" ,"lastName1", "address1", "dni1", "phone1"));
    suppliers.push(new Supplier(2, "firstName2" ,"lastName2", "address2", "dni2", "phone2"));
    return suppliers;
  },
  createsupplier(){
    
  },
  updatesupplier(){
    
  },
  deletesupplier(){
    
  }
}