require('dotenv/config');
const express =  require('express');
const GoFileController =  require('./app/controllers/GoFileController.js');
const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter')
const Queue =  require('./app/lib/Queue.js');
require('./database/database')
const multer  = require('multer');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require("../swagger.json");

const app = express();

const { router: BullUI } = createBullBoard(Queue.queues.map(queue => new BullAdapter(queue.bull)))

app.use(express.json());
app.use('/admin/queues', BullUI);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.post('/create-folder/:folderName', GoFileController.store);

let upload = multer({ dest: 'uploads/' })
app.post('/upload-file', upload.single('myfile'), GoFileController.uploadFile);

app.delete('/delete-file', GoFileController.deleteFile);

app.listen(3333, () => {
    console.log("Server On PORT: 3333")
});
