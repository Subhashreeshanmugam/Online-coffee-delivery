var databaseUrl = "BC-E9-2F-EB-B2-AC";
var mongojs = require("./node_modules/mongojs");
var db = mongojs(databaseUrl);
//var collections = db.collection("users");
console.log("Connected");

exports.authenticateUser = function(email, password, response) 
{
    console.log(email);
    console.log(password);
    db.users.find({ "email": email, "password": password },
        function(err, op) {
            
            if (err || !op) {
                response.write("..Not authorized user" || err);
                response.end();
            } else if (op.length == 0) {
                response.write("Not authorized user");
                response.end();
            } else {
                response.write("Authorized user");
                response.end();
            }

        });
}

exports.saveUser = function(email, password, response) 
{
    console.log('Saving user to mongo');
    db.users.insert({"email": email, "password": password },
        function(err, saved) {
            if (err || !saved)
                console.log(err);
            else
                response.write("Log In Successful");
                response.end();
        });
}

