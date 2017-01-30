//Commands to install dependences
//npm config set save=true
//npm config set save-exact=true
//npm init
//npm install express --save
//npm install mongodb  --save
//npm install body-parser --save
//node server //to run proyect

var express = require('express');  //require is node function to import modules
var app = express();  //instance of express
var MongoClient = require('mongodb');  //mongodb
var bodyParser = require('body-parser');  //body-parser middleware

//connect to mongodb.  Remmember to replace the connection string below with your own string
MongoClient.connect('mongodb://marcial.hernandez:lily4522@jello.modulusmongo.net:27017/rupu3miZ', (err, database) => {
	if(err) return console.log(err)  //if error return error
		db=database

	app.listen(3000, function(){  // otherwise start server on port 3000
		console.log('listening on port 3000')
	})
})

//set Express to use EJS view engine instead of the default jade
app.set('view engine', 'ejs')
//add body-parser express middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//define our public directory to serve our static resources
app.use(express.static(__dirname+'/public'))


//define routes
app.get('/', (req, res) => {
	db.collection('purchaseDB').find().toArray(function(err, result){
		if (err) return console.log(err)
		//else render ejs
		res.render('index.ejs', {purchaseDB :result})
	})
})


//handle post request
app.post('/add', (req,res) => {
	db.collection('purchaseDB').save(req.body, (err, result) => {
		if (err) return console.log(err) //if error display in console
			console.log(req.body) //contains data user submits
			console.log('New entry saved to DB')  
			res.redirect('/')  //redirect to original route
	})
})

//handle delete based on DB id
app.get( '/destroy/:id', (req, res) => {  

	db.collection('purchaseDB', function(err, collection) {
		if(err) return console.log(err)  //if error display in console
			//else remove from DB
                       collection.remove({_id: new MongoClient.ObjectID(req.params.id)});
                       res.redirect('/')  //redirect to original route
});


})
