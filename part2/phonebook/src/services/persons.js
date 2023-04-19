import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)

    // return axios.get(baseUrl)
}

const create = newObject => {
    const req = axios.post(baseUrl, newObject);
    return req.then(res => res.data)

    // return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)

    // return axios.put(`${baseUrl}/${id}`, newObject)
}


const personsHandlers = {
    getAll,
    create,
    update
}

export default personsHandlers