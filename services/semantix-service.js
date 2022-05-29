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

const request = async (options) => {
    await delay(2000)
    return axios.request(options);
}

const getAllUsers = (page) => {
    const options = getOptions('https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/users', {limit: '10', page})

    return request(options)
}

const getAddressById = (id) => {
    const options = getOptions(`https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/users/${id}/address`)
    return request(options);
}

const getContactById = (id) => {
    const options = getOptions(`https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/users/${id}/contacts`)
    return request(options);
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
