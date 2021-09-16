const router = require('express').Router() ;
const customerController = require('../controller/customer.controller') ;


router.get('/',customerController.showAll)
router.get('/?accNum',customerController.showAll)
router.get('/add' , customerController.addCustomer)
router.post('/add' , customerController.saveCustomer)
router.get('/activate/:id',customerController.activateCustomer)
router.get('/edit/:id',customerController.updateCustomer)
router.post('/edit/:id',customerController.editCustomer)
router.get('/editBalance/:id', customerController.updateBalance)
router.post('/add_balance/:id',customerController.addBalance)
router.post('/withdraw-balance/:id',customerController.withdrawBalance)


module.exports = router ;