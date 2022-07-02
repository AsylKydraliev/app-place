const express = require('express');
const authorization = require("../middleware/authorization");
const permit = require("../middleware/permit");
const Review = require("../models/Review");

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try{
        const reviews = await Review.find({place: req.params.id}).populate('user', 'displayName');

        return res.send(reviews);
    }catch (e){
        next(e);
    }
});

router.post('/addReview', authorization, permit('user', 'admin'), async (req, res, next) => {
    try {
        const review = new Review({
            text: req.body.text,
            foodRating: req.body.foodRating,
            serviceRating: req.body.serviceRating,
            interiorRating: req.body.interiorRating,
            place: req.body.place,
            user: req.user,
            date: new Date().toISOString()
        });

        await review.save();

        return res.send(review);
    }catch (e) {
        next(e);
    }
});

module.exports = router;
