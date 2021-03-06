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
const {authenticate} =require('./middleware/authenticate')
const port = process.env.PORT || 3000;
const app =express();
app.use(bodyParser.json())

app.post('/todos' ,authenticate, (req,res)=>{
    var todo =new Todo({
        text :req.body.text,
        _creator:req.user._id
    });

    todo.save().then((doc)=>{
        res.status(200).send(doc)
    },(err)=>{
        res.status(400).send(err)
    })

})

app.get('/todos' ,authenticate, (req,res)=>{
    Todo.find({_creator:req.user._id}).then((docs)=>{
        res.status(200).send({docs})
    },err=>res.json(err))
})

app.get('/todos/:id',authenticate,(req,res)=>{
    const id =req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send(); 
    }

    Todo.findOne({
            _id:id,
            _creator:req.user._id
    }).then((doc)=>{
        if(!doc){
            return res.status(404).send()
        }
        res.status(200).send({doc})
    }).catch(e=>{
        return res.status(400).send();
    })
})

app.delete('/todos/:id', authenticate,(req,res)=>{
    const id =req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send(); 
    }

    Todo.findOneAndDelete({
        _id:id,
        _creator:req.user._id
    }).then((doc)=>{
        if(!doc){
            return res.status(404).send()
        }
        res.status(200).send({doc})
    }).catch(e=>{
        return res.status(400).send();
    })
})


app.patch('/todos/:id',authenticate ,(req,res)=>{
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

    Todo.findOneAndUpdate({_id:id , _creator:req.user._id}, {$set:body} ,{new:true}).then((doc)=>{
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


app.get('/users/me' ,authenticate,(req,res)=>{
        return res.send(req.user)
})

app.post('/users/login' ,(req,res)=>{
      const body =_.pick(req.body ,['email' ,'password']);
      User.findByCredentials(req.body.email ,req.body.password)
      .then((user)=>{
          return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user)  // custom headedr with x prefix
         })
      }).catch((e)=>{
            res.status(400).send()
      })
})

app.delete('/users/me/token', authenticate, (req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send()
    }).catch(e=>res.status(400).send())
})

app.listen(3000,()=>{
    console.log(`Listening on port ${port} `);
})

module.exports= {app};