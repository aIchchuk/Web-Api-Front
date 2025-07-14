import axios from "axios";

class AuthService {
    static async login(email, password) {

          const res = await axios.post('http://localhost:5000/auth/login', { email, password });
          return res;
    }
}

export {AuthService}