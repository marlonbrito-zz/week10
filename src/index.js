const express = require('express');

const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://brito:britosama@cluster0.68dak.mongodb.net/week10?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

app.use(express.json());

app.use(routes);







const PORT = process.env.PORT || 3333;

console.log('iniciado, ouvindo porta ' + PORT + '...');

app.listen(PORT);