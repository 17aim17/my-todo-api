const {mongoose} = require('./../server/DB/connect')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const  {ObjectID} =require('mongodb');
let id= "5c2e29202e811028206f09d811";

if(!ObjectID.isValid(id)){
    return console.log('Id not valid')    
}
Todo.findById(id).then((docs)=>{
    if(!docs)
        return console.log('Id not found');    
}).catch(e=>{
    console.log(e)    
})

Todo.findOne({ completed:false }).then((doc)=>{
    console.log(doc);    
})