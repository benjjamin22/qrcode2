import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
import fs from 'fs' ;
import cors from 'cors' ;
import cookieParser from 'cookie-parser';
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import cron from 'node-cron';
import axios from 'axios';
import twilio from 'twilio';

const port = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accounts = JSON.parse(fs.readFileSync('./data.json','utf-8'));
const keys = JSON.parse(fs.readFileSync('./pass.json','utf-8'));


const serverUrl = 'http://isemb.mydatabase.com.ng';

const keepAlive = () => {
    axios.get(serverUrl)
        .then(response => {
            console.log(`server response with status:${response.status}`)
        })
        .catch(error => {
            console.log(`error keeping server alive:${error.message}`)
        })
}

//Schedule the task to run every 5 minutes
cron.schedule('*/14 * * * *', () => {
    console.log('Sending keep-alive request to server...');
    keepAlive();
});

const app = express();


console.log('Keep-alive script started.');

app.use(session({
    secret: uuidv4(),
    resave: 'false',
    saveUninitialized: true,
    httpOnly: true,
    sameSite: 'strict',
    cookie: { maxAge: 20 * 60 * 1000}
}));


// setup static folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

// Logger middleware
app.use(logger);
app.use(cors())
app.use(cookieParser());


// Routes
app.use('/api/posts', posts);
app.use('/api/posts/ff', posts);


app.post('/login', async (req, res) => {
    try{
        const foundUser = accounts.find((data) => req.body.Password === data.pine || req.body.ParentPhoneNo === data.ParentPhoneNo);
        if (foundUser) {
            req.session.user = foundUser.pine;
                res.render('result',{Name:foundUser.Aname.Name,Mname:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,
                    NIN:foundUser.NIN,Gender:foundUser.Gender,Day:foundUser.Ddateofbirth.Day,Month:foundUser.Ddateofbirth.Month,
                    Year:foundUser.Ddateofbirth.Year,Presentclass:foundUser.Presentclass,Bloodgroup:foundUser.Bloodgroup,
                    State:foundUser.State,School:foundUser.School,HometownCommunity:foundUser.HometownCommunity,
                    ParentPhoneNo:foundUser.ParentPhoneNo,ParentPhoneNo2:foundUser.ParentPhoneNo2,Picturepath:foundUser.client,
                    Status:foundUser.Status,id:foundUser.id,Status:foundUser.Status,time:foundUser.time});
            } else {
                res.render('ddx');
            }
       
    } catch{
        res.send("Internal server error");
        
    }
});

app.use((req,res,next)=>{
    if(req.body && typeof req.body === 'object'){
        for(const key in req.body){
            if(typeof req.body[key] ==='string'){
                req.body[key] = req.body[key].toUpperCase();
            }
        }
    }
    next()
})


app.post('/search', async (req,res) => {
        try{
            const foundUser = accounts.find((data) => req.body.firstName === data.Aname.Name && req.body.MiddleName === data.Aname.Mname && req.body.SurName === data.Aname.Surname && req.body.ParentPhoneNo === data.ParentPhoneNo);
            if (foundUser) {
            //req.session.user = foundUser.pine;
                //res.render('result',{id:foundUser.pine});
                res.render('myid',{id:foundUser.pine,firstname:foundUser.Aname.Name,MiddleName:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,ParentPhoneNo:foundUser.ParentPhoneNo});
                //res.send(`<!DOCTYPE html><html><body><h1 style="font-size:6rem; margin-top:8rem;text-align: center;">${foundUser.pine}</h1>
                   // </html>`)
            } else {
                res.render('ddx');
            }
       
    } catch{
        res.send("Internal server error");
        
    }
});


const accountsid = 'AC61a0d25393f98eae02d11b8baa985bf2';
const Token = 'f03be1c4dc97b2aea3b0cf68409ca607';
const client = twilio(accountsid,Token);

app.post('/sendsms', (req,res) => {
    //const foundUser = accounts.find((data) => req.body.firstName === data.Aname.Name && req.body.MiddleName === data.Aname.Mname && req.body.SurName === data.Aname.Surname && req.body.ParentPhoneNo === data.ParentPhoneNo);
            //if (foundUser){
 //const contacts = accounts
 //foundUser.forEach(contact =>{
    //const peronalmessages = `here is your credentials ParentPhoneNo :${foundUser.ParentPhoneNo} and id number:${foundUser.pine} visit https://isemb.mydatabase.com.ng to download your id slip`;
    client.messages
        .create({
            body:'peronalmessages',
            from: +16086236616,
            //to:foundUser..ParentPhoneNo
            to:2348037722780
    })
    res.status(200).send('SMS sent to all contact')
 //})
//} else {
    //res.render('ddx');
//}
});








const key1= keys.filter((data) => "ARMY DAY SECONDARY SCHOOL OBINZE OWERRI " === data.School);
app.post('/ARMY', (req, res) => {
    const  credential = key1.find((data) => req.body.Password === data.pine );
    if(credential) {
        req.session.user = credential.pine;
        res.redirect('/ARMYY');
    }
    else {
        res.render('ddx');
    }
})
app.get('/ARMYY', (req, res) => {
    if(req.session.user) {
        res.sendFile(path.join(__dirname, 'public','/ARMY/index.html'));
    }
    else {
        res.render('ddx');
    }
})

