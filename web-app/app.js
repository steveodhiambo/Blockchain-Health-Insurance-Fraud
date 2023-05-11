const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const registerRoutes = require('./api/routes/register');
const transactionRoutes = require('./api/routes/transactions');
const claimRoutes = require('./api/routes/claim');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors())

app.use(morgan('dev'));

app.use(registerRoutes);
app.use(transactionRoutes);
app.use(claimRoutes);

module.exports = app;