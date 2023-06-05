import axios from "axios"

export function getAllProducts(page) {
   return axios.get(`${process.env.REACT_APP_API_URL}/products?page=${page}`)

}