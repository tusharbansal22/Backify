const express = require('express');
const  errorHandler  = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const validateToken = require('./middleware/validateTokenHandler');
const dotenv = require('dotenv').config();

connectDb();
const app = express();
const port = process.env.PORT;

app.listen(port,()=>{
    console.log('listening on port '+process.env.PORT);
}); 

app.use(express.json());


app.use("/api/contacts",require('./routes/contactRoutes'));
app.use("/api/users",require('./routes/userRoutes'));
app.use(errorHandler);