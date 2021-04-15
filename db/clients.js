//import { UsuarioCollection} from '@/firebase.js';
import {Client} from '../model/client.js'

export default {
  getClients(){
    let clients = [];
    clients.push(new Client(1, "firstName1" ,"lastName1", "address1", "dni1", "phone1"));
    clients.push(new Client(2, "firstName2" ,"lastName2", "address2", "dni2", "phone2"));
    return clients;
  },
  createClient(){
    
  },
  updateClient(){
    
  },
  deleteClient(){
    
  }
}