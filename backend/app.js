const express = require("express");
const app = express();
require("./db/conn")
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');
const cookiParser = require("cookie-parser")
require("dotenv").config();


app.use(express.json());
app.use(cookiParser())
app.use(cors());
// app.use(Router);

const Router = require('./routes/router');
app.use('/users', Router);

const AdminRoute = require('./routes/adminRout')
app.use('/admin', AdminRoute);

const theatorRoute = require('./routes/theatorRout')
app.use('/theator', theatorRoute);

app.use('/uploads', express.static('uploads'));
const MovieRoute = require("./routes/movieRoutes")
app.use("/movies" , MovieRoute);


const bookingRoutes = require('./routes/booking');
app.use('/booking', bookingRoutes);

// const seatRoutes = require('./routes/seat');
// app.use('/api', seatRoutes);

app.get("/", (req, res)=>{
  res.send("Movie ticket express app")
})

const PORT = process.env.PORT || 8009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});