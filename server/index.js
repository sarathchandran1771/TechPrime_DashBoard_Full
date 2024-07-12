const express = require('express');
const port = 5000;
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
const {connectDB} = require('./shared/config/db')
const cors = require('cors')
connectDB()

require('dotenv').config();

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS for frontend server running on port 3000
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));


const userRouter = require('./src/routes/UserAuthRouter')
const dataController = require('./src/routes/DataRouter')

app.use("/", userRouter);
app.use("/api", dataController);

app.use('/',(req,res)=>{
  res.send("server is running")
})
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));

 