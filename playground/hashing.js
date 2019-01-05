const {SHA256} =require('crypto-js');
const jwt =require('jsonwebtoken');

let data ={
    id:4    // token sending to the user
}
let token = jwt.sign(data , '123adc')
console.log(token);

 let decoded =jwt.verify(token ,'123adc')
 console.log(decoded);
 

// const x = "i am assdfgtlrfgvnfkjb";

// const hash = SHA256(x).toString()

// console.log(`Message :${x}`);
// console.log(`hash :${hash}`);

// let data ={
//     id:4    // token sending to the user
// }

// let token ={
//     data,
//     Hash :SHA256(JSON.stringify(data)+'somesecret').toString()
// }

// token.data.id =5;
// token.hash = SHA256(JSON.stringify(token.data)).toString()


// let resultHash  = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resultHash === token.Hash){
//     console.log('data was not changed');    
// }else{
//     console.log('Data was changed , Do not trust');    
// }

