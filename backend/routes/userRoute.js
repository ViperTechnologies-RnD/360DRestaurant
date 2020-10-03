import express from 'express';
import User from '../models/userModel';

const router = express.Router();

router.get("/createadmin", async(req, res) => {
    try {
        const user = new User({
            name: 'Sobhan',
            email: 'sobhan.bahrami.v@gmail.com',
            password: 'Qwerty12345!',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(user);

    } catch (erorr) {
        res.send({msg: error.message});

    }
    
});

export default router;