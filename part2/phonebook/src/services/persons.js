import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newEntry) => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const personService = { getAll, create }

export default personService;