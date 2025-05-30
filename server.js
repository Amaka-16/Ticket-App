const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.routes');
const ticketRoutes = require('./routes/ticket.routes');
const app = express();

const dotenv = require('dotenv');
dotenv.config();// database


const dbURI = "mongodb://localhost:27017/ticket";

mongoose.connect(dbURI)
.then(() => console.log('DB Connected Successfully..'))
.catch((err) => console.group('Could not connect to DB, Please try again!, err'));


//middleware
app.use(express.json());



// api endpoints
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/ticket", ticketRoutes);


const PORT = 1234;
app.listen(PORT, () =>
console.log(`Server running on port ${PORT}`));