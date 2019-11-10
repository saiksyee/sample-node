const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const dotenv = require('dotenv').config()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var dbConfig = {
    server: process.env.E_server,
    database: process.env.E_database,
    user: process.env.E_user,
    password: process.env.E_password,
    port: process.env.E_port
};
app.post('/checkUser', function (req, res) {
    let reqUserName, reqPassword;
    reqUserName = req.body.email;
    reqPassword = req.body.password;
    var Sqlquery = "select * from tl_user where username='" + reqUserName + "' and password='" + reqPassword + "'";
    QueryToExecuteInDatabase(res, Sqlquery);
});
var QueryToExecuteInDatabase = function (response, strQuery) {
    sql.close();
    sql.connect(dbConfig, function (error) {
        if (error) {
            console.log("Error while connecting to database :- " + error);
            response.send(error);
        }
        else {
            var request = new sql.Request();
            request.query(strQuery, function (error, responseResult) {
                if (error) {
                    console.log("Error while connecting to database:- " + error);
                    response.send(error);
                }
                else {
                    response.send(responseResult);
                }
            });
        }
    });
}

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("app listening at ", port)
});
