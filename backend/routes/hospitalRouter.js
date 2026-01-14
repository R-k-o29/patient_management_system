let express = require('express');
const { insertPatient, viewPatient, deletePatient, updatePatient, viewSinglePatient } = require('../controllers/patientController');
let hospitalRouter = express.Router();

hospitalRouter.post('/insert',insertPatient);
hospitalRouter.get('/view',viewPatient);
hospitalRouter.delete('/delete/:id',deletePatient);
hospitalRouter.put('/update/:id',updatePatient);
hospitalRouter.get('/view/:id',viewSinglePatient);

module.exports=hospitalRouter;