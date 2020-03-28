const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');


// Init app
const app = express();






//connecting mongodb link
const MONGODB_URL ='mongodb+srv://EdwardCullen30:@S30n08y00@zwinger1-z4zgy.mongodb.net/test?retryWrites=true&w=majority';
//connecting
mongoose.connect(MONGODB_URL,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});




// EJS
app.set('view engine', 'ejs');


// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//setting routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));



//starting connection
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
