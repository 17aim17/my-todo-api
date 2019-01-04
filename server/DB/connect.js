const mongoose =require('mongoose')

// using builtin promise library
mongoose.Promise =global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp'|| process.env.MONGODB_URL, {useNewUrlParser: true})
.then((msg)=>{
    console.log('Successfully connected to Database')
} , (err)=>{
    console.log('Unable to Connect');    
})

module.exports ={
    mongoose
}