const employee = require('../models/employeemodel');
const nodemailer = require('nodemailer');

exports.getallEmployee = (req, res) => {
    employee.find()
        .then(data => {
            // console.log(data);
            res.render('index', { data: data });
        });
}
exports.postaddEmployee = (req, res) => {
    let data = req.body;
    // console.log(data);  
    const calculated_dob = `${data.year}/${data.month}/${data.date}`;
    const image = req.file;
    if (!image) {
        console.log('file not found');
        // return;
        res.redirect('/');
    }
    const imgurl = image.path;
    console.log(imgurl);
    let user = new employee();
    user.id = data.id,
        user.name = data.name,
        user.email = data.email,
        user.address.country = data.country,
        user.address.state = data.state,
        user.address.city.cityname = data.city,
        user.address.city.town = data.town,
        user.address.city.streetname = data.street,
        user.aadharnumber = data.aadharnumber,
        user.gender = data.gender,
        user.dob = calculated_dob,
        user.imgurl = imgurl;
    user.save((err) => {
        if (!err) {
            console.log('new record inserted successfully');
        }
        else {
            console.log('record not inserted successfully');
        }
    });
    res.redirect('/');
    //console.log(req);
}
exports.postdeleteEmployee = (req, res) => {
    console.log(req.body.id);
    employee.findByIdAndDelete({ _id: req.body.id })
        .then(data => {
            // console.log(data);
            console.log('record deleted successfully');
            res.send('success');
        })
}
exports.post_get_data_of_Employee = (req, res) => {
    // console.log(req.body);
    employee.findById(req.body.data)
        .then(data => {
            res.send(data);
        })
}
exports.updateEmployee = (req, res) => {
    let id = req.body.doc_id;
    let data = req.body;
    let img = req.file;
    let imgurl = img.path;
    console.log(imgurl);
    const calculated_dob = `${data.year}/${data.month}/${data.date}`;
    employee.findByIdAndUpdate(id, {
        id: data.id,
        name: data.name,
        email: data.email,
        country: data.country,
        state: data.state,
        town: data.town,
        street: data.street,
        aadharnumber: data.aadharnumber,
        dob: calculated_dob,
        gender: data.gender,
        imgurl: imgurl
    }, { new: true })
        .then(res => {
            console.log('record updated successfully!');
        })
        .catch(err => console.log(err))
    res.redirect('/?status=success');
}

exports.sendmail = (req, res, next) => {
    const id = req.body.id;
    // console.log(req.body);
    const mailtext = req.body.mailtext;
    const text = req.body.text;
    // console.log(id);
    // console.log(text);
    employee.findById(id)
        .then(data => {
            // console.log(data);
            const email = data.email;
            const name = data.name;
            let fun=require('../mail/mailoptions');
             mailOptions=fun(email,text);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: "rohanshrivastav1999@gmail.com",
                    pass: 'rohan0804'
                }
            });
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    res.send('failed');
                }
                else {
                    let obj = {
                        status: 'success',
                        name: name
                    }
                    // console.log(obj);
                    console.log(info.response);
                    console.log('mail send successfullly');
                    // res.send('success');
                    res.send(obj);
                }
            })
        })
}