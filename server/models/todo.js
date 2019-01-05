const mongoose =require('mongoose')
let Todo =mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    },
    _creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

module.exports ={
    Todo
}

// let newTodo =new Todo({
//     text:'Cook Dinner',
//     completed:false,
//     completedAt:234226346638
// })
// newTodo.save().then((data)=>{
//     console.log(data)
// },(e)=>{
//     console.log('Unable to save')    
// })
