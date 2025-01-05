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

const port = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accounts = JSON.parse(fs.readFileSync('./data.json','utf-8'));
const keys = JSON.parse(fs.readFileSync('./pass.json','utf-8'));

const app = express();

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

app.post('/search', async (req, res) => {
    try{
        const foundUser = accounts.find((data) => req.body.firstName === data.Aname.Name || req.body.MiddleName === data.Aname.Mname && req.body.SurName === data.Aname.Surname && req.body.ParentPhoneNo === data.ParentPhoneNo);
        if (foundUser) {
            req.session.user = foundUser.pine;
                //res.render('result',{id:foundUser.pine});
                res.send(`<!DOCTYPE html><html><body><h1 style="font-size:4rem; margin-top:8rem;text-align: center;">${foundUser.pine}</h1></html>`)
            } else {
                res.render('ddx');
            }
       
    } catch{
        res.send("Internal server error");
        
    }
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
