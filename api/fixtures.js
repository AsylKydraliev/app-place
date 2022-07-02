const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const {nanoid} = require("nanoid");
const Place = require("./models/Place");
const Review = require("./models/Review");
const Images = require("./models/Images");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user, admin] = await User.create({
        email: 'user@gmail.com',
        displayName: 'user',
        password: '123',
        token: nanoid(),
        role: 'user',
        avatar: 'user.png',
    }, {
        email: 'admin@gmail.com',
        displayName: 'admin',
        password: '123',
        token: nanoid(),
        role: 'admin',
        avatar: 'user.png',
    });

    const [Lounge, NightClub, CoffeeHouse] = await Place.create({
        title: 'Lounge',
        mainImage: 'lounge.jpeg',
        description: 'The place in Bishkek 2020!',
        user: user,
        rate: 4.0
    }, {
        title: 'NightClub',
        mainImage: 'club.jpg',
        description: 'The place in Bishkek 2021!',
        user: user,
        rate: 3.0
    }, {
        title: 'CoffeeHouse',
        mainImage: 'coffee.jpg',
        description: 'The place in Bishkek 2022!',
        user: admin,
        rate: 5.0
    });

    await Review.create({
        text: 'lorem ipsum',
        foodRating: 4.5,
        serviceRating: 5.0,
        interiorRating: 3.5,
        place: Lounge,
        user: user,
    }, {
        text: 'lorem ipsum',
        foodRating: 4.5,
        serviceRating: 5.0,
        interiorRating: 3.5,
        place: NightClub,
        user: user,
    }, {
        text: 'lorem ipsum',
        foodRating: 4.5,
        serviceRating: 5.0,
        interiorRating: 3.5,
        place: CoffeeHouse,
        user: user,
    });

    await Images.create({
        image: 'lounge1.jpg',
        user: user,
        place: Lounge
    }, {
        image: 'lounge2.jpg',
        user: user,
        place: Lounge
    }, {
        image: 'club1.jpg',
        user: user,
        place: NightClub
    }, {
        image: 'club2.jpg',
        user: user,
        place: NightClub
    },
        {
            image: 'coffee1.jpeg',
            user: user,
            place: CoffeeHouse
        },
        {
            image: 'coffee2.jpg',
            user: user,
            place: CoffeeHouse
        },
    );

    await mongoose.connection.close();
}

run().catch(e => console.error(e));