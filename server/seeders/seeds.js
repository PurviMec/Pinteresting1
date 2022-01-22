const faker = require('faker');

const db = require('../config/connection');
const { Thought, User } = require('../models');

db.once('open', async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);


  // create thoughts
  let createBooks = [];
  for (let i = 0; i < 100; i += 1) {
    const title = faker.lorem.words(Math.round(Math.random() * 5) + 1);
    const description = faker.lorem.word(Math.round(Math.random()*50)+1);
    const author = faker.loren.word(Math.round(Math.random()*3)+1);
    const publish = faker.date.between('1990-01-01','2022-01-01');


    // const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    // const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdBook = await Thought.create({ title, description,author,publish });

    // const updatedUser = await User.updateOne(
    //   { _id: userId },
    //   { $push: { thoughts: createdThought._id } }
    // );

    createBooks.push(createdBook);
  }

  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const detail = faker.lorem.words(Math.round(Math.random() * 50) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomThoughtIndex = Math.floor(Math.random() * createBooks.length);
    const { _id: bookId } = createBooks[randomThoughtIndex];

    await Thought.updateOne(
      { _id: bookId },
      { $push: { reactions: { detail, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});