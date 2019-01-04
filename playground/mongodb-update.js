// const  MongoClient =require('mongodb').MongoClient;
// destructuring using here
const  {MongoClient , ObjectID} =require('mongodb');

// findOneAndUpdate
const dbName = 'TodoApp'
MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true})
.then((client)=>{
  console.log('Success');
  const db = client.db(dbName);

//   db.collection('Todos').findOneAndUpdate(
//   {
//       _id:new ObjectID("5c2e1673fe5ecd6640d383de")
//   },
//   {
//       $set:{
//           completed:true
//       }
//   },
//   {
//       returnOriginal:false
//   })
//   .then((res)=>{
//       console.log(res);      
//   })
  db.collection('Users').findOneAndUpdate(
  {
      _id:new ObjectID("5c2e0c904e434d0f64d2cb4f")
  },
  {
      $inc:{
         age:1
      }
  },
  {
      returnOriginal:false
  })
  .then((res)=>{
      console.log(res);      
  })
    
  
  
  // client.close();
  
})
.catch(e=>console.log(e))