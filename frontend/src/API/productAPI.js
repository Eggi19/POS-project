import axios from "axios"

export function getAllProducts() {
   return axios.get(`${process.env.REACT_APP_API_URL}/produts`)
    
}