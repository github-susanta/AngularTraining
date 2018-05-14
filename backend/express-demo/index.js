const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json())

var bodyParser = require('body-parser'); 
/* app.use(express.static(__dirname + '../../../frontend')); */
app.use(express.static(__dirname + '/public'));

// Arry of courses...
const courses = [

    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' }

]


app.get('/', (req, res) => {
    res.send('Hello')
});

app.get('/api/courses', (req, res) => {

    res.send(courses)
});

//required parameters are used for all the required parameter and query parameter for all the optional parameters

//get request for getting all the courses
app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found')
    res.send(course)
});
// examples of sending parameters
app.get('/api/posts/:year/:month', (req, res) => {

    res.send(req.params);

});
// examples of sending query params
app.get('/api/postsQuery/:year/:month', (req, res) => {
    // to read query parameters we need to use the following
    res.send(req.query); // 

});

//Post requests ********************************

app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = validateCourse(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course)
    res.send(courses)

});
// put request ************************************************
app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found');    

    const result = validateCourse(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }

    course.name = req.body.name;
    res.send(course)


});

// delete ***************************************************
app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');    

   const index = courses.indexOf(course)
   courses.splice(index,1)

   
    res.send(course)


});

// validation function

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}


//command for setting port is set PORT=5000 [for windows]
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listeing to port no ${port}`)
})


