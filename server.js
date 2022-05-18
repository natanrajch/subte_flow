const express = require('express');
const path = require('path')
const { engine } = require('express-handlebars');
const app = express();
const port = 5000;



app.use(express.static(path.join(__dirname +'/public')));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('subteflow', {layout : 'main'});
});

/* app.get('/am', (req, res) => {
    res.render('amounts', {layout : 'main'});
});

app.get('/sf', (req, res) => {
    res.render('subteflow', {layout : 'main'});
}); */

/* app.get('/', (req, res) => res.send('Hello World !')) */
/* app.get('/api/data', (req, res) => {
    const data = [100, 50, 300, 40, 350, 250, 20]; // assuming this is coming from the database
    res.json(data);
}); */


//app.listen(3000);

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});