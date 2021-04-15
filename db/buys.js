//import { UsuarioCollection} from '@/firebase.js';
import {Buy} from '../model/buy.js'

export default {
  getBuys(){
    let buys = [];
    buys.push(new Buy(1, "firstName1" ,"lastName1", "address1"));
    buys.push(new Buy(2, "firstName2" ,"lastName2", "address2"));
    return buys;
  },
  createbuy(){
    
  },
  updatebuy(){
    
  },
  deletebuy(){
    
  }
}