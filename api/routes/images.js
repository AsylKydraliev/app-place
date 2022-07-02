const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('../config');
const Images = require('../models/Images');
const authorization = require("../middleware/authorization");
const permit = require("../middleware/permit");

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

router.get('/:id', async (req, res, next) => {
    try{
        const images = await Images.find({place: req.params.id});

        return res.send(images);
    }catch (e){
        next(e);
    }
});

router.post('/addPhoto', authorization, permit('user', 'admin'), upload.single('image'), async (req, res, next) => {
    try {
        const image = new Images({
            image: null,
            user: req.user,
            place: req.body.place
        });

        if(req.file) {
            image.image = req.file.filename;
        }

        await image.save();

        return res.send(image);
    }catch (e) {
        next(e);
    }
});

module.exports = router;
