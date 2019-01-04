// const  MongoClient =require('mongodb').MongoClient;
// destructuring using here
const  {MongoClient , ObjectID} =require('mongodb');

// deleteMany
// deleteOne
// findOneAndDelete
const dbName = 'TodoApp'
MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true})
.then((client)=>{
  console.log('Success');
  const db = client.db(dbName);

//   db.collection('Todos').deleteMany({text:'hello'}).then((res)=>{
//       console.log(res);      
//   })

//   db.collection('Todos').deleteOne({text:'hello'}).then((res)=>{
//       console.log(res);      
//   })
    
  db.collection('Todos').findOneAndDelete({text:'hello'}).then((res)=>{
      console.log(res);      
  })
    
  
  
  // client.close();
  
})
.catch(e=>console.log(e))