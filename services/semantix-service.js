const axios = require('axios');

const getOptions = (url, params = {}) => {
    return {
        method: 'GET',
        url,
        params,
        headers: {
            Authorization: 'Basic MTdiMjcxZjItMmM3Ni00MjQwLWEwZDctNDZmNTdlOTE5Y2EzOjc0MWQ1ZGI5LWM1OTYtNDFiNC04Nzg1LTFkNTAzNjcyMjRjOA=='
        }
    }
}

const request = async (options, request) => {
    await delay(2000)
    var date = new Date()
    console.log('tá fazendo request', date.getSeconds(), request)
    return axios.request(options);
}

const getAllUsers = (page) => {
    const options = getOptions('https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/users', {limit: '5', page})

    return request(options, 'getAllUsers')
}

const getAddressById = async (id) => {
    const options = getOptions(`https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/users/${id}/address`)
    return request(options, 'getAddressById');
}

const getContactById = async (id) => {
    const options = getOptions(`https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/users/${id}/contacts`)
    console.log('getContactById e o id', id)
    return request(options, 'getContactById');
}

const delay = async (delay = 1000) => {
    const delayPromise = ms => new Promise(res => setTimeout(res, ms))
    await delayPromise(delay)
}

module.exports = {
    getAllUsers,
    getAddressById,
    getContactById
}
