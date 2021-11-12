var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
var cd = require('./conn_details.js');
const { password } = require('./conn_details.js');
// connection configurations
console.log(cd.host, cd.user, cd.password, cd.database);
var dbConn = mysql.createPool({
    host: cd.host,
    user: cd.user,
    password: cd.password,
    database: cd.database
});



// Retrieve all patients 
app.get('/patients', function (req, res) {
    console.log("SERVER: Getting Patients");
    dbConn.query('SELECT * FROM users WHERE accountType = "patient"', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'patients list.' });
    });
});

// Retrieve all practitioners 
app.get('/practitioners', function (req, res) {
    console.log("SERVER: Getting Practitioners");
    dbConn.query('SELECT * FROM users WHERE accountType = "practitioner"', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'practitioners list.' });
    });
});

// Validate User credentials
app.post('/validate-user', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let rememberMe = req.body.rememberMe;

    console.log("SERVER: got email '" + email + "' and password '" + password + "'.");
    console.log("SERVER: Will attempt to generate cookie: " + rememberMe);
    dbConn.query(`SELECT userId, password, accountType FROM users WHERE email="${email}"`, function (error, results, fields) {
        if (error) throw error;
        try {
            if (results[0].accountType == "patient") {
                console.log("Patient logged so return");
                return res.send({ error: false, data: { result: false, accountType: "patient" }, message: '403 Forbidden' });
            }
            if (password === results[0].password) {
                console.log("Correct Password");
                let cookie = "";
                if(rememberMe){
                        let cookie = Math.floor(100000000 + Math.random() * 900000000);
                        console.log("Trying cookie: " + cookie);
                        dbConn.query(`SELECT COUNT(1) as cookieCount FROM cookies WHERE cookie="${210120012}"`, function (error, cookieResults, fields) {
                            if (error) throw error;
                            console.log("Count: " + cookieResults[0].cookieCount);
                            if(cookieResults[0].cookieCount > 0) {
                                console.log("Already asigned cookie: " + cookieResults[0].userId);
                                console.log("Skipping Cookie Creation");
                                return res.send({ error: false, data: { result: true, accountType: results[0].accountType, userId: results[0].userId, cookie: cookie }, message: 'validated user.' });
            
                            } else {
                                let expiryUnix = Math.round((new Date()).getTime() / 1000) + 86400; //cookie valid for 86400 seconds (24 hours)
                                async function insertCookie() {
                                    await dbConn.query(`INSERT INTO cookies (cookie, userId, expiryUnix) VALUES (${cookie}, ${results[0].userId}, ${expiryUnix})`, function (error, cookieResults, fields) {
                                        if (error) throw error;
                                    });
                                    console.log("Returning cookie: " + cookie);
                                    return res.send({ error: false, data: { result: true, accountType: results[0].accountType, userId: results[0].userId, cookie: cookie }, message: 'validated user.' });
                                }
                                insertCookie();
                            }
                        });
                    console.log("Set cookie: " + cookie + " for user: " + results[0].userId);
    
                } else {
                    return res.send({ error: false, data: { result: true, accountType: results[0].accountType, userId: results[0].userId }, message: 'validated user.' });
                }      
                
            } else {
                console.log("Incorrect Password");
                return res.send({ error: false, data: { result: false, accountType: null, userId: null }, message: '403 Forbidden' });
            }
        } catch (error) {
            console.log(error);
            return res.send({ error: false, data: { result: false, accountType: null, userId: null }, message: '403 Forbidden' });

        }


    });
});
// Validate User credentials
app.post('/validate-cookie', function (req, res) {
    let cookie = req.body.cookie;
  
    console.log("SERVER: got cookie :" + cookie + ":");
    if (cookie == '') return res.send({ error: true, data: { result: false, userId: null }, message: 'Bad Cookie' });
    dbConn.query(`SELECT * FROM cookies WHERE cookie="${cookie}"`, function (error, results, fields) {
        if (error) throw error;
        try {
            if(results){
                console.log(results[0].cookie);
                console.log(results[0].userId);
                console.log(results[0].expiryUnix);
                return res.send({ error: false, data: { result: true, userId: results[0].userId }, message: 'Good Cookie' });

            } else {
                console.log("Incorrect Cookie");
                return res.send({ error: true, data: { result: false, userId: null }, message: 'Bad Cookie' });
            }
        } catch (error) {
            console.log(error);
            return res.send({ error: true, data: { result: false, userId: null }, message: '500 Internal Server Error' });

        }


    });
});

//Mobile login validation
app.post('/validate-user-mobile', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log("SERVER: got email '" + email + "' and password '" + password + "'.");
    dbConn.query(`SELECT userId, password, accountType FROM users WHERE email="${email}"`, function (error, results, fields) {
        if (error) throw error;
        try {
            if (results[0].accountType == "practitioner") {
                console.log("Practitioner logged so return");
                return res.send({ error: false, data: { result: false, accountType: "patient" }, message: '403 Forbidden' });
            }
            if (password === results[0].password) {
                console.log(password);
                console.log("Correct Password");
                return res.send({ error: false, data: { result: true, accountType: results[0].accountType, userId: results[0].userId }, message: 'validated user.' });
            } else {
                console.log("Incorrect Password");
                return res.send({ error: false, data: { result: false, accountType: null, userId: null }, message: '403 Forbidden' });
            }
        } catch (error) {
            return res.send({ error: false, data: { result: false, accountType: null, userId: null }, message: '403 Forbidden' });

        }
    });
});

app.post('/register-user', function (req, res) {
    let email = req.body.registrationDetails.email;
    let password = req.body.registrationDetails.password;
    let firstName = req.body.registrationDetails.firstName;
    let surname = req.body.registrationDetails.surname;
    let gender = req.body.registrationDetails.gender;
    let dob = req.body.registrationDetails.dob;
    let address1 = req.body.registrationDetails.address1;
    let address2 = req.body.registrationDetails.address2;
    let address3 = req.body.registrationDetails.address3;
    let postcode = req.body.registrationDetails.postcode;

    dbConn.query(`INSERT INTO users (email, password, firstTimeLogin, firstName, surname, gender, dob, address1, address2, address3, postcode, accountType) 
    VALUES ("${email}", "${password}", true, "${firstName}", "${surname}", "${gender}", "${dob}", "${address1}", "${address2}", "${address3}", "${postcode}", "patient")`, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'registration successful' });
    });
});

// Retrieve user by id 
app.get('/read-user/:id', function (req, res) {

    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('SELECT * FROM users where userId=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });

});
//////////// EXAMPLES BELOW ///////////////


//  Delete a user by userId
app.delete('/delete-user/:userId', function (req, res) {
    let user_id = req.params.userId;

    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE userId = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
    var unixNow = Math.round((new Date()).getTime() / 1000);
    console.log('Time: ' + unixNow);
});
module.exports = app;