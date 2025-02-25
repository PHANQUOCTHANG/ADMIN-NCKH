const express = require("express") ;
const path = require('path') ; // mục đích chính dùng để up load file or thư nục ỏ đường dẫn .
const methodOverride = require("method-override") ; // chồng phương thứcthức
var bodyParser = require('body-parser') ; // lấy body  trên sever .
var flash = require('express-flash') ; // thông báo .
var cookieParser = require('cookie-parser') ; // cài cookies .
var session = require('express-session') ;
require("dotenv").config() ;

const database = require("./config/database") ;
// const url = process.env.URL ;
database.connect("mongodb+srv://phanquocthang211005:dEXJJoXm6OCbNtaa@cluster0.2thib.mongodb.net/NCKH") ;
// const systemConfig = require("./config/system") ;


const app = express() ;

// // method override
app.use(methodOverride('_method')) ;
// // end

// // body-parser .
app.use(bodyParser.urlencoded({ extended: false })) ;
// // end

// // flash
app.use(cookieParser('Phan Quoc Thang'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// // end



const port = 8080 ;
// app.locals.prefixAdmin = systemConfig.prefixAdmin ;

// file public.
app.use(express.static("public")) ;
// end


// // tiny mce 
// app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// // end


app.set("views" , "./views") ;
app.set("view engine" ,"pug") ;
const routesAdmin = require("./routes/admin/index.routes") ; 
// const routesClient = require("./routes/client/index.routes") ;
routesAdmin(app) ;
// routesClient(app) ;
app.listen (port , () => {
    console.log(port) ;
})
