const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const rootdir = require('./utils/path');
const app = express();
const multer = require('multer');

app.use(express.static('public'));
// app.use(express.static('images'));
app.use('/images',express.static('images'));

const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);;
    }
    cb(null, false);
}

    app.use(multer({ storage: filestorage, fileFilter:filefilter }).single('image'));

app.use(express.static("views"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set('view engine', 'ejs');

//impoting from a routes
const amdinroute = require('./routes/admin');
const defaultroute = require('./routes/defaultroute');

app.use('/admin', amdinroute);

app.use(defaultroute);

app.listen(2500, () => {
    console.log('node server is running at port 2500');
});