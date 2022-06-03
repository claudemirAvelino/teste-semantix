import 'dotenv/config';
import express from 'express';
import GoFileController from './app/controllers/GoFileController';
import { createBullBoard } from 'bull-board';
const { BullAdapter } = require('bull-board/bullAdapter')
import Queue from './app/lib/Queue';
require('./database/database')
const multer  = require('multer');

const app = express();

const { router: BullUI } = createBullBoard(Queue.queues.map(queue => new BullAdapter(queue.bull)))

app.use(express.json());
//app.use('/admin/queues', BullUI);

app.post('/create-folder/:folderName', GoFileController.store);

let upload = multer({ dest: 'uploads/' })
app.post('/upload-file', upload.single('myfile'), GoFileController.uploadFile);

app.delete('/delete-file', GoFileController.deleteFile);

app.listen(3333, () => {
    console.log("Server On PORT: 3333")
});
