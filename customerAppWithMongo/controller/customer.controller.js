//@collapse

const { ObjectId } = require('bson')
const dbConnection = require('../models/db')



const addCustomer = (req, res) => {
    res.render('addCustomer', {
        'title': 'Add Customer'
    })
}
const showAll = (req, res) => {
   
    if (req.query.accNum) {
        dbConnection((err, db)=>{
            if(err) res.send(err)
         db.collection('customers').find({accNum:req.query.accNum}).toArray((error,result)=>{
            res.render('showCustomers', {
                title: 'Show Customers',
                data: result
            }) 
})
        })
       
       
    } else {
        dbConnection((err,db)=>{
            if(err) res.send(err)
            db.collection('customers').find().toArray((error,result)=>{
                if(error)res.send(error)
            
                res.render('showCustomers', {
                    title: 'Show Customers',
                    data: result
                }) 
               
            })
            
        })
    }

    // if(!customers.length){
    //     console.log("length",customers.length)
    //     console.log("customers2",customers)
    //     let error 
    //     req.query.accNum?error='Cannot Find Customer With This Account Number': error='Cannot Find Customers'
    //     res.render('error404',{title:'Error404', errorMessage:error})
    // }else{
    //     res.render('showCustomers', {
    //     title: 'Show Customers',
    //     data: customers
    // }) 
    // }


}
const saveCustomer = (req, res) => {
    let customer = {
        status : false ,
        ...req.body
    }
  dbConnection((err,db)=>{
      if(err) res.send(err)
      db.collection('customers').insertOne(customer,(err,result)=>{
          if(err)res.send(err)
          res.render('showCustomers',{  title: 'Show Customers'})
      })
  })
}
const activateCustomer = (req, res) => {
    dbConnection((err,db)=>{
        if(err) res.send(err)
      
        db.collection('customers')
        .findOne({_id: new ObjectId(req.params.id)},(err,customer)=>{
            if(err) res.send(err)
            else{
               let updatedCustomer ={
                   status : !customer.status ,
                   name : customer.name ,
                   accNum : customer.accNum ,
                   balance : customer.balance 
               }
               db.collection('customers').updateOne(
                   {_id: new ObjectId(req.params.id)},
                   {$set: updatedCustomer})
               .then(()=> res.redirect('/'))
               .catch((e)=>res.send(e))
            }
        })
    })

}
const updateCustomer = (req, res) => { 

    dbConnection((err, db)=>{
        if(err) res.send(err)
        db.collection('customers').findOne({_id:new ObjectId(req.params.id)}, (e, data)=>{
            if(e) res.send(e) 
            console.log('data',data)
            if(!data) res.render('error404', {
                title:"User Not Found",
                errorMessage: `No user With id ${req.params.id}`
            })
            res.render('editCustomer',{
                title:"Single User",
                customer: data
            })    
    
        })
    })
 }

const editCustomer = (req,res) => {
    dbConnection((error, db)=>{
        if(error) res.send(error)
        db.collection('customers').updateOne(
            {_id: new ObjectId(req.params.id)},
            {$set: req.body}
        )
        .then(()=> res.redirect('/'))
        .catch((e)=>res.send(e))
    })
   
}
const updateBalance = (req, res) => {
    res.render('editBalance', {
        id: req.params.id
    })
}
const addBalance = (req, res) => {
   console.log(req.body,"balance")
    dbConnection((error, db)=>{
        if(error) res.send(error)
        db.collection('customers').updateOne(
            {_id: new ObjectId(req.params.id)},
            {$inc: {balance:req.body}}
        )
        .then(()=> res.redirect('/'))
        .catch((e)=>res.send(e))
    })
}
const withdrawBalance = (req, res) => {
    dbConnection((error, db)=>{
        if(error) res.send(error)
        db.collection('customers').updateOne(
            {_id: new ObjectId(req.params.id)},
            {$dec: {balance:req.body}}
        )
        .then(()=> res.redirect('/'))
        .catch((e)=>res.send(e))
    })


}
const searchByAccNum = (accountNum) => {
  
    console.log('accountNum',accountNum)
   const customers = dbConnection((err, db)=>{
        if(err) res.send(err)
    db.collection('customers')
    .find({accNum:accountNum}, (e, data)=>{
        if(e) {
            console.log("err",e)
            res.send(e)} 
        if(data){
            console.log('datatatat',data)
            return data
        } 

    })
    })
    return customers
}


module.exports = {
    addCustomer,
    showAll,
    saveCustomer,
    activateCustomer,
    updateCustomer,
    editCustomer,
    updateBalance,
    addBalance,
    withdrawBalance,
    // searchByAccNum
}