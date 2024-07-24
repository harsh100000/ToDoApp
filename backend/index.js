const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
const port = process.env.PORT || 3001

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://thanos420786:xuQojPQyuRACkrJA@todo-project-db.4pbexa4.mongodb.net/?retryWrites=true&w=majority&appName=todo-project-db'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err))

const corsOptions = {
origin: process.env.FRONTEND_URL || 'http://localhost:3000', // replace with your frontend URL
optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json())

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req,res) =>{
    const task = req.body.task; 
    TodoModel.create({
        task:task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id:id},{done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
