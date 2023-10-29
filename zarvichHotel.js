const express = require('express');
var zarvich = express();
const db2 = require('./db2');
var dotenv = require('dotenv');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
dotenv.config();
var MongoUrl = "mongodb+srv://kinzoSplunk:C3t6vCWTtwPF8KW6@cluster0.5teh9bo.mongodb.net/?retryWrites=true&w=majority";
var cors = require('cors')
const bodyparser = require('body-parser');
const res = require('express/lib/response');
var port = process.env.PORT || 1500;
var db;
const AuthController = require('./auth/authController');



zarvich.use(bodyparser.urlencoded({extended:true}));
zarvich.use(bodyparser.json());
zarvich.use(cors());
zarvich.use(express());
zarvich.use('/api/auth', AuthController)

zarvich.get('/',(re,res)=>{
    res.send("This is root page")
})

//return all Categories
zarvich.get('/Categories', (req,res)=> {
    var query = {};
    console.log(req.query.id)
    if(req.query.id){
        query={roomtype_id:Number(req.query.id)}
    }
//return categories wrt category Name
    else if(req.query.mealnames){
        var catName = (req.query.catName)
        query={product:(catName)}
    }

    else if(req.query.cateID){
        var cateID = (req.query.cateID)
        query={productCategory:(cateID)}
    }

    db.collection('Products').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//return all Courses
zarvich.get('/courses', (req,res)=> {
    var query = {};
    console.log(req.query.id)
    if(req.query.id){
        query={roomtype_id:Number(req.query.id)}
    }
//return courses wrt courseName
    else if(req.query.cname){
        var cname = (req.query.cname)
        query={courseName:(cname)}
    }

//return courses wrt category
    else if(req.query.courseID){
        var courseID = (req.query.courseID)
        query={_id:(courseID)}
    }

    db.collection('Courses').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})



//Edit Courses
zarvich.put('/editcourses/:id',(req,res)=>{
    console.log(req.params.id);
    var id = (req.params.id)
    db.collection('Courses').updateOne(
        {_id:id},
        {
            $set: {
                courseName:req.body.courseName,
                productCategory:req.body.productCategory,
                price:req.body.price,
                image:req.body.image,
                duration:req.body.duration,
                description:req.body.description
                
            }
        },
        
    )
    res.send('data updated')      
  
})

//Edit Products
zarvich.put('/editproducts/:id',(req,res)=>{
    console.log(req.params.id);
    var id = (req.params.id)
    db.collection('Products').updateOne(
        {_id:id},
        {
            $set: {
                product:req.body.product,
                price:req.body.price,
                productCategory:req.body.productCategory,
                Productimage:req.body.Productimage,
                duration:req.body.duration,
                heading:req.body.heading
                
            }
        },
        
    )
    res.send('data updated')      
  
})

//delete a courses
zarvich.delete('/delCourse/:id',(req,res)=>{
    var id = req.params.id
    db.collection('Courses').deleteOne(
        {_id:id},(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


//delete a mealCategory
zarvich.delete('/delProduct/:id',(req,res)=>{
    var id = req.params.id
    db.collection('Products').deleteOne(
        {_id:id},(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// Post a new Course
zarvich.post('/addCourse',(req,res)=>{
	console.log(req.body);
	db.collection('Courses').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Check in Complete")
	})
})



// Post a new Category
zarvich.post('/addNewCategory',(req,res)=>{
	console.log(req.body);
	db.collection('Products').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Check in Complete")
	})
})

// Post a new contact msg
zarvich.post('/contactUs',(req,res)=>{
	console.log(req.body);
	db.collection('contact').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Check in Complete")
	})
})

// Post a new HomeCarousel
zarvich.post('/addCarousel',(req,res)=>{
	console.log(req.body);
	db.collection('homepageCarousel').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Complete")
	})
})

// Register for a course
zarvich.post('/register',(req,res)=>{
	console.log(req.body);
	db.collection('programReg').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Complete")
	})
})

// Register new Account
zarvich.post('/newAccount',(req,res)=>{
	console.log(req.body);
	db.collection('newAccounts').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Complete")
	})
})

// Post to cart
zarvich.post('/addtocart',(req,res)=>{
	console.log(req.body);
	db.collection('Cart').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Complete")
	})
})

// Post to messages
zarvich.post('/enquiries',(req,res)=>{
	console.log(req.body);
	db.collection('Messages').insertOne(req.body,(err,result)=>{
		if(err) throw err;
		res.send("Complete")
	})
})



//get customers
zarvich.get('/getNewAccounts', (req,res)=> {
    var query = {};
    console.log(req.query.id)
    if(req.query.id){
        query={roomtype_id:Number(req.query.id)}
    }
   db.collection('newAccounts').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//get customers
zarvich.get('/allMessages', (req,res)=> {
    var query = {};
    console.log(req.query.id)
    if(req.query.id){
        query={roomtype_id:Number(req.query.id)}
    }
   db.collection('Messages').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//get meal order
zarvich.get('/getRegs', (req,res)=> {
    var query = {};
    console.log(req.query.id)
    if(req.query.id){
        query={roomtype_id:Number(req.query.id)}
    }

//return meal order wrt orderNum
    else if (req.query.orderNum){
        var orderNum=(req.query.orderNum)
        query={'orderID':(orderNum)}
    }

   db.collection('programReg').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//get cart items
zarvich.get('/cart', (req,res)=> {
    var query = {};
    console.log(req.query.id)
    if(req.query.id){
        query={roomtype_id:Number(req.query.id)}
    }

//return cart order wrt userID
    else if (req.query.cartUserID){
        var cartUserID=(req.query.cartUserID)
        query={'userID':(cartUserID)}
    }

   db.collection('Cart').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


////////////////////////////////////////////////////////Funmi

MongoClient.connect(MongoUrl, (err,client) => {
    if(err) console.log("error while connecting");
    db = client.db('KinzoTraining');
    zarvich.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})

