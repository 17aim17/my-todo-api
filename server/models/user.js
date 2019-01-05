const mongoose =require('mongoose')
const validator =require('validator')
const jwt =require('jsonwebtoken');
const _ = require('lodash');
const bcrypt =require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return validator.isEmail(value)
            },
            message:'{VALUE} is not a valid email'
        }
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },

    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
})
// INSTANCE methods
UserSchema.methods.toJSON =function(){
    let user = this
    let userObject= user.toObject()
    return _.pick(userObject,['_id','email']);
}

    //    1.. generating token after signup
UserSchema.methods.generateAuthToken = function(){
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id:user._id.toHexString() , access},process.env.SECRET).toString()
    user.tokens.push({
        access,
        token
    })

   return  user.save().then(()=>{
        return token
    })
}

// 2... remove token LogOut
UserSchema.methods.removeToken =function(token){
    let user =this;
   return  user.updateOne({
        $pull:{
            tokens:{
                token:token
            }
        }
    })
}

// MODEL methods statics will convert this method to model method

// 1.... to authenticate
UserSchema.statics.findByToken = function(token){
    let User =this;
    let decoded;
    try {
        decoded = jwt.verify(token ,process.env.SECRET);
    } catch (error) {
        return new Promise((resolve ,reject)=>{
            reject();
        })
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
}

// 2... for logginin
UserSchema.statics.findByCredentials = function(email, password){
        let User =this;

       return User.findOne({email}).then((user)=>{
            if(!user){
                return Promise.reject() 
            }
            return new Promise((resolve,reject)=>{
                bcrypt.compare(password,user.password,(err,res)=>{
                    if(res){
                         resolve(user);
                    }else{
                        reject(err)
                    }                        
                })
            })
        })
}



// HASHING BEFORE SAVING PASSWORD
UserSchema.pre('save',function(next){
    let user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err ,salt)=>{
            bcrypt.hash(user.password ,salt, (err,hash)=>{
               user.password =hash   
               next();   
            })
        })
        
    }else{
        next();
    }
})

let User =mongoose.model('User',UserSchema)



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