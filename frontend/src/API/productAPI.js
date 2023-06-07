import axios from "axios"

export function getAllProducts(page, category, search, sort, nameSort) {
   return axios.get(`${process.env.REACT_APP_API_URL}/products?page=${page}&category=${category}&search=${search}&sort=${sort}&nameSort${nameSort}`)
}
