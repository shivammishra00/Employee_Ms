const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 

const app = express();
app.use(bodyParser.json());
app.use(cors({             //// cookie store karaya yaha par 
    origin: ["http://localhost:3000"],  // jis url me form chal raha hai  
    methods: ["GET","POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

const adminRouter = require('./Route/empRoute/adminRoute.js');
const categoryRouter = require('./Route/empRoute/categoryRoute.js')
const  empRouter = require('./Route/empRoute/employeeRoute.js')
const verifyRoute = require('./Route/empRoute/verifyUserRoute.js')
app.use("/", adminRouter)
app.use("/", categoryRouter)
app.use("/", empRouter)
app.use("/", verifyRoute)

app.use(express.static('Public'))   /// for image show in dom  




const port = 5001;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})