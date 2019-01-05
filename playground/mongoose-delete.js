const {mongoose} = require('./../server/DB/connect')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const  {ObjectID} =require('mongodb');

// remove all
// Todo.remove({}).then((docs)=>{
//      console.log(docs);    
// }).catch(e=>{
//     console.log(e)    
// })

Todo.findByIdAndRemove('5c2f340609de6416ac4433c3').then((docs)=>{
    if(!docs)
        return console.log('Id not found');  
    
    console.log(docs);
    
}).catch(e=>{
    console.log(e)    
})
