const Student = require('../models/Student');
const Tech = require('../models/Tech');

function showHome(req, res) {
    res.render('pages/index');
}

function showAbout(req, res) {
    res.render('pages/about');
}

function showContact(req, res) {
    res.render('pages/contact');
}

function showStudents(req, res) {
    Student.find({}, (err, students) => {
        if(err) return res.status(404).send('Not Found');
        res.render('pages/students', {students})
    
        })
        
}

function getAllStudentsAPI(req, res) {
    Student.find({}, (err, students) => {
        if(err) return res.status(404).send('Not Found');
        res.json(students)

    })
}

function showStudent(req, res) {
    const id = req.params.id;
    Student.findOne({ _id: id}, (err, student) => {
        if(err) return res.status(404).send('Not Found');
        res.render('pages/student', {student})

    })
}

function showEditStudent(req, res) {
    const id = req.params.id;
    Student.findOne({ _id: id}, (err, student) => {
        if(err) return res.status(404).send('Not Found');
        res.render('pages/edit-student', {student})
    })
}

function showAddStudent(req, res) {
    res.render('pages/add-student');

}

function getStudentAPI(req, res) {
    const id = req.params.id;
    Student.findOne({ _id: id}, (err, student) => {
        if(err) return res.status(404).send('Not Found');
        res.send(student)

    })
}

function addStudent(req, res) {
    req.body.skills = req.body.skills.split(',');
    const newStudent = new Student(req.body);
    newStudent.save((err) => {
        if(err) return res.status(404).send('Not Found');
        res.redirect('/students');

    })
}

function editStudent(req, res) {
    const id = req.params.id
    req.body.skills = req.body.skills.split(',')
    const { firstName, lastName, age, country, bio, skills } = req.body
    Student.findOne({ _id: id }, (err, student) => {
      if (err) return res.status(404).send(err)
      student.firstName = firstName
      student.lastName = lastName
      student.age = age
      student.country = country
      student.skills = skills
      student.bio = bio
      student.save(err => {
        if (err) return res.status(404).send(err)
        res.redirect('/students')
      })
    })
  
}
function deleteStudent(req, res) {
    const id = req.params.id;
    Student.deleteOne({_id: id}, (err,student) => {
        if(err) return res.status(404).send(err);
        res.redirect('/students');

    });
}

function showTechs(req, res) {
    Tech.find({}, (err, techs) => {
        if(err) return res.status(404).send('Not Found');
        res.render('pages/techs', {techs});

    })

}

module.exports = {
    showHome: showHome,
    showAbout: showAbout,
    showContact: showContact,
    showStudents: showStudents,
    getAllStudentsAPI: getAllStudentsAPI,
    getStudentAPI: getStudentAPI,
    showStudent: showStudent,
    showEditStudent: showEditStudent,
    showAddStudent: showAddStudent,
    addStudent: addStudent,
    editStudent: editStudent,
    deleteStudent: deleteStudent,
    showTechs: showTechs


}
