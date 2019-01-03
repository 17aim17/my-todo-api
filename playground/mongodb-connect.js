// const  MongoClient =require('mongodb').MongoClient;
// destructuring using here
const  {MongoClient , ObjectID} =require('mongodb');

//  let oid =new ObjectID()
//  console.log(oid);
 
const dbName = 'TodoApp'
MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true})
.then((client)=>{
  console.log('Success');
  const db = client.db(dbName);
//   db.collection('Todos').insertOne({
//     text:'Something todo',
//     completed:false
//   })
//   .then((data)=>{
//       console.log(data.ops);
//   })
//   db.collection('Users').insertOne({
//     name:'Ashish',
//     age:18,
//     location:'India'
//   })
//   .then((data)=>{
//       console.log(data.ops[0]._id.getTimestamp());
//   })
   client.close();
  
})
.catch(e=>console.log(e))