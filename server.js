//imports Express
const express = require('express');
const fs = require('fs');
const os = require('os');
const bodyParser = require('body-parser');
const {showDateTime} = require('./my_modules/my_modules');
//crating the server
const PORT = process.env.PORT || 5000;

//CRUD OPERATIONS
//C: create, R: read, U: update, D: delete

//creating the express app
const app = express();

app.set('view engine', 'ejs')

//serving static files in express
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



let students = [
    {
        _id: 1,
        firstName: 'Michele',
        lastName: 'Zucca',
        age: 29,
        country: 'Finland',
        skills: ['HTML','CSS','JS','React']
    },
    {
        _id: 2,
        firstName: 'Mangalam',
        lastName: 'Krishnan',
        age: 29,
        country: 'India',
        skills: ['HTML','CSS','JS','React']
    },
    {
        _id: 3,
        firstName: 'Asabeneh',
        lastName: 'Yetayeh',
        age: 29,
        country: 'Finland',
        skills: ['HTML','CSS','JS','React']
    }
]




app.get('/', (req, res) => {
    let pathname = __dirname + '/views/index.html'
    res.sendFile(pathname)
})

app.get('/about', (req, res) => {
    let pathname = __dirname + '/views/about.html'
    res.sendFile(pathname);
})

app.get('/contact', (req, res) => {
    let pathname = __dirname + '/views/contact.html'
    res.sendFile(pathname);
})

app.get('/text', (req, res) => {
    res.send('Some text');
})

/*
app.get('/students', (req, res) => {
    const student = {
        name: 'Michele',
        age: '29',
        country: 'Finland',
        skills: ['HTML', 'CSS', 'JS']
    }
    res.render('students', {students})
})*/

//with app.get we are getting all the students objects in the array
app.get('/students', (req, res) => {
    res.send(students)
})

//with app.get(id) we are getting the single student by id or by name
app.get('/students/:id', (req, res) => {
    const id = req.params.id
    const student = students.find((student) => student._id == id || student.firstName.toLowerCase() == id.toLowerCase())

    if(student) {
        res.send(student)
    } else {
        res.send('id doesnt exists')
        
    }

})

console.log(students)
app.post('/students', (req, res) => {
    const id = students.length +1
    req.body._id = id
    students.push(req.body)
    console.log(req.body)
    res.send('data has been created')
})


app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    students = students.map((student) => {
        //we check if the student id matches with the id
        if(student._id === id) {
            //we return the body with added id equal to id
            req.body._id = id
            return req.body
        }
        return student
    })
    res.send('student has been updated')
})

app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    students = students.filter(student => 
        student._id != id);
        res.send('students has been deleted')

    
})
/*
app.put('/students/:id', (req, res) => {
    res.send('students have been updated')
    const id = +req.params.id
    student = students.map((student) => {
       if(student._id === id) {
            req.body._id = id
            return req.body
       } 
       return student
    })
    res.send('student has been updated')
})*/

/*
app.delete('/students', (req, res) => {
    res.send('a student have been updated')
    const id = req.params.id;
    const savedStudents = students.filter((student) => student.id !== id);
    res.send(savedStudents)
})*/

//running the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
});

