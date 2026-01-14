let express = require('express');
const { insertPatient, viewPatient, deletePatient, updatePatient } = require('../controllers/patientController');
let hospitalRouter = express.Router();

hospitalRouter.post('/insert',insertPatient);
hospitalRouter.get('/view',viewPatient);
hospitalRouter.delete('/delete/:id',deletePatient);
hospitalRouter.put('/update/:id',updatePatient);

module.exports=hospitalRouter;