const mongoose =require('mongoose')
let User =mongoose.model('User',{
    email:{
        type:String,
        required:true,
        minlength:5,
        trim:true
    }
})

module.exports ={
    User
}
// let newUser =new User({
//    email:'   ashish '
// })
// newUser.save().then((data)=>{
//     console.log(data)
// },(e)=>{
//     console.log(e)    
// })