import axios from "axios"

export function login(userName, password) {
   
   return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,
      {
         userName: userName,
         password: password
      })
}
