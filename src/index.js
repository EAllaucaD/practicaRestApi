const express = require('express');
const app = express();
const morgan = require('morgan');


//port
app.set('port', 3000);
app.set('json spaces',2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//
app.use(express.static('public')); // Sirve archivos estáticos

//Routes
//app.use(require('./routes/index'));
app.use('/api/teams',require('./routes/teams'));


//Server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});