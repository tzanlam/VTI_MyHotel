import api from "../config/axios";

const AuthService = {
   login(email, password){
      return api.post(`login?email=${email}&password=${password}`)
   }
}
export default AuthService;