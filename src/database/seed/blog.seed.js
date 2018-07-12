#!/usr/bin/env node

let faker = require('faker');
let Post = require('../../entities/post');
let Category = require('../../entities/category');
// connect to MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/coolsite', { useNewUrlParser: true })
  .then(() => {
    console.info("Succesfully connected to MongoDB Database");
  })
  .catch((err) => {
    throw new Error(`Error unable to connect to database`);
  });

var categories = [];

Category.remove({});

for (let i = 0; i < 100; i++) {
        var cat = new Category({
            name:  faker.lorem.word()
        })
        categories.push(cat);
        cat.save();
      }


// remove all data from the collection first
Post.remove({})
    .then(() => {
        let posts = [];
        for (let i = 0; i < 100; i++) {
            var _category = categories[i]['_id'];
            posts.push({
                title: faker.lorem.words(),
                content: faker.lorem.paragraph(),
                // author: faker.name.findName(),
                created: faker.date.recent(),
                category: new mongoose.Types.ObjectId(_category),
            });
        }
        return Post.create(posts);
    })
    .then(() => {
        process.exit();
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
