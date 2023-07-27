const express =  require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

// MongoDB connection (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('mongodb://127.0.0.1:27017/crud');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/',(req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id},{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        location: req.body.location})
    .then(users => res.json(users))
    .catch(err =>  res.json(err))
})

app.delete("/deleteUser/:id", (req, res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createUser",(req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})























































// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB connection (replace 'your_database_url' with your actual MongoDB URL)
// mongoose.connect('mongodb://localhost:27017/crud', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Define user schema and model (replace with your user schema)
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number,
// });

// const User = mongoose.model('User', userSchema);

// // Routes for CRUD operations
// app.post('/api/users', (req, res) => {
//   // Create a new user
//   // req.body should contain name, email, and age
//   const newUser = new User(req.body);

//   newUser.save((err, user) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error saving user');
//     } else {
//       res.status(201).json(user);
//     }
//   });
// });

// app.get('/api/users', (req, res) => {
//   // Get all users
//   User.find({}, (err, users) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error fetching users');
//     } else {
//       res.json(users);
//     }
//   });
// });

// app.put('/api/users/:id', (req, res) => {
//   // Update a user by ID
//   const userId = req.params.id;
//   const updatedData = req.body;

//   User.findByIdAndUpdate(userId, updatedData, { new: true }, (err, user) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error updating user');
//     } else {
//       res.json(user);
//     }
//   });
// });

// app.delete('/api/users/:id', (req, res) => {
//   // Delete a user by ID
//   const userId = req.params.id;

//   User.findByIdAndRemove(userId, (err, user) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error deleting user');
//     } else {
//       res.json(user);
//     }
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
