const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();
const mainRoute = require('./routes/mainRoutes');

app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use('/', mainRoute);


const port = 3000 || process.env.PORT
app.listen(port, () => {
    console.log('listening on port ' + port);
})