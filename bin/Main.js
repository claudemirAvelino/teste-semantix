'use strict'
const xml2js = require('xml2js');
const { getAllUsers, getAddressById, getContactById } = require('../services/semantix-service');

class Main {
    constructor() {
    }

    start() {
        let users;

         getAllUsers(1).then(({ data })  => {
            xml2js.parseString(data, (err, result) => {
                if(err) {
                    throw err;
                }
                const foundUsers = result?.data?.usersList[0]?.item
                if(foundUsers.length > 0){
                    const usersRequested = foundUsers?.map(async ({ id, firstName, lastName, email }) => {
                        let user = {
                            fullName: `${firstName[0]} ${lastName[0]}`,
                            email: email[0],
                            address: '',
                            addressNumber: null,
                            phoneNumber: ''
                        }

                        getAddressById(id).then( ({ data: dataAddress }) => {
                            //console.log('dataAddress', dataAddress)
                            xml2js.parseString(dataAddress, (errAddress, resultAddress) => {
                                const address = resultAddress.data.item.find(address => address.id == id.toString())
                                user.address = address.street[0];
                                user.addressNumber = address.number[0]._;

                                getContactById(id).then(({ data: dataContact }) => {
                                    xml2js.parseString(dataContact, (errContatc, resultContact) => {
                                        user.phoneNumber = resultContact.data.item[0].phoneNumber[0]
                                    })

                                    console.log('USER', user)

                                    return user;
                                }).catch(err => {
                                    console.log('erro getContactById', err)
                                    if(err.response.status === 429){
                                        err.response.data.retryAfter
                                    }
                                })
                            })
                        }).catch(err => {
                            if(err.response.status === 429){
                                err.response.data.retryAfter
                            }
                            console.log('erro getAddresById', err)
                        })
                    })
                    users.push(...usersRequested);
                    getAllUsers(2)
                }
            });
            //console.log('users', usersJson)

        }).catch((error) => {
            if(error?.response?.status === 429){
                error.response.data.retryAfter
            }
            console.error('getAllUsers', error);
        });
    }
}

module.exports = new Main();
