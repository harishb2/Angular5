var express    = require('express');
var router     = express.Router();
bodyParser     = require('body-parser');
var fs = require('fs');

router.get('/studentdetails', (req, res)=>{
    fs.readFile('public/users.json', 'utf-8', function(err, data) {
        if (err) throw err    
        var arrayOfObjects = JSON.parse(data)
		res.json(arrayOfObjects); 
    });
});

router.post('/add', (req, res)=>{ 
	console.log("called");
	   
    var student =req.body;
    console.log(student);
    	fs.readFile('public/users.json', 'utf-8', function(err, data) {
		if (err) throw err
	
		var arrayOfObjects = JSON.parse(data)
		arrayOfObjects.users.push(student)

		console.log(arrayOfObjects)
	
		fs.writeFile('public/users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
			if (err) throw err
			console.log('Done!')
		})
	})
        
      
})
router.get('/edit/:id', (req,res)=>{
	console.log(req.params.id);
	    fs.readFile('public/users.json', 'utf-8', function(err, data) {
        if (err) throw err    
        var arrayOfObjects = JSON.parse(data)
		res.json(arrayOfObjects); 
    });

	

});

router.delete('/delete/:id', (req,res)=>{
	console.log(req.params.id);
	let removeUser = req.params.id;
	    fs.readFile('public/users.json', 'utf-8', function(err, data) {
		if (err) throw err 
		   
		var json  = JSON.parse(data);
		res.send(json);
		var users = json.users;
		console.log(users);		
		json.users = users.filter((user) => { return user.id !== removeUser });
		fs.writeFileSync('public/users.json', JSON.stringify(json, null, 2));
		res.json(users); 
    });

	

});

module.exports = router;