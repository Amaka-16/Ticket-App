const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.routes');
const ticketRoutes = require('./routes/ticket.routes');
const internationalRoutes = require('./routes/international.routes');
const localRoutes = require('./routes/local.routes');
const trainRoutes = require('./routes/train.routes');
const cors = require('cors')

const app = express();

const dotenv = require('dotenv');
dotenv.config();// database


const dbURI = "mongodb://localhost:27017/ticket";

mongoose.connect(dbURI)
.then(() => console.log('DB Connected Successfully..'))
.catch((err) => console.group('Could not connect to DB, Please try again!, err'));


//middleware
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173', //http:movies-app if it is on a domain 
    credentials: true
}));



// api endpoints
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/ticket", ticketRoutes);
app.use("/api/v1/international", internationalRoutes);
app.use("/api/v1/local", localRoutes);
app.use("/api/v1/train", trainRoutes);


const PORT = 1234;
app.listen(PORT, () =>
console.log(`Server running on port ${PORT}`));