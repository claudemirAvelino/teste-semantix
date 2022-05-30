'use strict'
const xml2js = require('xml2js');
const { getAllUsers, getAddressById, getContactById } = require('../services/semantix-service');

class Main {
    constructor() {
    }

    start() {
        let users = new Array;

         const getAll = (page) => {
             getAllUsers(page).then( ({ data })  => {
                xml2js.parseString(data, async (err, result) => {
                    if(err) {
                        throw err;
                    }
                    const foundUsers = result?.data?.usersList[0]?.item
                    if(foundUsers.length > 0){
                        for await (let [index, user] of foundUsers.entries()){
                            let address;
                            const { id,  firstName, lastName, email } = user;
                            console.log('users', index, id, firstName)

                            try {
                                const { data: dataAddress } = await getAddressById(id)
                                xml2js.parseString(dataAddress, (errAddress, resultAddress) => {
                                    address = resultAddress.data.item.find(address => address.id == id.toString())
                                })
                            }catch (err) {
                                console.log('erro getAddress', err.message)
                            }

                            user = {
                                fullName: `${firstName[0]} ${lastName[0]}`,
                                email: email[0],
                                address: address?.street[0],
                                addressNumber: address?.number[0]._,
                                phoneNumber: ''
                            }

                            try {
                                const { data: dataContact } = await getContactById(id);
                                xml2js.parseString(dataContact, (errContatc, resultContact) => {
                                    user.phoneNumber = resultContact.data.item[0].phoneNumber[0]
                                })
                            }catch (err) {
                                console.log('erro getContatc', err)
                            }

                            if( (index + 1) === foundUsers.length){
                                getAll(page + 1);
                            }

                            users.push(user);
                        }
                        console.log('QUANTIDADE DE USUÁRIOS', users.length)
                    }

                });

            }).catch((error) => {
                if(error?.response?.status === 429){
                    console.error('getAllUsers falta esse tempo para executar novamente', error.response.data.retryAfter);
                }
            })
         }
         getAll(1);
    }
}

module.exports = new Main();
