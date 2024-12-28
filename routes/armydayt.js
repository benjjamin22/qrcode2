import express from 'express';
import path from 'path';
const router = express.Router();


router.post('/', (req, res) => {
    const credential  ={"password": "12345"}
    if((req.body.Password == credential.password)) {
        req.session.user = req.body.Password;
        res.redirect('/Armydayy');
    }
    else {
        res.render('ddx');
    }
})
router.get('/Armydayy', (req, res) => {
    if(req.session.user) {
        res.sendFile(path.join(__dirname, 'public','/ASSO/index.html'));
    }
    else {
        res.render('ddx');
    }
})

export default router;
