const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('../config');
const User = require('../models/User');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.post('/', upload.single('avatar'), async (req, res, next) => {
    try {
        const user = new User ({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: null,
        });

        if(req.file) {
            user.avatar = req.file.filename;
        }

        user.generateToken();
        await user.save();

        return res.send(user);
    }catch (e) {
        next(e);
    }
});

router.post('/sessions', async(req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.status(400).send({error: 'Wrong data!'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch) {
            return res.status(400).send({error: 'Wrong data!'});
        }

        user.generateToken();
        await user.save();

        return res.send(user);
    }catch (e) {
        next(e);
    }
});

router.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const message = {message: 'OK'};

        if (!token) return res.send(message);

        const user = await User.findOne({token});

        if (!user) return res.send(message);

        user.generateToken();
        await user.save();

        return res.send(message);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
