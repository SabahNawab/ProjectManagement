var express = require("express");
var mysql = require("mysql");
var app = express();
const cors = require('cors');

var connection = require("./data");

app.use(express.json());
app.use(cors());

app.post('/login', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let sql = "SELECT * FROM User_ WHERE Email = ? AND Password_ = ?;";
    connection.query(sql, [email, password], function(err, results) {
        if(err) throw err;

        if(results == null || results.length == 0) {
            res.send("Invalid username or password");
        } else {
            res.send(results);
        }
    });
});

app.post('/getProject', function(req, res) {
    var user = req.body.UserID;
    console.log(user);

    let sql = "SELECT * FROM User_  JOIN ProjectManager ON User_.UserID = ProjectManager.Userid JOIN Project ON Project.ManagerID = ProjectManager.ManagerID JOIN Customer ON Project.custid = Customer.CustomerID WHERE User_.UserID = ? ;"

    connection.query(sql, [user], function(err, results) {
        if(err) throw err;

        if(results == null || results.length == 0) {
            res.send("No Project Found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});

app.post('/getAllProject', function(req, res) {

    let sql = "SELECT * FROM Project;"
    connection.query(sql, function(err, results) {
        if(err) throw err;

        if(results == null || results.length == 0) {
            res.send("No Project Found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});





app.post('/addProject', function(req, res) {
    var project = req.body;
    console.log(project);

    let sql = "INSERT INTO Project (ProjectName, ProjectID, DueDate, managerid, custid, adminid) VALUES (?, ?, ?, ?, ?, ?);"

    connection.query(sql, [project.ProjectName, project.ProjectID, project.DueDate, project.managerid, project.custid, project.adminid], function(err, results) {
        if(err) throw err;

        if(results == null || results.length == 0) {
            res.send("No Project Found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});


app.post('/getProjectDetails', function(req, res) {
    var project = req.body.pid;

   let sql = "SELECT * FROM Board WHERE pid = ? limit 1;"
    connection.query(sql, [project], function(err, results) {
        if(err) throw err;

        if(results == null || results.length == 0) {
            res.send("No Board Found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});

app.post('/getDecks', function(req, res) {
    var board = req.body.boardid;

    let sql = "SELECT DeckId, DeckTitle FROM Deck;"

    connection.query(sql, [board], function(err, results) {
        if(err) throw err;

        if(results == null || results.length == 0) {
            res.send("No Decks Found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});


app.post('/getCards', function(req, res) {
    var deck = req.body.deckid;

    let sql = "SELECT Name_, Description_ FROM card WHERE DeckID = ?;"

    connection.query(sql, [deck], function(err, results) {
        if(err) throw err;

        if(results == null || results.length == 0) {
            res.send("No Cards Found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});

app.post('/addCard', function(req, res) {
    var card = req.body;

    let sql = "INSERT INTO card (CardId, Name_, Description_, deckid) VALUES (?, ?, ?, ?);"

    connection.query(sql, [card.CardId, card.Name_, card.Description_, card.deckid], function(err, results) {
        // check for errors and if err is of type duplicate entry, send back a message saying that the card already exists
        if(err) {
            if(err.code == 'ER_DUP_ENTRY') {
                res.send("Card already exists");
            }
            else {
                throw err;
            }
        }

        if(results == null || results.length == 0) {
            res.send("No Cards Found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});

app.get('/getIssueCount', function(req, res) {
    let sql = "SELECT * FROM Issue;"

    connection.query(sql, function(err, results) {
        if(err) throw err;

        if(results == null || results.length == 0) {
            res.send("No Issues Found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});
    

app.post('/addIssue', function(req, res) {
    var issue = req.body;

    let sql = "INSERT INTO Issue VALUES (?, ?, ?, ?);"

    connection.query(sql, [issue.IssueID, issue.Description_, issue.typeid, issue.pid], function(err, results) {
        if(err) throw err;

        if(results == null || results.length == 0) {
            res.send("No Issues Found");
        } else {
            res.send(results);
            console.log(results);
        }
    });
});


app.listen(8080, ()=> {
    console.log('App listening on port 8080');
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database Connected!');
    });

});

