const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '613c652e8379e1c88ad27e91',
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam qui accusantium ipsa, cumque tempora consequuntur quam quis officia labore dolor.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]

            },
            images: [
                {
                    url: 'https://res.cloudinary.com/shivam0000007/image/upload/v1631961286/YelpCamp/lgae7befzevfsigapwbv.jpg',
                    filename: 'YelpCamp/lgae7befzevfsigapwbv'
                },

                {
                    url: 'https://res.cloudinary.com/shivam0000007/image/upload/v1631526424/YelpCamp/off9m5aqc1ogv0sexwxf.jpg',
                    filename: 'YelpCamp/off9m5aqc1ogv0sexwxf'
                },


            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});