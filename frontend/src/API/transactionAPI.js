import axios from "axios";

export function postInvoice(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/transactions/invoices`, data)
}

export function postSale(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/transactions/sales`, {data: data})
}
