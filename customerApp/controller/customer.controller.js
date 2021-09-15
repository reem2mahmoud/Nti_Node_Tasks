//@collapse
const fs = require('fs');

const readJsonFile = () => {
    let customers;
    try {
        customers = JSON.parse(fs.readFileSync('models/customers.json').toString())
        if (!Array.isArray(customers)) throw new Error('not array');
    } catch (e) {
        customers = []
    }
    return customers
}
const saveJsonFile = (customers) => {
    fs.writeFileSync('models/customers.json', JSON.stringify(customers))
}
const addCustomer = (req, res) => {
    res.render('addCustomer', {
        'title': 'Add Customer'
    })
}
const showAll = (req, res) => {
    let customers;
    customers = readJsonFile();
    if (req.query.accNum) {
        customers = searchByAccNum(req.query.accNum)
       
    } else {
        customers = readJsonFile()
    }
    if(!customers.length){
        let error 
        req.query.accNum?error='Cannot Find Customer With This Account Number': error='Cannot Find Customers'
        res.render('error404',{title:'Error404', errorMessage:error})
    }else{
        res.render('showCustomers', {
        title: 'Show Customers',
        data: customers
    }) 
    }


}
const saveCustomer = (req, res) => {
    let customers = readJsonFile()
    let newCustomer = {
        id: customers.length + 1,
        status: false,
        ...req.body
    }
    customers.push(newCustomer)
    saveJsonFile(customers)
    res.redirect('/')
}
const activateCustomer = (req, res) => {

    let customers = readJsonFile();
    const index = searchCustomer(req.params.id, customers);
    if (index == -1) console.log('customer not found')
    else {
        customers[index].status = !customers[index].status
    }
    saveJsonFile(customers)
    res.redirect('/')
}
const updateCustomer = (req, res) => {
    let customers = readJsonFile();
    let customer_index = searchCustomer(req.params.id, customers)
    if (customer_index == -1) console.log('cannot find this customer')
    else {
        res.render('editCustomer', {
            title: "Edit Customer",
            customer: customers[customer_index]
        })
    }

}
const editCustomer = (req, res) => {
    let customers = readJsonFile();
    let customer_index = searchCustomer(req.params.id, customers)
    let new_data = req.body
    for (n in new_data) {
        customers[customer_index][n] = new_data[n]
    }
    saveJsonFile(customers);
    res.redirect('/')
}
const updateBalance = (req, res) => {
    res.render('editBalance', {
        id: req.params.id
    })
}
const addBalance = (req, res) => {
    console.log('balance', req.body.balance)

    let customers = readJsonFile();
    let customer_index = searchCustomer(req.params.id, customers)
    console.log('balancevvv', customers[customer_index].balance)

    if (customers[customer_index].balance < req.body.balance) {
        console.log("balance not valid")
    } else {
        customers[customer_index].balance += req.body.balance
    }
    saveJsonFile(customers);
    res.redirect('/')

}
const withdrawBalance = (req, res) => {
    res.send('withdraw')
    let customers = readJsonFile();
    let customer_index = searchCustomer(req.params.id, customers)

    if (customers[customer_index].balance < req.body.balance) {
        console.log("balance not valid")
    } else {
        customers[customer_index].balance -= req.body.balance
    }
    saveJsonFile(customers);
    res.redirect('/')


}
const searchByAccNum = (accountNum) => {
    let customers = readJsonFile();
    const customer = customers.filter(customer => {
        return customer.accNum == accountNum
    })
  
    return customer
}
const searchCustomer = (id, customers) => {
    const index = customers.findIndex(customer => {
        return customer.id == id
    })
    return index
}

module.exports = {
    addCustomer,
    showAll,
    saveCustomer,
    updateCustomer,
    editCustomer,
    activateCustomer,
    updateBalance,
    addBalance,
    withdrawBalance,
    searchByAccNum
}