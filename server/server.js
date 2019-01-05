// Global imports
const express =require('express')
const bodyParser =require('body-parser')
const dotenv = require('dotenv').config();
const  {ObjectID} =require('mongodb');
const _     = require('lodash');
// local imports
const {mongoose} = require('./DB/connect')
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
    Todo.find({}).then((docs)=>{
        res.status(200).send({docs})
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

app.delete('/todos/:id',(req,res)=>{
    const id =req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send(); 
    }

    Todo.findByIdAndRemove(id).then((doc)=>{
        if(!doc){
            return res.status(404).send()
        }
        res.status(200).send({doc})
    }).catch(e=>{
        return res.status(400).send();
    })
})


app.patch('/todos/:id' ,(req,res)=>{
    const id =req.params.id;
    const body = _.pick(req.body, ['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send(); 
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime()
    }else{
        body.completed =false;
        body.completedAt =null;
    }

    Todo.findByIdAndUpdate(id, {$set:body} ,{new:true}).then((doc)=>{
        if(!doc) {
            return res.status(404).send()
        }
        res.status(200).send({doc})
    }).catch(e=>res.status(400).send())
    
})

//  Create Users
app.post('/users',(req,res)=>{
    const data = _.pick(req.body, ['email','password'])

    const user =new User(data)

    user.save().then(()=>{
      return user.generateAuthToken(); 
    }).then((token)=>{
        res.header('x-auth',token).send(user)  // custom headedr with x prefix
    }).catch((e)=>{
        res.status(404).send(e);
    })
})


app.listen(3000,()=>{
    console.log(`Listening on port ${port} `);
})

module.exports= {app};