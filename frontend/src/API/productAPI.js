import axios from "axios"


export function getAllProducts(page, category, search, sort, nameSort) {
   console.log("....>>>", page, category, search, sort, nameSort)
   return axios.get(`${process.env.REACT_APP_API_URL}/products?page=${page}&category=${category}&search=${search}&sort=${sort}&nameSort=${nameSort}`)
}

export function createProduct(data) {
   console.log(data);
   return axios.post(`${process.env.REACT_APP_API_URL}/products/`, {
      name: data.name,
      categoryId: data.categoryId,
      imageURL: data.imageURL,
      price: data.price,
      status: data.status
   })
}

export function getAllProductsWithCategory() {
   return axios.get(`${process.env.REACT_APP_API_URL}/products/category`)
}

export function deleteProduct(productId) {
   return axios.delete(`${process.env.REACT_APP_API_URL}/products/${productId}`)
}

export function editProduct(data) {
   return axios.put(`${process.env.REACT_APP_API_URL}/products/${data.id}`,
      {
         name: data.name,
         categoryId: data.categoryId,
         imageURL: data.imageURL,
         price: data.price,
         status: data.status
      },
      {
         headers: {
            authorization: 'Bearer ' + data.token
         }
      }
   )

}
