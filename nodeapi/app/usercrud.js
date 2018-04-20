var express = require('express');
var router = express.Router();
bodyParser = require('body-parser');
var fs = require('fs');
var jwt = require('jsonwebtoken');

router.get('/studentdetails', (req, res) => {
    fs.readFile('public/users.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        res.json(arrayOfObjects);
    });
});

router.post('/add', (req, res) => {
    var student = req.body;
    fs.readFile('public/users.json', 'utf-8', function(err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.users.push(student)
        fs.writeFileSync('public/users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
        })
    })
})


router.get('/edit/:id', (req, res) => {
    fs.readFile('public/users.json', 'utf-8', function(err, data) {
        if (err) throw err
        const id = req.param.id;
        var json = JSON.parse(data);
        var users = json.users;
        const index = users.findIndex(item => item.id == req.params.id);
        res.json(users[index]);
    });
});

router.put('/update/', (req, res) => {

    fs.readFile('public/users.json', 'utf-8', function(err, data) {
        if (err) throw err
        const id = req.body.id;
        var json = JSON.parse(data);
        var users = json.users;
        const index = users.findIndex(item => item.id == req.body.id);
    });
});

router.delete('/delete/:id', (req, res) => {
    let removeUser = req.params.id;
    fs.readFile('public/users.json', 'utf-8', function(err, data) {
        if (err) throw err

        var json = JSON.parse(data);
        var users = json.users;
        json.users = users.filter((user) => { return user.id !== removeUser });
        fs.writeFileSync('public/users.json', JSON.stringify(json, null, 2));
        res.json(users);
    });
});

router.post('/login', (req, res) => {
    var student = {
        username: req.body.username,
        password: req.body.password
    }

    fs.readFile('public/users.json', 'utf-8', function(err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
        for (let user of arrayOfObjects.users) {
            if (student.username === user.username && student.password === user.password) {
                this.logeduser = user.username;
                let token = jwt.sign({
                    data: this.logeduser
                }, 'secret', { expiresIn: '4h' });
                let userr = this.logeduser;
                res.send({
                    user: userr,
                    token: token,
                });
                /*       if (typeof localStorage === "undefined" || localStorage === null) {
                          var LocalStorage = require('node-localstorage').LocalStorage;
                          localStorage = new LocalStorage('./scratch');
                          localStorage.setItem("user", JSON.stringify(this.logeduser));
                          console.log(localStorage.getItem('user'));
                          res.json(this.logeduser);
                      } */
            }
        }
    })
})

module.exports = router;