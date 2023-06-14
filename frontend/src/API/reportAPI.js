import axios from "axios";

export function getReport(startDate, endDate) {
    return axios.get(process.env.REACT_APP_API_URL +
        `/report?startDate=${startDate}&endDate=${endDate}`);
}

export function getOrderList() {
    return axios.get(process.env.REACT_APP_API_URL + `/report/orderlists`);
}
