// Global imports
const express =require('express')
const bodyParser =require('body-parser')
const dotenv = require('dotenv').config();
const  {ObjectID} =require('mongodb');
// local imports
const {mongoose} = require('./db/connect')
const {Todo} =require('./models/todo')
const {User} =require('./models/user')

const port = process.env.PORT || 3000;
const app =express();
app.use(bodyParser.json())

app.post('/todos' , (req,res)=>{
    var todo =new Todo({
        text :req.body.text
    });

    todo.save().then((doc)=>{
        res.status(200).send(doc)
    },(err)=>{
        res.status(400).send(err)
    })

})

app.get('/todos' , (req,res)=>{
    Todo.find({}).then((todos)=>{
        res.status(200).send({todos})
    },err=>res.json(err))
})

app.get('/todos/:id',(req,res)=>{
    const id =req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send(); 
    }

    Todo.findById(id).then((doc)=>{
        if(!doc){
            return res.status(404).send()
        }
        res.status(200).send({doc})
    }).catch(e=>{
        return res.status(400).send();
    })
})

app.listen(3000,()=>{
    console.log(`Listening on port ${port} `);
})