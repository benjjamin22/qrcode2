import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

import accounts from './data.json' assert {type:"json"};

const port = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

// setup static folder
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

// Logger middleware
app.use(logger);



// Routes
app.use('/api/posts', posts);

//const accounts =  await readfile('{{./data.json}}').then(json=> JSON.parse(json)).catch(()=>null);
//const accounts =   JSON.parse('../data.json');


app.post('/login', async (req, res) => {
    try{
        const foundUser = accounts.find((data) => req.body.Password === data.pine);
        if (foundUser) {
                res.render('result',{Name:foundUser.Aname.Name,Mname:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,NIN:foundUser.NIN,Gender:foundUser.Gender,Day:foundUser.Ddateofbirth.Day,Month:foundUser.Ddateofbirth.Month,Year:foundUser.Ddateofbirth.Year,Presentclass:foundUser.Presentclass,Bloodgroup:foundUser.Bloodgroup,State:foundUser.State,School:foundUser.School,HometownCommunity:foundUser.HometownCommunity,ParentPhoneNo:foundUser.ParentPhoneNo,ParentPhoneNo2:foundUser.ParentPhoneNo2,Picturepath:foundUser.client,Status:foundUser.Status,id:foundUser.id});
                //res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello </h3></div><br><br><div align='center'><a href='./lohtml'>logout</a></div>`);
            } else {
            res.send("<div align ='center'><h2>Invalid ID NO /h2></div><br><br><div align ='center'><a href='wwww.isemb.mydatabase.com.ng'>login again</a></div>");
            }
        //}
       
    } catch{
        res.send("Internal server error");
        
    }
});

// Error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
