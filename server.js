
require('dotenv').config();
//imports Express
const express = require('express');
const fs = require('fs');
const os = require('os');
//after we install mongoose with npm install mongoose, we need to import it
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Tech = require('./models/Tech');
const bodyParser = require('body-parser');
const {showDateTime} = require('./my_modules/my_modules');
//crating the server
const PORT = process.env.PORT || 5000;
//we import the router from the controllers
const Router = require('./routes/routes');

//CRUD OPERATIONS
//C: create, R: read, U: update, D: delete

//creating the express app
const app = express();

//middleware, we can convert the html file into ejs file

app.set('view engine', 'ejs')
//connect MongoDB with the server


//connect mongoose with mongodb url
mongoose.connect(process.env.mongoDBurl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return console.log(err)
    console.log('the server is connected with MongoDB')
})


//before we insert all the students we have to remove the id as Mongo DB will add the id itself
//Model.collection.insert(docs, options, callback)
//we take the model and the collection, we can comment it after the student collection has been inserted into the database
// Student.insertMany(students)

//serving static files in express
app.use(express.static('public'))

//we parse the students with body parser to create an api
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// const mongoURL = 'mongodb+srv://micheleZ:<password>@express-app-pk5by.mongodb.net/test?retryWrites=true&w=majority'

// Tech.insertMany(techs);
// console.log(Tech)


/*
app.get('/', (req, res) => {
    res.render('pages/index')

})

app.get('/about', (req, res) => {
    res.render('pages/about');
})

app.get('/contact', (req, res) => {
    res.render('pages/contact');
})

// app.get('/text', (req, res) => {
//     res.send('Some text');
// })

//route to add one student page
app.get('/add-student', (req, res) => {
    res.render('pages/add-student');
})

//route to display all the students
app.get('/students', (req, res) => {
    Student.find({}, (err, students) => {
        if(err) return res.status(404).send('Not Found');
        res.render('pages/students', {students})

    })
    
})

//adding student route, API
app.post('/api/v1.0.0/students', (req, res) => {
    // const id = students.length + 1
    // req.body._id = id
    // //we need to put the skills into an array cause they are coming from a text area where they will be comas
    req.body.skills = req.body.skills.split(',');
    const newStudent = new Student(req.body);
    newStudent.save((err) => {
        if(err) return res.status(404).send('Not Found');
        res.redirect('/students');

    })
    // students.push(req.body)
    // console.log(req.body)
})

//get a single student
app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    //old code when using the array
    // const student = students.find((student) => student._id == id) 
    //new code when using the database
    Student.findOne({ _id: id}, (err, student) => {
        if(err) return res.status(404).send('Not Found');
        res.render('pages/student', {student})

    })
 
})

// An edit for to update student data, show or UI

app.get('/student/edit/:id', (req, res) => {
    const id = req.params.id;
    Student.findOne({ _id: id}, (err, student) => {
        if(err) return res.status(404).send('Not Found');
        res.render('pages/edit-student', {student})
    })

})

//with app.get(id) we are getting the single student by id or by name
app.get('/api/v1.0.0/students/:id', (req, res) => {
    
    // const id = req.params.id
    // const student = students.find((student) => student._id == id || student.firstName.toLowerCase() == id.toLowerCase())

    // if(student) {
    //     res.send(student)
    // } else {
    //     res.send('id doesnt exists')
        
    // }
    const id = req.params.id;
    Student.findOne({ _id: id}, (err, student) => {
        if(err) return res.status(404).send('Not Found');
        res.send(student)

    })

})




//with app.get we are getting all the students objects API
app.get('/api/v1.0.0/students', (req, res) => {
    Student.find({}, (err, students) => {
        if(err) return res.status(404).send('Not Found');
        res.json(students)

    })
})


//when we use ejs, we stick to get and post. so PUT will change to post
//edit path or route, api
app.post('/api/v1.0.0/students/:id/edit', (req, res) => {
    //old code
    // const id = parseInt(req.params.id);
    // req.body.skills = req.body.skills.split(',');
    // students = students.map((student) => {
    //     //we check if the student id matches with the id
    //     if(student._id === id) {
    //         //we set the id of the req.body to the matching id
    //         req.body._id = id
    //         //we return the body with added id equal to id
    //         return req.body
    //     }
    //     return student
    // })
    // res.redirect('/students')

// edit path or route, api with new code using the database
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
  })

//instead of delete, like in CRUD, we change the DELETE method to GET
app.get('/api/v1.0.0/students/api/:id/delete', (req, res) => {
    const id = req.params.id;
    Student.deleteOne({_id: id}, (err,student) => {
        if(err) return res.status(404).send(err);
        res.redirect('/students');

    });

    
})

*/

