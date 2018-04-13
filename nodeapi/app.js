var express    = require('express');
var app		   = express();
var bodyParser = require('body-parser');
var fs = require('fs');

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({}));

app.get('/',  (req, res)=>{
    res.send("hi");
});

var api = require('./app/usercrud');
app.use('/api',api);


//file data


//require('./app/routes')(app);

var PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
	console.log('server is running on '+PORT);
});