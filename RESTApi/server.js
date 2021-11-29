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

/** GET */

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
        //setTimeout(function() { //EXAMPLE DELAY TO SHOW THE LOADING SCREEN (2 SECOND DELAY)
        return res.send({ error: false, data: results, message: 'practitioners list.' });
        //  }, 500);
    });
});

// Retrieve all practices
app.get('/practices', function (req, res) {
    console.log("SERVER: Getting Practices");
    dbConn.query('SELECT * FROM practices', function (error, results, fields) {
        if (error) throw error;
        //setTimeout(function() { //EXAMPLE DELAY TO SHOW THE LOADING SCREEN (2 SECOND DELAY)
            return res.send({ error: false, data: results, message: 'practices list.' });
        //  }, 500);
    });
});

// Retrieve all patients from practice
app.post('/get-practice-patients', function (req, res) {
    console.log("SERVER: Getting Patients from Practice");
    let practiceId = req.body.practiceId;
    dbConn.query(`SELECT users.* FROM users INNER JOIN practiceuserlinks ON users.userId = practiceuserlinks.userId INNER JOIN practices ON practices.practiceId = practiceuserlinks.practiceId WHERE practices.practiceId = ${practiceId} AND users.accountType = 'patient';`, function (error, results, fields) {
        if (error) throw error;
        let patientResults = results;

        dbConn.query(`SELECT practiceName FROM practices WHERE practiceId = ${practiceId}`, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            return res.send({ error: false, data: {practiceName: results[0].practiceName, patientsResults: patientResults}, message: 'practice patient list.' });

        });


    });


});
// Retrieve all requests 
app.post('/get-requests', function (req, res) {
    console.log("SERVER: Getting Requests");
    let status = req.body.status;
    if(status == "Pending" || status == "Approved" || status == "Rejected"){
        dbConn.query(`SELECT requests.*, madeBy.email AS "madeBy_email", reviewedBy.email as "reviewedBy_email" FROM requests INNER JOIN users madeBy on requests.madeBy = madeBy.userId LEFT JOIN users reviewedBy on requests.reviewedBy = reviewedBy.userId WHERE requests.status="${status}"`, function (error, results) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'requests list.' });
        });
    }else{
        return res.send({ error: true, data: results, message: 'requests list error invalid status.' });

    }
    
});
// Retrieve all films 
app.get('/films', function (req, res) {
    console.log("SERVER: Getting Films");
    dbConn.query('SELECT * FROM films', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'films list.' });
    });
});

app.get('/triggers', function (req, res) {
    console.log("SERVER: Getting Triggers");
    dbConn.query('SELECT * FROM triggers', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'practitioners list.' });
    });
});

// Retrieve all requests
app.get('/requests', function (req, res ) {
    console.log("SERVER: Getting Requests");
    dbConn.query('SELECT * FROM requests', function (error, results ) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'requests list'});
    })
})

// Retrieve all user requests
app.get('/requests/:id', function (req, res ) {
    let userId = req.params.id;
    console.log("SERVER: Getting Requests for user" + userId);
    if (!userId) {
        return res.status(400).send({ error: true, message: 'Please provide userId' });
    }
    dbConn.query('SELECT * FROM requests where madeBy=?', userId, function (error, results) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'requests list for user'});
    })
})

// Retrieve user by id 
app.get('/read-user/:id', function (req, res) {
    let user_id = req.params.id;

    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

    dbConn.query('SELECT * FROM users where userId=?', user_id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
});

// Retrieve user by id 
app.get('/epilepsy-information/:id', function (req, res) {
    let user_id = req.params.id;
    let hasResults;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('SELECT userId, seizureType, frequency, yearsSuffering, triggerDetails FROM epilepsydetails WHERE userId=?', user_id, function (error, results) {
        if (error) throw error;
        if (results[0] === undefined) {
            hasResults = false;
            return res.send({ error: false, data: hasResults, message: 'User does not have epileptic details currently set' });
        }
        return res.send({ error: false, data: { hasResults: hasResults, results: results[0] }, message: 'Epileptic details' });
    });
});

/** GET Ends */

/** POST */

app.post('/create-film-request', function (req, res){
    console.log(req.body);
    let userId = req.body.id;
    let filmName = req.body.filmDetails.filmName;
    let filmDesc = req.body.filmDetails.filmDesc;
    let genre = req.body.filmDetails.genre;
    let runtime = req.body.filmDetails.runtime;

    dbConn.query(`INSERT INTO requests (madeBy, details, status) VALUES (${userId},'{"requestType": "New Film", "data":{"filmName":"${filmName}", "filmDesc":"${filmDesc}", "genre":"${genre}", "runtime":"${runtime}"}}',"PENDING")`, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New film request successful' })
    });
});

