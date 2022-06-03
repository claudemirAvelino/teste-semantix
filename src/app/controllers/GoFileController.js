// import Queue from '../lib/Queue'
const axios = require("axios").default;
import { save as saveFolder, find as findFolder } from '../../database/model/Folder';
import { save as saveFile, find as findFile } from '../../database/model/File';
//const FormData = require('form-data');

const fs = require('fs');
const request = require('request');


export default {
    async store(req, res) {
        const { folderName } = req.params;
        const folder = {
            parentFolderId: '4deeddb4-82bb-4277-a264-36f1d2f84f87',
            folderName,
            token: "n4aXg66Jrz3u5NjD6m8eQ7uVY2ZddPnx"
        }

        const options = {
            method: 'PUT',
            url: 'https://api.gofile.io/createFolder',
            headers: {'Content-Type': 'application/json'},
            data: folder
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            const folderSettings = {
                id: response.data.data.id,
                name: response.data.data.name
            }
            saveFolder(folderSettings)
            return res.json(response.data)
        }).catch(function (error) {
            console.error(error);
        });

        console.log('folder name', folderName)
    },

    async uploadFile(req, res) {
        const param = req.file;
        const { folderName } = req.body;
        const folder = await findFolder(folderName);
        console.log('folder', folder)

        if(folder.length > 0){
            /*const form = new FormData();
            form.append("file", param.path);
            form.append("token", "n4aXg66Jrz3u5NjD6m8eQ7uVY2ZddPnx");
            console.log('ID', folder[0].id);
            form.append("folderId", folder[0].id);*/

            let options = {
                method: 'POST',
                url: 'https://store1.gofile.io/uploadFile',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                },
                data: `-----011000010111000001101001\r\nContent-Disposition: form-data;
                 name="token"\r\n\r\nn4aXg66Jrz3u5NjD6m8eQ7uVY2ZddPnx\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; 
                 name="folderId"\r\n\r\n${folder[0].id}\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; 
                 name="file"; filename="${req.file.originalname}"\r\nContent-Type: ${req.file.mimetype}\r\n\r\n\r\n-----011000010111000001101001--\r\n`
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                const { fileId, fileName, } = response.data.data
                saveFile({
                    id: fileId,
                    name: fileName,
                    folderId: folder[0].id
                })
            }).catch(function (error) {
                console.error(error);
            });
            return res.json(param.fieldname)
        }else {
            return res.status(404).send('Pasta não encontrada, utilize o endpoint CREATE-FOLDER para criar uma pasta')
        }

        console.log('params', param, folder)
        //return res.json(param.fieldname)
    },

    async deleteFile(req, res) {
        const { fileName, folderName } = req.params;
        const folder = await findFolder(folderName);
        console.log('params', fileName, folderName)

        if (folder.length > 0){
            const file = await findFile(fileName);

            if (file.length > 0){
                let options = {
                    method: 'DELETE',
                    url: 'https://api.gofile.io/deleteContent',
                    headers: {'Content-Type': 'application/json'},
                    data: {
                        contentsId: file[0].id,
                        token: 'qlzWRm1JzU2RcxL9HQyvGHCVtKNZPoLO'
                    }
                };

                axios.request(options).then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.error(error);
                });
            } else {
                return res.status(404).send('Arquivo não encontrada, utilize o endpoint UPLOAD-FILE para criar um arquivo')
            }
        } else {
            return res.status(404).send('Pasta não encontrada, utilize o endpoint CREATE-FOLDER para criar uma pasta')
        }
    }
}
