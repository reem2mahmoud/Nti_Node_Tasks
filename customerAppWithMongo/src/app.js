const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express() ;


const customerRoutes = require('../routes/customer.routes')

app.set('view engine','hbs') ;

app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, '../frontend/views'))
hbs.registerPartials(path.join(__dirname, '../frontend/layouts'))

app.use(express.urlencoded()) ;
app.use(customerRoutes) ;

module.exports = app ;