import axios from "axios"

export function getAllCategory() {
   return axios.get(`${process.env.REACT_APP_API_URL}/category`)
}

export function modifyCategory(data) {
   return axios.put(`${process.env.REACT_APP_API_URL}/category/${data.categoryId}`, {
      name: data.name
   })
}
