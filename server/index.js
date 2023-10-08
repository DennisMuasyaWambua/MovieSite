const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app  = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud'
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req,res)=>{
    const select = "SELECT * FROM movie_review;"
    db.query(select,(err, result)=>{
        res.send(result);
        console.log(result);
    });

});

app.post('/api/insert',(req,res)=>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const insert = 'INSERT INTO movie_review(movie_name, movie_review) VALUES(?,?);'
    db.query(insert,[movieName, movieReview],(err, result)=>{
            console.log(result);
    });
})
app.listen(3001,()=>{
    console.log("running on port 3001")
})
