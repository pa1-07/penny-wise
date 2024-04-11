const express = require('express');
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute');
const apiRoute = require('./routes/api');
const transactionRoutes = require('./routes/transactionRoutes')
const connectDb = require('./config/connectDb');
const cors = require('cors')
const dotenv = require('dotenv')


const app = express();
const PORT = process.env.PORT || 8080;

// Data connection

connectDb()

app.use(cors())

dotenv.config()

app.use(bodyParser.json());

//routes
app.use('/api/users', userRoute);

app.use('/api', apiRoute)

app.use('/api/transaction', transactionRoutes)

//middlewares

// app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

