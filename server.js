const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err) {
      console.log(err);
    }
  });
  next();
});

/*
app.use((req, res, next) => {
  res.render('maintenance.hbs',{
    pageTitle: 'Maintenance Page',
  });
});
*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/about', (req,res) => {
    //response.send('Hello World!');
    res.render('about.hbs',{
      pageTitle: 'About Page',

    });
});

app.get('/home', (req,res) => {
    //response.send('Hello World!');
    res.render('home.hbs',{
      pageTitle: 'Home Page',
      name: 'Naresh Mahipat More',
      age: 32,
      hobies: 'Biking, Hiking, Trekking',

    });
});

app.get('/', (req,res) => {
    //response.send('Hello World!');
    res.send({
      name: 'Naresh',
      likes: ['biking','hiking']
    });
});

app.listen(port, () => {
  console.log(`server is running at port: ${port}`);
});