app.post('/create-trigger-request', function (req, res){
    console.log(req.body);
    let userId = req.body.id;
    let film = req.body.triggerDetails.film;
    let timestamp = req.body.triggerDetails.timestamp;
    let details = req.body.triggerDetails.details;
    

    dbConn.query(`INSERT INTO requests (madeBy, details, status) VALUES (${userId},'{"requestType": "New Trigger", "data":{"filmName":"${film}","timestamp":"${timestamp}" ,"details":"${details}"}}',"PENDING")`, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New trigger request successful' })
    });
});

app.post('/log-seizure', function (req, res){
    console.log(req.body);
    let userId = req.body.id;
    let trigger = req.body.seizureDetails.trigger;
    let severity = req.body.seizureDetails.severity;
    let details = req.body.seizureDetails.details;
    
    dbConn.query(`INSERT INTO events (userId, triggerId, severity, details) VALUES (${userId},${trigger},${severity},"${details}")`, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Seizure successfully logged' })
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
    console.log("SERVER: Validating :" + cookie + ":");
    if (cookie == '') return res.send({ error: true, data: { result: false, userId: null }, message: 'Bad Cookie' });
    dbConn.query(`SELECT * FROM cookies WHERE cookie="${cookie}"`, function (error, results, fields) {
        if (error) throw error;
        try {
            if(results){
                return res.send({ error: false, data: { result: true, userId: results[0].userId }, message: 'Good Cookie' });
            } else {
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
//Update practice details
app.post('/update-practice', function (req, res) {
  console.log("UPDATING PRACTICE");

  let practiceId = req.body.data.practiceId
  let practiceName = req.body.data.practiceName;
  let address1 = req.body.data.address1;
  let address2 = req.body.data.address2;
  let address3 = req.body.data.address3;
  let postcode = req.body.data.postcode;
  let telephone = req.body.data.telephone;

  dbConn.query(`UPDATE practices SET practiceName="${practiceName}", address1="${address1}", address2="${address2}", address3="${address3}" , postcode="${postcode}", telephone="${telephone}" WHERE practiceId="${practiceId}"`, function (error, results) {
      if (error) {
          console.log(error);
          return res.send({ error: true, message: 'update unsuccessful' });
      }
      return res.send({ error: false, data: results, message: 'update successful' });
  });
});
// Retrieve practice by id 
app.get('/read-practice/:id', function (req, res) {

  let practiceId = req.params.id;
  if (!practiceId) {
      return res.status(400).send({ error: true, message: 'Please provide practiceId' });
  }
  dbConn.query('SELECT * FROM practices where practiceId=?', practiceId, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'users list.' });
  });

});
//Update user details
app.post('/update-user', function (req, res) {
    console.log("UPDATING");

    let userId = req.body.data.userId
    let email = req.body.data.email;
    let firstName = req.body.data.firstName;
    let surname = req.body.data.surname;
    let gender = req.body.data.gender;
    let dob = req.body.data.dob;
    let address1 = req.body.data.address1;
    let address2 = req.body.data.address2;
    let address3 = req.body.data.address3;
    let postcode = req.body.data.postcode;

    dbConn.query(`UPDATE users SET email="${email}", firstName="${firstName}", surname="${surname}", gender="${gender}", dob="${dob}", address1="${address1}", address2="${address2}", address3="${address3}" , postcode="${postcode}" WHERE userId="${userId}"`, function (error, results) {
        if (error) {
            return res.send({ error: true, message: 'update unsuccessful' });
        }
        return res.send({ error: false, data: results, message: 'update successful' });
    });
});
//Create user
app.post('/create-user', function (req, res) {
    console.log("Creating user");

    let email = req.body.data.email;
    let firstName = req.body.data.firstName;
    let surname = req.body.data.surname;
    let gender = req.body.data.gender;
    let dob = req.body.data.dob;
    let address1 = req.body.data.address1;
    let address2 = req.body.data.address2;
    let address3 = req.body.data.address3;
    let postcode = req.body.data.postcode;
    let accountType = req.body.data.accountType;

    dbConn.query(`INSERT INTO users (email, password, firstTimeLogin, firstName, surname, gender, dob, address1, address2, address3, postcode, accountType) VALUES ("${email}", "pass", true, "${firstName}", "${surname}", "${gender}", "${dob}", "${address1}", "${address2}", "${address3}", "${postcode}", "${accountType}")`, function (error, results) {
        if (error) {
            console.error(error);
            return res.send({ error: true, data: error, message: 'user creation unsuccessful' });
        }
        return res.send({ error: false, data: results, message: 'user creation successful' });
    });
});
//Create practice
app.post('/create-practice', function (req, res) {
    console.log("Creating practice");

    let practiceName = req.body.data.practiceName;
    let address1 = req.body.data.address1;
    let address2 = req.body.data.address2;
    let address3 = req.body.data.address3;
    let postcode = req.body.data.postcode;
    let telephone = req.body.data.telephone;

    dbConn.query(`INSERT INTO practices (practiceName, address1, address2, address3, postcode, telephone) VALUES ("${practiceName}", "${address1}", "${address2}", "${address3}", "${postcode}", "${telephone}")`, function (error, results) {
        if (error) {
            console.error(error);
            return res.send({ error: true, data: error, message: 'practice creation unsuccessful' });
        }
        return res.send({ error: false, data: results, message: 'practice creation successful' });
    });
});
//Create practice user link
app.post('/add-practice-link', function (req, res) {
    console.log("adding user practice link");

    let userId = req.body.data.userId;
    let practiceId = req.body.data.practiceId;

    dbConn.query(`INSERT INTO practiceuserlinks (userId, practiceId) VALUES ("${userId}", "${practiceId}")`, function (error, results) {
        if (error) {
            console.error(error);
            return res.send({ error: true, data: error, message: 'practice user link creation unsuccessful' });
        }
        return res.send({ error: false, data: results, message: 'practice user link  creation successful' });
    });
});
//Get user practice links
app.post('/user-practices', function (req, res) {
    console.log("Getting user practice links");

    let userId = req.body.userId;

    dbConn.query(`SELECT practices.practiceId, practices.practiceName, practices.address1, practices.address2, practices.postcode, practices.telephone FROM practiceuserlinks INNER JOIN practices ON practiceuserlinks.practiceId = practices.practiceId WHERE userId='${userId}';`, function (error, results) {
        if (error) {
            console.error(error);
            return res.send({ error: true, data: error, message: 'user practice link get unsuccessful' });
        }
        return res.send({ error: false, data: results, message: 'user practice link get successful' });
    });
});
//Delete user practice link
app.post('/delete-user-practice-link', function (req, res) {
    console.log("Deleting user practice link");

    let userId = req.body.userId;
    let practiceId = req.body.practiceId;

    dbConn.query(`DELETE FROM practiceuserlinks WHERE userId='${userId}' AND practiceId='${practiceId}'`, function (error, results) {
        if (error) {
            console.error(error);
            return res.send({ error: true, data: error, message: 'user practice link deleted unsuccessful' });
        }
        return res.send({ error: false, data: results, message: 'user practice link deleted successful' });
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


app.post('/insert-epilepsy-information', function (req, res) {
    console.log(req.body);
    let userId = req.body.id;
    let seizureType = req.body.epilepsyDetails.seizureType;
    let triggerDetails = req.body.epilepsyDetails.triggerDetails;
    let yearsSuffering = req.body.epilepsyDetails.yearsSuffering;
    let frequency = req.body.epilepsyDetails.frequency;

    dbConn.query(`INSERT INTO epilepsydetails (userId, seizureType, triggerDetails, yearsSuffering, frequency)
    VALUES (${userId}, "${seizureType}", "${triggerDetails}", ${yearsSuffering}, "${frequency}")`, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'successfully inserted user epilepsy details' })
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

app.put('/update-user/:userId', function (req, res) {
    let userId = req.params.userId;
    let email = req.body.updateDetails.email;
    let gender = req.body.updateDetails.gender;
    let password = req.body.updateDetails.password;
    let address1 = req.body.updateDetails.address1;
    let address2 = req.body.updateDetails.address2;
    let address3 = req.body.updateDetails.address3;
    let postcode = req.body.updateDetails.postcode;

    dbConn.query(`UPDATE users SET email = "${email}", password = "${password}", gender = "${gender}", address1 = "${address1}", address2 = "${address2}", address3 = "${address3}", postcode = "${postcode}" where userId = "${userId}" `, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
});


app.put('/update-epilepsy-information/:userId', function (req, res) {
    let userId = req.params.userId;
    let seizureType = req.body.epilepsyDetails.seizureType;
    let triggerDetails = req.body.epilepsyDetails.triggerDetails;
    let yearsSuffering = req.body.epilepsyDetails.yearsSuffering;
    let frequency = req.body.epilepsyDetails.frequency;
    dbConn.query(`UPDATE epilepsydetails SET seizureType = "${seizureType}", frequency = "${frequency}", yearsSuffering = "${yearsSuffering}", triggerDetails = "${triggerDetails}" where userId = "${userId}" `, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Users epilepsy details has been updated successfully.' });
    })
})

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

//  Delete a practice by practiceId
app.delete('/delete-practice/:practiceId', function (req, res) {
    let practiceId = req.params.practiceId;

    if (!practiceId) {
        return res.status(400).send({ error: true, message: 'Please provide practiceId' });
    }
    dbConn.query('DELETE FROM practices WHERE practiceId = ?', [practiceId], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Practice has been deleted successfully.' });
    });
});


// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
    var unixNow = Math.round((new Date()).getTime() / 1000);
    console.log('Time: ' + unixNow);
});
module.exports = app;