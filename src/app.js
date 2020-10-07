const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geoCode')
const weather = require('./utils/weather')

//Define paths for Express.
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up static directory
app.use(express.static(publicPath))

//Set up handlebar engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index',{
        title:'Home', name:'Anoop'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({error:'Please enter address: '})
    }
    const place = req.query.address
    geoCode(place, (error, {latitude, longitude, location} = {})=> {
        if(error){
            return res.send({error})
        }else{
            weather(latitude, longitude, (error, weatherdata) =>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    address: place,
                    location,
                    forecast: weatherdata
                })
            })
        }
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please provide a search item: '
        })
    }
    res.send({products:[]})
})

app.get('/help',(req, res)=>{
    res.render('help', {title:'Help', name:'Anoop'})

})

app.get('/about', (req, res)=>{
    res.render('about', {title:'About', name:'Anoop'})

})

//Error handling
app.get('/help/*', (req,res)=>{
    res.render('404', {title:'Error', errorMsg:'Help is under construction.'})
})

app.get('*', (req,res) => {
    res.render('404', {title:'Error', errorMsg:'Page not found.'})
})

app.listen(3000, ()=> {
    console.log('Server started on localhost on port 3000.'); 
})