//the techs page
// app.get('/techs', (req, res) => {
//     res.render('pages/techs', {techs})
// })

//with mongo db and mongoose
/*
app.get('/techs', (req, res) => {
    Tech.find({}, (err, techs) => {
        if(err) return res.status(404).send('Not Found');
        res.render('pages/techs', {techs});

    })
})*/
//the techs API
app.get('/techs/api', (req, res) => {
    res.send(techs);
})

//stays the same for add tech even after connecting to db
app.get('/add-tech', (req, res) => {
    res.render('pages/add-tech')
})

/*
app.get('/techs/api/:id', (req, res) => {
    const id = req.params.id
    const tech = techs.find((tech) => tech._id == id || tech.name.toLowerCase() == id.toLowerCase());
    if(tech) {
        res.send(tech)
    } 
    res.send('id not found')
})*/


// app.post('/techs/api', (req, res) => {
//     //we set the id equal to the lenght of the arr plus 1
//     const id = techs.length + 1;
//     //we set the id of the body req to the id, then push the req.body to the techs array
//     req.body._id = id;
//     techs.push(req.body);
//     console.log(req.body)
//     res.redirect('/techs')
// })

app.post('/techs/api', (req, res) => {
    const newTech = new Tech(req.body);
    newTech.save((err) => {
        if(err) res.status(404).send('Not Found');
        res.redirect('/techs');
    })
})

//to get to the edit tech page targeting a single tech by id
app.get('/techs/:id', (req, res) => {
    const id = req.params.id;
    Tech.findOne({_id: id}, (err, tech) => {
        if(err) return status(404).send('Not Found');
        res.render('pages/edit-tech', {tech});
    })
    // techs = techs.find(tech => tech._id == id);
    // res.render('/pages/edit-tech');
})
/*
app.put('/techs/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    techs = techs.map((tech) => {
        //we check if the tech id matches with the id
        if(tech._id == id) {
            //we set the body of the tech object to the id
            req.body._id = id;
            //we return the modified object
            return req.body
        }
        //else we just return the object
        return tech

    })
})*/

app.post('/techs/api/:id/edit', (req, res) => {
    const id = req.params.id;
    const {name, type, img, description} = req.body;
    Tech.findOne({_id: id}, (tech, err) => {
        if(err) return res.status(404).send(err);
        tech.name = name
        tech.type = type
        tech.img = img
        tech.description = description
        tech.save((err) => {
            
        if(err) return res.status(404).send(err)
        res.redirect('/techs')
        })

    })
})

//with old code
// app.get('/techs/api/:id/delete', (req, res) => {
//     const id = req.params.id;
//     techs = techs.filter(tech => tech._id != id);
//     res.redirect('/techs')
// })

//after connecting to mongo db
app.get('/techs/api/:id/delete', (req, res) => {
    const id = req.params.id;
    Tech.deleteOne({_id : id}, (err, techs) => {
        if(err) return status(404).send('Not Found');
        res.redirect('/techs')
    })

})


app.use('/', Router)
//running the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
});

