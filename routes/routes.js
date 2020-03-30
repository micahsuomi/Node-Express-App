const express = require('express');
const Router = express.Router();
const {showHome, 
       showAbout,
       showContact,
       showStudents,
       getAllStudentsAPI,
       showStudent,
       getStudentAPI,
       showEditStudent,
       showAddStudent,
       addStudent,
       editStudent,
       deleteStudent,
       showTechs
    } = require('../controller/controllers');

//view or UI
Router.get('/', showHome);
Router.get('/about', showAbout);
Router.get('/contact', showContact);
Router.get('/students', showStudents);
Router.get('/students/:id', showStudent);
Router.get('/student/edit/:id', showEditStudent);
Router.get('/add-student', showAddStudent);

Router.get('/techs', showTechs);


//data as json or object
Router.get('/api/v1.0.0/students', getAllStudentsAPI);
Router.get('/api/v1.0.0/students/:id', getStudentAPI);
Router.post('/api/v1.0.0/students', addStudent);
Router.post('/api/v1.0.0/students/api/:id/edit', editStudent);
Router.get('/api/v1.0.0/students/api/:id/delete', deleteStudent);






module.exports = Router;