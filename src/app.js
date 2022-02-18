const { hasSubscribers } = require('diagnostics_channel');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,"../public/templates/views");
const partiaslPath = path.join(__dirname, "../public/templates/partials");

app.use(express.static(publicDirPath));
app.set('view engine' , 'hbs');
app.set("views" , viewsPath);
hbs.registerPartials(partiaslPath);



app.get('' , (req,res) => {
    res.render('index' , {
        title : "Weather Application",
        name : "Ishaan Dasgupta"

    });
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title:"About Me",
        name : "Ishaan Dasgupta"
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title : "Help",
        name : "Ishaan Dasgupta"

    })
})

app.get('/weather' , (req,res) => {
    if (!req.query.location){  
        return res.send({
            error : "No location entered"
        })
    }
    geocode(req.query.location, (error ,{latitude,longitude,locationName} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,{time,feelsLike,temp,desc,humidity,weatherIcon} = {})=>{
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                time,
                temp,
                locationName,
                feelsLike,
                desc,
                humidity,
                weatherIcon
            })
        })
    })
})

app.get('*' , (req,res) => {
    res.render('error' , {
        title : "404",
        name : "Ishaan",
        message : "Page Not Found"
    })
})

app.listen(port , () => {
    console.log('server is up on ' + port);
})