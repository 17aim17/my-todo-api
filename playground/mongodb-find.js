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
  db.collection('Todos').find({completed:true}).toArray().then((docs)=>{
     console.log(docs);
     
  },(err)=>{
      console.log('Unable to Fetch');      
  })
//    client.close();
  
})
.catch(e=>console.log(e))