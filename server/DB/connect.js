const mongoose =require('mongoose')

// using builtin promise library
mongoose.Promise =global.Promise;
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect( 'mongodb://localhost:27017/TodoApp' || process.env.MONGODB)
.then((msg)=>{
    console.log('Successfully connected to Database')
} , (err)=>{
    console.log('Unable to Connect');    
})

module.exports ={
    mongoose
}
