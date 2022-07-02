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

// router.post('/', authorization, permit('user', 'admin'), upload.single('mainImage'), async (req, res, next) => {
//     try {
//         if(!req.body.agree || req.body.agree && (req.body.agree === false)) {
//             return res.status(400).send(
//                 {error: 'You did not agree with the terms of creating a new establishment!'}
//             )
//         }
//
//         const place = new Place({
//             title: req.body.title,
//             description: req.body.description,
//             mainImage: null,
//             user: req.body.user
//         });
//
//         if(req.file) {
//             place.mainImage = req.file.filename;
//         }
//
//         await place.save();
//
//         return res.send(place);
//     }catch (e) {
//         next(e);
//     }
// });

module.exports = router;
