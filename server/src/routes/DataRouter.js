const express = require("express");
const dataRouter = express.Router();

const dataController = require('../controllers/DataController');

const verifyToken = require('../middleware/verifyToken')

dataRouter.post('/recordData',verifyToken,dataController.projectData)
dataRouter.get('/getData',verifyToken,dataController.getprojectData)
dataRouter.get('/projects/search',verifyToken, dataController.searchProjects);
dataRouter.get('/projects',verifyToken, dataController.getPaginatedProjects);
dataRouter.patch('/projects/statusUpdate',verifyToken, dataController.statusUpdate);

dataRouter.get('/dashboard', dataController.dataRecord);

dataRouter.get('/barRecordData', dataController.departmentWiseProjects);

module.exports = dataRouter;