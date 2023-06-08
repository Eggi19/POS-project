import axios from "axios"

export function login() {
   return axios.get(`${process.env.REACT_APP_API_URL}/auth`)
}
