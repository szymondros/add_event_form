import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertEvent = payload => api.post('/event', payload)

const apis = {
    insertEvent,
}

export default apis;