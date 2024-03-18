const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const dotenv = require('dotenv').config()
const connectDB = require('./database/connection')
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(express.json())

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//DB Connection
connectDB()

// app.use('/',(req,res)=>{
//     res.send('Home Route.')
//     res.statusCode = 200
// })

// API
// app.post('/createUser',(req,res)=>{
//     UserModel.create(req.body)
//     .then(users=>res.json(users))
//     .catch(err=>res.json(err))
// })
app.get('/',(req,res)=>{
   UserModel.find({})
   .then(users=>res.json(users))
   .catch(err=>res.json(err))
})

// API endpoint to create a new user
app.post('/createUser', async (req, res) => {
    try {
        // Validate request
        // console.log(req.body.name)
        // console.log(req.body.email)
        // console.log(req.body.age)
        if (!req.body) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }

        // Check if an employee with the same email already exists
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same email already exists' });
        }

        // Create a new employee
        const userCreated = new UserModel({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        });

        // Save the employee in the database
        await userCreated.save();
    } catch (err) {
        res.status(500).send(err.message || "Some error occurred while creating a create operation");
    }
  });

  app.get('/getUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
  })

  app.put('/updateUser/:id',(req,res)=>{
    const id = req.params.id
    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    })
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
  })

  app.delete('/deleteUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
  })


app.listen(3001,()=>{
    console.log('Server is Ruuning at: http://localhost:3001')
})