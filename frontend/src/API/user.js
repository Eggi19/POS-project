import axios from "axios"

export function registerUser(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}}/users/`, {
        userName: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role
    })
}
