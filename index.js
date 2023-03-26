const express = require("express");
const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("node_modules"));

const mysql = require("mysql");

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password :"",
    database :"node_express"
})
con.connect((err)=>{
    if (err) throw err;

    con.query("select * from products", (err,data)=>{
        console.log(data)
    })
    console.log("Mysql bağlantısı yapildi");
})

const urunler = [
    {
        id :1, name : "iphone 14", price : 17000,isHome : true, isActive : true, imgUrl : "1.jpg"
    },
    {
        id :2, name : "iphone 15", price : 27000, isHome: false,isActive : true, imgUrl : "2.jpg"
    },
    {
        id :3, name : "iphone 16", price : 37000,isHome : true, isActive : true, imgUrl : "3.jpg"
    }
];
 


//routes
app.use("/products/:id", (req,res) =>{
    const urun = urunler.find(u => u.id == req.params.id)
    res.render("products-details" , urun);  //id numarlarına göre filtreleme yapar.
}); 

//urunler objesi product url renderlanacak
app.use("/products", (req, res) =>{
    res.render("products",{urunler});
})

app.use("/", (req, res) =>{
    res.render("index", {urunler});
})


app.listen(3000, () =>{
    console.log("Listening on port 3000");
});