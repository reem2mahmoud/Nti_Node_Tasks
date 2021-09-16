const {MongoClient , ObjectId} = require('mongodb')
const myConnection =(cb)=>{
    MongoClient.connect(process.env.DbURL,{},(err,client)=>{
        if(err) return cb(err,false)
        const db = client.db(process.env.DbName)
        cb(false ,db)
    })
   
}
module.exports = myConnection