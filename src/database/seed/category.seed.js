#!/usr/bin/env node
let faker = require('faker');
const mongoose = require('mongoose');
let Category = require('../../entities/category');

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/coolsite', { useNewUrlParser: true })
  .then(() => {
    console.info("Succesfully connected to MongoDB Database");
  })
  .catch((err) => {
    throw new Error(`Error unable to connect to database`);
  });
// remove all data from the collection first
Category.remove({})
    .then(() => {
        let categories = [];
        for (let i = 0; i < 21; i++) {
            categories.push({
                name: faker.lorem.word(),
                // content: faker.lorem.paragraph(),
                // author: faker.name.findName(),
                // created: faker.date.recent(),
                // category: Math.round(Math.random() * 20),
            });
        }
        return Category.create(categories);
    })
    .then(() => {
        process.exit();
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });



    
        