import axios from "axios"

export function getAllCategory() {
   return axios.get(`${process.env.REACT_APP_API_URL}/categories`)
}

export function modifyCategory(data) {
   return axios.put(`${process.env.REACT_APP_API_URL}/categories/${data.categoryId}`, {
      name: data.name
   })
}

export function addCategory(data) {
   return axios.post(`${process.env.REACT_APP_API_URL}/categories/`, {
      name: data
   })
}