const key0= keys.filter((data) => "ARMY DAY SECONDARY SCHOOL OBINZE OWERRI " === data.School);
app.post('/isemb', (req, res) => {
    const  credential = key0.find((data) => req.body.Password === data.pine );
    if(credential) {
        req.session.user = credential.pine;
        res.redirect('/isembb');
    }
    else {
        res.render('ddx');
    }
})
app.get('/isembb', (req, res) => {
    if(req.session.user) {
        res.sendFile(path.join(__dirname, 'public','/ISEMBO/index.html'));
    }
    else {
        res.render('ddx');
    }
})


const key2= keys.filter((data) => "ARMY DAY SECONDARY SCHOOL OBINZE OWERRI " === data.School);
app.post('/AGSSA', (req, res) => {
    const  credential = key2.find((data) => req.body.Password === data.pine );
    if(credential) {
        req.session.user = credential.pine;
        res.redirect('/AGSSAA');
    }
    else {
        res.render('ddx');
    }
})
app.get('/AGSSAA', (req, res) => {
    if(req.session.user) {
        res.sendFile(path.join(__dirname, 'public','/AGSSA/index.html'));
    }
    else {
        res.render('ddx');
    }
})

const key3= keys.filter((data) => "ARMY DAY SECONDARY SCHOOL OBINZE OWERRI " === data.School);
app.post('/Orogwe', (req, res) => {
    const  credential = key3.find((data) => req.body.Password === data.pine );
    if(credential) {
        req.session.user = credential.pine;
        res.redirect('/Orogwee');
    }
    else {
        res.render('ddx');
    }
})
app.get('/Orogwee', (req, res) => {
    if(req.session.user) {
        res.sendFile(path.join(__dirname, 'public','/CSSO/index.html'));
    }
    else {
        res.render('ddx');
    }
})

const key4= keys.filter((data) => "ARMY DAY SECONDARY SCHOOL OBINZE OWERRI " === data.School);
app.post('/Ndegwu', (req, res) => {
    const  credential = key4.find((data) => req.body.Password === data.pine );
    if(credential) {
        req.session.user = credential.pine;
        res.redirect('/Ndegwuu');
    }
    else {
        res.render('ddx');
    }
})
app.get('/Ndegwuu', (req, res) => {
    if(req.session.user) {
        res.sendFile(path.join(__dirname, 'public','/NSSU/index.html'));
    }
    else {
        res.render('ddx');
    }
})

const key5= keys.filter((data) => "ARMY DAY SECONDARY SCHOOL OBINZE OWERRI " === data.School);
app.post('/Owerri', (req, res) => {
    const  credential = key5.find((data) => req.body.Password === data.pine );
    if(credential) {
        req.session.user = credential.pine;
        res.redirect('/Owerrii');
    }
    else {
        res.render('ddx');
    }
})
app.get('/Owerrii', (req, res) => {
    if(req.session.user) {
        res.sendFile(path.join(__dirname, 'public','/OCSS/index.html'));
    }
    else {
        res.render('ddx');
    }
})

const key6= keys.filter((data) => "ARMY DAY SECONDARY SCHOOL OBINZE OWERRI " === data.School);
app.post('/Uratta', (req, res) => {
    const  credential = key6.find((data) => req.body.Password === data.pine );
    if(credential) {
        req.session.user = credential.pine;
        res.redirect('/Urattaa');
    }
    else {
        res.render('ddx');
    }
})
app.get('/Urattaa', (req, res) => {
    if(req.session.user) {
        res.sendFile(path.join(__dirname, 'public','/USSU/index.html'));
    }
    else {
        res.render('ddx');
    }
})


app.get('/nams', (req, res) => {
    const data = accounts;
    res.json(data)
})

app.get('/obinze1', (req, res) => {
    if(req.session.user){
    const foundUser = accounts.filter((data) => 'ARMY DAY SECONDARY SCHOOL OBINZE OWERRI ' === data.School);
    res.json(foundUser)
}});
app.get('/Akwakuma1', (req, res) => {
    const foundUser = accounts.filter((data) => " GIRLS SECONDARY SCHOOL AKWAKUMA " === data.School);
    res.json(foundUser)
})
app.get('/Orogwe1', (req, res) => {
    const foundUser = accounts.filter((data) => " COMMUNITY SECONDARY SCHOOL OROGWE " === data.School);
    res.json(foundUser)
})
app.get('/Ndegwu1', (req, res) => {
    const foundUser = accounts.filter((data) => "NDEGWU SECONDARY SCHOOL,UMUNWOHA" === data.School);
    res.json(foundUser)
})
app.get('/Owerri1', (req, res) => {
    const foundUser = accounts.filter((data) => " OWERRI CITY SECONDARY SCHOOL " === data.School);
    res.json(foundUser)
})

app.get('/Uratta1', (req, res) => { 
    const foundUser = accounts.filter((data) => " URATTA SECONDARY SCHOOL, URATTA " === data.School);
    res.json(foundUser)

})

app.get('/isemb1', (req, res) => { 
    const foundUser = accounts
    res.json(foundUser)

})

app.get ('/logout' , (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
            res.send('Error: ');
        }
        else {
            //res.render('base', {title: "Express", logout: "Logout Successfully..."});
            res.sendFile(path.join(__dirname, 'public','/index.html'));
        }
    })
    })


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
